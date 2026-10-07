import { default as fetch } from "unfetch";
import styleSheet from "./docdiff.css";
import docdiffGeneralStyleSheet from "./docdiff.document.css";

// Note that it took as a while to make it work on production and also on tests.
// We have to import it as:
//   import * as  visualDomDiff from "visual-dom-diff";
//
// We have to use it as:
//   visualDomDiff.visualDomDiff();
//
// See https://github.com/readthedocs/addons/pull/234
import * as visualDomDiff from "visual-dom-diff";

import {
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
  EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
} from "./events";
import { CSSResult, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";
import {
  AddonBase,
  getQueryParam,
  docTool,
  IS_LOCALHOST_DEVELOPMENT,
  IS_TESTING,
} from "./utils";
import { EMBED_API_ENDPOINT } from "./constants";

export const DOCDIFF_URL_PARAM = "readthedocs-diff";
export const DOCDIFF_CHUNK_URL_PARAM = "readthedocs-diff-chunk";

/**
 * visual-dom-diff options
 *
 * See https://github.com/Teamwork/visual-dom-diff#options
 */
const VISUAL_DIFF_OPTIONS = {
  addedClass: "doc-diff-added",
  modifiedClass: "doc-diff-modified",
  removedClass: "doc-diff-removed",
  skipModified: true,
};

// Rendering the base version inside a hidden iframe
const RENDER_QUIET_MS = 500;
const RENDER_TIMEOUT_MS = 10000;
const ADDONS_ASSETS_SELECTOR =
  'script[src*="readthedocs-addons"], link[href*="readthedocs-addons"]';

/**
 * Find the root element in a parsed base document.
 *
 * The embed API returns only the `maincontent` node, so a complex selector
 * (eg. "main > div > div.md-content") won't match it. In that case, fall back
 * to the first element of the body.
 */
export function findBaseRoot(htmlDocument, rootSelector) {
  return (
    htmlDocument.documentElement.querySelector(rootSelector) ||
    htmlDocument.body.firstElementChild
  );
}

/**
 * Build the HTML of the current page with its root element replaced by the
 * base version's one, so the page's own scripts run over the base content.
 */
export function buildBaseDocument(pageHtml, baseContent, rootSelector) {
  const parser = new DOMParser();
  const pageDocument = parser.parseFromString(pageHtml, "text/html");
  const pageRoot = pageDocument.querySelector(rootSelector);
  if (pageRoot === null) {
    throw new Error("Element not found in current page source.");
  }

  const baseRoot = findBaseRoot(
    parser.parseFromString(baseContent, "text/html"),
    rootSelector,
  );
  if (baseRoot === null) {
    throw new Error("Element not found in base document.");
  }
  pageRoot.replaceWith(pageDocument.adoptNode(baseRoot));

  // Don't load addons inside the iframe
  for (const element of pageDocument.querySelectorAll(ADDONS_ASSETS_SELECTOR)) {
    element.remove();
  }

  const doctype = pageDocument.doctype
    ? new XMLSerializer().serializeToString(pageDocument.doctype)
    : "";
  return doctype + pageDocument.documentElement.outerHTML;
}

/** Resolve once the window fired `load`. */
export function waitForLoad(win) {
  if (win.document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) =>
    win.addEventListener("load", resolve, { once: true }),
  );
}

/** Resolve after `quiet` ms without mutations under `node`, or after `timeout` ms. */
export function waitForDomToSettle(
  node,
  quiet = RENDER_QUIET_MS,
  timeout = RENDER_TIMEOUT_MS,
) {
  return new Promise((resolve) => {
    let quietTimer;
    let hardTimer;
    const observer = new MutationObserver(() => {
      clearTimeout(quietTimer);
      quietTimer = setTimeout(finish, quiet);
    });

    function finish() {
      observer.disconnect();
      clearTimeout(quietTimer);
      clearTimeout(hardTimer);
      resolve();
    }

    observer.observe(node, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });
    quietTimer = setTimeout(finish, quiet);
    hardTimer = setTimeout(finish, timeout);
  });
}

/**
 * Render `html` in a hidden iframe, wait for its scripts to settle and return
 * a copy of the root element.
 */
