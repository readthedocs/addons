import { default as fetch } from "unfetch";
import styleSheet from "./docdiff.css";
import docdiffGeneralStyleSheet from "./docdiff.document.css";
import { diffDocuments } from "./docdiff.diff";

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
} from "./utils";
import { EMBED_API_ENDPOINT } from "./constants";

export const DOCDIFF_URL_PARAM = "readthedocs-diff";
export const DOCDIFF_CHUNK_URL_PARAM = "readthedocs-diff-chunk";

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

  getCurrentPageURL() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.href;
  }

  // Download the main content of a page from the Embed API, as served by the
  // server. We diff the base and the current page this way, instead of using
  // the live DOM, so that the result doesn't depend on what JavaScript did to
  // the page (rendered math, copy buttons, injected ads, etc.).
  fetchContent(url) {
    if (IS_LOCALHOST_DEVELOPMENT && url === this.getCurrentPageURL()) {
      // The Embed API is mocked with a static file in development
      return Promise.resolve(
        document.querySelector(this.rootSelector).outerHTML,
      );
    }
    return fetch(this.getEmbedURL(url))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error downloading requested URL: ${url}`);
        }
        return response.json();
      })
      .then((data) => data.content);
  }

  compare() {
    // First check the root selector is in the current body
    if (document.querySelector(this.rootSelector) === null) {
      console.error("Element not found in current document.");
      return;
    }

    let promiseData;
    if (this.cachedRemoteResponse !== null) {
      promiseData = Promise.resolve(this.cachedRemoteResponse);
    } else {
      const baseURL = this.config.addons.doc_diff.base_url;
      promiseData = Promise.all([
        this.fetchContent(baseURL),
        this.fetchContent(this.getCurrentPageURL()),
      ]);
    }

    promiseData
      .then((data) => {
        this.cachedRemoteResponse = data;
        this.performDiff(...this.cachedRemoteResponse);
      })
      .finally(() => {
        const event = new CustomEvent(EVENT_READTHEDOCS_ROOT_DOM_CHANGED);
        document.dispatchEvent(event);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Return the root element from the HTML content returned by the Embed API.
  parseContent(content) {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(content, "text/html");

    // We first try to get the `rootSelector` from the content.
    // However, depending on how the selector is constructed, it may not exist
    // even if the response is valid.
    //
    // This happens when we send `?maincontent=` to the API backend with a
    // complex selector (eg. "main > div > div.md-content") since in the
    // response the first elements (e.g. "main > div") won't exist because the
    // content is already parsed to return only the `?maincontent=` selector.
    //
    // In those cases, we always pick the `firstElementChild` of the body.
    return (
      htmlDocument.documentElement.querySelector(this.rootSelector) ||
      htmlDocument.documentElement.querySelector("body").firstElementChild
    );
  }

  // Diff the base and current content, and replace the root element in the
  // DOM with the resulting visual diff elements instead.
  performDiff(baseContent, currentContent) {
    const oldBody = this.parseContent(baseContent);
    const newBody = this.parseContent(currentContent);
    if (oldBody === null || newBody === null) {
      throw new Error("Element not found in base or current document.");
    }

    const { node } = diffDocuments(oldBody, newBody);
    document.querySelector(this.rootSelector).replaceWith(node);
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
