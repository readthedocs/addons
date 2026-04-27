import { default as fetch } from "unfetch";
import { CSSResult, html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";

import styleSheet from "./proselint.css";
import proselintGeneralStyleSheet from "./proselint.document.css";

import {
  EVENT_READTHEDOCS_PROSELINT_SHOW,
  EVENT_READTHEDOCS_PROSELINT_HIDE,
  EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
} from "./events";
import { AddonBase, getQueryParam, docTool } from "./utils";

export const PROSELINT_URL_PARAM = "readthedocs-proselint";

const WARNING_CLASS = "proselint-warning";
const ELEMENT_FLAG_ATTR = "data-proselint-rendered";

/**
 * Find the index of a substring whose whitespace has been collapsed at any
 * stretch of horizontal whitespace.
 *
 * Browser ``textContent`` collapses whitespace differently from selectolax's
 * ``text(separator=" ")`` extraction on the backend. Building a regex that
 * tolerates ``\s+`` between every original word lets us re-locate the snippet
 * even when the runtime text shape differs slightly from what proselint saw.
 */
function findSnippetRange(text, snippet) {
  if (!snippet) {
    return null;
  }
  const exact = text.indexOf(snippet);
  if (exact >= 0) {
    return [exact, exact + snippet.length];
  }
  const escaped = snippet
    .trim()
    .split(/\s+/)
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("\\s+");
  const re = new RegExp(escaped);
  const match = re.exec(text);
  if (match) {
    return [match.index, match.index + match[0].length];
  }
  return null;
}

/**
 * Wrap the character range ``[start, end)`` of ``element``'s descendant text
 * nodes with a tooltip span carrying the proselint message.
 *
 * We walk text nodes in document order, keep a running offset, and split
 * nodes when the warning span crosses a text-node boundary. The wrapper span
 * gets a ``title`` attribute so hovering shows the proselint message.
 */
function wrapRangeInElement(element, start, end, warning) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  let offset = 0;
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    // Skip text nodes that already live inside one of our wrappers — we
    // never want to nest highlights.
    if (
      node.parentElement &&
      node.parentElement.classList &&
      node.parentElement.classList.contains(WARNING_CLASS)
    ) {
      continue;
    }
    nodes.push(node);
  }

  for (const node of nodes) {
    const text = node.nodeValue;
    const nodeStart = offset;
    const nodeEnd = offset + text.length;
    offset = nodeEnd;

    if (nodeEnd <= start) {
      continue;
    }
    if (nodeStart >= end) {
      break;
    }

    const localStart = Math.max(0, start - nodeStart);
    const localEnd = Math.min(text.length, end - nodeStart);
    if (localStart >= localEnd) {
      continue;
    }

    const before = text.slice(0, localStart);
    const middle = text.slice(localStart, localEnd);
    const after = text.slice(localEnd);

    const span = document.createElement("span");
    span.className = `${WARNING_CLASS} ${WARNING_CLASS}-${warning.severity}`;
    span.title = warning.replacement
      ? `${warning.message} → ${warning.replacement}`
      : warning.message;
    span.dataset.proselintCheck = warning.check;
    span.textContent = middle;

    const fragment = document.createDocumentFragment();
    if (before) {
      fragment.appendChild(document.createTextNode(before));
    }
    fragment.appendChild(span);
    if (after) {
      fragment.appendChild(document.createTextNode(after));
    }
    node.replaceWith(fragment);
  }
}

export class ProselintElement extends LitElement {
  static elementName = "readthedocs-proselint";

  static properties = {
    config: { state: true },
    enabled: { type: Boolean },
    summary: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.config = null;
    this.enabled = false;
    this.summary = null;
    this.rootSelector = null;
    this.cachedReport = null;
  }

  loadConfig(config) {
    if (!ProselintAddon.isEnabled(config)) {
      return;
    }
    this.config = config;
    this.rootSelector =
      objectPath.get(this.config, "addons.options.root_selector") ||
      docTool.getRootSelector();

    // Inject the document-level styles so the wrappers we add to the page
    // (which live in the light DOM) actually render with the warning colors.
    let sheet = proselintGeneralStyleSheet;
    if (sheet instanceof CSSResult) {
      sheet = sheet.styleSheet;
    }
    if (!document.adoptedStyleSheets.includes(sheet)) {
      document.adoptedStyleSheets.push(sheet);
    }

    if (getQueryParam(PROSELINT_URL_PARAM) === "true") {
      this.enableProselint();
    }
  }

  render() {
    if (!this.enabled || !this.summary) {
      return nothing;
    }
    return html`
      <div class="proselint-toggle" @click=${this._handleHideClick}>
        <span class="proselint-badge"
          >${this.summary.errors + this.summary.warnings} proselint
          ${this.summary.errors + this.summary.warnings === 1
            ? "issue"
            : "issues"}</span
        >
        <button type="button" aria-label="Hide proselint warnings">
          ×
        </button>
      </div>
    `;
  }

