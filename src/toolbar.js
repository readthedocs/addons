import { ajv } from "./data-validation";
import READTHEDOCS_LOGO from "./images/logo-light.svg";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCodeBranch,
  faCaretDown,
  faLanguage,
  faMagnifyingGlass,
  faDownload,
  faLink,
  faBell,
  faFilePdf,
  faBook,
  faFileZipper,
  faHammer,
  faHouse,
  faStar,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { default as objectPath } from "object-path";

import styleSheet from "./toolbar.css";
import {
  AddonBase,
  addUtmParameters,
  getLinkWithFilename,
  docTool,
} from "./utils";
import {
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_FLYOUT_HIDE,
  EVENT_READTHEDOCS_FLYOUT_SHOW,
} from "./events";

// How long before toolbar auto-hides (ms)
const AUTO_HIDE_DELAY = 4000;

export class ToolbarElement extends LitElement {
  static elementName = "readthedocs-toolbar";

  static properties = {
    config: { state: true },
    autoHidden: { state: true },
    activePanel: { state: true },
    hasNotifications: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();

    library.add(
      faCodeBranch,
      faCaretDown,
      faLanguage,
      faMagnifyingGlass,
      faDownload,
      faLink,
      faBell,
      faFilePdf,
      faBook,
      faFileZipper,
      faHammer,
      faHouse,
      faStar,
      faThumbtack,
    );

    this.config = null;
    this.autoHidden = false;
    this.activePanel = null; // which dropdown is open: 'version', 'language', 'search', 'downloads', 'links', 'notifications'
    this.autoHideTimer = null;
    this.hasNotifications = true;
  }

  loadConfig(config) {
    if (!ToolbarAddon.isEnabled(config)) {
      return;
    }
    this.config = config;
    this.scheduleAutoHide();
  }

  // === Auto-hide behavior ===

  scheduleAutoHide() {
    this.cancelAutoHide();
    this.autoHideTimer = setTimeout(() => {
      if (!this.activePanel) {
        this.autoHidden = true;
        this.classList.add("auto-hidden");
      }
    }, AUTO_HIDE_DELAY);
  }

  cancelAutoHide() {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
  }

  _onMouseEnter = () => {
    this.cancelAutoHide();
    this.autoHidden = false;
    this.classList.remove("auto-hidden");
  };

  _onMouseLeave = () => {
    if (!this.activePanel) {
      this.scheduleAutoHide();
    }
  };

  _onOutsideClick = (e) => {
    if (e.target !== this && !this.contains(e.target)) {
      this.activePanel = null;
      this.scheduleAutoHide();
    }
  };

  // === Panel toggle ===

  togglePanel(panelName) {
    if (this.activePanel === panelName) {
      this.activePanel = null;
      this.scheduleAutoHide();
    } else {
      this.activePanel = panelName;
      this.cancelAutoHide();

      // Focus search input when opening search
      if (panelName === "search") {
        this.updateComplete.then(() => {
          const input = this.renderRoot.querySelector(".search-input");
          if (input) input.focus();
        });
      }
    }
  }

  // === Render: Logo ===

  renderLogo() {
    return html`
      <a
        class="logo"
        href="${addUtmParameters("https://about.readthedocs.com/", "toolbar")}"
        title="Read the Docs"
      >
        <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
      </a>
    `;
  }

  // === Render: Version selector ===

