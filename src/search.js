import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faCircleNotch,
  faBinoculars,
} from "@fortawesome/free-solid-svg-icons";
import READTHEDOCS_LOGO from "./images/logo-wordmark-dark.svg";

import styleSheet from "./search.css";
import { domReady, CLIENT_VERSION, AddonBase } from "./utils";
import { html, render, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

const MAX_SUGGESTIONS = 50;
// TODO: play more with the substring limit.
// The idea is to try to fit most of the results in one line.
const MAX_SUBSTRING_LIMIT = 80;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const MIN_CHARACTERS_QUERY = 3;
const API_ENDPOINT = "/_/api/v3/search/";

export class SearchElement extends LitElement {
  static elementName = "readthedocs-search";

  static properties = {
    config: {
      state: true,
      reactive: true,
    },
    filters: { state: true },
    show: { state: true },
    inputIcon: { state: true },
    // NOTE: does it make sense to handle the query as a property?
    // query: { state: true },
    results: {
      state: true,
    },
    cssFormFocusClasses: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.className = this.className || "raised floating";
    this.config = {};
    this.show = true;
    this.cssFormFocusClasses = {};
    this.results = null;
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search" });
    this.filters = {
      defaults: [
        {
          name: "Search only in this project",
          value: "projects:example",
        },
        {
          name: "Search in subprojects",
          value: "subprojects:example",
        },
      ],
    };

    library.add(faMagnifyingGlass);
    library.add(faCircleNotch);
    library.add(faBinoculars);
  }

  loadConfig(config) {
    this.config = config;
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (!this.config) {
      return;
    }

    if (
      true
      // this.config.features &&
      // this.config.features.search &&
      // this.config.features.search.enabled
    ) {
      return this.renderSearchModal();
    }
  }

  closeModal(e) {
    this.show = false;
  }

  showModal(e) {
    this.show = true;
    // https://lit.dev/docs/components/shadow-dom/
    const input = this.renderRoot.querySelector("input[type=search]");
    // TODO: for some reason it does not get focus
    input.focus();
  }

  searchFocus(e) {
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

  removeResults() {
    this.results = null;
  }

  showNoResultsFound() {
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

  fetchResults(query) {
    this.removeResults();
    this.showSpinIcon();

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
        console.log(data);
        if (data.results.length > 0) {
          this.loadResults(data);
          // let search_result_box = generateSuggestionsList(data, projectName);
          console.log(data.results);
          this.showMagnifierIcon();
        } else {
          this.removeResults();
          this.showNoResultsFound();
          this.showMagnifierIcon();
        }
      })
      .catch((error) => {
        console.error(error);
        this.removeResults();
        // TODO: create a page similar to noResultsFound for this.
      });
  }

  getCurrentFilter() {
    // TODO: get the filter the user has selected
    return this.config.features.search.default_filter;
  }

  queryInput(e) {
    let query = e.originalTarget.value;
    if (query.length >= MIN_CHARACTERS_QUERY) {
      // TODO: save the current query request and handle it here
      // if (this.currentQueryRequest !== null) {
      //     // cancel previous ajax request.
      //     this.currentQueryRequest.cancel();
      // }
      const filter = this.getCurrentFilter();
      query = filter + " " + query;
      const currentQueryRequest = this.fetchResults(query);
    } else {
      // if the last request returns the results,
      // the suggestions list is generated even if there
      // is no query. To prevent that, this function
      // is debounced here.
      let func = () => {
        this.removeResults();
      };
      debounce(func, CLEAR_RESULTS_DELAY)();
    }
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
              @focusin=${this.searchFocus}
              @focusout=${this.searchFocus}
              placeholder="Search docs"
              type="search"
              autocomplete="off"
            />
          </form>
          <div @click=${this.filterSelected} class="filters">
            ${this.renderFilters()}
          </div>
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

  renderFilters() {
    // https://lit.dev/docs/components/events/#listening-to-events-fired-from-repeated-templates
    // https://lit.dev/docs/templates/lists/#repeating-templates-with-map
    return html`
      <li class="title">Filters</li>
      ${this.filters.defaults.map(
        (filter, index) => html`
          <li>
            <input
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

  filterSelected(e) {
    console.log("Filter selected: " + e.target.textContent);
    //     // Uncheck all other filters when one is checked.
    //     // We only support one filter at a time.
    //     const checkboxes = document.querySelectorAll(
    //         "#readthedocs-search .readthedocs-search-filters input[type=checkbox]"
    //     );
    //     for (const checkbox of checkboxes) {
    //         if (checkbox.checked && checkbox.value != event.target.value) {
    //             checkbox.checked = false;
    //         }
    //     }

    //     // Trigger a search with the current selected filter.
    //     let search_query = getSearchTerm();
    //     if (search_query !== "") {
    //         const filter = getCurrentFilter(config);
    //         search_query = filter + " " + search_query;
    //         const search_params = {
    //             q: search_query,
    //         };
    //         fetchAndGenerateResults(
    //             config.features.search.api_endpoint,
    //             search_params,
    //             config.features.search.project
    //         )();
    //     }
    // });
  }

  sectionHTML(block) {
    let title = block.title;
    if (block.highlights.title.length) {
      title = block.highlights.title[0];
    }

    let content = block.content.substring(0, MAX_SUBSTRING_LIMIT) + " ...";
    if (block.highlights.content.length) {
      content =
        "... " +
        block.highlights.content[0].substring(0, MAX_SUBSTRING_LIMIT) +
        " ...";
    }

    // FIXME: grab this id properly (probably from outside .map)
    let id = 1;

    return html`
      <a href="${block.path}#${block.id}">
        <div id="${id}">
          <p class="hit subheading">${title}</p>
          <p class="hit content">${content}</p>
        </div>
      </a>
    `;
  }

  loadResults(data) {
    console.log(data);
    this.results = html`
      <div class="hit">
        ${data.results.map(
          (result) =>
            html`
              <a href="${result.path}">
                <h2>
                  ${result.title}
                  <small class="subtitle">
                    (from project ${result.project_slug})
                  </small>
                </h2>
              </a>

              ${result.blocks.map((block) => html`${this.sectionHTML(block)}`)}
            `
        )}
      </div>
    `;
  }

  attachEvents() {
    // eventListeners(config);
  }

  // We have to use "arrow function" so `this` refers to the component
  // https://lit.dev/docs/components/events/#understanding-this-in-event-listeners
  _handleShowModal = (e) => {
    // Close the modal with `Esc`
    if (e.keyCode === 27) {
      this.closeModal();
    }
    // Show the modal with `/`
    else if (e.keyCode === 191 && !this.show) {
      // prevent opening "Quick Find" in Firefox
      e.preventDefault();
      this.showModal();
    }
  };

  showNoResults() {
    return null;
  }

  connectedCallback() {
    super.connectedCallback();
    // open search modal if "forward slash" button is pressed
    document.addEventListener("keydown", this._handleShowModal);
  }
  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleShowModal);
    super.disconnectedCallback();
  }
}

export class SearchAddon extends AddonBase {
  constructor(config) {
    super();

    // TODO: is it possible to move this `constructor` to the `AddonBase` class?
    customElements.define("readthedocs-search", SearchElement);
    let elems = document.querySelectorAll("readthedocs-search");
    if (!elems.length) {
      elems = [new SearchElement()];
      render(elems[0], document.body);
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    // return config.features && config.features.search.enabled;
    return true;
  }
}

/**
 * Debounce the function.
 * Usage::
 *
 *    let func = debounce(() => console.log("Hello World"), 3000);
 *
 *    // calling the func
 *    func();
 *
 *    //cancelling the execution of the func (if not executed)
 *    func.cancel();
 *
 * @param {Function} func function to be debounced
 * @param {Number} wait time to wait before running func (in miliseconds)
 * @return {Function} debounced function
 */
const debounce = (func, wait) => {
  let timeout;

  let debounced = function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

/**
 * Build a section with its matching results.
 *
 * A section has the form:
 *
 *   <a href="{link}">
 *     <div id="{id}">
 *       <p class="readthedocs-search-result-hit--subheading">
 *         {title}
 *       </p>
 *       <p class="readthedocs-search-result-hit--content">
 *         {contents[0]}
 *       </p>
 *       <p class="readthedocs-search-result-hit--content">
 *         {contents[1]}
 *       </p>
 *       ...
 *     </div>
 *   </a>
 *
 * @param {String} id.
 * @param {String} title.
 * @param {String} link.
 * @param {Array} contents.
 */
const buildSection = function (id, title, link, contents) {
  let p_subheading = createDomNode("p", {
    class: "readthedocs-search-result-hit--subheading",
  });
  p_subheading.innerHTML = title;

  if (contents.length !== 1) {
    // NOTE: I don't know when this happens.
    console.warning("There are more content in this section.");
  }

  let p_content = createDomNode("p", {
    class: "readthedocs-search-result-hit--content",
  });
  p_content.innerHTML = contents[0];

  let section = createDomNode("a", {
    href: link,
    id: id,
    class: "readthedocs-search-result-hit",
  });
  section.appendChild(p_subheading);
  section.appendChild(p_content);
  return section;
};

/*
 * Returns true if the modal window is visible.
 */
const isModalVisible = () => {
  let modal = document.querySelector("#readthedocs-search");
  if (modal !== null && modal.style !== null && modal.style.display !== null) {
    return modal.style.display === "block";
  }
  return false;
};

/**
 * Create and return DOM nodes
 * with passed attributes.
 *
 * @param {String} nodeName name of the node
 * @param {Object} attributes obj of attributes to be assigned to the node
 * @return {Object} dom node with attributes
 */
const createDomNode = (nodeName, attributes) => {
  let node = document.createElement(nodeName);
  if (attributes !== null) {
    for (let attr in attributes) {
      node.setAttribute(attr, attributes[attr]);
    }
  }
  return node;
};

/**
 * Generate and return html structure
 * for a page section result.
 *
 * @param {Object} sectionData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_section_html = (sectionData, page_link, id) => {
  let section_subheading = sectionData.title;
  let highlights = sectionData.highlights;
  if (highlights.title.length) {
    section_subheading = highlights.title[0];
  }

  let section_content = [
    sectionData.content.substring(0, MAX_SUBSTRING_LIMIT) + " ...",
  ];

  // NOTE: it seems the API could return "multiple highlights",
  // but I wasn't able to reproduce that
  if (highlights.content.length) {
    section_content = [
      "... " +
        highlights.content[0].substring(0, MAX_SUBSTRING_LIMIT) +
        " ... ",
    ];
  }

  let section_link = `${page_link}#${sectionData.id}`;
  let section_id = "readthedocs-search-result-hit--" + id;
  return buildSection(
    section_id,
    section_subheading,
    section_link,
    section_content
  );
};

/**
 * Generate and return html structure
 * for a sphinx domain result.
 *
 * @param {Object} domainData object containing the result data
 * @param {String} page_link link of the main page. It is used to construct the section link
 * @param {Number} id to be used in for this section
 */
const get_domain_html = (domainData, page_link, id) => {
  let domain_link = `${page_link}#${domainData.id}`;
  let domain_role_name = domainData.role;
  let domain_name = domainData.name;
  let domain_content =
    domainData.content.substr(0, MAX_SUBSTRING_LIMIT) + " ...";

  let highlights = domainData.highlights;
  if (highlights.name.length) {
    domain_name = highlights.name[0];
  }
  if (highlights.content.length) {
    domain_content = highlights.content[0];
  }

  let domain_id = "readthedocs-search-hit--" + id;

  let div_role_name = createDomNode("div", {
    class: "readthedocs-search-result-hit--domain-role",
  });
  div_role_name.innerText = `[${domain_role_name}]`;
  domain_name += div_role_name.outerHTML;

  return buildSection(domain_id, domain_name, domain_link, [domain_content]);
};

/**
 * Generate search results for a single page.
 *
 * This has the form:
 *   <div>
 *     <a href="{link}">
 *       <h2>
 *         {title}
 *         <small class="readthedocs-search-result-hit--subtitle">{subtitle}</small>
 *       </h2>
 *     </a>
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *   </div>
 *
 * @param {Object} resultData search results of a page
 * @param {String} projectName
 * @param {Number} id from the last section
 * @return {Object} a <div> node with the results of a single page
 */
const generateSingleResult = (resultData, projectName, id) => {
  let page_link = resultData.path;
  let page_title = resultData.title;
  let highlights = resultData.highlights;

  if (highlights.title.length) {
    page_title = highlights.title[0];
  }

  let h2_element = createDomNode("h2");
  h2_element.innerHTML = page_title;

  // Results can belong to different projects.
  // If the result isn't from the current project, add a note about it.
  const project_slug = resultData.project.slug;
  if (projectName !== project_slug) {
    let subtitle = createDomNode("small", {
      class: "readthedocs-search-result-hit--subtitle",
    });
    subtitle.innerText = ` (from project ${project_slug})`;
    h2_element.appendChild(subtitle);
    // If the result isn't from the current project,
    // then we create an absolute link to the page.
    page_link = `${resultData.domain}${page_link}`;
  }

  let a_element = createDomNode("a", { href: page_link });
  a_element.appendChild(h2_element);

  let content = createDomNode("div");
  content.appendChild(a_element);

  for (let i = 0; i < resultData.blocks.length; ++i) {
    let block = resultData.blocks[i];
    let section = null;
    id += 1;
    if (block.type === "section") {
      section = get_section_html(block, page_link, id);
    } else if (block.type === "domain") {
      section = get_domain_html(block, page_link, id);
    }

    if (section !== null) {
      content.appendChild(section);
    }
  }
  return content;
};

/**
 * Generate search suggestions list.
 *
 * @param {Object} data response data from the search backend
 * @param {String} projectName name (slug) of the project
 */
const generateSuggestionsList = (data, projectName) => {
  let search_result_box = document.querySelector(
    "#readthedocs-search .readthedocs-search-results"
  );

  let max_results = Math.min(MAX_SUGGESTIONS, data.results.length);
  let id = 0;
  for (let i = 0; i < max_results; ++i) {
    let search_result_single = createDomNode("div", {
      class: "readthedocs-search-result-container",
    });

    let hit_container = generateSingleResult(data.results[i], projectName, id);
    search_result_single.innerHTML = hit_container.innerHTML;
    search_result_box.appendChild(search_result_single);

    id += data.results[i].blocks.length;
  }
  return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
  const results = document.querySelectorAll(
    "#readthedocs-search .readthedocs-search-results .readthedocs-search-result-hit--active"
  );
  for (let element of results) {
    element.classList.remove("readthedocs-search-result-hit--active");
  }
};

/**
 * Add .active class to the search suggestion
 * corresponding to `id`, and scroll to that suggestion smoothly.
 *
 * @param {Number} id of the suggestion to activate
 */
const addActive = (id) => {
  const current_item = document.querySelector(
    "#readthedocs-search-result-hit--" + id
  );
  // in case of no results or any error,
  // current_item will not be found in the DOM.
  if (current_item !== null) {
    current_item.classList.add("readthedocs-search-result-hit--active");
    current_item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }
};

/*
 * Select next/previous result.
 * Go to the first result if already in the last result,
 * or to the last result if already in the first result.
 *
 * @param {Boolean} forward.
 */
const selectNextResult = (forward) => {
  const all = document.querySelectorAll(
    "#readthedocs-search .readthedocs-search-result-hit "
  );
  const current = document.querySelector(
    "#readthedocs-search .readthedocs-search-result-hit--active"
  );

  let next_id = 1;
  let last_id = 1;

  if (all.length > 0) {
    let last = all[all.length - 1];
    if (last.id !== null) {
      let match = last.id.match(/\d+/);
      if (match !== null) {
        last_id = Number(match[0]);
      }
    }
  }

  if (current !== null && current.id !== null) {
    let match = current.id.match(/\d+/);
    if (match !== null) {
      next_id = Number(match[0]);
      next_id += forward ? 1 : -1;
    }
  }

  // Cycle to the first or last result.
  if (next_id <= 0) {
    next_id = last_id;
  } else if (next_id > last_id) {
    next_id = 1;
  }

  removeAllActive();
  addActive(next_id);
};

/*
 * Returns the current search term from the modal.
 */
const getSearchTerm = () => {
  let search_input = document.querySelector(
    "#readthedocs-search form input[type=search]"
  );
  if (search_input !== null) {
    return search_input.value || "";
  }
  return "";
};

/**
 * Removes all results from the search modal.
 * It doesn't close the search box.
 */
const removeResults = () => {
  document.querySelector(
    "#readthedocs-search .readthedocs-search-results"
  ).innerHTML = "";
};

/**
 * Fetch the suggestions from search backend,
 * and appends the results to <div class="search__outer"> node,
 * which is already created when the page was loaded.
 *
 * @param {String} api_endpoint: API endpoint
 * @param {Object} parameters: search parameters
 * @param {String} projectName: name (slug) of the project
 * @return {Function} debounced function with debounce time of 500ms
 */
const fetchAndGenerateResults = (api_endpoint, parameters, projectName) => {
  // Removes all results (if there is any)
  removeResults();
  spinIcon();

  let fetchFunc = () => {
    const url = api_endpoint + "?" + new URLSearchParams(parameters).toString();

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
          let search_result_box = generateSuggestionsList(data, projectName);
          magnifierIcon();

          let search_background = document.querySelector(
            "#readthedocs-search .readthedocs-search-background"
          );

          // remove active classes from all suggestions
          // if the mouse hovers, otherwise styles from
          // :hover and --active will clash.
          search_background.addEventListener("mouseenter", (e) => {
            removeAllActive();
          });
        } else {
          removeResults();
          noResultsFound();
          magnifierIcon();
        }
      })
      .catch((error) => {
        removeResults();
        // TODO: create a page similar to noResultsFound for this.
      });
  };
  return debounce(fetchFunc, FETCH_RESULTS_DELAY);
};

