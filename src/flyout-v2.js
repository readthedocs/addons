import READTHEDOCS_LOGO_WORDMARK from "./images/logo-wordmark-light.svg";
import READTHEDOCS_LOGO from "./images/logo-light.svg";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faCodeBranch,
  faGear,
  faLanguage,
  faMagnifyingGlass,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { default as objectPath } from "object-path";

import styleSheet from "./flyout-v2.css";
import {
  AddonBase,
  getQueryParam,
  getLinkWithFilename,
  docTool,
} from "./utils";
import {
  EVENT_READTHEDOCS_FLYOUT_HIDE,
  EVENT_READTHEDOCS_FLYOUT_SHOW,
  EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
} from "./events";

import "./search-panel.js";
import "./filetreediff-panel.js";

const PANEL_MENU = "menu";
const PANEL_SEARCH = "search";
const PANEL_FILEDIFF = "filetreediff";
const PANEL_CONFIG = "config";

export class FlyoutV2Element extends LitElement {
  static elementName = "readthedocs-flyout-v2";

  static properties = {
    config: { state: true },
    floating: { type: Boolean },
    position: { type: String },
    activePanel: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.floating = true;
    this.position = "top-center";
    this.activePanel = PANEL_MENU;

    library.add(faBars);
    library.add(faCodeBranch);
    library.add(faGear);
    library.add(faLanguage);
    library.add(faMagnifyingGlass);
    library.add(faFileLines);

    this.iconBars = icon(faBars, { classes: ["icon"] });
    this.iconGear = icon(faGear, { classes: ["icon"] });
    this.iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });
    this.iconFileLines = icon(faFileLines, { classes: ["icon"] });

    this._onMenuClick = (e) => this._switchPanel(PANEL_MENU, e);
    this._onSearchClick = (e) => this._switchPanel(PANEL_SEARCH, e);
    this._onFileDiffClick = (e) => this._switchPanel(PANEL_FILEDIFF, e);
    this._onConfigClick = (e) => this._switchPanel(PANEL_CONFIG, e);
  }

  loadConfig(config) {
    if (!FlyoutV2Addon.isEnabled(config)) {
      return;
    }
    this.config = config;

    const dashboardPosition = objectPath.get(
      this.config,
      "addons.flyout.position",
      null,
    );
    if (dashboardPosition) {
      this.position = dashboardPosition;
    }

    this._searchEnabled = objectPath.get(
      this.config,
      "addons.search.enabled",
      false,
    );
    this._fileTreeDiffEnabled =
      objectPath.get(this.config, "versions.current.type") === "external" &&
      objectPath.get(this.config, "addons.filetreediff.enabled", false);
    this._hasVersions =
      this.config.versions.active.length > 0 &&
      this.config.projects.current.versioning_scheme !==
        "single_version_without_translations";
    this._hasLanguages = this.config.projects.translations.length > 0;
  }

  _switchPanel(panelName, e) {
    if (e) {
      e.stopPropagation();
    }
    this.activePanel = panelName;
  }

  _onOutsideClick = (e) => {
    if (e.target !== this) {
      this.activePanel = PANEL_MENU;
    }
  };

  _onVersionChange(e) {
    const url = e.target.value;
    if (url) {
      window.location.href = url;
    }
  }

  _onLanguageChange(e) {
    const url = e.target.value;
    if (url) {
      window.location.href = url;
    }
  }

  // ---- Hamburger dropdown ----

  renderHamburger() {
    return html`
      <div class="hamburger">
        <button class="hamburger-trigger" aria-label="Switch addon">
          ${this.iconBars.node[0]}
        </button>
        <div class="hamburger-dropdown">
          <button
            class=${classMap({ active: this.activePanel === PANEL_MENU })}
            @click=${this._onMenuClick}
            title="Menu"
          >
            ${this.iconBars.node[0]}
          </button>
          ${this._searchEnabled
            ? html`<button
                class=${classMap({ active: this.activePanel === PANEL_SEARCH })}
                @click=${this._onSearchClick}
                title="Search"
              >
                ${this.iconSearch.node[0]}
              </button>`
            : nothing}
          ${this._fileTreeDiffEnabled
            ? html`<button
                class=${classMap({
                  active: this.activePanel === PANEL_FILEDIFF,
                })}
                @click=${this._onFileDiffClick}
                title="Changed files"
              >
                ${this.iconFileLines.node[0]}
              </button>`
            : nothing}
          <button
            class=${classMap({ active: this.activePanel === PANEL_CONFIG })}
            @click=${this._onConfigClick}
            title="Settings"
          >
            ${this.iconGear.node[0]}
          </button>
        </div>
      </div>
    `;
  }

  // ---- Bar content per active addon ----

  renderBarContent() {
    switch (this.activePanel) {
      case PANEL_SEARCH:
        return this._renderSearchBar();
      case PANEL_FILEDIFF:
        return this._renderFileDiffBar();
      case PANEL_CONFIG:
        return this._renderConfigBar();
      case PANEL_MENU:
      default:
        return this._renderMenuBar();
    }
  }

  _renderMenuBar() {
    const currentVersionSlug = this.config.versions.current.slug;
    const currentLangCode = this.config.projects.current.language.code;

    return html`
      <div class="bar-content">
        <img
          class="bar-logo"
          src="${READTHEDOCS_LOGO_WORDMARK}"
          alt="Read the Docs"
        />
        ${this._hasLanguages
          ? html`<select
              class="bar-select"
              @change=${this._onLanguageChange}
              title="Switch language"
            >
              ${this.config.projects.translations
                .concat(this.config.projects.current)
                .sort((a, b) => a.language.code.localeCompare(b.language.code))
                .map((t) => {
                  const url = getLinkWithFilename(
                    t.urls.documentation,
                    this.config.readthedocs.resolver.filename,
                  );
                  return html`<option
                    value="${url}"
                    ?selected=${t.slug === this.config.projects.current.slug}
                  >
                    ${t.language.code}
                  </option>`;
                })}
            </select>`
          : nothing}
        ${this._hasVersions
          ? html`<select
              class="bar-select"
              @change=${this._onVersionChange}
              title="Switch version"
            >
              ${this.config.versions.active.map((v) => {
                const url = getLinkWithFilename(
                  v.urls.documentation,
                  this.config.readthedocs.resolver.filename,
                );
                return html`<option
                  value="${url}"
                  ?selected=${v.slug === currentVersionSlug}
                >
                  ${v.slug}
                </option>`;
              })}
            </select>`
          : nothing}
        <a
          class="bar-branding"
          href="https://about.readthedocs.com/"
          title="Hosted by Read the Docs"
        >
          <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
        </a>
      </div>
    `;
  }

  _renderSearchBar() {
    return html`
      <div class="bar-content">
        <readthedocs-search-panel
          .config=${this.config}
        ></readthedocs-search-panel>
      </div>
    `;
  }

  _renderFileDiffBar() {
    return html`
      <div class="bar-content">
        <readthedocs-filetreediff-panel
          .config=${this.config}
        ></readthedocs-filetreediff-panel>
      </div>
    `;
  }

  _renderConfigBar() {
    return html`
      <div class="bar-content">
        <span class="bar-label">${this.iconGear.node[0]} Settings</span>
        <span class="config-placeholder"
          >Configuration options coming soon</span
        >
      </div>
    `;
  }

  // ---- Render ----

  render() {
    if (this.config === null) {
      return nothing;
    }

    const classes = {
      container: true,
      floating: this.floating,
    };
    classes[this.position] = true;

    return html`
      <div class=${classMap(classes)}>
        ${this.renderHamburger()} ${this.renderBarContent()}
      </div>
    `;
  }

  _showFlyout = () => {
    /* no-op for v2 — bar is always visible */
  };
  _hideFlyout = () => {
    this.activePanel = PANEL_MENU;
  };
  _handlePanelSet = (e) => {
    const panelName = e.detail?.panel;
    if (panelName) {
      this.activePanel = panelName;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(EVENT_READTHEDOCS_FLYOUT_SHOW, this._showFlyout);
    document.addEventListener(EVENT_READTHEDOCS_FLYOUT_HIDE, this._hideFlyout);
    document.addEventListener(
      EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
      this._handlePanelSet,
    );
    window.addEventListener("click", this._onOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_SHOW,
      this._showFlyout,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_HIDE,
      this._hideFlyout,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
      this._handlePanelSet,
    );
    window.removeEventListener("click", this._onOutsideClick);
    super.disconnectedCallback();
  }
}

export class FlyoutV2Addon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.flyout.json";
  static addonEnabledPath = "addons.flyout.enabled";
  static addonName = "FlyoutV2";
  static elementClass = FlyoutV2Element;

  static isEnabled(config, httpStatus) {
    return (
      getQueryParam("readthedocs-flyout-v2") === "true" &&
      super.isEnabled(config, httpStatus)
    );
  }

  static requiresUrlParam() {
    return docTool.isSinglePageApplication();
  }
}

customElements.define(FlyoutV2Element.elementName, FlyoutV2Element);
