import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faCircleNotch,
  faBinoculars,
} from "@fortawesome/free-solid-svg-icons";
import READTHEDOCS_LOGO from "./images/logo-wordmark-dark.svg";

import styleSheet from "./search.css";
import { domReady, CLIENT_VERSION, AddonBase, debounce } from "./utils";
import {
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_SEARCH_HIDE,
} from "./events";
import { html, nothing, render, LitElement } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { classMap } from "lit/directives/class-map.js";

// TODO: play more with the substring limit.
// The idea is to try to fit most of the results in one line.
const MAX_SUBSTRING_LIMIT = 80;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const MIN_CHARACTERS_QUERY = 3;
const API_ENDPOINT = "/_/api/v3/search/";

// TODO: generate Domain results
// TODO: make the spinner to spin

export class SearchElement extends LitElement {
  static elementName = "readthedocs-search";

  static properties = {
    config: {
      state: true,
    },
    filters: { state: true },
    show: { state: true },
    inputIcon: { state: true },
    // NOTE: does it make sense to handle the query as a property that changes
    // on keydown?
    // query: { state: true },
    results: {
      state: true,
    },
    cssFormFocusClasses: { state: true },
    triggerKeycode: { type: Number, attribute: "trigger-keycode" },
    triggerSelector: { type: String, attribute: "trigger-selector" },
    triggerEvent: { type: String, attribute: "trigger-event" },
  };

  static styles = styleSheet;

  constructor() {
    super();

    library.add(faMagnifyingGlass);
    library.add(faCircleNotch);
    library.add(faBinoculars);

    // TODO: expand the default supported styles
    this.className = this.className || "raised floating";

    this.config = {};
    this.show = false;
    this.cssFormFocusClasses = {};
    this.results = null;
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search docs" });
    this.currentQueryRequest = null;
    this.defaultFilter = null;
    this.filters = [];
    this.triggerKeycode = 191;
    this.triggerSelector = null;
    this.triggerEvent = "focusin";
  }

  loadConfig(config) {
    this.config = config;

    if (config.addons.search) {
      this.defaultFilter = {
        name: "Default filter",
        value: config.addons.search.default_filter,
      };

      let userFilters = [];
      for (const filter of config.addons.search.filters) {
        userFilters.push({
          name: filter[0],
          value: filter[1],
        });
      }
      this.filters = userFilters;
    }
  }

  render() {
    // Don't render anything if the addon is disabled or the configuration is empty
    if (SearchAddon.isEnabled(this.config)) {
      return this.renderSearchModal();
    }
    return nothing;
  }

