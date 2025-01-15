import { html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";
import styleSheet from "./filetreediff.css";
import { DOCDIFF_URL_PARAM } from "./docdiff.js";
import {
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
} from "./events";
import { hasQueryParam } from "./utils";

import { AddonBase } from "./utils";

export class FileTreeDiffElement extends LitElement {
  static elementName = "readthedocs-filetreediff";

  static properties = {
    config: { state: true },
    docDiffEnabled: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.config = null;
    this.docDiffEnabled = false;
  }

  loadConfig(config) {
    if (!FileTreeDiffAddon.isEnabled(config)) {
      return;
    }
    this.config = config;
  }

  handleFileChange(event) {
    const fileUrl = event.target.value;
    if (fileUrl) {
      const url = new URL(fileUrl);
      // Only add the diff parameter if diff is currently enabled
      if (this.docDiffEnabled) {
        url.searchParams.set(DOCDIFF_URL_PARAM, "true");
      }
      window.location.href = url.toString();
    }
  }

  handleToggleDiff(event) {
    if (event.target.checked) {
      document.dispatchEvent(
        new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW),
      );
    } else {
      document.dispatchEvent(new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_HIDE));
    }
  }

  getCurrentPageUrl() {
    // Remove any query parameters to match against file URLs
    const currentPath = window.location.pathname;
    const currentOrigin = window.location.origin;
    return `${currentOrigin}${currentPath}`;
  }

  render() {
    const diffData = objectPath.get(this.config, "addons.filetreediff.diff");
    if (!diffData) {
      return nothing;
    }

    const currentUrl = this.getCurrentPageUrl();
    const renderSection = (files, label) => {
      if (!files.length) return nothing;
      const emoji = label === "Added" ? "+ " : "± ";
      return html`
        <optgroup label="${label}">
          ${files.map(
            (f) => html`
              <option
                value=${f.urls.current}
                ?selected=${f.urls.current === currentUrl}
              >
                ${emoji}${f.filename}
              </option>
            `,
          )}
        </optgroup>
      `;
    };

    const hasCurrentFile = [...diffData.added, ...diffData.modified].some(
      (f) => f.urls.current === currentUrl,
    );

    return html`
      <div class="file-dropdown">
        <div class="diff-controls">
          <label class="diff-checkbox">
            <input
              type="checkbox"
              .checked=${this.docDiffEnabled}
              @change=${this.handleToggleDiff}
            />
            Show diff
          </label>
          <select id="file-select" @change=${this.handleFileChange}>
            <option value="" ?selected=${!hasCurrentFile} disabled>
              Files changed
            </option>
            ${renderSection(diffData.added, "Added")}
            ${renderSection(diffData.modified, "Changed")}
          </select>
        </div>
      </div>
    `;
  }

  _handleDocDiffShow = (event) => {
    this.docDiffEnabled = true;
  };

  _handleDocDiffHide = (event) => {
    this.docDiffEnabled = false;
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      this._handleDocDiffShow,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_DOCDIFF_HIDE,
      this._handleDocDiffHide,
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      this._handleDocDiffShow,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_DOCDIFF_HIDE,
      this._handleDocDiffHide,
    );
    super.disconnectedCallback();
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
}

customElements.define("readthedocs-filetreediff", FileTreeDiffElement);