  renderVersionButton() {
    if (
      this.config.projects.current.versioning_scheme ===
      "single_version_without_translations"
    ) {
      return nothing;
    }

    const iconBranch = icon(faCodeBranch, { classes: ["icon"] });
    const iconCaret = icon(faCaretDown, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "version" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("version");
        }}
        title="Version selector"
      >
        ${iconBranch.node[0]}
        <span class="label accent">${this.config.versions.current.slug}</span>
        <span class="caret">${iconCaret.node[0]}</span>
      </button>
      ${this.renderVersionDropdown()}
    `;
  }

  renderVersionDropdown() {
    if (!this.config.versions.active.length || this.activePanel !== "version") {
      return nothing;
    }

    const iconBranch = icon(faCodeBranch, { classes: ["icon-default"] });
    const iconStarNode = icon(faStar, { classes: ["icon-default"] });

    // Determine default version
    const defaultVersion = this.config.projects.current.default_version;

    // Build version links
    const getVersionLink = (version) => {
      return getLinkWithFilename(
        version.urls.documentation,
        this.config.readthedocs.resolver.filename,
      );
    };

    const isCurrent = (version) =>
      this.config.versions.current.slug === version.slug;

    return html`
      <div class="dropdown open">
        <div class="dropdown-header">Versions</div>
        <ul class="dropdown-list">
          ${this.config.versions.active.map(
            (version) => html`
              <li class=${isCurrent(version) ? "current" : ""}>
                <a href="${getVersionLink(version)}">
                  ${version.slug === defaultVersion
                    ? html`${iconBranch.node[0]}${iconStarNode.node[0]}`
                    : nothing}
                  ${version.slug}
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }

  // === Render: Language selector ===

  renderLanguageButton() {
    if (!this.config.projects.translations.length) {
      return nothing;
    }

    const iconLang = icon(faLanguage, { classes: ["icon"] });
    const iconCaret = icon(faCaretDown, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "language" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("language");
        }}
        title="Language selector"
      >
        ${iconLang.node[0]}
        <span class="label">${this.config.projects.current.language.code}</span>
        <span class="caret">${iconCaret.node[0]}</span>
      </button>
      ${this.renderLanguageDropdown()}
    `;
  }

  renderLanguageDropdown() {
    if (this.activePanel !== "language") {
      return nothing;
    }

    // Combine current project + translations, sort by language code
    let translations = this.config.projects.translations.concat(
      this.config.projects.current,
    );
    translations = translations.sort((a, b) =>
      a.language.code.localeCompare(b.language.code),
    );

    return html`
      <div class="dropdown open">
        <div class="dropdown-header">Languages</div>
        <ul class="dropdown-list">
          ${translations.map((translation) => {
            const url = getLinkWithFilename(
              translation.urls.documentation,
              this.config.readthedocs.resolver.filename,
            );
            const isCurrent =
              this.config.projects.current.slug === translation.slug;
            return html`
              <li class=${isCurrent ? "current" : ""}>
                <a href="${url}">${translation.language.code}</a>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  // === Render: Search ===

  renderSearchButton() {
    const searchEnabled = objectPath.get(
      this.config,
      "addons.search.enabled",
      false,
    );
    if (!searchEnabled) {
      return nothing;
    }

    const iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "search" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("search");
        }}
        title="Search docs (/)"
      >
        ${iconSearch.node[0]}
      </button>
      ${this.renderSearchPanel()}
    `;
  }

  renderSearchPanel() {
    if (this.activePanel !== "search") {
      return nothing;
    }

    const iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });

    return html`
      <div class="search-panel open">
        <div class="search-input-wrap">
          ${iconSearch.node[0]}
          <input
            type="search"
            class="search-input"
            placeholder="Search docs..."
            autocomplete="off"
            @focusin=${this._onSearchFocus}
          />
        </div>
        <div class="search-results">
          <div
            style="padding: 1rem; color: var(--readthedocs-toolbar-color-muted); text-align: center;"
          >
            Type to search...
          </div>
        </div>
        <div class="search-footer">
          <span
            ><kbd>&uarr;</kbd> <kbd>&darr;</kbd> navigate &nbsp;
            <kbd>Enter</kbd> select &nbsp; <kbd>Esc</kbd> close</span
          >
          <span>Search by Read the Docs</span>
        </div>
      </div>
    `;
  }

  _onSearchFocus = () => {
    // Dispatch event to open the existing full search modal
    // This bridges the toolbar search button to the existing search addon
    const searchEvent = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
    document.dispatchEvent(searchEvent);

    // Close the toolbar search panel and open the real search modal instead
    this.activePanel = null;
  };

  // === Render: Downloads ===

  renderDownloadsButton() {
    if (!Object.keys(this.config.versions.current.downloads).length) {
      return nothing;
    }

    const iconDl = icon(faDownload, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "downloads" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("downloads");
        }}
        title="Downloads"
      >
        ${iconDl.node[0]}
      </button>
      ${this.renderDownloadsDropdown()}
    `;
  }

  renderDownloadsDropdown() {
    if (this.activePanel !== "downloads") {
      return nothing;
    }

    const nameDisplay = {
      pdf: "PDF",
      epub: "EPUB",
      htmlzip: "HTML",
    };

    const nameIcons = {
      pdf: icon(faFilePdf, { classes: ["icon"] }),
      epub: icon(faBook, { classes: ["icon"] }),
      htmlzip: icon(faFileZipper, { classes: ["icon"] }),
    };

    return html`
      <div class="dropdown open">
        <div class="dropdown-header">Downloads</div>
        <ul class="dropdown-list">
          ${Object.entries(this.config.versions.current.downloads).map(
            ([name, url]) => html`
              <li>
                <a href="${url}">
                  ${nameIcons[name] ? nameIcons[name].node[0] : nothing}
                  ${nameDisplay[name] || name}
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }

  // === Render: Links (VCS + RTD) ===

