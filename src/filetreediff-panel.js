import { html, nothing } from "lit";

import styleSheet from "./filetreediff-panel.css";
import { FileTreeDiffElement } from "./filetreediff.js";
import { DOCDIFF_URL_PARAM, DOCDIFF_CHUNK_URL_PARAM } from "./docdiff.js";
import { getQueryParam } from "./utils";

// Above this many changed files the list gets a text filter.
const FILTER_THRESHOLD = 10;

/**
 * File tree diff UI hosted inside the flyout v2 bar.
 *
 * Reuses the standalone element's markup and behaviour (file selector,
 * show-diff toggle, chunk navigation) and only swaps the positioning. Long
 * lists of files get a filter box in front of the selector.
 */
export class FileTreeDiffPanelElement extends FileTreeDiffElement {
  static elementName = "readthedocs-filetreediff-panel";

  static properties = {
    fileFilter: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.fileFilter = "";
  }

  connectedCallback() {
    super.connectedCallback();

    // This element mounts only when the reader picks it from the hamburger,
    // which can be long after DocDiff announced its state. Read the current
    // state from the URL instead of waiting for the next event.
    this.docDiffEnabled = getQueryParam(DOCDIFF_URL_PARAM) === "true";
    this.chunks = this.getChunks();
    const chunkFromUrl = parseInt(getQueryParam(DOCDIFF_CHUNK_URL_PARAM));
    this.chunkIndex =
      Math.min(this.chunks.length, Math.max(0, chunkFromUrl)) || 1;
  }

  getDiffFiles() {
    const files = super.getDiffFiles();
    const query = this.fileFilter.trim().toLowerCase();
    if (!query) {
      return files;
    }
    const matches = (f) => f.filename.toLowerCase().includes(query);
    return {
      added: files.added.filter(matches),
      modified: files.modified.filter(matches),
    };
  }

  renderFileFilter() {
    const all = super.getDiffFiles();
    if (all.added.length + all.modified.length <= FILTER_THRESHOLD) {
      return nothing;
    }
    return html`<input
      class="file-filter"
      type="search"
      placeholder="Filter files"
      aria-label="Filter changed files"
      autocomplete="off"
      .value=${this.fileFilter}
      @input=${this._onFilterInput}
    />`;
  }

  _onFilterInput = (e) => {
    this.fileFilter = e.target.value;
  };
}

customElements.define(
  FileTreeDiffPanelElement.elementName,
  FileTreeDiffPanelElement,
);
