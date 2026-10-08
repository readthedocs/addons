import styleSheet from "./filetreediff-panel.css";
import { FileTreeDiffElement } from "./filetreediff.js";
import { DOCDIFF_URL_PARAM, DOCDIFF_CHUNK_URL_PARAM } from "./docdiff.js";
import { getQueryParam } from "./utils";

/**
 * File tree diff UI hosted inside the flyout v2 bar.
 *
 * Reuses the standalone element's markup and behaviour (file selector,
 * show-diff toggle, chunk navigation) and only swaps the positioning.
 */
export class FileTreeDiffPanelElement extends FileTreeDiffElement {
  static elementName = "readthedocs-filetreediff-panel";

  static styles = styleSheet;

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
}

customElements.define(
  FileTreeDiffPanelElement.elementName,
  FileTreeDiffPanelElement,
);
