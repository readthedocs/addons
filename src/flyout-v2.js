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

// Import panel components so their custom elements are registered
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
    opened: { type: Boolean },
    floating: { type: Boolean },
    position: { type: String },
    activePanel: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.opened = false;
    this.floating = true;
    this.position = "top-center";
    // Default to the menu panel when opened - shows RTD project info.
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

    // Bound handlers - avoids creating new function refs on every render
    this._onMenuClick = (e) => this._setPanel(PANEL_MENU, e);
    this._onSearchClick = (e) => this._setPanel(PANEL_SEARCH, e);
    this._onFileDiffClick = (e) => this._setPanel(PANEL_FILEDIFF, e);
    this._onDownloadsClick = (e) => this._setPanel(PANEL_DOWNLOADS, e);
    this._onVersionsClick = (e) => this._setPanel(PANEL_VERSIONS, e);
    this._onLanguagesClick = (e) => this._setPanel(PANEL_LANGUAGES, e);
    this._onToggleClick = (e) => this._toggleOpen(e);
    this._onCloseClick = (e) => this._close(e);
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

    // Cache config-derived flags so render doesn't recompute them
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

  _open() {
    this.opened = true;
  }

  _close(e) {
    if (e) {
      e.stopPropagation();
    }
    this.opened = false;
    this.activePanel = PANEL_MENU;
  }

  _toggleOpen(e) {
    if (e) {
      e.stopPropagation();
    }
    if (this.opened) {
      this._close();
    } else {
      this._open();
    }
  }

  _setPanel(panelName, e) {
    if (e) {
      e.stopPropagation();
    }
    if (this.opened && this.activePanel === panelName) {
      this._close();
    } else {
      this.activePanel = panelName;
      this._open();
    }
  }

  _onOutsideClick = (e) => {
    if (e.target !== this) {
      this._close();
    }
  };

  _renderIconButton({ panel, title, ariaLabel, iconNode, onClick, label }) {
    return html`
      <button
        class=${classMap({
          "sidebar-icon": true,
          active: this.activePanel === panel,
        })}
        @click=${onClick}
        title=${title}
        aria-label=${ariaLabel}
      >
        ${iconNode}
        ${label ? html`<span class="sidebar-label">${label}</span>` : nothing}
      </button>
    `;
  }

  renderSidebar() {
    // Left vertical icon column - persistent navigation between feature panes
    return html`
      <nav class="sidebar">
        ${this._renderIconButton({
          panel: PANEL_MENU,
          title: "Menu",
          ariaLabel: "Menu",
          iconNode: this.iconBars.node[0],
          onClick: this._onMenuClick,
        })}
        ${this._searchEnabled
          ? this._renderIconButton({
              panel: PANEL_SEARCH,
              title: "Search",
              ariaLabel: "Search docs",
              iconNode: this.iconSearch.node[0],
              onClick: this._onSearchClick,
            })
          : nothing}
        ${this._fileTreeDiffEnabled
          ? this._renderIconButton({
              panel: PANEL_FILEDIFF,
              title: "Changed files",
              ariaLabel: "Changed files",
              iconNode: this.iconFileLines.node[0],
              onClick: this._onFileDiffClick,
            })
          : nothing}
        ${this._hasDownloads
          ? this._renderIconButton({
              panel: PANEL_DOWNLOADS,
              title: "Downloads",
              ariaLabel: "Downloads",
              iconNode: this.iconDownload.node[0],
              onClick: this._onDownloadsClick,
            })
          : nothing}
        ${this._hasLanguages
          ? this._renderIconButton({
              panel: PANEL_LANGUAGES,
              title: "Switch language",
              ariaLabel: "Languages",
              iconNode: this.iconLanguage.node[0],
              onClick: this._onLanguagesClick,
              label: this.config.projects.current.language.code,
            })
          : nothing}
        ${this._hasVersions
          ? this._renderIconButton({
              panel: PANEL_VERSIONS,
              title: "Switch version",
              ariaLabel: "Versions",
              iconNode: this.iconCodeBranch.node[0],
              onClick: this._onVersionsClick,
              label: this.config.versions.current.slug,
            })
          : nothing}
      </nav>
    `;
  }

  renderPaneHeader(title) {
    return html`
      <header class="pane-header">
        <h2>${title}</h2>
        <button
          class="pane-close"
          @click=${this._onCloseClick}
          title="Close"
          aria-label="Close"
        >
          ${this.iconClose.node[0]}
        </button>
      </header>
    `;
  }

  renderMenuPane() {
    const projectHomeUrl = addUtmParameters(
      this.config.projects.current.urls.home
        .replace("readthedocs.org", "app.readthedocs.org")
        .replace("readthedocs.com", "app.readthedocs.com")
        .replace("app.app.", "app."),
      "flyout",
    );
    const vcs = this.config.addons.flyout.vcs;
    const hasVCS = vcs && vcs.view_url;

    return html`
      <div class="pane menu-pane">
        <header class="pane-header menu-header">
          <img
            class="project-logo"
            src="${READTHEDOCS_LOGO_WORDMARK}"
            alt="Read the Docs"
          />
          <button
            class="pane-close"
            @click=${this._onCloseClick}
            title="Close"
            aria-label="Close"
          >
            ${this.iconClose.node[0]}
          </button>
        </header>
        <div class="pane-body">
          <dl class="menu-info">
            <dt>Project</dt>
            <dd>${this.config.projects.current.slug}</dd>
            ${this._hasVersions
              ? html`
                  <dt>Version</dt>
                  <dd class="current">${this.config.versions.current.slug}</dd>
                `
              : nothing}
            ${this._hasLanguages
              ? html`
                  <dt>Language</dt>
                  <dd>${this.config.projects.current.language.code}</dd>
                `
              : nothing}
          </dl>
          <div class="menu-links">
            <a href="${projectHomeUrl}" class="menu-link">
              ${this.iconHouse.node[0]}
              <span>Project home</span>
            </a>
            ${hasVCS
              ? html`
                  <a href="${vcs.view_url}" class="menu-link" target="_blank">
                    ${this.iconExternalLink.node[0]}
                    <span>View source on ${vcs.name || "VCS"}</span>
                  </a>
                `
              : nothing}
          </div>
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  renderVersionsPane() {
    return html`
      <div class="pane versions-pane">
        ${this.renderPaneHeader("Versions")}
        <div class="pane-body">
          ${!this.config.versions.active.length ||
          this.config.projects.current.versioning_scheme ===
            "single_version_without_translations"
            ? html`<p class="pane-empty">No versions available</p>`
            : html`
                <ul class="pane-list">
                  ${this.config.versions.active.map((version) => {
                    const url = getLinkWithFilename(
                      version.urls.documentation,
                      this.config.readthedocs.resolver.filename,
                    );
                    const isCurrent =
                      this.config.versions.current.slug === version.slug;
                    return html`
                      <li class=${classMap({ current: isCurrent })}>
                        <a href="${url}">${version.slug}</a>
                      </li>
                    `;
                  })}
                </ul>
              `}
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  renderLanguagesPane() {
    // Add the current project as "translation" and sort by language code
    const translations = this.config.projects.translations
      .concat(this.config.projects.current)
      .sort((a, b) => a.language.code.localeCompare(b.language.code));

    return html`
      <div class="pane languages-pane">
        ${this.renderPaneHeader("Languages")}
        <div class="pane-body">
          ${!this.config.projects.translations.length
            ? html`<p class="pane-empty">No translations available</p>`
            : html`
                <ul class="pane-list">
                  ${translations.map((translation) => {
                    const url = getLinkWithFilename(
                      translation.urls.documentation,
                      this.config.readthedocs.resolver.filename,
                    );
                    const isCurrent =
                      this.config.projects.current.slug === translation.slug;
                    return html`
                      <li class=${classMap({ current: isCurrent })}>
                        <a href="${url}">${translation.language.code}</a>
                      </li>
                    `;
                  })}
                </ul>
              `}
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  renderDownloadsPane() {
    const downloads = this.config.versions.current.downloads;
    const nameDisplay = { pdf: "PDF", epub: "EPUB", htmlzip: "HTML" };

    return html`
      <div class="pane downloads-pane">
        ${this.renderPaneHeader("Downloads")}
        <div class="pane-body">
          ${!Object.keys(downloads).length
            ? html`<p class="pane-empty">No downloads available</p>`
            : html`
                <ul class="pane-list">
                  ${Object.entries(downloads).map(
                    ([name, url]) => html`
                      <li>
                        <a href="${url}">${nameDisplay[name] || name}</a>
                      </li>
                    `,
                  )}
                </ul>
              `}
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  renderSearchPane() {
    return html`
      <div class="pane search-pane">
        ${this.renderPaneHeader("Search")}
        <div class="pane-body">
          <readthedocs-search-panel
            .config=${this.config}
          ></readthedocs-search-panel>
        </div>
        ${this.renderFooter()}
      </div>
    `;
  }

  renderFileDiffPane() {
    return html`
      <div class="pane filediff-pane">
        ${this.renderPaneHeader("Changed Files")}
        <div class="pane-body">
          <readthedocs-filetreediff-panel
            .config=${this.config}
          ></readthedocs-filetreediff-panel>
        </div>
        ${this.renderFooter()}
      </div>
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

  renderPane() {
    switch (this.activePanel) {
      case PANEL_SEARCH:
        return this.renderSearchPane();
      case PANEL_FILEDIFF:
        return this.renderFileDiffPane();
      case PANEL_VERSIONS:
        return this.renderVersionsPane();
      case PANEL_LANGUAGES:
        return this.renderLanguagesPane();
      case PANEL_DOWNLOADS:
        return this.renderDownloadsPane();
      case PANEL_MENU:
      default:
        return this.renderMenuPane();
    }
  }

  updateCSSClasses() {
    this.classes = {
      container: true,
      floating: this.floating,
      opened: this.opened,
    };
    this.classes[this.position] = true;
  }

  render() {
    if (this.config === null) {
      return nothing;
    }

    this.updateCSSClasses();

    return html`
      <div class=${classMap(this.classes)}>
        <div class="shell">
          ${this.renderSidebar()}
          ${this.opened
            ? html`<div class="pane-container">${this.renderPane()}</div>`
            : nothing}
        </div>
      </div>
    `;
  }

  _showFlyout = () => {
    this._open();
  };

  _hideFlyout = () => {
    this._close();
  };

  _handlePanelSet = (e) => {
    const panelName = e.detail && e.detail.panel;
    if (panelName) {
      this._setPanel(panelName);
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

/**
 * Flyout V2 addon
 *
 * New panel-based flyout UI. Can run alongside the original FlyoutAddon
 * for testing. Enable by adding ?readthedocs-flyout-v2=true to the URL.
 *
 * @param {Object} config - Addon configuration object
 */
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
