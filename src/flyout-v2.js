import READTHEDOCS_LOGO from "./images/logo-light.svg";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowUpRightFromSquare,
  faBars,
  faCircleInfo,
  faFileLines,
  faGear,
  faHammer,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { default as objectPath } from "object-path";

import styleSheet from "./flyout-v2.css";
import {
  AddonBase,
  addUtmParameters,
  docTool,
  FLYOUT_V2_QUERY_PARAM,
  getLinkWithFilename,
  isFlyoutV2Enabled,
} from "./utils";
import {
  EVENT_READTHEDOCS_FLYOUT_HIDE,
  EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
  EVENT_READTHEDOCS_FLYOUT_SHOW,
  EVENT_READTHEDOCS_SEARCH_SHOW,
} from "./events";

import "./search-panel.js";
import "./filetreediff-panel.js";

export const PANEL_MENU = "menu";
export const PANEL_SEARCH = "search";
export const PANEL_FILEDIFF = "filetreediff";
export const PANEL_SETTINGS = "settings";

const POSITIONS = [
  "top-center",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];
const DEFAULT_POSITION = "top-center";

// Idle time before the bar slides away, leaving a handle to hover.
const AUTO_HIDE_DELAY = 4000;

const DOWNLOAD_NAMES = { pdf: "PDF", epub: "EPUB", htmlzip: "HTML" };

// Dashboard URLs come back on the legacy domain; point at the app.
function toAppUrl(url) {
  return url
    .replace("readthedocs.org", "app.readthedocs.org")
    .replace("readthedocs.com", "app.readthedocs.com")
    .replace("app.app.", "app.");
}

/**
 * Flyout v2: a single bar that hosts the active addon's UI inline.
 *
 * The hamburger switches which addon is shown. There is no expanded
 * state: each addon renders a compact, bar-sized version of itself.
 * When idle the bar slides away and hovering the remaining handle
 * brings it back.
 */
export class FlyoutV2Element extends LitElement {
  static elementName = "readthedocs-flyout-v2";

