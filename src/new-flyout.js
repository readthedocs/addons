import READTHEDOCS_LOGO from "./images/logo-wordmark-light.svg";
import { html, nothing, render, LitElement } from "lit";
import { classMap } from 'lit/directives/class-map.js';

import styleSheet from "./new-flyout.css";
import { AddonBase } from "./utils";

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
    return `//${this.config.domains.dashboard}/projects/${this.config.projects.current.slug}/`
  }

  _toggleOpen(e) {
    this.opened = !this.opened;
  }

  renderHeader() {
    return html`
      <header @click="${this._toggleOpen}">
        <img class="logo" src="${READTHEDOCS_LOGO}" alt="Read the Docs" />
        <span>v: ${this.config.versions.current.slug}</span>
      </header>
    `;
  }

  renderFooter() {
    return html`
      <small>
        <span>Hosted by <a href="https://readthedocs.org">Read the Docs</a></span>
        <span> &middot; </span>
        <a href="https://docs.readthedocs.io/page/privacy-policy.html">Privacy Policy</a>
      </small>
    `;
  }

  renderSearch() {
    // TODO: This is not yet working with the readthedocs-search component yet. The integration
    // will be handled separately.
    return html`
      <dl>
        <dt>Search</dt>
        <dd>
          <form id="flyout-search-form" target="_blank" action="${this.getProjectUrl()}search/" method="get">
            <input type="text" name="q" aria-label="Search docs" placeholder="Search docs" />
          </form>
        </dd>
      </dl>
    `;
  }

  renderVCS() {
    if (!this.config.addons.flyout.vcs) {
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
    if (!this.config.addons.flyout.downloads) {
      return nothing;
    }

    // NOTE: all these `render*()` functions could be merged together and use attributes
    // to deal with the small differences between each of them
    return html`
      <dl class="downloads">
        <dt>Downloads</dt>
        ${this.config.addons.flyout.downloads.map(
          (download, index) => html`
            <dd><a href="${download.url}">${download.name}</a></dd>
          `
        )}
      </dl>
    `;
  }

  renderVersions() {
    // TODO: use `this.config.versions.flyout` instead here.
    // This "filter" will implies `active=True and hidden=False`
    if (!this.config.addons.flyout.versions) {
      return nothing;
    }

    // NOTE: all these `render*()` functions could be merged together and use attributes
    // to deal with the small differences between each of them
    return html`
      <dl class="versions">
        <dt>Versions</dt>
        ${this.config.addons.flyout.versions.map(
          (version, index) => html`
            <dd><a href="${version.url}">${version.slug}</a></dd>
          `
        )}
      </dl>
    `;
  }

  renderLanguages() {
    if (!this.config.addons.flyout.translations) {
      return nothing;
    }

    // NOTE: all these `render*()` functions could be merged together and use attributes
    // to deal with the small differences between each of them
    return html`
      <dl class="languages">
        <dt>Languages</dt>
        ${this.config.addons.flyout.translations.map(
          (translation, index) => html`
            <dd><a href="${translation.url}">${translation.slug}</a></dd>
          `
        )}
      </dl>
    `;
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (!this.config) {
      // nothing is a special Lit response type
      return nothing;
    }

    const classes = { floating: this.floating, container: true };
    classes[this.position] = true

    return html`
      <div class=${classMap(classes)}>
        ${this.renderHeader()}
        <main class=${classMap({ closed: !this.opened })}>
          ${this.renderLanguages()} ${this.renderVersions()}
          ${this.renderDownloads()} ${this.renderReadTheDocs()}
          ${this.renderVCS()} ${this.renderSearch()}
          <hr>
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

    customElements.define("readthedocs-flyout", FlyoutElement);

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-flyout");
    if (!elems.length) {
      elems = [new FlyoutElement()];
      render(elems[0], document.body);
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.flyout.enabled;
  }
}
