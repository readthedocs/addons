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
const MAX_SECTION_RESULTS = 3;
const MAX_SUBSTRING_LIMIT = 100;
const FETCH_RESULTS_DELAY = 250;
const CLEAR_RESULTS_DELAY = 300;
const RTD_SEARCH_PARAMETER = "rtd_search";

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
 *     <div class="outer_div_page_results" id="{id}">
 *       <span class="search__result__subheading">
 *         {title}
 *       </span>
 *       <p class="search__result__content">
 *         {contents[0]}
 *       </p>
 *       <p class="search__result__content">
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
  let span_element = createDomNode("span", {
    class: "search__result__subheading",
  });
  span_element.innerHTML = title;

  let div_element = createDomNode("div", {
    class: "outer_div_page_results",
    id: id,
  });
  div_element.appendChild(span_element);

  for (var i = 0; i < contents.length; i += 1) {
    let p_element = createDomNode("p", { class: "search__result__content" });
    p_element.innerHTML = contents[i];
    div_element.appendChild(p_element);
  }

  let section = createDomNode("a", { href: link });
  section.appendChild(div_element);
  return section;
};

/*
 * Returns true if the modal window is visible.
 */
const isModalVisible = () => {
  let modal = document.querySelector(".search__outer__wrapper");
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
 * Checks if data type is "string" or not
 *
 * @param {*} data data whose data-type is to be checked
 * @return {Boolean} 'true' if type is "string" and length is > 0
 */
const _is_string = (str) => {
  if (typeof str === "string" && str.length > 0) {
    return true;
  } else {
    return false;
  }
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

  if (highlights.content.length) {
    let highlight_content = highlights.content;
    section_content = [];
    for (
      let j = 0;
      j < highlight_content.length && j < MAX_SECTION_RESULTS;
      ++j
    ) {
      section_content.push("... " + highlight_content[j] + " ...");
    }
  }

  let section_link = `${page_link}#${sectionData.id}`;
  let section_id = "hit__" + id;
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

  let domain_id = "hit__" + id;

  let div_role_name = createDomNode("div", {
    class: "search__domain_role_name",
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
 *       <h2 class="search__result__title">
 *         {title}
 *         <small class="rtd_ui_search_subtitle">{subtitle}</small>
 *         <br/>
 *       </h2>
 *     </a>
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
 *
 *     <a href="{link}">
 *       {section}
 *     </a>
 *     <br class="br-for-hits" />
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

  let h2_element = createDomNode("h2", { class: "search__result__title" });
  h2_element.innerHTML = page_title;

  // Results can belong to different projects.
  // If the result isn't from the current project, add a note about it.
  const project_slug = resultData.project.slug;
  if (projectName !== project_slug) {
    let subtitle = createDomNode("small", { class: "rtd_ui_search_subtitle" });
    subtitle.innerText = ` (from project ${project_slug})`;
    h2_element.appendChild(subtitle);
    // If the result isn't from the current project,
    // then we create an absolute link to the page.
    page_link = `${resultData.domain}${page_link}`;
  }
  h2_element.appendChild(createDomNode("br"));

  let a_element = createDomNode("a", { href: page_link });
  a_element.appendChild(h2_element);

  let content = createDomNode("div");
  content.appendChild(a_element);

  let separator = createDomNode("br", { class: "br-for-hits" });
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
      content.appendChild(separator);
    }
  }
  return content;
};

/**
 * Generate search suggestions list.
 *
 * @param {Object} data response data from the search backend
 * @param {String} projectName name (slug) of the project
 * @return {Object} a <div> node with class "search__result__box" with results
 */
const generateSuggestionsList = (data, projectName) => {
  // let search_result_box = createDomNode("div", {
  //   class: "search__result__box",
  // });
  let search_result_box = document.querySelector(".search__result__box");

  let max_results = Math.min(MAX_SUGGESTIONS, data.results.length);
  let id = 0;
  for (let i = 0; i < max_results; ++i) {
    let search_result_single = createDomNode("div", {
      class: "search__result__single",
    });

    let content = generateSingleResult(data.results[i], projectName, id);

    search_result_single.appendChild(content);
    search_result_box.appendChild(search_result_single);

    id += data.results[i].blocks.length;
  }
  return search_result_box;
};

/**
 * Removes .active class from all the suggestions.
 */
const removeAllActive = () => {
  const results = document.querySelectorAll(".outer_div_page_results.active");
  const results_arr = Object.keys(results).map((i) => results[i]);
  for (let i = 1; i <= results_arr.length; ++i) {
    results_arr[i - 1].classList.remove("active");
  }
};

/**
 * Add .active class to the search suggestion
 * corresponding to `id`, and scroll to that suggestion smoothly.
 *
 * @param {Number} id of the suggestion to activate
 */
const addActive = (id) => {
  const current_item = document.querySelector("#hit__" + id);
  // in case of no results or any error,
  // current_item will not be found in the DOM.
  if (current_item !== null) {
    current_item.classList.add("active");
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
  const all = document.querySelectorAll(".outer_div_page_results");
  const current = document.querySelector(".outer_div_page_results.active");

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
  let search_outer_input = document.querySelector(".search__outer__input");
  if (search_outer_input !== null) {
    return search_outer_input.value || "";
  }
  return "";
};

/**
 * Removes all results from the search modal.
 * It doesn't close the search box.
 */
const removeResults = () => {
  document.querySelector(".search__result__box").innerHTML = "";
};

/**
 * Creates and returns a div with error message
 * and some styles.
 *
 * @param {String} err_msg error message to be displayed
 */
// const getErrorDiv = (err_msg) => {
//   let err_div = createDomNode("div", {
//     class: "search__result__box search__error__box",
//   });
//   err_div.innerHTML = err_msg;
//   return err_div;
// };

const spinIcon = () => {
  if (
    !document
      .querySelector(".search__outer form label svg")
      .classList.contains("spinner")
  ) {
    const spinner = icon(faCircleNotch, {
      title: "Spinner",
      classes: ["spinner", "fa-spin"],
    });
    const magnifier = document.querySelector(".search__outer form label");
    magnifier.innerHTML = spinner.html[0];
  }
};

const magnifierIcon = () => {
  const magnifier = icon(faMagnifyingGlass, {
    title: "Magnifier",
    classes: ["magnifier"],
  });
  const spinner = document.querySelector(".search__outer form label");
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
          // document.querySelector(".search__result__box").innerHTML = search_result_box;
          // removeResults();
          magnifierIcon();
          // search_outer.appendChild(search_result_box);

          let search_outer = document.querySelector(".search__outer");

          // remove active classes from all suggestions
          // if the mouse hovers, otherwise styles from
          // :hover and .active will clash.
          search_outer.addEventListener("mouseenter", (e) => {
            removeAllActive();
          });
        } else {
          removeResults();
          noResultsFound();
          // let err_div = getErrorDiv("No results found");
          // search_outer.appendChild(err_div);
          magnifierIcon();
        }
      })
      .catch((error) => {
        removeResults();
        // let err_div = getErrorDiv("There was an error. Please try again.");
        // search_outer.appendChild(err_div);
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
<div class="no__results">
  ${binoculars.html[0]}
  <p class="title">No results for <strong>"${query}"</strong></p>
  <div class="tips">
    <p>Try using the following modifiers:</p>
<ul>
<li>Use <code>project:slug</code> to search on a specific project.</li>
<li>Use <code>subprojects:slug</code> to search on its subprojects.</li>
<li>Use <code>user:@me</code> to only search on your projects.</li>
</ul>

  </div>
  <div class="footer">
    <p>Believe this query should return results? <a target="_blank" href="https://github.com/readthedocs/readthedocs.org/issues/new?title=Search:+missing+results+for+query:+'${query}'">Let us know</a>.</p>
  </div>
</div>
`;
  document.querySelector(".search__result__box").innerHTML = template;
};

/**
 * Creates the initial html structure which will be
 * appended to the <body> as soon as the page loads.
 * This html structure will serve as the boilerplate
 * to show our search results.
 *
 * @param {Array} filters: filters to be applied to the search.
 *  {["Filter name", "Filter value"]}
 * @return {String} initial html structure
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

  let innerHTML = `
        <div class="search__outer">
<form>
<label>
            ${magnifier.html[0]}
</label>
          <input class="search__outer__input" placeholder="Search docs" autocomplete="off">
</form>
          <div class="search__filters">
            <ul>
            </ul>
          </div>
        <div class="search__result__box"></div>
        <div class="rtd__search__footer">
          <ul class="rtd__search__help">
          </ul>
          <div class="rtd__search__credits">
            Search powered by
            <a href="https://about.readthedocs.com/">
              <img class="center aligned" src="${READTHEDOCS_LOGO}" alt="Read the Docs">
            </a>
          </div>
        </div>
      </div>
    `;

  let div = createDomNode("div", {
    class: "search__outer__wrapper search__backdrop",
  });
  div.innerHTML = innerHTML;

  let filters_list = div.querySelector(".search__filters ul");
  // Add filters below the search box if present.
  if (filters.length > 0) {
    let li = createDomNode("li", { class: "search__filters__title" });
    li.innerText = "Filters:";
    filters_list.appendChild(li);
  }
  // Each checkbox contains the index of the filter,
  // so we can get the proper filter when selected.
  for (let i = 0, len = filters.length; i < len; i++) {
    const [name, filter] = filters[i];
    let li = createDomNode("li", { class: "search__filter", title: filter });
    let id = `rtd-search-filter-${i}`;
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
      const checkboxes = document.querySelectorAll(".search__filters input");
      for (const checkbox of checkboxes) {
        if (checkbox.checked && checkbox.value != event.target.value) {
          checkbox.checked = false;
        }
      }

      // Trigger a search with the current selected filter.
      let search_query = getSearchTerm();
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
    });
  }
  return div;
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

  let element = document.querySelector(".search__outer__wrapper");
  if (element && element.style) {
    element.style.display = "block";
  }
  document.querySelector(".search__outer form input").focus();
};

/**
 * Closes the search modal.
 */
const removeSearchModal = () => {
  // removes previous results before closing
  removeResults();

  // sets the value of input field to empty string and remove the focus.
  document.querySelector(".search__outer__input").value = "";

  let element = document.querySelector(".search__outer__wrapper");
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
  const checkbox = document.querySelector(".search__filters input:checked");
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
    let initialHtml = generateAndReturnInitialHtml(config);
    document.body.appendChild(initialHtml);
    eventListeners(config);
  });
}

function eventListeners(config) {
  // TODO: make these selectors to use IDs
  let search_outer_wrapper = document.querySelector(".search__outer__wrapper");
  let search_outer_input = document.querySelector(".search__outer__input");
  // let cross_icon = document.querySelector(".search__cross");

  // this stores the current request.
  let current_request = null;

  // TODO: revisit this use case. Why is this important?
  // // if "rtd_search" is present in URL parameters,
  // // then open the search modal and show the results
  // // for the value of "rtd_search"
  // const url_params = new URLSearchParams(document.location.search);
  // const query = url_params.get(RTD_SEARCH_PARAMETER);
  // if (query !== null) {
  //   showSearchModal(query);
  //   search_outer_input.value = query;

  //   let event = document.createEvent("Event");
  //   event.initEvent("input", true, true);
  //   search_outer_input.dispatchEvent(event);
  // }

  search_outer_input.addEventListener("input", (e) => {
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

  search_outer_input.addEventListener("keydown", (e) => {
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
        ".outer_div_page_results.active"
      );
      // if an item is selected,
      // then redirect to its link
      if (current_item !== null) {
        const link = current_item.parentElement["href"];
        window.location.href = link;
      }
    }
  });

  search_outer_wrapper.addEventListener("click", (e) => {
    // HACK: only close the search modal if the
    // element clicked has <body> as the parent Node.
    // This is done so that search modal only gets closed
    // if the user clicks on the backdrop area.
    if (e.target.parentNode === document.body) {
      removeSearchModal();
    }
  });

  // close the search modal if clicked on cross icon.
  // cross_icon.addEventListener("click", (e) => {
  //   removeSearchModal();
  // });

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
