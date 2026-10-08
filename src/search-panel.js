import { default as fetch } from "unfetch";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faBarsStaggered,
  faCircleNotch,
  faCircleXmark,
  faClockRotateLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import styleSheet from "./search-panel.css";
import { SearchAddon } from "./search";
import { debounce, CLIENT_VERSION, IS_TESTING } from "./utils";

const API_ENDPOINT = "/_/api/v3/search/";
const FETCH_RESULTS_DELAY = IS_TESTING ? 0 : 250;
const MIN_CHARACTERS_QUERY = 3;
const MAX_SUBSTRING_LIMIT = 80;
const RECENT_SEARCHES_LIMIT = 20;
// The bar is compact: list only the newest few, the modal shows them all.
const RECENT_SEARCHES_SHOWN = 5;
const SYNTAX_DOCS_URL =
  "https://docs.readthedocs.io/page/server-side-search/syntax.html";

/**
 * Search UI hosted inside the flyout v2 bar.
 *
 * Same features as the search modal (filters, recent searches, Up/Down
 * navigation, external project badges) rendered inline under the input.
 * Recent searches share the modal's localStorage entry, so switching between
 * the two UIs keeps the history.
 */
export class SearchPanelElement extends LitElement {
  static elementName = "readthedocs-search-panel";

  static properties = {
    config: { state: true },
    results: { state: true },
    query: { state: true },
    filters: { state: true },
    inputIcon: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    library.add(faBarsStaggered);
    library.add(faCircleNotch);
    library.add(faCircleXmark);
    library.add(faClockRotateLeft);
    library.add(faMagnifyingGlass);

    this.config = null;
    this.results = null;
    this.query = "";
    this.filters = [];
    this.currentQueryRequest = null;

    this._iconSpinner = icon(faCircleNotch, {
      title: "Searching",
      classes: ["fa-spin"],
    });
    this._iconMagnifier = icon(faMagnifyingGlass, { title: "Search docs" });
    this._iconResult = icon(faBarsStaggered, { title: "Result" });
    this._iconRecent = icon(faClockRotateLeft, { title: "Recent search" });
    this._iconRemove = icon(faCircleXmark, { title: "Remove" });
    this.inputIcon = this._iconMagnifier;
  }

  willUpdate(changedProperties) {
    if (changedProperties.has("config") && this.config) {
      this.filters = (this.config.addons.search.filters || []).map(
        ([name, value, checked]) => ({
          name,
          value,
          checked: Boolean(checked),
        }),
      );
    }
  }

  render() {
    if (!this.config) {
      return nothing;
    }

    const content =
      this.results ||
      (this.query.length < MIN_CHARACTERS_QUERY
        ? this.renderRecentSearches()
        : nothing);

    return html`
      <div class="search-panel">
        <form @submit=${this._onSubmit}>
          <label>${this.inputIcon.node[0]}</label>
          <input
            type="search"
            placeholder="Search docs"
            autocomplete="off"
            @input=${this._onInput}
            @keydown=${this._onKeydown}
          />
        </form>
        ${
          content === nothing
            ? nothing
            : html`<div class="results">
                ${this.renderFilters()}
                <div class="hits">${content}</div>
              </div>`
        }
      </div>
    `;
  }

  renderFilters() {
    if (!this.filters.length) {
      return nothing;
    }
    return html`
      <div class="filters">
        ${this.filters.map(
          (filter, index) => html`
            <label>
              <input
                type="checkbox"
                .checked=${filter.checked}
                @change=${(e) => this._onFilterChange(index, e.target.checked)}
              />
              ${filter.name}
            </label>
          `,
        )}
      </div>
    `;
  }

  renderResults(data) {
    return html`
      ${data.results.map(
        (result) => html`
          <div class="hit-block">
            ${this.renderHitHeading(result, this._iconResult)}
            ${result.blocks.map((block) => this.renderHit(block, result))}
          </div>
        `,
      )}
    `;
  }

  renderRecentSearches() {
    const recent = this._getRecentSearches()
      .slice(-RECENT_SEARCHES_SHOWN)
      .reverse();
    if (!recent.length) {
      return nothing;
    }
    return html`
      <p class="results-title">Recent</p>
      ${recent.map(
        (entry) => html`
          <div class="hit-block">
            <div class="hit-block-row">
              ${this.renderHitHeading(entry.result, this._iconRecent)}
              <button
                class="remove"
                title="Remove from recent searches"
                @click=${() => this._removeRecentSearch(entry)}
              >
                ${this._iconRemove.node[0].cloneNode(true)}
              </button>
            </div>
            ${this.renderHit(entry.block, entry.result)}
          </div>
        `,
      )}
    `;
  }

  renderHitHeading(result, headingIcon) {
    return html`
      <a class="hit-block-heading" href="${this._getResultLink(result)}">
        <i>${headingIcon.node[0].cloneNode(true)}</i>
        <h2>${result.title}</h2>
        ${this.renderProjectBadge(result)}
      </a>
    `;
  }

  renderHit(block, result) {
    let title = block.title;
    if (block.highlights?.title?.length) {
      title = unsafeHTML(block.highlights.title[0]);
    }

    let content = block.content.substring(0, MAX_SUBSTRING_LIMIT);
    if (block.highlights?.content?.length) {
      content = unsafeHTML(
        block.highlights.content[0].substring(0, MAX_SUBSTRING_LIMIT),
      );
    }

    return html`
      <a
        class="hit-detail"
        href="${this._getResultLink(result)}#${block.id}"
        @click=${() => this._storeRecentSearch(block, result)}
        @mouseenter=${this._clearActive}
      >
        <p class="hit-title">${title}</p>
        <p class="hit-content">${content}</p>
      </a>
    `;
  }