  fetchReport() {
    if (this.cachedReport !== null) {
      return Promise.resolve(this.cachedReport);
    }
    const url = objectPath.get(this.config, "addons.proselint.url");
    if (!url) {
      return Promise.reject(new Error("No proselint report URL in config."));
    }
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch proselint report (${response.status})`);
      }
      return response.json();
    });
  }

  applyReport(report) {
    this.cachedReport = report;
    const root = document.querySelector(this.rootSelector);
    if (!root) {
      console.warn("Proselint: root selector not found", this.rootSelector);
      return;
    }

    const path = window.location.pathname;
    const fileEntry = this._lookupFileEntry(report, path);
    if (!fileEntry || !fileEntry.warnings) {
      this.summary = { errors: 0, warnings: 0 };
      return;
    }

    let errors = 0;
    let warnings = 0;
    for (const warning of fileEntry.warnings) {
      const target =
        root.querySelector(warning.selector) ||
        document.querySelector(warning.selector);
      if (!target) {
        continue;
      }
      // Skip elements we've already processed in this session so a re-render
      // doesn't double-wrap the same span.
      if (target.getAttribute(ELEMENT_FLAG_ATTR)) {
        continue;
      }

      const text = target.textContent;
      const range = findSnippetRange(text, warning.snippet);
      if (!range) {
        continue;
      }
      wrapRangeInElement(target, range[0], range[1], warning);

      if (warning.severity === "error") {
        errors += 1;
      } else {
        warnings += 1;
      }
    }

    // Mark the elements after the loop so multiple warnings on the same
    // element each get applied.
    for (const warning of fileEntry.warnings) {
      const target = root.querySelector(warning.selector);
      if (target) {
        target.setAttribute(ELEMENT_FLAG_ATTR, "true");
      }
    }

    this.summary = { errors, warnings };
    document.dispatchEvent(new CustomEvent(EVENT_READTHEDOCS_ROOT_DOM_CHANGED));
  }

  _lookupFileEntry(report, path) {
    if (!report || !report.files) {
      return null;
    }
    // Try the path as-is, then with leading slash stripped, then as
    // ``index.html``-suffixed since the backend keys by storage path which
    // always includes the filename.
    const candidates = [
      path,
      path.replace(/^\/+/, ""),
      `${path.replace(/\/+$/, "")}/index.html`.replace(/^\/+/, ""),
      `${path.replace(/\/+$/, "")}.html`.replace(/^\/+/, ""),
    ];
    for (const key of candidates) {
      if (report.files[key]) {
        return report.files[key];
      }
    }
    return null;
  }

  enableProselint() {
    if (this.enabled) {
      return null;
    }
    this.enabled = true;

    const url = new URL(window.location.href);
    url.searchParams.set(PROSELINT_URL_PARAM, "true");
    window.history.replaceState({}, "", url);

    return this.fetchReport()
      .then((report) => this.applyReport(report))
      .catch((err) => console.error(err));
  }

  disableProselint() {
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    this.summary = null;

    const url = new URL(window.location.href);
    url.searchParams.delete(PROSELINT_URL_PARAM);
    window.history.replaceState({}, "", url);

    // Unwrap every span we previously inserted so the page returns to its
    // original state without needing a full re-fetch of the embed API.
    for (const span of document.querySelectorAll(`.${WARNING_CLASS}`)) {
      const parent = span.parentNode;
      if (!parent) continue;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    }
    for (const el of document.querySelectorAll(`[${ELEMENT_FLAG_ATTR}]`)) {
      el.removeAttribute(ELEMENT_FLAG_ATTR);
    }

    document.dispatchEvent(new CustomEvent(EVENT_READTHEDOCS_ROOT_DOM_CHANGED));
  }

  _handleShowProselint = () => {
    this.enableProselint();
  };

  _handleHideProselint = () => {
    this.disableProselint();
  };

  _handleHideClick = (e) => {
    e.preventDefault();
    this.disableProselint();
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      EVENT_READTHEDOCS_PROSELINT_SHOW,
      this._handleShowProselint,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_PROSELINT_HIDE,
      this._handleHideProselint,
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_PROSELINT_SHOW,
      this._handleShowProselint,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_PROSELINT_HIDE,
      this._handleHideProselint,
    );
    super.disconnectedCallback();
  }
}

export class ProselintAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.proselint.json";
  static addonEnabledPath = "addons.proselint.enabled";
  static addonName = "Proselint";
  static elementClass = ProselintElement;
}

customElements.define(ProselintElement.elementName, ProselintElement);