export function renderDocument(html, rootSelector) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
  iframe.setAttribute("aria-hidden", "true");
  iframe.inert = true;
  iframe.tabIndex = -1;
  // Keep it laid out at viewport size so scripts behave like on the visible page
  iframe.style.cssText =
    "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; " +
    "border: 0; opacity: 0; pointer-events: none; z-index: -1;";

  const loaded = new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Timeout rendering base document.")),
      RENDER_TIMEOUT_MS,
    );
    iframe.addEventListener(
      "load",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
  iframe.srcdoc = html;
  document.body.appendChild(iframe);

  return loaded
    .then(() => waitForDomToSettle(iframe.contentDocument.documentElement))
    .then(() => {
      const root = iframe.contentDocument.querySelector(rootSelector);
      if (root === null) {
        throw new Error("Element not found in rendered base document.");
      }
      return document.importNode(root, true);
    })
    .finally(() => iframe.remove());
}

export class DocDiffElement extends LitElement {
  static elementName = "readthedocs-docdiff";

  static properties = {
    config: {
      state: true,
    },
    enabled: {
      type: Boolean,
    },
    baseUrl: {
      type: String,
      attribute: "base-url",
    },
    injectStyles: {
      type: Boolean,
      attribute: "inject-styles",
      // NOTE: the way that regular `type: Boolean` works is taking a look at
      // the presence of the attribute, which defaults to `false` and it's not
      // what we want. I think it's clearer to always use the same API
      // "key=value" to keep consistency.
      converter: {
        fromAttribute: (value, type) => {
          if (value === "true") {
            return true;
          }
          return false;
        },
        toAttribute: (value, type) => {
          if (value === true) {
            return "true";
          }
          return "false";
        },
      },
    },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.baseUrl = null;
    this.rootSelector = null;
    this.injectStyles = true;

    this.originalBody = null;
    this.cachedRemoteResponse = null;
    this.cachedBaseRoot = null;
  }

  loadConfig(config) {
    if (!DocDiffAddon.isEnabled(config)) {
      return;
    }
    this.config = config;
    this.rootSelector =
      objectPath.get(this.config, "addons.options.root_selector") ||
      docTool.getRootSelector();

    // NOTE: maybe there is a better way to inject this styles?
    // Conditionally inject our base styles
    if (this.injectStyles) {
      let styleSheet = docdiffGeneralStyleSheet;
      if (styleSheet instanceof CSSResult) {
        styleSheet = styleSheet.styleSheet;
      }
      document.adoptedStyleSheets.push(styleSheet);
    }

    // Enable DocDiff if the URL parameter is present
    if (getQueryParam(DOCDIFF_URL_PARAM) === "true") {
      const event = new CustomEvent(
        EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      );
      document.dispatchEvent(event);
    }
  }

  render() {
    return nothing;
  }

  getEmbedURL(url) {
    const params = {
      url: url,
    };

    if (this.rootSelector !== null) {
      params["maincontent"] = this.rootSelector;
    }

    if (IS_LOCALHOST_DEVELOPMENT) {
      return "/_/readthedocs-docdiff-embed.json";
    }

    // NOTE: we don't send ``doctool`` and ``docversion`` on purpose here
    // because we don't want the backed to pre-process the response. We need the
    // HTML as-is without any pre-processing.
    return EMBED_API_ENDPOINT + "?" + new URLSearchParams(params).toString();
  }

