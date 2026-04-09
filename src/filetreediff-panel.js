import { html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";
import styleSheet from "./filetreediff-panel.css";
import { DOCDIFF_URL_PARAM } from "./docdiff.js";
import {
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
} from "./events";

/**
 * File tree diff panel element for inline display within the flyout.
 *
 * This is a panel version of the file tree diff UI, designed to show
 * changed files inline in the flyout menu rather than as a separate
 * floating bar. Future iterations can add chunk navigation and richer
 * file status display.
 */
export class FileTreeDiffPanelElement extends LitElement {
  static elementName = "readthedocs-filetreediff-panel";

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

  render() {
    if (!this.config) {
      return nothing;
    }

    const diffData = objectPath.get(this.config, "addons.filetreediff.diff");

    return html`
      <div class="filetreediff-panel">
        <div class="panel-header">
          <h3>Changed Files</h3>
          ${this._renderDiffToggle()}
        </div>
        <div class="file-list">
          ${diffData
            ? this._renderFileList(diffData)
            : html`<p class="empty">No file changes available</p>`}
        </div>
      </div>
    `;
  }

  _renderDiffToggle() {
    if (!objectPath.get(this.config, "addons.doc_diff.enabled", false)) {
      return nothing;
    }

    return html`
      <label class="diff-toggle">
        <input
          type="checkbox"
          .checked=${this.docDiffEnabled}
          @change=${this._handleToggleDiff}
        />
        Show diff
      </label>
    `;
  }

  _renderFileList(diffData) {
    const addedFiles = (diffData.added || []).map((f) => ({
      ...f,
      changeType: "added",
    }));
    const modifiedFiles = (diffData.modified || []).map((f) => ({
      ...f,
      changeType: "modified",
    }));
    const files = [...addedFiles, ...modifiedFiles];

    if (!files.length) {
      return html`<p class="empty">No changed files</p>`;
    }

    const currentUrl = this._getCurrentPageUrl();

    return html`
      <ul>
        ${files.map(
          (f) => html`
            <li class="${f.changeType}">
              <span class="badge ${f.changeType}"
                >${f.changeType === "added" ? "+" : "±"}</span
              >
              <a
                href="${this._getFileUrl(f)}"
                class="${f.urls.current === currentUrl ? "current" : ""}"
                >${f.filename}</a
              >
            </li>
          `,
        )}
      </ul>
    `;
  }

  _getFileUrl(file) {
    const url = new URL(file.urls.current);
    if (this.docDiffEnabled) {
      url.searchParams.set(DOCDIFF_URL_PARAM, "true");
    }
    return url.toString();
  }

  _getCurrentPageUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  _handleToggleDiff(event) {
    if (event.target.checked) {
      document.dispatchEvent(
        new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW),
      );
    } else {
      document.dispatchEvent(new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_HIDE));
    }
  }

  _handleDocDiffShow = () => {
    this.docDiffEnabled = true;
  };

  _handleDocDiffHide = () => {
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

customElements.define(
  FileTreeDiffPanelElement.elementName,
  FileTreeDiffPanelElement,
);
