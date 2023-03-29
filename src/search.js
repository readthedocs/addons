import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faCircleNotch,
  faBinoculars,
} from "@fortawesome/free-solid-svg-icons";
import READTHEDOCS_LOGO from "./images/logo-wordmark-dark.svg";

import styles from "./search.css";
import { domReady } from "./utils";

const MAX_SUGGESTIONS = 50;
// TODO: play more with the substring limit.
// The idea is to try to fit most of the results in one line.
const MAX_SUBSTRING_LIMIT = 80;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;

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

const spinIcon = () => {
  if (
    !document
      .querySelector("#readthedocs-search form label svg")
      .classList.contains("spinner")
  ) {
    const spinner = icon(faCircleNotch, {
      title: "Spinner",
      classes: ["spinner", "fa-spin"],
    });
    const magnifier = document.querySelector("#readthedocs-search form label");
    magnifier.innerHTML = spinner.html[0];
  }
};

const magnifierIcon = () => {
  const magnifier = icon(faMagnifyingGlass, {
    title: "Magnifier",
    classes: ["magnifier"],
  });
  const spinner = document.querySelector("#readthedocs-search form label");
  spinner.innerHTML = magnifier.html[0];
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

    fetch(url, { method: "GET" })
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
  <p class="title">No results for <strong>"${query}"</strong></p>
  <div class="readthedocs-search-no-results-tips">
    <p>Try using the following modifiers:</p>
<ul>
<li>Use <code>project:slug</code> to search on a specific project.</li>
<li>Use <code>subprojects:slug</code> to search on its subprojects.</li>
<li>Use <code>user:@me</code> to only search on your projects.</li>
</ul>

  </div>
  <div class="readthedocs-search-no-results-footer">
    <p>Believe this query should return results? <a target="_blank" href="https://github.com/readthedocs/readthedocs.org/issues/new?title=Search:+missing+results+for+query:+'${query}'">Let us know</a>.</p>
  </div>
</div>
`;
  document.querySelector(
    "#readthedocs-search .readthedocs-search-results"
  ).innerHTML = template;
};

/**
 * Creates the initial html structure which will be
 * appended to the <body> as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 *
 */
const generateAndReturnInitialHtml = (config) => {
  const magnifier = icon(faMagnifyingGlass, {
    title: "Magnifier",
    classes: ["magnifier"],
  });
  const xmark = icon(faCircleXmark, {
    title: "Close",
    classes: ["close"],
  });
  const filters = config.features.search.filters;

  const search_html = `
<section id="readthedocs-search" role="search">
    <!-- Warning: this HTML structure and CSS styles are still in beta. They could change without notice.  -->
    <div class="readthedocs-search-background">
        <div class="readthedocs-search-container">
            <form>
                <label>
                    ${magnifier.html[0]}
                </label>
                <input placeholder="Search docs" type="search" autocomplete="off">
            </form>
            <section class="readthedocs-search-filters">
                <ul>
                    <!-- Rendered at load time -->
                </ul>
            </section>
            <div class="readthedocs-search-results">
                <!-- Rendered after the query is performed -->
            </div>
            <div class="readthedocs-search-footer">
                <ul class="readthedocs-search-help">
                    <li><code>Enter</code> to select</li>
                    <li><code>Up</code>/<code>Down</code> to navigate</li>
                    <li><code>Esc</code> to close</li>
                </ul>
                <div class="readthedocs-search-credits">
                    Search powered by
                    <a href="https://about.readthedocs.com/">
                        <img src="${READTHEDOCS_LOGO}" alt="Read the Docs">
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
`;

  document.body.insertAdjacentHTML("beforeend", search_html);

  let filters_list = document.querySelector(
    "#readthedocs-search .readthedocs-search-filters ul"
  );
  // Add filters below the search box if present.
  if (filters.length > 0) {
    let li = createDomNode("li", {});
    li.innerText = "Filters:";
    filters_list.appendChild(li);
  }

  // Each checkbox contains the index of the filter,
  // so we can get the proper filter when selected.
  for (let i = 0, len = filters.length; i < len; i++) {
    const [name, filter] = filters[i];
    let li = createDomNode("li", { title: filter });
    let id = `readthedocs-search-filter-${i}`;
    let checkbox = createDomNode("input", { type: "checkbox", id: id });
    let label = createDomNode("label", { for: id });
    label.innerText = name;
    checkbox.value = i;
    li.appendChild(checkbox);
    li.appendChild(label);
    filters_list.appendChild(li);

    checkbox.addEventListener("click", (event) => {
      // Uncheck all other filters when one is checked.
      // We only support one filter at a time.
      const checkboxes = document.querySelectorAll(
        "#readthedocs-search .readthedocs-search-filters input[type=checkbox]"
      );
      for (const checkbox of checkboxes) {
        if (checkbox.checked && checkbox.value != event.target.value) {
          checkbox.checked = false;
        }
      }

      // Trigger a search with the current selected filter.
      let search_query = getSearchTerm();
      if (search_query !== "") {
        const filter = getCurrentFilter(config);
        search_query = filter + " " + search_query;
        const search_params = {
          q: search_query,
        };
        fetchAndGenerateResults(
          config.features.search.api_endpoint,
          search_params,
          config.features.search.project
        )();
      }
    });
  }
};

/**
 * Opens the search modal.
 *
 * @param {String} custom_query if a custom query is provided,
 * initialize the value of input field with it, or fallback to the
 * value from the original search bar.
 */
const showSearchModal = (custom_query) => {
  // removes previous results (if there are any).
  removeResults();

  let element = document.querySelector("#readthedocs-search");
  if (element && element.style) {
    element.style.display = "block";
  }
  document.querySelector("#readthedocs-search form input[type=search]").focus();
};

/**
 * Closes the search modal.
 */
const removeSearchModal = () => {
  // removes previous results before closing
  removeResults();

  // sets the value of input field to empty string and remove the focus.
  document.querySelector("#readthedocs-search form input[type=search]").value =
    "";

  let element = document.querySelector("#readthedocs-search");
  if (element && element.style) {
    element.style.display = "none";
  }
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

export function initializeSearchAsYouType(config) {
  document.adoptedStyleSheets.push(styles);
  library.add(faMagnifyingGlass);
  library.add(faCircleXmark);
  library.add(faCircleNotch);
  library.add(faBinoculars);
  domReady.then(() => {
    generateAndReturnInitialHtml(config);
    eventListeners(config);
    // TODO: remove this showSearchModal at the beginning, this is just for testing purposes
    showSearchModal();
  });
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
    if (search_query.length > 0) {
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