  fetchBaseContent() {
    if (this.cachedRemoteResponse !== null) {
      return Promise.resolve(this.cachedRemoteResponse.content);
    }

    const baseURL = this.config.addons.doc_diff.base_url;
    const url = this.getEmbedURL(baseURL);
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error downloading requested base URL.");
        }
        return response.json();
      })
      .then((data) => {
        this.cachedRemoteResponse = data;
        return data.content;
      });
  }

  fetchPageSource() {
    const url = new URL(window.location.href);
    url.searchParams.delete(DOCDIFF_URL_PARAM);
    url.searchParams.delete(DOCDIFF_CHUNK_URL_PARAM);
    url.hash = "";
    return fetch(url.href).then((response) => {
      if (!response.ok) {
        throw new Error("Error downloading current page source.");
      }
      return response.text();
    });
  }

  // Render the base content with the current page's scripts, so elements
  // generated by JavaScript (copy buttons, MathJax, etc) exist on both sides
  // of the diff. Fall back to the raw base content if rendering fails.
  loadBaseRoot() {
    if (this.cachedBaseRoot !== null) {
      return Promise.resolve(this.cachedBaseRoot);
    }

    return Promise.all([this.fetchBaseContent(), this.fetchPageSource()])
      .then(([baseContent, pageHtml]) =>
        renderDocument(
          buildBaseDocument(pageHtml, baseContent, this.rootSelector),
          this.rootSelector,
        ),
      )
      .catch((error) => {
        console.warn("Unable to render base version. Using raw HTML.", error);
        return this.fetchBaseContent().then((baseContent) => {
          const parser = new DOMParser();
          const root = findBaseRoot(
            parser.parseFromString(baseContent, "text/html"),
            this.rootSelector,
          );
          if (root === null) {
            throw new Error("Element not found in base document.");
          }
          return root;
        });
      })
      .then((root) => {
        this.cachedBaseRoot = root;
        return root;
      });
  }

  compare() {
    // First check the root selector is in the current body
    if (document.querySelector(this.rootSelector) === null) {
      console.error("Element not found in current document.");
      return Promise.resolve();
    }

    // Wait for the current page's scripts too (eg. when enabled via URL param)
    const pageSettled = waitForLoad(window).then(() =>
      waitForDomToSettle(document.querySelector(this.rootSelector)),
    );

    return Promise.all([this.loadBaseRoot(), pageSettled])
      .then(([baseRoot]) => {
        // It may have been disabled while rendering
        if (this.enabled) {
          this.performDiff(baseRoot.cloneNode(true));
        }
      })
      .finally(() => {
        const event = new CustomEvent(EVENT_READTHEDOCS_ROOT_DOM_CHANGED);
        document.dispatchEvent(event);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Diff the root element against `oldBody` and replace it in the DOM with
  // the resulting visual diff elements.
  performDiff(oldBody) {
    const newBody = document.querySelector(this.rootSelector);

    // Depending on the context, visualDomDiff function is found under a different path.
    // When running tests we use a different path for it.
    let visualDomDiffFunction = visualDomDiff.visualDomDiff;
    if (!visualDomDiffFunction && IS_TESTING) {
      visualDomDiffFunction = visualDomDiff.default.visualDomDiff;
    }
    const diffNode = visualDomDiffFunction(
      oldBody,
      newBody,
      VISUAL_DIFF_OPTIONS,
    );
    newBody.replaceWith(diffNode.firstElementChild);
  }

  enableDocDiff() {
    // TODO: Unsure when this would happen?
    // Perhaps when DocDiffAddon.isEnabled returns false?
    if (this.config === null) {
      return null;
    }

    if (this.enabled) {
      console.debug("Ignoring enableDocDiff: it was already enabled");
      return null;
    }

    // Update URL to include the diff parameter
    const url = new URL(window.location.href);
    url.searchParams.set(DOCDIFF_URL_PARAM, "true");
    window.history.replaceState({}, "", url);

    this.enabled = true;
    this.originalBody = document.querySelector(this.rootSelector);
    return this.compare();
  }

  disableDocDiff() {
    if (!this.enabled) {
      console.debug("Ignoring disableDocDiff: it was already disabled");
      return null;
    }

    // Remove diff parameter from URL
    const url = new URL(window.location.href);
    url.searchParams.delete(DOCDIFF_URL_PARAM);
    url.searchParams.delete(DOCDIFF_CHUNK_URL_PARAM);
    window.history.replaceState({}, "", url);

    this.enabled = false;
    document.querySelector(this.rootSelector).replaceWith(this.originalBody);

    const event = new CustomEvent(EVENT_READTHEDOCS_ROOT_DOM_CHANGED);
    document.dispatchEvent(event);
  }

  _handleShowDocDiff = (e) => {
    e.preventDefault();
    this.enableDocDiff();
  };

  _handleHideDocDiff = (e) => {
    e.preventDefault();
    this.disableDocDiff();
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(
      EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      this._handleShowDocDiff,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_DOCDIFF_HIDE,
      this._handleHideDocDiff,
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      this._handleShowDocDiff,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_DOCDIFF_HIDE,
      this._handleHideDocDiff,
    );
    super.disconnectedCallback();
  }
}

export class DocDiffAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.docdiff.json";
  static addonEnabledPath = "addons.doc_diff.enabled";
  static addonName = "DocDiff";
  static elementClass = DocDiffElement;

  static requiresUrlParam() {
    return (
      window.location.host.endsWith(".readthedocs.build") ||
      // Allow the addon to be enabled on root domains in dev,
      // so we don't have to setup external versions for testing.
      window.location.host.endsWith(".devthedocs.org") ||
      window.location.host.endsWith(".devthedocs.com")
    );
  }
}

customElements.define(DocDiffElement.elementName, DocDiffElement);