const noResultsFound = () => {
  // TODO: change the icon to a slash-ed magnifier or similar
  const binoculars = icon(faBinoculars, {
    title: "Not found",
  });
  const query = getSearchTerm();
  const template = `
<div class="readthedocs-search-no-results">
  ${binoculars.html[0]}
  <p class="readthedocs-search-no-results-title">No results for <strong>"${query}"</strong></p>
  <div class="readthedocs-search-no-results-tips">
    <p>Try using the following special queries:</p>
    <ul>
      <li><strong>Exact phrase</strong>: use double quotes to match a whole pharse: <code>"adding a subproject"</code>.</li>
      <li><strong>Prefix</strong>: use an asterisk at the end of any term to prefix a result: <code>environ*</code>.</li>
      <li><strong>Fuzziness</strong>: add a tilde and a number to indicate the fuzziness of the word: <code>getter~2</code>.</li>
    </ul>
  </div>

  <div class="readthedocs-search-no-results-footer">
    <p>Learn more about the query syntax supported in our <a target="_blank" href="https://docs.readthedocs.io/page/server-side-search/syntax.html">documentation</a>.</p>
  </div>
</div>
`;
  document.querySelector(
    "#readthedocs-search .readthedocs-search-results"
  ).innerHTML = template;
};

/**
 * Get the current selected filter.
 *
 * If no filter checkbox is selected, the default filter is returned.
 *
 * @param {Object} config
 */
