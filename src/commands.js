import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faCircleNotch,
  faBinoculars,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import READTHEDOCS_LOGO from "./images/logo-wordmark-dark.svg";

import styleSheet from "./search.css";
import { AddonBase, addUtmParameters } from "./utils";
import {
  EVENT_READTHEDOCS_COMMANDS_SHOW,
  EVENT_READTHEDOCS_COMMANDS_HIDE,
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_SEARCH_HIDE,
  EVENT_READTHEDOCS_FLYOUT_SHOW,
  EVENT_READTHEDOCS_FLYOUT_HIDE,
} from "./events";
import { html, nothing, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

const MIN_CHARACTERS_QUERY = 3;

export class CommandPaletteElement extends LitElement {
  static elementName = "readthedocs-commands";

  static properties = {
    config: {
      state: true,
    },
    show: { state: true },
    inputIcon: { state: true },
    commands: { state: true },
    commandResults: { state: true },
    cssFormFocusClasses: { state: true },
    triggerKeycode: { type: Number, attribute: "trigger-keycode" },
    triggerSelector: { type: String, attribute: "trigger-selector" },
    triggerEvent: { type: String, attribute: "trigger-event" },
    htmlResults: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    library.add(faMagnifyingGlass);
    library.add(faCircleNotch);
    library.add(faBarsStaggered);
    library.add(faCircleXmark);

    this.config = null;
    this.show = false;
    this.cssFormFocusClasses = {};
    this.commands = [
      {
        path: "Show DocDiff",
        sections: [],
        action: () => {
          const event = new CustomEvent(
            EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
          );
          document.dispatchEvent(event);
        },
      },
      {
        path: "Hide DocDiff",
        sections: [],
        action: () => {
          const event = new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_HIDE);
          document.dispatchEvent(event);
        },
      },
      {
        path: "Show Search",
        sections: [],
        action: () => {
          const event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
          document.dispatchEvent(event);
        },
      },
      {
        path: "Hide Search",
        sections: [],
        action: () => {
          const event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_HIDE);
          document.dispatchEvent(event);
        },
      },
      {
        path: "Show Flyout",
        sections: [],
        action: () => {
          const event = new CustomEvent(EVENT_READTHEDOCS_FLYOUT_SHOW);
          document.dispatchEvent(event);
        },
      },
      {
        path: "Hide Flyout",
        sections: [],
        action: () => {
          const event = new CustomEvent(EVENT_READTHEDOCS_FLYOUT_HIDE);
          document.dispatchEvent(event);
        },
      },
    ];
    this.commandResults = null;
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search commands" });
    this.currentQueryRequest = null;
    this.triggerKeycode = 191;
    this.triggerSelector = null;
    this.triggerEvent = "focusin";
    this.htmlResults = null;
  }

  loadConfig(config) {
    if (!CommandsAddon.isEnabled(config)) {
      return;
    }

    this.config = config;
    this.commands = [
      ...this.commands,
      ...(config.addons.filesections.sections || []),
    ];
    console.log("Command palette config loaded", this.commands);
  }

  firstUpdated() {
    this.className = this.className || "raised floating";
  }

  render() {
    if (this.config === null) {
      console.log("Config is null, rendering nothing");
      return nothing;
    }
    console.log("Rendering command palette");
    return this.renderCommandPalette();
  }

  renderCommandPalette() {
    console.log("Rendering command palette modal");
    return html`
      <div ?hidden=${!this.show} role="search">
        <div @click=${this.triggerClosePalette} class="background"></div>
        <div class="content">
          <form class=${classMap(this.cssFormFocusClasses)}>
            <label>${this.inputIcon.node[0]}</label>
            <input
              @input=${this.queryInput}
              @keydown=${this.selectResultKeyboard}
              @focusin=${this.queryInputFocus}
              @focusout=${this.queryInputFocus}
              placeholder="Search commands"
              type="search"
              autocomplete="off"
            />
          </form>
          <div class="results">${this.htmlResults || nothing}</div>
          <div class="footer">
            <ul class="help">
              <li><code>Enter</code> to select</li>
              <li><code>Up</code>/<code>Down</code> to navigate</li>
              <li><code>Esc</code> to close</li>
            </ul>
            <div class="credits">
              Commands powered by
              <a
                href="${addUtmParameters(
                  "https://about.readthedocs.com/",
                  "commands",
                )}"
              >
                <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderNoResultsFound() {
    console.log("Rendering no results found");
    const binoculars = icon(faBinoculars, {
      title: "Not found",
    });
    const query = this.getUserQuery();
    this.htmlResults = html`
      <div class="no-results">
        ${binoculars.node[0]}
        <p class="title">No results for <strong>"${query}"</strong></p>
      </div>
    `;
  }

  renderResults(data) {
    console.log("Rendering results", data);
    this.htmlResults = html`
      <div class="hit">
        ${data.results.map(
          (result, rindex) =>
            html`<div class="hit-block">
              <a
                @click=${(e) => this.handleCommandClick(e, result)}
                @mouseenter=${this.mouseenterResultHit}
                class="hit-block-heading"
                href="${result.path}"
              >
                <h2>${result.path}</h2>
              </a>
              ${result.sections.map(
                (section, bindex) =>
                  html`${this.renderSectionResult(
                    section,
                    `${section.id}-${rindex}-${bindex}`,
                    result,
                  )}`,
              )}
            </div>`,
        )}
      </div>
    `;
  }

  handleCommandClick(e, result) {
    e.preventDefault();
    if (result.action) {
      result.action();
    } else {
      window.location.href = result.path;
    }
    this.triggerClosePalette();
  }

  followResultLink(e) {
    // Close the modal if the link is on the same page
    const event = new CustomEvent(EVENT_READTHEDOCS_COMMANDS_HIDE);
    document.dispatchEvent(event);
  }

  renderSectionResult(section, index, result) {
    console.log("Rendering section result", section, result);
    let title = section.title;

    return html`
      <a
        @mouseenter=${this.mouseenterResultHit}
        class="hit"
        href="${result.path}#${section.id}"
      >
        <div id="hit-${index}">
          <p class="hit subheading">${title}</p>
        </div>
      </a>
    `;
  }

  getUserQuery() {
    const query = this.renderRoot.querySelector("input[type=search]").value;
    console.log("User query:", query);
    return query;
  }

  showSpinIcon() {
    console.log("Showing spin icon");
    if (this.inputIcon.iconName !== "circle-notch") {
      this.inputIcon = icon(faCircleNotch, {
        title: "Spinner",
        classes: ["spinner", "fa-spin"],
      });
    }
  }

  showMagnifierIcon() {
    console.log("Showing magnifier icon");
    this.inputIcon = icon(faMagnifyingGlass, { title: "Search" });
  }

  removeAllResults() {
    console.log("Removing all results");
    this.htmlResults = null;
  }

  fetchResults(query) {
    console.log("Fetching results for query:", query);
    this.htmlResults = null;
    this.showSpinIcon();

    // Ensure results is an array
    const results = this.commands || [];

    // Convert query to lowercase for case insensitive comparison
    const lowerCaseQuery = query.toLowerCase();

    // Simulate fetching results from in-memory data with fuzzy searching
    const data = results.filter((result) => {
      const pathMatch = result.path.toLowerCase().includes(lowerCaseQuery);
      const sectionMatch = result.sections.some((section) =>
        section.title.toLowerCase().includes(lowerCaseQuery),
      );
      return pathMatch || sectionMatch;
    });

    if (data.length > 0) {
      this.renderResults({ results: data });
    } else {
      this.renderNoResultsFound();
    }
    this.showMagnifierIcon();
  }

  queryInput(e) {
    const query = this.getUserQuery();
    console.log("Query input:", query);
    if (query.length >= MIN_CHARACTERS_QUERY) {
      this.fetchResults(query);
    } else {
      this.removeAllResults();
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

  selectResultKeyboard(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.selectNextResult(true);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      this.selectNextResult(false);
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const selected = this.renderRoot.querySelector("a.hit.active");
      // if an item is selected, then redirect to its link or execute its action
      if (selected !== null) {
        const command = this.commands.find(
          (cmd) => cmd.path === selected.textContent.trim(),
        );
        if (command && command.action) {
          command.action();
        } else {
          window.location.href = selected.href;
        }
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      this.triggerClosePalette();
    }
  }

  selectNextResult(forward) {
    const all = this.renderRoot.querySelectorAll("a.hit");
    let selected;
    let selectedIndex;
    for (const [index, element] of all.entries()) {
      if (element.classList.contains("active")) {
        selected = element;
        selectedIndex = index;
        break;
      }
    }

    const lastIndex = all.length > 0 ? all.length - 1 : 0;

    let nextIndex = 0;
    if (selectedIndex !== undefined) {
      nextIndex = forward ? selectedIndex + 1 : selectedIndex - 1;
    }

    // Check if we're at the end/start of the list, and adjust accordingly
    if (nextIndex > lastIndex) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = lastIndex;
    }

    // Remove all active elements
    for (const active of this.renderRoot.querySelectorAll("a.hit.active")) {
      active.classList.remove("active");
    }

    // Add class for active element and scroll to it
    const newActive = all[nextIndex];
    newActive.classList.add("active");
    newActive.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  mouseenterResultHit(e) {
    console.log("Mouse enter result hit");
    const activeElements = this.renderRoot.querySelectorAll("a.hit.active");
    for (const element of activeElements) {
      element.classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  }

  triggerClosePalette() {
    console.log("Triggering close palette");
    const event = new CustomEvent(EVENT_READTHEDOCS_COMMANDS_HIDE);
    document.dispatchEvent(event);
  }

  showPalette() {
    console.log("Showing palette");
    this.show = true;
    this.updateComplete.then(() => {
      const input = this.renderRoot.querySelector("input[type=search]");
      if (input) {
        input.focus();
      }
    });
  }

  closePalette() {
    console.log("Closing palette");
    this.show = false;
  }

  _handleClosePalette = (e) => {
    e.preventDefault();
    this.closePalette();
  };

  _handleShowPalette = (e) => {
    e.preventDefault();
    this.showPalette();
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(
      EVENT_READTHEDOCS_COMMANDS_SHOW,
      this._handleShowPalette,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_COMMANDS_HIDE,
      this._handleClosePalette,
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_COMMANDS_SHOW,
      this._handleShowPalette,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_COMMANDS_HIDE,
      this._handleClosePalette,
    );

    super.disconnectedCallback();
  }
}

export class CommandsAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.commands.json";
  static addonEnabledPath = "addons.filesections.enabled";
  static addonName = "Commands";
  static enabledOnHttpStatus = [200, 404];

  constructor(config) {
    super();

    let elems = document.querySelectorAll("readthedocs-commands");
    if (!elems.length) {
      elems = [new CommandPaletteElement()];

      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }
}

customElements.define("readthedocs-commands", CommandPaletteElement);
