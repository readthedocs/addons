import styleSheet from "./docdiff.css";
import docdiffGeneralStyleSheet from "./docdiff.document.css";

import { visualDomDiff } from "visual-dom-diff";
import { AddonBase } from "./utils";
import { html, nothing, render, LitElement } from "lit";

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
      state: true,
    },
    baseUrl: {
      type: String,
      attribute: "base-url",
    },
    baseHost: {
      type: String,
      attribute: "base-host",
    },
    rootSelector: {
      type: String,
      attribute: "root-selector",
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

  // NOTE: how do we include the classes from docdiff here as well?
  static styles = styleSheet;

  constructor() {
    super();

    this.enabled = false;
    this.baseHost = null;
    this.baseUrl = null;
    this.rootSelector = "[role=main]";
    this.injectStyles = true;

    this.originalBody = null;
  }

  loadConfig(config) {
    this.config = config;

    if (config.addons.doc_diff) {
      if (!this.baseHost) {
        this.baseHost = config.addons.doc_diff.base_host;
      }
    }

    // NOTE: maybe there is a better way to inject this styles?
    // Conditionally inject our base styles
    console.log(this.injectStyles);
    if (this.injectStyles) {
      document.adoptedStyleSheets.push(docdiffGeneralStyleSheet);
    }
  }

  render() {
    // TODO
    return html`
      <label class="switch">
        <input @click="${this.handleClick}" type="checkbox" />
        <span class="slider round"></span>
      </label>
    `;
  }

  handleClick(e) {
    this.enabled = e.target.checked;
    if (this.enabled) {
      this.enableDocDiff();
    } else {
      this.disableDocDiff();
    }
  }

  compare() {
    // TODO: handle fetch errors properly
    return new Promise((resolve, reject) => {
      fetch(this.baseUrl)
        .then((response) => response.text())
        .then((text) => {
          const parser = new DOMParser();
          const html_document = parser.parseFromString(text, "text/html");
          const old_body = html_document.documentElement.querySelector(
            this.rootSelector,
          );
          const new_body = document.querySelector(this.rootSelector);

          if (old_body == null || new_body == null) {
            reject(new Error("Element not found in both documents."));
          }

          // After finding the root element, and diffing it, replace it in the DOM
          // with the resulting visual diff elements instead.
          const diffNode = visualDomDiff(
            old_body,
            new_body,
            VISUAL_DIFF_OPTIONS
          );
          new_body.replaceWith(diffNode.firstElementChild);

          resolve(true);
        });
    });
  }

  enableDocDiff() {
    this.originalBody = document.querySelector(this.rootSelector);
    return this.compare();
  }

  disableDocDiff() {
    document.querySelector(this.rootSelector).replaceWith(this.originalBody);
  }
}

export class DocDiffAddon extends AddonBase {
  constructor(config) {
    super();

    // TODO: is it possible to move this `constructor` to the `AddonBase` class?
    customElements.define("readthedocs-docdiff", DocDiffElement);
    let elems = document.querySelectorAll("readthedocs-docdiff");

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.doc_diff.enabled;
  }
}
