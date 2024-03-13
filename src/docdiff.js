import { ajv } from "./data-validation";
import styleSheet from "./docdiff.css";
import docdiffGeneralStyleSheet from "./docdiff.document.css";

import { visualDomDiff } from "visual-dom-diff";
import { AddonBase } from "./utils";
import {
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
} from "./events";
import { html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";

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
  }

  loadConfig(config) {
    if (!DocDiffAddon.isEnabled(config)) {
      return;
    }
    this.config = config;
    this.rootSelector =
      this.config.addons.doc_diff.root_selector || "[role=main]";

    // NOTE: maybe there is a better way to inject this styles?
    // Conditionally inject our base styles
    if (this.injectStyles) {
      document.adoptedStyleSheets.push(docdiffGeneralStyleSheet);
    }
  }

  render() {
    return nothing;
    // TODO: render a checkbox once we are settled on the UI.
    // For now, we are only enabling/disabling via a hotkey.
    //
    // return html`
    //   <label class="switch">
    //     <input @click="${this.handleClick}" type="checkbox" />
    //     <span class="slider round"></span>
    //   </label>
    // `;
  }

  handleClick(e) {
    if (e.target.checked) {
      this.enableDocDiff();
    } else {
      this.disableDocDiff();
    }
  }

  compare() {
    fetch(this.config.addons.doc_diff.base_url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error downloading requested base URL.");
        }

        return response.text();
      })
      .then((text) => {
        const parser = new DOMParser();
        const html_document = parser.parseFromString(text, "text/html");
        const old_body = html_document.documentElement.querySelector(
          this.rootSelector,
        );
        const new_body = document.querySelector(this.rootSelector);

        if (old_body == null || new_body == null) {
          throw new Error("Element not found in both documents.");
        }

        // After finding the root element, and diffing it, replace it in the DOM
        // with the resulting visual diff elements instead.
        const diffNode = visualDomDiff(old_body, new_body, VISUAL_DIFF_OPTIONS);
        new_body.replaceWith(diffNode.firstElementChild);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  enableDocDiff() {
    if (this.config === null) {
      return null;
    }

    this.enabled = true;
    this.originalBody = document.querySelector(this.rootSelector);
    return this.compare();
  }

  disableDocDiff() {
    this.enabled = false;
    document.querySelector(this.rootSelector).replaceWith(this.originalBody);
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
    document.removeEventListener("keydown", this._handleShowDocDiff);
    super.disconnectedCallback();
  }
}

export class DocDiffAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.docdiff.json";
  static addonEnabledPath = "addons.doc_diff.enabled";
  static addonName = "DocDiff";

  constructor(config) {
    super();

    // TODO: is it possible to move this `constructor` to the `AddonBase` class?
    customElements.define("readthedocs-docdiff", DocDiffElement);
    let elems = document.querySelectorAll("readthedocs-docdiff");
    if (!elems.length) {
      elems = [new DocDiffElement()];
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static requiresUrlParam() {
    return window.location.host.endsWith(".readthedocs.build");
  }
}