  renderProjectBadge(result) {
    if (result.project.slug === this.config.projects.current.slug) {
      return nothing;
    }
    return html`<span class="project-badge"
      >${result.project.alias || result.project.slug}</span
    >`;
  }

  renderNoResults() {
    return html`
      <div class="no-results">
        <p>No results for <strong>"${this.query}"</strong></p>
        <p class="hint">
          Try <code>"exact phrase"</code>, <code>prefix*</code> or
          <code>fuzzy~2</code>.
          <a href="${SYNTAX_DOCS_URL}" target="_blank">Query syntax</a>
        </p>
      </div>
    `;
  }

  firstUpdated() {
    this.focusInput();
  }

  focusInput() {
    this.renderRoot.querySelector("input[type=search]")?.focus();
  }

  // ---- Keyboard ----

  _onSubmit = (e) => {
    e.preventDefault();
    // Enter follows the highlighted hit, or the first one.
    const hit =
      this.renderRoot.querySelector("a.hit-detail.active") ||
      this.renderRoot.querySelector("a.hit-detail");
    hit?.click();
  };

  _onKeydown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      this._moveActive(e.key === "ArrowDown" ? 1 : -1);
    }
  };

  _moveActive(step) {
    const hits = [...this.renderRoot.querySelectorAll("a.hit-detail")];
    if (!hits.length) {
      return;
    }
    const current = hits.findIndex((hit) => hit.classList.contains("active"));
    const next =
      current === -1
        ? step > 0
          ? 0
          : hits.length - 1
        : (current + step + hits.length) % hits.length;
    this._clearActive();
    hits[next].classList.add("active");
    hits[next].scrollIntoView({ block: "nearest" });
  }

  _clearActive = () => {
    for (const hit of this.renderRoot.querySelectorAll("a.hit-detail.active")) {
      hit.classList.remove("active");
    }
  };

  // ---- Querying ----

  _onInput = () => {
    this.query = this.renderRoot.querySelector("input[type=search]").value;
    this._search();
  };

  _onFilterChange(index, checked) {
    this.filters = this.filters.map((filter, i) =>
      i === index ? { ...filter, checked } : filter,
    );
    this._search();
  }

  _getFilterQuery() {
    const active = this.filters
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);
    return active.join(" ") || this.config.addons.search.default_filter || "";
  }

  _search() {
    if (this.currentQueryRequest) {
      this.currentQueryRequest.cancel();
      this.currentQueryRequest = null;
    }
    if (this.query.length < MIN_CHARACTERS_QUERY) {
      this.results = null;
      this.inputIcon = this._iconMagnifier;
      return;
    }
    const filter = this._getFilterQuery();
    const fullQuery = filter ? `${filter} ${this.query}` : this.query;
    this.currentQueryRequest = this._fetchResults(fullQuery);
    this.currentQueryRequest();
  }

  _fetchResults(query) {
    this.inputIcon = this._iconSpinner;

    const doFetch = () => {
      let url =
        API_ENDPOINT + "?" + new URLSearchParams({ q: query }).toString();

      // Retrieve a static JSON file when working in development mode
      if (!IS_TESTING && window.location.href.startsWith("http://localhost")) {
        url = "/_/readthedocs-search.json";
      }

      fetch(url, {
        method: "GET",
        headers: { "X-RTD-Hosting-Integrations-Version": CLIENT_VERSION },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          this.results = data.results.length
            ? this.renderResults(data)
            : this.renderNoResults();
          this.inputIcon = this._iconMagnifier;
        })
        .catch((error) => {
          console.error(error);
          this.results = null;
          this.inputIcon = this._iconMagnifier;
        });
    };

    return debounce(doFetch, FETCH_RESULTS_DELAY);
  }

  _getResultLink(result) {
    if (result.project.slug !== this.config.projects.current.slug) {
      return `${result.domain}${result.path}`;
    }
    return result.path;
  }

  // ---- Recent searches (shared with the search modal) ----

  _getRecentSearchesKey() {
    const { slug, language } = this.config.projects.current;
    return `${slug}-${language.code}-${this.config.versions.current.slug}-recent-searches`;
  }

  _getRecentSearches() {
    return SearchAddon.getLocalStorage()[this._getRecentSearchesKey()] || [];
  }

  _setRecentSearches(entries) {
    SearchAddon.setLocalStorage({ [this._getRecentSearchesKey()]: entries });
  }

  _isSameHit(a, b) {
    return (
      a.result.domain === b.result.domain &&
      a.result.path === b.result.path &&
      a.block.id === b.block.id
    );
  }

  _storeRecentSearch(block, result) {
    const entry = { block, result };
    const entries = this._getRecentSearches()
      .filter((stored) => !this._isSameHit(stored, entry))
      .concat(entry)
      .slice(-RECENT_SEARCHES_LIMIT);
    this._setRecentSearches(entries);
  }

  _removeRecentSearch(entry) {
    this._setRecentSearches(
      this._getRecentSearches().filter(
        (stored) => !this._isSameHit(stored, entry),
      ),
    );
    this.requestUpdate();
  }
}

customElements.define(SearchPanelElement.elementName, SearchPanelElement);