  renderSearchModal() {
    return html`
      <div ?hidden=${!this.show} role="search">
        <div @click=${this.closeModal} class="background"></div>
        <div class="content">
          <form class=${classMap(this.cssFormFocusClasses)}>
            <label>${this.inputIcon.node[0]}</label>
            <input
              @input=${this.queryInput}
              @keydown=${this.selectResultKeyboard}
              @focusin=${this.queryInputFocus}
              @focusout=${this.queryInputFocus}
              placeholder="Search docs"
              type="search"
              autocomplete="off"
            />
          </form>
          <div class="filters">${this.renderFilters()}</div>
          <div class="results">${this.results}</div>
          <div class="footer">
            <ul class="help">
              <li><code>Enter</code> to select</li>
              <li><code>Up</code>/<code>Down</code> to navigate</li>
              <li><code>Esc</code> to close</li>
            </ul>
            <div class="credits">
              Search powered by
              <a href="https://about.readthedocs.com/">
                <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderNoResultsFound() {
    // TODO: change the icon to a slash-ed magnifier or similar
    const binoculars = icon(faBinoculars, {
      title: "Not found",
    });
    const query = this.getUserQuery();
    this.results = html`
      <div class="no-results">
        ${binoculars.node[0]}
        <p class="title">No results for <strong>"${query}"</strong></p>
        <div class="tips">
          <p>Try using the following special queries:</p>
          <ul>
            <li>
              <strong>Exact phrase</strong>: use double quotes to match a whole
              pharse: <code>"adding a subproject"</code>.
            </li>
            <li>
              <strong>Prefix</strong>: use an asterisk at the end of any term to
              prefix a result: <code>environ*</code>.
            </li>
            <li>
              <strong>Fuzziness</strong>: add a tilde and a number to indicate
              the fuzziness of the word: <code>getter~2</code>.
            </li>
          </ul>
        </div>

        <div class="footer">
          <p>
            Learn more about the query syntax supported in our
            <a
              target="_blank"
              href="https://docs.readthedocs.io/page/server-side-search/syntax.html"
              >documentation</a
            >.
          </p>
        </div>
      </div>
    `;
  }

  renderFilters() {
    // https://lit.dev/docs/components/events/#listening-to-events-fired-from-repeated-templates
    // https://lit.dev/docs/templates/lists/#repeating-templates-with-map
    return html`
      <li class="title">Filters</li>
      ${this.filters.map(
        (filter, index) => html`
          <li>
            <input
              @click=${this.filterClicked}
              id="filter-${index}"
              type="checkbox"
              value="${filter.value}"
            />
            <label for="filter-${index}"> ${filter.name} </label>
          </li>
        `
      )}
    `;
  }

  renderResults(data) {
    // JSON example from our production API
    // https://docs.readthedocs.io/_/api/v3/search/?q=project%3Adocs%2Fstable+build+customization
    this.results = html`
      <div class="hit">
        ${data.results.map(
          (result, rindex) =>
            html` <a href="${result.path}">
                <h2>${result.title} ${this.renderExternalProject(result)}</h2>
              </a>

              ${result.blocks.map(
                (block, bindex) =>
                  html`${this.renderBlockResult(
                    block,
                    rindex + bindex + 1,
                    result
                  )}`
              )}`
        )}
      </div>
    `;
  }

  renderBlockResult(block, index, result) {
    // TODO: distinguish between `block.type` (section or domain)

    // TODO: take a substring of the title as well in case it's too long?
    let title = block.title;
    if (block.highlights.title.length) {
      title = block.highlights.title[0];
    }

    let content = block.content.substring(0, MAX_SUBSTRING_LIMIT) + " ...";
    if (block.highlights.content.length) {
      // TODO: with this logic it could happen the highlighted part is outside of the substring
      content = block.highlights.content[0];
      if (content.length > MAX_SUBSTRING_LIMIT) {
        content =
          "... " +
          block.highlights.content[0].substring(0, MAX_SUBSTRING_LIMIT) +
          " ...";
      }
    }

    return html`
      <a
        @mouseenter=${this.mouseenterResultHit}
        class="hit"
        href="${result.path}#${block.id}"
      >
        <div id="hit-${index}">
          <p class="hit subheading">${unsafeHTML(title)}</p>
          <p class="hit content">${unsafeHTML(content)}</p>
        </div>
      </a>
    `;
  }

  renderExternalProject(result) {
    if (result.project.slug !== this.config.projects.current.slug) {
      return html`
        <small class="subtitle"> (from project ${result.project.slug}) </small>
      `;
    }
    return nothing;
  }

  closeModal(e) {
    this.show = false;
  }

  showModal(e) {
    this.show = true;
  }

  updated(changedProperties) {
    // https://lit.dev/docs/components/shadow-dom/
    const input = this.shadowRoot.querySelector("input[type=search]");
    if (input === undefined) {
      input.focus();
    }
  }

  queryInputFocus(e) {
    if (e.type === "focusin") {
      this.cssFormFocusClasses = {
        focus: true,
      };
    } else if (e.type === "focusout") {
      this.cssFormFocusClasses = {
        focus: false,
      };
    }
  }

  selectNextResult(forward) {
    const all = this.renderRoot.querySelectorAll("a.hit");
    let selected = this.renderRoot.querySelector("a.hit.active");
    if (selected !== null) {
      selected = selected.firstElementChild;
    }

    let nextId = 1;
    let lastId = 1;

    // Find the `lastId`
    if (all.length > 0) {
      const last = all[all.length - 1].firstElementChild;
      if (last.id !== null) {
        const match = last.id.match(/\d+/);
        if (match !== null) {
          lastId = Number(match[0]);
        }
      }
    }

    // Find the `nextId`
    if (selected !== null && selected.id !== null) {
      let match = selected.id.match(/\d+/);
      if (match !== null) {
        nextId = Number(match[0]);
        nextId += forward ? 1 : -1;
      }
    }

    // Cycle to the first or last result.
    if (nextId <= 0) {
      nextId = lastId;
    } else if (nextId > lastId) {
      nextId = 1;
    }

    // Remove all active elements
    for (const active of this.renderRoot.querySelectorAll("a.hit.active")) {
      active.classList.remove("active");
    }

    // Add class for active element and scroll to it
    const newActive = this.renderRoot.querySelector(
      `#hit-${nextId}`
    ).parentNode;
    newActive.classList.add("active");
    newActive.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  selectResultKeyboard(e) {
    // if "ArrowDown is pressed"
    if (e.keyCode === 40) {
      e.preventDefault();
      this.selectNextResult(true);
    }

    // if "ArrowUp" is pressed.
    if (e.keyCode === 38) {
      e.preventDefault();
      this.selectNextResult(false);
    }

    // if "Enter" key is pressed.
    if (e.keyCode === 13) {
      e.preventDefault();
      const selected = this.renderRoot.querySelector("a.hit.active");
      // if an item is selected, then redirect to its link
      if (selected !== null) {
        window.location.href = selected.href;
      }
    }
  }

