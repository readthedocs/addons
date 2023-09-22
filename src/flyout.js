import READTHEDOCS_LOGO from "./images/logo-wordmark-light.svg";
import { html, nothing, render, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

import styleSheet from "./flyout.css";
import { AddonBase } from "./utils";
import { EVENT_READTHEDOCS_SEARCH_SHOW } from "./events";

export class FlyoutElement extends LitElement {
  static elementName = "readthedocs-flyout";

  static properties = {
    config: { state: true },
    opened: { type: Boolean },
    floating: { type: Boolean },
    position: { type: String },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.config = {};
    this.opened = false;
    this.floating = true;
    this.position = "bottom-right";
  }

  loadConfig(config) {
    this.config = config;
  }

  getProjectUrl() {
    // TODO: this URL should come from ``this.config.projects.current.urls.dashboard``.
    // We are not able to use that field because of:
    // https://github.com/readthedocs/readthedocs-ops/issues/1323
    return `//${this.config.domains.dashboard}/projects/${this.config.projects.current.slug}/`;
  }

  _toggleOpen(e) {
    this.opened = !this.opened;
  }

  _onOutsideClick = (e) => {
    if (e.target !== this) {
      this.opened = false;
    }
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("click", this._onOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener("click", this._onOutsideClick);
    super.disconnectedCallback();
  }

  renderHeader() {
    let version = nothing;
    if (!this.config.projects.current.single_version) {
      version = html`<span>v: ${this.config.versions.current.slug}</span>`;
    }

    return html`
      <header @click="${this._toggleOpen}">
        <img class="logo" src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
        ${version}
      </header>
    `;
  }

  renderFooter() {
    return html`
      <small>
        <span
          >Hosted by <a href="https://readthedocs.org">Read the Docs</a></span
        >
        <span> &middot; </span>
        <a href="https://docs.readthedocs.io/page/privacy-policy.html"
          >Privacy Policy</a
        >
      </small>
    `;
  }

  showSearch() {
    // Dispatch the custom event the search addon is listening to show the modal
    const event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
    document.dispatchEvent(event);
  }

  renderSearch() {
    // TODO: This is not yet working with the readthedocs-search component yet. The integration
    // will be handled separately.
    // See https://github.com/readthedocs/addons/issues/90
    return html`
      <dl>
        <dt>Search</dt>
        <dd>
          <form @focusin="${this.showSearch}" id="flyout-search-form">
            <input
              type="text"
              name="q"
              aria-label="Search docs"
              placeholder="Search docs"
            />
          </form>
        </dd>
      </dl>
    `;
  }

  renderVCS() {
    if (
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
          <a href="${this.getProjectUrl()}">Project Home</a>
        </dd>
        <dd>
          <a href="${this.getProjectUrl()}builds/">Builds</a>
        </dd>
        <dd>
          <a href="${this.getProjectUrl()}downloads/">Downloads</a>
        </dd>
      </dl>
    `;
  }

  renderDownloads() {
    if (
      !this.config.addons.flyout.downloads ||
      !this.config.addons.flyout.downloads.length
    ) {
      return nothing;
    }

    return html`
      <dl class="downloads">
        <dt>Downloads</dt>
        ${this.config.addons.flyout.downloads.map(
          (download) => html`
            <dd><a href="${download.url}">${download.name}</a></dd>
          `,
        )}
      </dl>
    `;
  }

  renderVersions() {
    if (
      !this.config.addons.flyout.versions ||
      !this.config.addons.flyout.versions.length ||
      this.config.projects.current.single_version
    ) {
      return nothing;
    }

    const currentVersion =
      this.config.versions.current && this.config.versions.current.slug;

    const getVersionLink = (version) => {
      const link = html`<a href="${version.url}">${version.slug}</a>`;
      return currentVersion && version.slug === currentVersion
        ? html`<strong>${link}</strong>`
        : link;
    };

    return html`
      <dl class="versions">
        <dt>Versions</dt>
        ${this.config.addons.flyout.versions.map(
          (version) => html`<dd>${getVersionLink(version)}</dd> `,
        )}
      </dl>
    `;
  }

  renderLanguages() {
    if (
      !this.config.addons.flyout.translations ||
      !this.config.addons.flyout.translations.length
    ) {
      return nothing;
    }

    return html`
      <dl class="languages">
        <dt>Languages</dt>
        ${this.config.addons.flyout.translations.map(
          (translation) => html`
            <dd><a href="${translation.url}">${translation.slug}</a></dd>
          `,
        )}
      </dl>
    `;
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (!FlyoutAddon.isEnabled(this.config)) {
      // nothing is a special Lit response type
      return nothing;
    }

    const classes = { floating: this.floating, container: true };
    classes[this.position] = true;

    return html`
      <div class=${classMap(classes)}>
        ${this.renderHeader()}
        <main class=${classMap({ closed: !this.opened })}>
          ${this.renderLanguages()} ${this.renderVersions()}
          ${this.renderDownloads()} ${this.renderReadTheDocs()}
          ${this.renderVCS()} ${this.renderSearch()}
          <hr />
          ${this.renderFooter()}
        </main>
      </div>
    `;
  }
}

/**
 * Flyout addon
 *
 * @param {Object} config - Addon configuration object
 */
export class FlyoutAddon extends AddonBase {
  constructor(config) {
    super();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-flyout");
    if (!elems.length) {
      elems = [new FlyoutElement()];

      // We cannot use `render(elems[0], document.body)` because there is a race conditions between all the addons.
      // So, we append the web-component first and then request an update of it.
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.flyout.enabled === true;
  }
}

customElements.define("readthedocs-flyout", FlyoutElement);
