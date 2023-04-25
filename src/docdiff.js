import { compare } from "doc-diff";
import styleSheet from "./docdiff.css";

import { AddonBase } from "./utils";
import { html, nothing, render, LitElement } from "lit";

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

    this.originalBody = document.querySelector(this.rootSelector);
  }

  loadConfig(config) {
    this.config = config;

    if (config.addons.doc_diff) {
      if (!this.baseHost) {
        this.baseHost = config.addons.doc_diff.base_host;
      }
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

  enableDocDiff() {
    return compare({
      base_url: this.baseUrl,
      root_selector: this.rootSelector,
      inject_styles: this.injectStyles,
    });
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
    // if (!elems.length) {
    //   elems = [new DocDiffElement()];
    //   render(elems[0], document.body);
    // }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.doc_diff.enabled;
  }
}