  getUserQuery() {
    return this.renderRoot.querySelector("input[type=search]").value;
  }

  showSpinIcon() {
    if (this.inputIcon.iconName !== "circle-notch") {
      this.inputIcon = icon(faCircleNotch, {
        title: "Spinner",
        classes: ["spinner", "fa-spin"],
      });
    }
  }

  showMagnifierIcon() {
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search" });
  }

  removeAllResults() {
    this.results = null;
  }

  fetchResults(query) {
    this.removeAllResults();
    this.showSpinIcon();

    let deboucedFetchResults = () => {
      const url =
        API_ENDPOINT + "?" + new URLSearchParams({ q: query }).toString();

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
          if (data.results.length > 0) {
            this.renderResults(data);
          } else {
            this.renderNoResultsFound();
          }
          this.showMagnifierIcon();
        })
        .catch((error) => {
          // TODO: create a page similar to noResultsFound when there is an
          // error hitting the API.
          console.error(error);
          this.removeAllResults();
        });
    };

    return debounce(deboucedFetchResults, FETCH_RESULTS_DELAY);
  }

  getCurrentFilter() {
    let filters = [];
    const filterElements = this.renderRoot.querySelectorAll(
      ".filters input[type=checkbox]:checked"
    );
    for (const e of filterElements) {
      filters.push(e.value);
    }
    return filters.join(" ") || this.defaultFilter.value;
  }

  queryInput(e) {
    let query = this.getUserQuery();
    if (query.length >= MIN_CHARACTERS_QUERY) {
      if (this.currentQueryRequest !== null) {
        // cancel previous ajax request.
        this.currentQueryRequest.cancel();
      }
      const filter = this.getCurrentFilter();
      query = filter + " " + query;
      this.currentQueryRequest = this.fetchResults(query);
      this.currentQueryRequest();
    } else {
      // if the last request returns the results,
      // the suggestions list is generated even if there
      // is no query. To prevent that, this function
      // is debounced here.
      let func = () => {
        this.removeAllResults();
      };
      debounce(func, CLEAR_RESULTS_DELAY)();
    }
  }

  filterClicked(e) {
    this.queryInput();
  }

  mouseenterResultHit(e) {
    const activeElements = this.renderRoot.querySelectorAll("a.hit.active");
    for (const element of activeElements) {
      element.classList.remove("active");
    }
  }

  _handleCloseModal = (e) => {
    e.preventDefault();
    this.closeModal();
  };

  _handleShowModal = (e) => {
    e.preventDefault();
    this.showModal();
  };

  connectedCallback() {
    super.connectedCallback();

    // The READTHEDOCS_SEARCH_SHOW event is triggered by "readthedocs-flyout" input
    document.addEventListener(
      EVENT_READTHEDOCS_SEARCH_SHOW,
      this._handleShowModal
    );
    document.addEventListener(
      EVENT_READTHEDOCS_SEARCH_HIDE,
      this._handleCloseModal
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_SEARCH_SHOW,
      this._handleShowModal
    );

    document.removeEventListener(
      EVENT_READTHEDOCS_SEARCH_HIDE,
      this._handleCloseModal
    );

    super.disconnectedCallback();
  }
}

export class SearchAddon extends AddonBase {
  constructor(config) {
    super();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-search");
    if (!elems.length) {
      elems = [new SearchElement()];

      // We cannot use `render(elems[0], document.body)` because there is a race conditions between all the addons.
      // So, we append the web-component first and then request an update of it.
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.search.enabled === true;
  }
}

customElements.define("readthedocs-search", SearchElement);
