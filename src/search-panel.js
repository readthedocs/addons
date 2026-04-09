import { default as fetch } from "unfetch";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faCircleNotch,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import styleSheet from "./search-panel.css";
import { debounce, CLIENT_VERSION } from "./utils";

const API_ENDPOINT = "/_/api/v3/search/";
const FETCH_RESULTS_DELAY = 250;
const MIN_CHARACTERS_QUERY = 3;
const MAX_SUBSTRING_LIMIT = 80;

/**
 * Search panel element for inline display within the flyout.
 *
 * This is a simplified version of the full search modal (SearchElement),
 * designed to render search results inline as a panel in the flyout menu.
 * Future iterations can add keyboard navigation, recent searches, and filters.
 */
export class SearchPanelElement extends LitElement {
  static elementName = "readthedocs-search-panel";

  static properties = {
    config: { state: true },
    results: { state: true },
    inputIcon: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    library.add(faMagnifyingGlass);
    library.add(faCircleNotch);
    library.add(faBarsStaggered);

    this.config = null;
    this.results = null;
    this.currentQueryRequest = null;
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search docs" });
  }

  render() {
    if (!this.config) {
      return nothing;
    }

    return html`
      <div class="search-panel">
        <form @submit=${this._onSubmit}>
          <label>${this.inputIcon.node[0]}</label>
          <input
            type="search"
            placeholder="Search docs"
            autocomplete="off"
            @input=${this._onInput}
          />
        </form>
        <div class="results">
          ${this.results ||
          html`<p class="placeholder">
            Search this project's documentation
          </p>`}
        </div>
      </div>
    `;
  }

  updated() {
    const input = this.renderRoot.querySelector("input[type=search]");
    if (input && !input.value) {
      input.focus();
    }
  }

  _onSubmit(e) {
    e.preventDefault();
  }

  _getUserQuery() {
    const input = this.renderRoot.querySelector("input[type=search]");
    return input ? input.value : "";
  }

  _onInput(e) {
    const query = this._getUserQuery();
    if (query.length >= MIN_CHARACTERS_QUERY) {
      if (this.currentQueryRequest) {
        this.currentQueryRequest.cancel();
      }
      const filter = this.config.addons?.search?.default_filter || "";
      const fullQuery = filter ? `${filter} ${query}` : query;
      this.currentQueryRequest = this._fetchResults(fullQuery);
      this.currentQueryRequest();
    } else {
      this.results = null;
    }
  }

  _fetchResults(query) {
    this.inputIcon = icon(faCircleNotch, {
      title: "Searching",
      classes: ["fa-spin"],
    });

    const doFetch = () => {
      let url =
        API_ENDPOINT + "?" + new URLSearchParams({ q: query }).toString();

      // Retrieve a static JSON file when working in development mode
      if (window.location.href.startsWith("http://localhost")) {
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
          if (data.results.length > 0) {
            this._renderResults(data);
          } else {
            this._renderNoResults();
          }
          this.inputIcon = icon(faMagnifyingGlass, { title: "Search docs" });
        })
        .catch((error) => {
          console.error(error);
          this.results = null;
          this.inputIcon = icon(faMagnifyingGlass, { title: "Search docs" });
        });
    };

    return debounce(doFetch, FETCH_RESULTS_DELAY);
  }

  _renderResults(data) {
    const listIcon = icon(faBarsStaggered, {
      title: "Result",
      classes: ["header", "icon"],
    });

    this.results = html`
      <div class="hit">
        ${data.results.map(
          (result) => html`
            <div class="hit-block">
              <a
                class="hit-block-heading"
                href="${this._getResultLink(result)}"
              >
                <i>${listIcon.node[0]}</i>
                <h2>${result.title}</h2>
              </a>
              ${result.blocks.map(
                (block) => html`
                  <a
                    class="hit-detail"
                    href="${this._getResultLink(result)}#${block.id}"
                  >
                    <p class="hit-title">
                      ${block.highlights?.title?.length
                        ? unsafeHTML(block.highlights.title[0])
                        : block.title}
                    </p>
                    <p class="hit-content">
                      ${block.highlights?.content?.length
                        ? unsafeHTML(
                            block.highlights.content[0].substring(
                              0,
                              MAX_SUBSTRING_LIMIT,
                            ),
                          )
                        : block.content.substring(0, MAX_SUBSTRING_LIMIT)}
                    </p>
                  </a>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  }

  _renderNoResults() {
    const query = this._getUserQuery();
    this.results = html`
      <div class="no-results">
        <p>No results for <strong>"${query}"</strong></p>
      </div>
    `;
  }

  _getResultLink(result) {
    if (
      this.config.projects?.current &&
      result.project.slug !== this.config.projects.current.slug
    ) {
      return `${result.domain}${result.path}`;
    }
    return result.path;
  }
}

customElements.define(SearchPanelElement.elementName, SearchPanelElement);