  static properties = {
    config: { state: true },
    position: { type: String },
    activePanel: { state: true },
    hamburgerOpen: { state: true },
    collapsed: { state: true },
    autoHide: { state: true },
    autoHideDelay: { type: Number, attribute: "auto-hide-delay" },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.position = DEFAULT_POSITION;
    this.activePanel = PANEL_MENU;
    this.hamburgerOpen = false;
    this.collapsed = false;
    this.autoHide = true;
    this.autoHideDelay = AUTO_HIDE_DELAY;
    this._hideTimer = null;

    library.add(faArrowUpRightFromSquare);
    library.add(faBars);
    library.add(faCircleInfo);
    library.add(faFileLines);
    library.add(faGear);
    library.add(faHammer);
    library.add(faHouse);
    library.add(faMagnifyingGlass);

    this.iconBars = icon(faBars, { classes: ["icon"] });
    this.iconCircleInfo = icon(faCircleInfo, { classes: ["icon"] });
    this.iconExternalLink = icon(faArrowUpRightFromSquare, {
      classes: ["icon"],
    });
    this.iconFileLines = icon(faFileLines, { classes: ["icon"] });
    this.iconGear = icon(faGear, { classes: ["icon"] });
    this.iconHammer = icon(faHammer, { classes: ["icon"] });
    this.iconHouse = icon(faHouse, { classes: ["icon"] });
    this.iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });

    this._onMenuClick = (e) => this._switchPanel(PANEL_MENU, e);
    this._onSearchClick = (e) => this._switchPanel(PANEL_SEARCH, e);
    this._onFileDiffClick = (e) => this._switchPanel(PANEL_FILEDIFF, e);
    this._onSettingsClick = (e) => this._switchPanel(PANEL_SETTINGS, e);
  }

  loadConfig(config) {
    if (!FlyoutV2Addon.isEnabled(config)) {
      return;
    }
    this.config = config;

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
    this._hasDownloads =
      Object.keys(this.config.versions.current.downloads).length > 0;
    this._defaultVersion = objectPath.get(
      this.config,
      "projects.current.default_version",
      null,
    );

    const stored = FlyoutV2Addon.getLocalStorage();
    const dashboardPosition = objectPath.get(
      this.config,
      "addons.flyout.position",
      null,
    );
    this.position = POSITIONS.includes(stored.position)
      ? stored.position
      : dashboardPosition || DEFAULT_POSITION;
    this.autoHide = stored.autoHide !== false;

    // Remember the last selected addon across page loads.
    this.activePanel = this._isPanelAvailable(stored.activePanel)
      ? stored.activePanel
      : PANEL_MENU;

    this._cancelCollapse();
    this._scheduleCollapse();
  }

  _isPanelAvailable(panel) {
    switch (panel) {
      case PANEL_MENU:
      case PANEL_SETTINGS:
        return true;
      case PANEL_SEARCH:
        return this._searchEnabled;
      case PANEL_FILEDIFF:
        return this._fileTreeDiffEnabled;
      default:
        return false;
    }
  }

  _switchPanel(panel, e) {
    if (e) {
      e.stopPropagation();
    }
    if (!this._isPanelAvailable(panel)) {
      panel = PANEL_MENU;
    }
    this.activePanel = panel;
    this.hamburgerOpen = false;
    FlyoutV2Addon.setLocalStorage({ activePanel: panel });
  }

  // ---- Auto-hide ----

  _isBusy() {
    // Keep the bar while it is hovered, holds focus (typing in search,
    // tabbing through it) or the hamburger is open.
    return (
      this.hamburgerOpen ||
      this.matches(":hover") ||
      this.shadowRoot?.activeElement !== null
    );
  }

  _scheduleCollapse = () => {
    clearTimeout(this._hideTimer);
    if (!this.autoHide) {
      return;
    }
    this._hideTimer = setTimeout(() => {
      if (this._isBusy()) {
        this._scheduleCollapse();
        return;
      }
      this.collapsed = true;
    }, this.autoHideDelay);
  };

  _cancelCollapse = () => {
    clearTimeout(this._hideTimer);
    this._hideTimer = null;
    this.collapsed = false;
  };

  _onHamburgerToggle = (e) => {
    e.stopPropagation();
    this.hamburgerOpen = !this.hamburgerOpen;
  };

  // Clicks inside the shadow root are retargeted to the host, so any
  // click that reaches the window came from outside the bar.
  _onWindowClick = () => {
    this.hamburgerOpen = false;
  };

  _onKeydown = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    this.hamburgerOpen = false;
    if (this.activePanel !== PANEL_MENU) {
      this._switchPanel(PANEL_MENU);
    }
  };

  _onSelectNavigate(e) {
    if (e.target.value) {
      window.location.href = e.target.value;
    }
  }

  _onPositionChange = (e) => {
    this.position = e.target.value;
    FlyoutV2Addon.setLocalStorage({ position: this.position });
  };

  _onAutoHideChange = (e) => {
    this.autoHide = e.target.checked;
    FlyoutV2Addon.setLocalStorage({ autoHide: this.autoHide });
    this._cancelCollapse();
    this._scheduleCollapse();
  };

  _focusSearch() {
    this.updateComplete.then(() => {
      this.renderRoot.querySelector("readthedocs-search-panel")?.focusInput();
    });
  }

  // ---- Hamburger ----

  _renderHamburgerItem(panel, label, iconNode, onClick) {
    return html`
      <button
        class=${classMap({ active: this.activePanel === panel })}
        @click=${onClick}
        role="menuitem"
      >
        ${iconNode}
        <span>${label}</span>
      </button>
    `;
  }

  renderHamburger() {
    return html`
      <div class=${classMap({ hamburger: true, open: this.hamburgerOpen })}>
        <button
          class="hamburger-trigger"
          @click=${this._onHamburgerToggle}
          aria-label="Read the Docs addons"
          aria-haspopup="menu"
          aria-expanded=${this.hamburgerOpen}
        >
          ${this.iconBars.node[0]}
        </button>
        <div class="hamburger-dropdown" role="menu">
          ${this._renderHamburgerItem(
            PANEL_MENU,
            "Build details",
            this.iconCircleInfo.node[0],
            this._onMenuClick,
          )}
          ${this._searchEnabled
            ? this._renderHamburgerItem(
                PANEL_SEARCH,
                "Search",
                this.iconSearch.node[0],
                this._onSearchClick,
              )
            : nothing}
          ${this._fileTreeDiffEnabled
            ? this._renderHamburgerItem(
                PANEL_FILEDIFF,
                "Changed files",
                this.iconFileLines.node[0],
                this._onFileDiffClick,
              )
            : nothing}
          ${this._renderHamburgerItem(
            PANEL_SETTINGS,
            "Settings",
            this.iconGear.node[0],
            this._onSettingsClick,
          )}
        </div>
      </div>
    `;
  }

  // ---- Bar content per addon ----

  renderBarContent() {
    switch (this.activePanel) {
      case PANEL_SEARCH:
        return html`<readthedocs-search-panel
          .config=${this.config}
        ></readthedocs-search-panel>`;
      case PANEL_FILEDIFF:
        return html`<readthedocs-filetreediff-panel
          .config=${this.config}
        ></readthedocs-filetreediff-panel>`;
      case PANEL_SETTINGS:
        return this.renderSettings();
      case PANEL_MENU:
      default:
        return this.renderMenu();
    }
  }

  renderProjectLinks() {
    const { urls } = this.config.projects.current;
    const vcs = this.config.addons.flyout.vcs;

    return html`
      <span class="bar-links">
        <a
          href="${addUtmParameters(toAppUrl(urls.home), "flyout")}"
          title="Project home"
        >
          ${this.iconHouse.node[0]}
        </a>
        <a
          href="${addUtmParameters(toAppUrl(urls.builds), "flyout")}"
          title="Builds"
        >
          ${this.iconHammer.node[0]}
        </a>
        ${vcs?.view_url
          ? html`<a
              href="${vcs.view_url}"
              target="_blank"
              title="View source on ${vcs.name}"
            >
              ${this.iconExternalLink.node[0]}
            </a>`
          : nothing}
      </span>
    `;
  }

  renderMenu() {
    const { current, translations } = this.config.projects;
    const filename = this.config.readthedocs.resolver.filename;

    return html`
      ${this._hasLanguages
        ? html`<select
            class="bar-select"
            @change=${this._onSelectNavigate}
            aria-label="Language"
            title="Switch language"
          >
            ${translations
              .concat(current)
              .sort((a, b) => a.language.code.localeCompare(b.language.code))
              .map(
                (t) =>
                  html`<option
                    value="${getLinkWithFilename(
                      t.urls.documentation,
                      filename,
                    )}"
                    ?selected=${t.slug === current.slug}
                  >
                    ${t.language.code}
                  </option>`,
              )}
          </select>`
        : nothing}
      ${this._hasVersions
        ? html`<select
            class="bar-select"
            @change=${this._onSelectNavigate}
            aria-label="Version"
            title="Switch version (★ marks the default)"
          >
            ${this.config.versions.active.map(
              (v) =>
                html`<option
                  value="${getLinkWithFilename(v.urls.documentation, filename)}"
                  ?selected=${v.slug === this.config.versions.current.slug}
                >
                  ${v.slug === this._defaultVersion ? `★ ${v.slug}` : v.slug}
                </option>`,
            )}
          </select>`
        : nothing}
      ${this._hasDownloads
        ? html`<select
            class="bar-select"
            @change=${this._onSelectNavigate}
            aria-label="Download"
            title="Download"
          >
            <option value="" selected disabled>Download</option>
            ${Object.entries(this.config.versions.current.downloads).map(
              ([name, url]) =>
                html`<option value="${url}">
                  ${DOWNLOAD_NAMES[name] || name}
                </option>`,
            )}
          </select>`
        : nothing}
      ${this.renderProjectLinks()}
      <a
        class="bar-branding"
        href="${addUtmParameters("https://about.readthedocs.com/", "flyout")}"
        title="Hosted by Read the Docs"
      >
        <img src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
      </a>
    `;
  }

  renderSettings() {
    // Reloading with the param set to false clears the remembered opt-in.
    const classicUrl = new URL(window.location.href);
    classicUrl.searchParams.set(FLYOUT_V2_QUERY_PARAM, "false");

    return html`
      <label class="bar-field">
        Position
        <select
          class="bar-select"
          @change=${this._onPositionChange}
          aria-label="Bar position"
        >
          ${POSITIONS.map(
            (p) =>
              html`<option value="${p}" ?selected=${p === this.position}>
                ${p.replace("-", " ")}
              </option>`,
          )}
        </select>
      </label>
      <label class="bar-field">
        <input
          type="checkbox"
          .checked=${this.autoHide}
          @change=${this._onAutoHideChange}
        />
        Auto-hide
      </label>
      <a
        class="bar-opt-out"
        href="${classicUrl.href}"
        title="Switch back to the classic flyout"
        >Classic flyout</a
      >
    `;
  }

  render() {
    if (this.config === null) {
      return nothing;
    }

    const classes = {
      container: true,
      collapsed: this.collapsed,
      [this.position]: true,
    };

    return html`
      <div
        class=${classMap(classes)}
        @keydown=${this._onKeydown}
        @mouseenter=${this._cancelCollapse}
        @mouseleave=${this._scheduleCollapse}
        @focusin=${this._cancelCollapse}
        @focusout=${this._scheduleCollapse}
      >
        ${this.renderHamburger()}
        <div class="bar-content">${this.renderBarContent()}</div>
      </div>
    `;
  }

  _onFlyoutShow = () => {
    this._switchPanel(PANEL_MENU);
    this._cancelCollapse();
    this._scheduleCollapse();
  };

  _onSearchShow = () => {
    if (this._searchEnabled) {
      this._switchPanel(PANEL_SEARCH);
      this._cancelCollapse();
      this._focusSearch();
    }
  };

  _onPanelSet = (e) => {
    if (e.detail?.panel) {
      this._switchPanel(e.detail.panel);
      this._cancelCollapse();
      this._scheduleCollapse();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      EVENT_READTHEDOCS_FLYOUT_SHOW,
      this._onFlyoutShow,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_FLYOUT_HIDE,
      this._onFlyoutShow,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_SEARCH_SHOW,
      this._onSearchShow,
    );
    document.addEventListener(
      EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
      this._onPanelSet,
    );
    window.addEventListener("click", this._onWindowClick);
  }

  disconnectedCallback() {
    clearTimeout(this._hideTimer);
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_SHOW,
      this._onFlyoutShow,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_HIDE,
      this._onFlyoutShow,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_SEARCH_SHOW,
      this._onSearchShow,
    );
    document.removeEventListener(
      EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
      this._onPanelSet,
    );
    window.removeEventListener("click", this._onWindowClick);
    super.disconnectedCallback();
  }
}

/**
 * Flyout v2 addon.
 *
 * Runs alongside the original flyout for testing. Enable it with
 * `?readthedocs-flyout-v2=true`; the original flyout, search modal and
 * standalone file tree diff bar step aside when it is active.
 */
export class FlyoutV2Addon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.flyout.json";
  static addonEnabledPath = "addons.flyout.enabled";
  static addonName = "FlyoutV2";
  static addonLocalStorageKey = "readthedocs-flyout-v2-storage-key";
  static elementClass = FlyoutV2Element;

  static isEnabled(config, httpStatus) {
    return isFlyoutV2Enabled() && super.isEnabled(config, httpStatus);
  }

  static requiresUrlParam() {
    // Same reason as the original flyout: version/language links need the
    // resolved filename to keep the reader on the same page.
    return docTool.isSinglePageApplication();
  }
}

customElements.define(FlyoutV2Element.elementName, FlyoutV2Element);