function getCurrentFilter(config) {
  const checkbox = document.querySelector(
    "#readthedocs-search .filters input:checked"
  );
  if (checkbox == null) {
    return config.features.search.default_filter;
  }
  return config.features.search.filters[parseInt(checkbox.value)][1];
}

function eventListeners(config) {
  let search_background = document.querySelector(
    "#readthedocs-search .readthedocs-search-background"
  );
  let search_input = document.querySelector(
    "#readthedocs-search form input[type=search]"
  );

  // this stores the current request.
  let current_request = null;

  search_background.addEventListener("input", (e) => {
    let search_query = getSearchTerm();
    if (search_query.length >= MIN_CHARACTERS_QUERY) {
      if (current_request !== null) {
        // cancel previous ajax request.
        current_request.cancel();
      }
      const filter = getCurrentFilter(config);
      search_query = filter + " " + search_query;
      const search_params = {
        q: search_query,
      };
      current_request = fetchAndGenerateResults(
        config.features.search.api_endpoint,
        search_params,
        config.features.search.project
      );
      current_request();
    } else {
      // if the last request returns the results,
      // the suggestions list is generated even if there
      // is no query. To prevent that, this function
      // is debounced here.
      let func = () => {
        removeResults();
      };
      debounce(func, CLEAR_RESULTS_DELAY)();
    }
  });

  search_input.addEventListener("focusin", (e) => {
    search_input.parentNode.classList.add("readthedocs-search-input--focus");
  });
  search_input.addEventListener("focusout", (e) => {
    search_input.parentNode.classList.remove("readthedocs-search-input--focus");
  });

  search_input.addEventListener("keydown", (e) => {
    // if "ArrowDown is pressed"
    if (e.keyCode === 40) {
      e.preventDefault();
      selectNextResult(true);
    }

    // if "ArrowUp" is pressed.
    if (e.keyCode === 38) {
      e.preventDefault();
      selectNextResult(false);
    }

    // if "Enter" key is pressed.
    if (e.keyCode === 13) {
      e.preventDefault();
      const current_item = document.querySelector(
        "#readthedocs-search .readthedocs-search-result-hit--active"
      );
      // if an item is selected,
      // then redirect to its link
      if (current_item !== null) {
        window.location.href = current_item.href;
      }
    }
  });

  search_background.addEventListener("click", (e) => {
    // HACK: only close the search modal if the
    // element clicked has <body> as the parent Node.
    // This is done so that search modal only gets closed
    // if the user clicks on the backdrop area.
    if (e.target.parentNode.parentNode === document.body) {
      removeSearchModal();
    }
  });

  // close the search modal if the user pressed
  // Escape button
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      removeSearchModal();
    }
  });

  // open search modal if "forward slash" button is pressed
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 191 && !isModalVisible()) {
      // prevent opening "Quick Find" in Firefox
      e.preventDefault();
      showSearchModal();
    }
  });
}
