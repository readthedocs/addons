import READTHEDOCS_LOGO from "./images/logo-light.svg";
import READTHEDOCS_LOGO_WORDMARK from "./images/logo-wordmark-light.svg";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faBars,
  faCodeBranch,
  faDownload,
  faHouse,
  faLanguage,
  faMagnifyingGlass,
  faFileLines,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { default as objectPath } from "object-path";

import styleSheet from "./flyout-v2.css";
import {
  AddonBase,
  addUtmParameters,
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
const PANEL_DOWNLOADS = "downloads";
const PANEL_VERSIONS = "versions";
const PANEL_LANGUAGES = "languages";

export class FlyoutV2Element extends LitElement {
  static elementName = "readthedocs-flyout-v2";

  static properties = {
    config: { state: true },
    expanded: { type: Boolean },
    floating: { type: Boolean },
    position: { type: String },
    activePanel: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.expanded = false;
    this.floating = true;
    this.position = "top-center";
    this.activePanel = PANEL_MENU;

    library.add(faArrowUpRightFromSquare);
    library.add(faBars);
    library.add(faCodeBranch);
    library.add(faDownload);
    library.add(faHouse);
    library.add(faLanguage);
    library.add(faMagnifyingGlass);
    library.add(faFileLines);
    library.add(faXmark);

    this.iconBars = icon(faBars, { classes: ["icon"] });
    this.iconCodeBranch = icon(faCodeBranch, { classes: ["icon"] });
    this.iconDownload = icon(faDownload, { classes: ["icon"] });
    this.iconExternalLink = icon(faArrowUpRightFromSquare, {
      classes: ["icon"],
    });
    this.iconHouse = icon(faHouse, { classes: ["icon"] });
    this.iconLanguage = icon(faLanguage, { classes: ["icon"] });
    this.iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });
    this.iconFileLines = icon(faFileLines, { classes: ["icon"] });
    this.iconClose = icon(faXmark, { classes: ["icon"] });

    this._onBarContentClick = (e) => {
      e.stopPropagation();
      this.expanded = !this.expanded;
    };
    this._onCloseClick = (e) => {
      e.stopPropagation();
      this.expanded = false;
    };
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
    this._hasDownloads =
      Object.keys(this.config.versions.current.downloads).length > 0;
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
    this.expanded = false;
  }

  _onOutsideClick = (e) => {
    if (e.target !== this) {
      this.expanded = false;
    }
  };

  // ---- Hamburger dropdown: hover to see addon icons ----

  renderHamburger() {
    return html`
      <div class="hamburger">
        <button class="hamburger-trigger" aria-label="Switch addon">
          ${this.iconBars.node[0]}
        </button>
        <div class="hamburger-dropdown">
          <button
            class=${classMap({ active: this.activePanel === PANEL_MENU })}
            @click=${(e) => this._switchPanel(PANEL_MENU, e)}
            title="Menu"
          >
            ${this.iconBars.node[0]}
          </button>
          ${this._searchEnabled
            ? html`<button
                class=${classMap({ active: this.activePanel === PANEL_SEARCH })}
                @click=${(e) => this._switchPanel(PANEL_SEARCH, e)}
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
                @click=${(e) => this._switchPanel(PANEL_FILEDIFF, e)}
                title="Changed files"
              >
                ${this.iconFileLines.node[0]}
              </button>`
            : nothing}
          ${this._hasDownloads
            ? html`<button
                class=${classMap({
                  active: this.activePanel === PANEL_DOWNLOADS,
                })}
                @click=${(e) => this._switchPanel(PANEL_DOWNLOADS, e)}
                title="Downloads"
              >
                ${this.iconDownload.node[0]}
              </button>`
            : nothing}
          ${this._hasLanguages
            ? html`<button
                class=${classMap({
                  active: this.activePanel === PANEL_LANGUAGES,
                })}
                @click=${(e) => this._switchPanel(PANEL_LANGUAGES, e)}
                title="Languages"
              >
                ${this.iconLanguage.node[0]}
              </button>`
            : nothing}
          ${this._hasVersions
            ? html`<button
                class=${classMap({
                  active: this.activePanel === PANEL_VERSIONS,
                })}
                @click=${(e) => this._switchPanel(PANEL_VERSIONS, e)}
                title="Versions"
              >
                ${this.iconCodeBranch.node[0]}
              </button>`
            : nothing}
        </div>
      </div>
    `;
  }

  // ---- Minimized bar content per active addon ----

  renderBarContent() {
    switch (this.activePanel) {
      case PANEL_SEARCH:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          ${this.iconSearch.node[0]}
          <span class="bar-text">Search docs</span>
        </span>`;
      case PANEL_FILEDIFF:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          ${this.iconFileLines.node[0]}
          <span class="bar-text">Changed files</span>
        </span>`;
      case PANEL_DOWNLOADS:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          ${this.iconDownload.node[0]}
          <span class="bar-text">Downloads</span>
        </span>`;
      case PANEL_LANGUAGES:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          ${this.iconLanguage.node[0]}
          <span class="bar-text"
            >${this.config.projects.current.language.code}</span
          >
        </span>`;
      case PANEL_VERSIONS:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          ${this.iconCodeBranch.node[0]}
          <span class="bar-text">${this.config.versions.current.slug}</span>
        </span>`;
      case PANEL_MENU:
      default:
        return html`<span
          class="bar-minimized"
          @click=${this._onBarContentClick}
        >
          <img
            class="bar-logo"
            src="${READTHEDOCS_LOGO_WORDMARK}"
            alt="Read the Docs"
          />
          ${this._hasLanguages
            ? html`<span class="bar-badge"
                >${this.iconLanguage.node[0]}
                ${this.config.projects.current.language.code}</span
              >`
            : nothing}
          ${this._hasVersions
            ? html`<span class="bar-badge"
                >${this.iconCodeBranch.node[0]}
                ${this.config.versions.current.slug}</span
              >`
            : nothing}
        </span>`;
    }
  }

  // ---- Expanded pane content ----

  renderExpandedPane() {
    switch (this.activePanel) {
      case PANEL_SEARCH:
        return html`<readthedocs-search-panel
          .config=${this.config}
        ></readthedocs-search-panel>`;
      case PANEL_FILEDIFF:
        return html`<readthedocs-filetreediff-panel
          .config=${this.config}
        ></readthedocs-filetreediff-panel>`;
      case PANEL_VERSIONS:
        return this._renderVersionsList();
      case PANEL_LANGUAGES:
        return this._renderLanguagesList();
      case PANEL_DOWNLOADS:
        return this._renderDownloadsList();
      case PANEL_MENU:
      default:
        return this._renderMenuContent();
    }
  }

  _renderMenuContent() {
    const projectHomeUrl = addUtmParameters(
      this.config.projects.current.urls.home
        .replace("readthedocs.org", "app.readthedocs.org")
        .replace("readthedocs.com", "app.readthedocs.com")
        .replace("app.app.", "app."),
      "flyout",
    );
    const vcs = this.config.addons.flyout.vcs;

    return html`
      <div class="pane-links">
        <a href="${projectHomeUrl}" class="pane-link">
          ${this.iconHouse.node[0]} <span>Project home</span>
        </a>
        ${vcs?.view_url
          ? html`<a href="${vcs.view_url}" class="pane-link" target="_blank">
              ${this.iconExternalLink.node[0]}
              <span>View source on ${vcs.name || "VCS"}</span>
            </a>`
          : nothing}
      </div>
    `;
  }

  _renderVersionsList() {
    return html`
      <ul class="pane-list">
        ${this.config.versions.active.map((version) => {
          const url = getLinkWithFilename(
            version.urls.documentation,
            this.config.readthedocs.resolver.filename,
          );
          const isCurrent = this.config.versions.current.slug === version.slug;
          return html`<li class=${classMap({ current: isCurrent })}>
            <a href="${url}">${version.slug}</a>
          </li>`;
        })}
      </ul>
    `;
  }

  _renderLanguagesList() {
    const translations = this.config.projects.translations
      .concat(this.config.projects.current)
      .sort((a, b) => a.language.code.localeCompare(b.language.code));

    return html`
      <ul class="pane-list">
        ${translations.map((t) => {
          const url = getLinkWithFilename(
            t.urls.documentation,
            this.config.readthedocs.resolver.filename,
          );
          const isCurrent = this.config.projects.current.slug === t.slug;
          return html`<li class=${classMap({ current: isCurrent })}>
            <a href="${url}">${t.language.code}</a>
          </li>`;
        })}
      </ul>
    `;
  }

  _renderDownloadsList() {
    const nameDisplay = { pdf: "PDF", epub: "EPUB", htmlzip: "HTML" };
    return html`
      <ul class="pane-list">
        ${Object.entries(this.config.versions.current.downloads).map(
          ([name, url]) =>
            html`<li><a href="${url}">${nameDisplay[name] || name}</a></li>`,
        )}
      </ul>
    `;
  }

  renderFooter() {
    return html`
      <footer class="pane-footer">
        <a
          class="footer-branding"
          href="${addUtmParameters("https://about.readthedocs.com/", "flyout")}"
          title="Hosted by Read the Docs"
        >
          <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
        </a>
      </footer>
    `;
  }

  render() {
    if (this.config === null) {
      return nothing;
    }

    const classes = {
      container: true,
      floating: this.floating,
      expanded: this.expanded,
    };
    classes[this.position] = true;

    return html`
      <div class=${classMap(classes)}>
        <header class="bar">
          ${this.renderHamburger()} ${this.renderBarContent()}
        </header>
        ${this.expanded
          ? html`
              <main class="pane">
                <div class="pane-header">
                  <button
                    class="pane-close"
                    @click=${this._onCloseClick}
                    title="Close"
                    aria-label="Close"
                  >
                    ${this.iconClose.node[0]}
                  </button>
                </div>
                <div class="pane-body">${this.renderExpandedPane()}</div>
                ${this.renderFooter()}
              </main>
            `
          : nothing}
      </div>
    `;
  }

  _showFlyout = () => {
    this.expanded = true;
  };
  _hideFlyout = () => {
    this.expanded = false;
  };
  _handlePanelSet = (e) => {
    const panelName = e.detail?.panel;
    if (panelName) {
      this.activePanel = panelName;
      this.expanded = true;
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