  renderLinksButton() {
    const iconLinkNode = icon(faLink, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "links" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("links");
        }}
        title="Project links"
      >
        ${iconLinkNode.node[0]}
      </button>
      ${this.renderLinksDropdown()}
    `;
  }

  renderLinksDropdown() {
    if (this.activePanel !== "links") {
      return nothing;
    }

    const iconHouseNode = icon(faHouse, { classes: ["icon"] });
    const iconHammerNode = icon(faHammer, { classes: ["icon"] });

    const hasVCS =
      this.config.addons.flyout.vcs && this.config.addons.flyout.vcs.view_url;

    const projectHome = addUtmParameters(
      this.config.projects.current.urls.home
        .replace("readthedocs.org", "app.readthedocs.org")
        .replace("readthedocs.com", "app.readthedocs.com")
        .replace("app.app.", "app."),
      "toolbar",
    );

    const buildsUrl = addUtmParameters(
      this.config.projects.current.urls.builds
        .replace("readthedocs.org", "app.readthedocs.org")
        .replace("readthedocs.com", "app.readthedocs.com")
        .replace("app.app.", "app."),
      "toolbar",
    );

    return html`
      <div class="dropdown open">
        <div class="dropdown-header">Links</div>
        <ul class="dropdown-list">
          ${hasVCS
            ? html`<li>
                <a href="${this.config.addons.flyout.vcs.view_url}">
                  View on ${this.config.addons.flyout.vcs.name}
                </a>
              </li>`
            : nothing}
          <li>
            <a href="${projectHome}"> ${iconHouseNode.node[0]} Project Home </a>
          </li>
          <li>
            <a href="${buildsUrl}"> ${iconHammerNode.node[0]} Builds </a>
          </li>
        </ul>
      </div>
    `;
  }

  // === Render: Notifications bell ===

  renderNotificationsButton() {
    const iconBellNode = icon(faBell, { classes: ["icon"] });

    return html`
      <div class="divider"></div>
      <button
        class="btn ${this.activePanel === "notifications" ? "active" : ""}"
        @click=${(e) => {
          e.stopPropagation();
          this.togglePanel("notifications");
        }}
        title="Notifications"
      >
        ${iconBellNode.node[0]}
        ${this.hasNotifications ? html`<span class="badge"></span>` : nothing}
      </button>
      ${this.renderNotificationsDropdown()}
    `;
  }

  renderNotificationsDropdown() {
    if (this.activePanel !== "notifications") {
      return nothing;
    }

    // Build notification items based on version state
    const notifications = [];

    // Check for non-stable version warning
    const stableVersion = this.config.versions.active.find(
      (v) => v.slug === "stable",
    );
    const currentSlug = this.config.versions.current.slug;
    const defaultVersion = this.config.projects.current.default_version;

    if (
      stableVersion &&
      currentSlug !== "stable" &&
      currentSlug !== defaultVersion
    ) {
      if (currentSlug === "latest") {
        notifications.push({
          title: "Latest development version",
          message: "You are reading the latest development version.",
        });
      } else {
        notifications.push({
          title: "Older version",
          message: `You may be reading an old version. Stable is available.`,
        });
      }
    }

    if (this.config.versions.current.type === "external") {
      notifications.push({
        title: "Pull request build",
        message: "This page was created from a pull request build.",
      });
    }

    if (!notifications.length) {
      this.hasNotifications = false;
      return html`
        <div class="dropdown notification-history open">
          <div class="dropdown-header">Notifications</div>
          <div
            style="padding: 1rem; text-align: center; color: var(--readthedocs-toolbar-color-muted); font-size: 0.8rem;"
          >
            No notifications
          </div>
        </div>
      `;
    }

    return html`
      <div class="dropdown notification-history open">
        <div class="dropdown-header">Notifications</div>
        ${notifications.map(
          (n) => html`
            <div class="notification-history-item">
              <div>
                <strong>${n.title}</strong><br />
                <span
                  style="font-size: 0.75rem; color: var(--readthedocs-toolbar-color-muted);"
                  >${n.message}</span
                >
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }

  // === Main render ===

  render() {
    if (this.config === null) {
      return nothing;
    }

    return html`
      <div class="bar">
        ${this.renderLogo()} ${this.renderVersionButton()}
        ${this.renderLanguageButton()} ${this.renderSearchButton()}
        ${this.renderDownloadsButton()} ${this.renderLinksButton()}
        ${this.renderNotificationsButton()}
      </div>
    `;
  }

  // === Lifecycle ===

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mouseenter", this._onMouseEnter);
    this.addEventListener("mouseleave", this._onMouseLeave);
    window.addEventListener("click", this._onOutsideClick);

    // Global "/" hotkey for search
    document.addEventListener("keydown", this._onGlobalKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this._onMouseEnter);
    this.removeEventListener("mouseleave", this._onMouseLeave);
    window.removeEventListener("click", this._onOutsideClick);
    document.removeEventListener("keydown", this._onGlobalKeydown);
    this.cancelAutoHide();
    super.disconnectedCallback();
  }

  _onGlobalKeydown = (e) => {
    if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const tag = document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      this.autoHidden = false;
      this.classList.remove("auto-hidden");
      this.togglePanel("search");
    }
  };
}

/**
 * Toolbar addon - New top-center UI (issue #574)
 *
 * Replaces the bottom-corner flyout with a top-center toolbar.
 * Icon-based addon buttons with dropdown panels for version/language selection,
 * search, downloads, and project links.
 *
 * @param {Object} config - Addon configuration object
 */
export class ToolbarAddon extends AddonBase {
  // Reuse the flyout validation since toolbar is the replacement
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.flyout.json";
  static addonEnabledPath = "addons.flyout.enabled";
  static addonName = "Toolbar";
  static elementClass = ToolbarElement;

  static requiresUrlParam() {
    return docTool.isSinglePageApplication();
  }
}

customElements.define(ToolbarElement.elementName, ToolbarElement);
