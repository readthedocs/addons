import { ajv } from "./data-validation";
import READTHEDOCS_LOGO_WORDMARK from "./images/logo-wordmark-light.svg";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCodeBranch,
  faCaretDown,
  faLanguage,
  faMagnifyingGlass,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, render, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { default as objectPath } from "object-path";

import styleSheet from "./flyout.css";
import {
  AddonBase,
  addUtmParameters,
  getLinkWithFilename,
  docTool,
} from "./utils";
import { SPHINX, MKDOCS_MATERIAL } from "./constants";
import {
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_FLYOUT_HIDE,
  EVENT_READTHEDOCS_FLYOUT_SHOW,
  EVENT_READTHEDOCS_FLYOUT_PANEL_SET,
} from "./events";

// Import panel components so their custom elements are registered
import "./search-panel.js";
import "./filetreediff-panel.js";

export class FlyoutElement extends LitElement {
  static elementName = "readthedocs-flyout";

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
    this.activePanel = null;
  }

  loadConfig(config) {
    // Validate the config object before assigning it to the Addon.
    // Later, ``render()`` method will check whether this object exists and (not) render
    // accordingly
    if (!FlyoutAddon.isEnabled(config)) {
      return;
    }
    this.config = config;

    // The "position" is a value that can be defined from the dashboard.
    // There are two main options: "Default" or a specific value.
    // When "Default" is used, the value will be grabbed from the HTML element (e.g. explicitly set by the theme author).
    // In case it's not defined, the value defined in the `constructor` will be used ("top-center")
    const dashboardPosition = objectPath.get(
      this.config,
      "addons.flyout.position",
      null,
    );
    if (dashboardPosition) {
      this.position = dashboardPosition;
    }
  }

  _close() {
    this.opened = false;
    this.activePanel = null;
  }

  _open() {
    this.opened = true;
  }

  _toggleOpen(e) {
    if (e) {
      e.stopPropagation();
    }
    this.opened ? this._close() : this._open();
  }

  _setPanel(panelName, e) {
    if (e) {
      e.stopPropagation();
    }

    if (this.activePanel === panelName) {
      // Same panel clicked again - close entirely
      this._close();
    } else {
      this.activePanel = panelName;
      if (!this.opened) {
        this.opened = true;
      }
    }
  }

  _onOutsideClick = (e) => {
    if (e.target !== this) {
      this._close();
    }
  };

  renderHeader() {
    library.add(faCodeBranch);
    library.add(faLanguage);
    library.add(faMagnifyingGlass);
    library.add(faFileLines);
    library.add(faCaretDown);

    const iconCodeBranch = icon(faCodeBranch, { classes: ["icon"] });
    const iconLanguage = icon(faLanguage, { classes: ["icon"] });
    const iconCaretDown = icon(faCaretDown, { classes: ["icon"] });
    const iconSearch = icon(faMagnifyingGlass, { classes: ["icon"] });
    const iconFileLines = icon(faFileLines, { classes: ["icon"] });

    // Determine which panel icons to show
    const searchEnabled = objectPath.get(
      this.config,
      "addons.search.enabled",
      false,
    );
    const fileTreeDiffEnabled =
      objectPath.get(this.config, "versions.current.type") === "external" &&
      objectPath.get(this.config, "addons.filetreediff.enabled", false);

    // Version badge (clickable - toggles versions panel)
    let versionBadge = nothing;
    if (
      this.config.projects.current.versioning_scheme !==
      "single_version_without_translations"
    ) {
      versionBadge = html`<button
        class=${classMap({
          badge: true,
          version: true,
          active: this.activePanel === "versions",
        })}
        @click=${(e) => this._setPanel("versions", e)}
        title="Switch version"
        aria-label="Toggle versions panel"
      >
        ${iconCodeBranch.node[0]}
        <span>${this.config.versions.current.slug}</span>
      </button>`;
    }

    // Language badge (clickable - toggles languages panel)
    let languageBadge = nothing;
    if (this.config.projects.translations.length > 0) {
      languageBadge = html`<button
        class=${classMap({
          badge: true,
          language: true,
          active: this.activePanel === "languages",
        })}
        @click=${(e) => this._setPanel("languages", e)}
        title="Switch language"
        aria-label="Toggle languages panel"
      >
        ${iconLanguage.node[0]}
        <span>${this.config.projects.current.language.code}</span>
      </button>`;
    }

    return html`
      <header>
        <nav class="panel-icons">
          ${searchEnabled
            ? html`<button
                class=${classMap({ active: this.activePanel === "search" })}
                @click=${(e) => this._setPanel("search", e)}
                title="Search"
                aria-label="Toggle search panel"
              >
                ${iconSearch.node[0]}
              </button>`
            : nothing}
          ${fileTreeDiffEnabled
            ? html`<button
                class=${classMap({
                  active: this.activePanel === "filetreediff",
                })}
                @click=${(e) => this._setPanel("filetreediff", e)}
                title="Changed files"
                aria-label="Toggle changed files panel"
              >
                ${iconFileLines.node[0]}
              </button>`
            : nothing}
        </nav>
        <img
          class="logo"
          src="${READTHEDOCS_LOGO_WORDMARK}"
          alt="Read the Docs"
          @click=${this._toggleOpen}
        />
        ${languageBadge} ${versionBadge}
        <span class="caret" @click=${this._toggleOpen}
          >${iconCaretDown.node[0]}</span
        >
      </header>
    `;
  }

  renderFooter() {
    return html`
      <small>
        <span>
          <a
            href="${addUtmParameters(
              "https://docs.readthedocs.io/page/addons.html",
              "flyout",
            )}"
            >Addons documentation</a
          ></span
        >
        <span> ― </span>
        <span
          >Hosted by
          <a
            href="${addUtmParameters(
              "https://about.readthedocs.com/",
              "flyout",
            )}"
            >Read the Docs</a
          ></span
        >
      </small>
    `;
  }

  showSearch() {
    // Dispatch the custom event to hide/collapse the flyout when showing the search modal
    const flyoutEvent = new CustomEvent(EVENT_READTHEDOCS_FLYOUT_HIDE);
    document.dispatchEvent(flyoutEvent);

    // Dispatch the custom event the search addon is listening to show the modal
    const searchEvent = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
    document.dispatchEvent(searchEvent);

    // Close the flyout after showing the search modal
    this._close();
  }

  renderVCS() {
    if (
      // TODO: remove this check when ``vcs`` property becomes required
      !this.config.addons.flyout.vcs ||
      !this.config.addons.flyout.vcs.view_url
    ) {
      return nothing;
    }
    const { vcs } = this.config.addons.flyout;

    return html`
      <dl>
        <dt>On ${vcs.name}</dt>
        <dd>
          <a href="${vcs.view_url}">View</a>
        </dd>
      </dl>
    `;
  }

  renderReadTheDocs() {
    return html`
      <dl>
        <dt>On Read the Docs</dt>
        <dd>
          <a
            href="${addUtmParameters(
              this.config.projects.current.urls.home
                .replace("readthedocs.org", "app.readthedocs.org")
                .replace("readthedocs.com", "app.readthedocs.com")
                .replace("app.app.", "app."),
              "flyout",
            )}"
            >Project Home</a
          >
        </dd>
        <dd>
          <a
            href="${addUtmParameters(
              this.config.projects.current.urls.builds
                .replace("readthedocs.org", "app.readthedocs.org")
                .replace("readthedocs.com", "app.readthedocs.com")
                .replace("app.app.", "app."),
              "flyout",
            )}"
            >Builds</a
          >
        </dd>
      </dl>
    `;
  }

  renderDownloads() {
    if (!Object.keys(this.config.versions.current.downloads).length) {
      return nothing;
    }

    const nameDisplay = {
      pdf: "PDF",
      epub: "EPUB",
      htmlzip: "HTML",
    };

    return html`
      <dl class="downloads">
        <dt>Downloads</dt>
        ${Object.entries(this.config.versions.current.downloads).map(
          ([name, url]) =>
            html`<dd>
              <a href="${url}">${nameDisplay[name]}</a>
            </dd>`,
        )}
      </dl>
    `;
  }

  renderVersionsPanel() {
    if (
      !this.config.versions.active.length ||
      this.config.projects.current.versioning_scheme ===
        "single_version_without_translations"
    ) {
      return html`<p class="panel-empty">No versions available</p>`;
    }

    return html`
      <div class="panel versions-panel">
        <h3>Versions</h3>
        <ul>
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
      </div>
    `;
  }

  renderLanguagesPanel() {
    if (!this.config.projects.translations.length) {
      return html`<p class="panel-empty">No translations available</p>`;
    }

    // Add the current project as "translation" and sort them based on language's code
    let translations = this.config.projects.translations.concat(
      this.config.projects.current,
    );
    translations = translations.sort((a, b) =>
      a.language.code.localeCompare(b.language.code),
    );

    return html`
      <div class="panel languages-panel">
        <h3>Languages</h3>
        <ul>
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
      </div>
    `;
  }

  renderDefaultContent() {
    return html`
      ${this.renderDownloads()} ${this.renderReadTheDocs()} ${this.renderVCS()}
    `;
  }

  renderPanelContent() {
    switch (this.activePanel) {
      case "search":
        return html`<readthedocs-search-panel
          .config=${this.config}
        ></readthedocs-search-panel>`;
      case "filetreediff":
        return html`<readthedocs-filetreediff-panel
          .config=${this.config}
        ></readthedocs-filetreediff-panel>`;
      case "versions":
        return this.renderVersionsPanel();
      case "languages":
        return this.renderLanguagesPanel();
      default:
        return this.renderDefaultContent();
    }
  }

  updateCSSClasses() {
    this.classes = { floating: this.floating, container: true };
    this.classes[this.position] = true;
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (this.config === null) {
      // nothing is a special Lit response type
      return nothing;
    }

    this.updateCSSClasses();

    return html`
      <div class=${classMap(this.classes)}>
        ${this.renderHeader()}
        <main class=${classMap({ closed: !this.opened })}>
          ${this.renderPanelContent()}
          <hr />
          ${this.renderFooter()}
        </main>
      </div>
    `;
  }

  _showFlyout = (e) => {
    this.opened = true;
  };

  _hideFlyout = (e) => {
    this.opened = false;
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
 * Flyout addon
 *
 * @param {Object} config - Addon configuration object
 */
export class FlyoutAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.flyout.json";
  static addonEnabledPath = "addons.flyout.enabled";
  static addonName = "Flyout";
  static elementClass = FlyoutElement;

  static requiresUrlParam() {
    // Flyout requires URL param for the feature "keep the same page when
    // switching version". We need to know the URL path
    // (``readthedocs.resolver.filename`` from the API or MEATA
    // ``readthedocs-resolver-filename``) to be able to generate those URLs.
    //
    // NOTE: If we ever make this feature configurable and user disables it, we
    // can adapt this code to return ``false`` in that case.
    return docTool.isSinglePageApplication();
  }
}

customElements.define(FlyoutElement.elementName, FlyoutElement);
