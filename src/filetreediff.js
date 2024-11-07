import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { html, nothing, render, LitElement } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { default as objectPath } from "object-path";
import styleSheet from "./filetreediff.css";

import { AddonBase } from "./utils";

export class FileTreeDiffElement extends LitElement {
  static elementName = "readthedocs-filetreediff";

  static properties = {
    config: { state: true },
    dismissed: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.config = null;
    this.dismissed = false;
  }

  firstUpdated() {
    // Add CSS classes to the element on ``firstUpdated`` because we need the
    // HTML element to exist in the DOM before being able to add tag attributes.
    this.className = this.className || "raised toast";
  }

  loadConfig(config) {
    if (!FileTreeDiffAddon.isEnabled(config)) {
      return;
    }

    this.config = config;
  }

  render() {
    if (this.dismissed) {
      return nothing;
    }

    library.add(faFile);
    const iconFile = icon(faFile, {
      title: "This version is a pull request version",
      classes: ["header", "icon"],
    });

    const diffdata = objectPath.get(this.config, "addons.filetreediff.diff");

    let diffAddedUrls = diffdata.added.length
      ? html`
          <span>Added</span>
          <ul>
            ${repeat(
              diffdata.added,
              (f) => f.filename,
              (f, index) =>
                html`<li><a href=${f.urls.current}>${f.filename}</a></li>`,
            )}
          </ul>
        `
      : nothing;

    let diffDeletedUrls = diffdata.deleted.length
      ? html`
          <span>Deleted</span>
          <ul>
            ${repeat(
              diffdata.deleted,
              (f) => f.filename,
              (f, index) =>
                html`<li><a href=${f.urls.current}>${f.filename}</a></li>`,
            )}
          </ul>
        `
      : nothing;

    let diffModifiedUrls = diffdata.modified.length
      ? html`
          <span>Modified</span>
          <ul>
            ${repeat(
              diffdata.modified,
              (f) => f.filename,
              (f, index) =>
                html`<li><a href=${f.urls.current}>${f.filename}</a></li>`,
            )}
          </ul>
        `
      : nothing;

    return html`
      <div>
        ${iconFile.node[0]}
        <div class="title">
          List of files changed in this pull request ${this.renderCloseButton()}
        </div>
        <div class="content">
          ${diffAddedUrls} ${diffModifiedUrls} ${diffDeletedUrls}
        </div>
      </div>
    `;
  }

  renderCloseButton() {
    library.add(faCircleXmark);
    const xmark = icon(faCircleXmark, {
      title: "Close notification",
    });
    return html`
      <a href="#" class="right" @click=${this.closeNotification}>
        ${xmark.node[0]}
      </a>
    `;
  }

  closeNotification(e) {
    // Avoid going back to the top of the page when closing the notification
    e.preventDefault();
    this.dismissed = true;

    // Avoid event propagation
    return false;
  }
}

/**
 * File Tree Diff addon
 *
 * UNDER DEVELOPMENT.
 *
 * Currently, this addon shows in the console all the file changed compared to
 * the LATEST version of the project.
 *
 * @param {Object} config - Addon configuration object
 */
export class FileTreeDiffAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.filetreediff.json";
  static addonEnabledPath = "addons.filetreediff.enabled";
  static addonName = "File Tree Diff";

  constructor(config) {
    super();

    this.config = config;
    this.showDiff();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-filetreediff");
    if (!elems.length) {
      elems = [new FileTreeDiffElement()];
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  showDiff() {
    // const outdated = objectPath.get(this.config, "addons.filetreediff.oudated", false);
    const diffdata = objectPath.get(this.config, "addons.filetreediff.diff");

    for (let f of diffdata.added) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
    for (let f of diffdata.modified) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
    for (let f of diffdata.deleted) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
  }
}

customElements.define("readthedocs-filetreediff", FileTreeDiffElement);
