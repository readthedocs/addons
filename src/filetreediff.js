import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";
import styleSheet from "./filetreediff.css";
import { DOCDIFF_URL_PARAM, DOCDIFF_CHUNK_URL_PARAM } from "./docdiff.js";
import {
  EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
} from "./events";
import { getQueryParam } from "./utils";
import { AddonBase } from "./utils";
import { addUtmParameters } from "./utils";

const SCROLL_OFFSET_Y = 0.1;

export class FileTreeDiffElement extends LitElement {
  static elementName = "readthedocs-filetreediff";

  static properties = {
    config: { state: true },
    docDiffEnabled: { state: true },
    chunks: { state: true },
    chunkIndex: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.config = null;
    this.docDiffEnabled = false;

    this.chunkIndex = 1;
    this.chunks = [];

    library.add(faArrowDown);
    library.add(faArrowUp);

    this.iconArrowUp = icon(faArrowUp, {
      classes: ["icon"],
    });
    this.iconArrowDown = icon(faArrowDown, {
      classes: ["icon"],
    });
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

  renderArrows() {
    if (!this.docDiffEnabled) {
      return nothing;
    }
    return html`
      <span class="chunks"
        >${this.chunks.length ? this.chunkIndex : 0} of
        ${this.chunks.length || 0}</span
      >
      <span @click=${this.previousChunk}> ${this.iconArrowUp.node[0]} </span>
      <span @click=${this.nextChunk}> ${this.iconArrowDown.node[0]} </span>
    `;
  }

  renderDocDiff() {
    if (objectPath.get(this.config, "addons.doc_diff.enabled", false)) {
      return html`
        <label>
          <input
            type="checkbox"
            .checked=${this.docDiffEnabled}
            @change=${this.handleToggleDiff}
          />
          Show diff
        </label>
        ${this.renderArrows()}
      `;
    }
    return nothing;
  }

  previousChunk() {
    if (!this.chunks.length) {
      return;
    }
    if (this.chunkIndex === 1) {
      this.chunkIndex = 1;
    } else if (this.chunkIndex != 1) {
      this.chunkIndex -= 1;
    }

    const chunk = this.chunks[this.chunkIndex - 1];
    this.scrollToChunk(chunk);
  }

  nextChunk() {
    if (!this.chunks.length) {
      return;
    }
    if (this.chunkIndex != this.chunks.length) {
      this.chunkIndex += 1;
    }

    const chunk = this.chunks[this.chunkIndex - 1];
    this.scrollToChunk(chunk);
  }

  scrollToChunk(chunk) {
    for (const elem of document.querySelectorAll(".doc-diff-chunk-selected")) {
      elem.classList.remove("doc-diff-chunk-selected");
    }

    chunk.classList.add("doc-diff-chunk-selected");

    const url = new URL(window.location.href);
    url.searchParams.set(DOCDIFF_CHUNK_URL_PARAM, this.chunkIndex);
    window.history.replaceState({}, "", url);

    globalThis.scrollTo({
      // Calculate the position of the current selectect chunk and scroll to its
      // position minus 25% of the current window. This is to give the chunk
      // some extra context.
      top:
        window.scrollY +
        chunk.getBoundingClientRect().top -
        window.innerHeight * 0.25,
      behavior: "smooth",
    });
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
      <div>
        <div>
          ${this.renderDocDiff()}
          <select @change=${this.handleFileChange}>
            <option value="" ?selected=${!hasCurrentFile} disabled>
              Files changed in #${this.config.versions.current.slug}
            </option>
            ${renderSection(diffData.added, "Added")}
            ${renderSection(diffData.modified, "Changed")}
            <optgroup label="Links">
              <option
                value="${addUtmParameters(
                  this.config.builds.current.urls.build,
                  "notification",
                )}"
              >
                Go to build log
              </option>
              <option value="${this.config.versions.current.urls.vcs}">
                Go to pull request #${this.config.versions.current.slug}
              </option>
              <option
                value="https://docs.readthedocs.com/platform/stable/visual-diff.html"
              >
                Go to Visual Diff documentation
              </option>
            </optgroup>
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

  getChunks() {
    const chunks = document.querySelectorAll(
      ".doc-diff-added, .doc-diff-removed",
    );
    // These are the nodes we consider a "section for a chunk". The classes
    // `.doc-diff-*` are added to the _word_ that changed, but we want to
    // highlight the parent element of it, being a more important section of the
    // page (i.e `sectionNodes`)
    //
    // Examples:
    //
    //   - If the class is added to a `span/ins/del` (word/sentence
    //     deleted/added inside a paragraph), we will return its parent `p`.
    //   - If the class is added to a `section`, we will return the same
    //     `section` element.
    //   - If the class is added to a `li`, we will return the same `ul`/`ol`
    //     element.
    const sectionNodes = [
      "section",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "dl",
      "ul",
      "ol",
      "table",
      "pre",
    ];

    // Create a set to de-duplicate the nodes
    const chunkParents = new Set();

    // Find the first parent we consider a section node
    for (const chunk of chunks) {
      let parent = chunk.parentElement;
      // Find the parent up to 10 levels maximum
      for (let i = 0; i < 10; i++) {
        // If we don't have a parent, we stop iterating for this chunk
        if (!parent) {
          break;
        }

        if (sectionNodes.includes(parent.tagName.toLowerCase())) {
          chunkParents.add(parent);
          break;
        }

        // Continue checking with the parent of the parent
        parent = parent.parentElement;
      }
    }

    // Convert the de-duplicated Set into an Array
    return Array.from(chunkParents);
  }

  _handleRootDOMChanged = (event) => {
    // Update the list of chunks when the DOM changes
    this.chunks = this.getChunks();

    // Limit the `?readthedocs-diff-chunk` number to be between 0 and `this.chunks.length`
    this.chunkIndex = Math.min(
      this.chunks.length,
      Math.max(0, parseInt(getQueryParam(DOCDIFF_CHUNK_URL_PARAM))),
    );

    if (!this.chunkIndex) {
      this.chunkIndex = 1;
    }
    if (this.chunks.length) {
      this.scrollToChunk(this.chunks[this.chunkIndex - 1]);
    }
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
    document.addEventListener(
      EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
      this._handleRootDOMChanged,
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
    document.removeEventListener(
      EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
      this._handleRootDOMChanged,
    );
    super.disconnectedCallback();
  }
}

/**
 * File Tree Diff addon
 *
 * This addon shows a small UI element at the top-right with a selector listing
 * all the "Added" and "Modified" files compared to the base version
 * (configurable from project's setting in the WebUI).
 *
 * @param {Object} config - Addon configuration object
 */
export class FileTreeDiffAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.filetreediff.json";
  static addonEnabledPath = "addons.filetreediff.enabled";
  static addonName = "File Tree Diff";
  static elementClass = FileTreeDiffElement;

  static isEnabled(config, httpStatus) {
    return (
      // The order is important since we don't even want to run the data
      // validation if the version is not external.
      // We have to use `objectPath` here becase we haven't validated the data yet.
      (objectPath.get(config, "versions.current.type") === "external" &&
        super.isEnabled(config, httpStatus)) ||
      window.location.host.endsWith(".devthedocs.org") ||
      window.location.host.endsWith(".devthedocs.com")
    );
  }
}

customElements.define(FileTreeDiffElement.elementName, FileTreeDiffElement);
