import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { html, render, LitElement } from "lit";

import styleSheet from "./external-version-warning.css";

export class ExternalVersionBannerElement extends LitElement {
  static properties = {
    floating: {},

    config: {},
    urls: {},
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.floating = true;
    this.config = {};
    this.urls = {
      build: null,
      external: null,
    };
  }

  static fromConfig(config) {
    const elem = new ExternalVersionBannerElement();
    elem.config = config;
    // TODO the URLs here should come from a backend API, instead of manually
    // created here.
    elem.urls = {
      build: `${window.location.protocol}//${config.domains.dashboard}/projects/${config.project.slug}/builds/${config.build.id}/`,
      external: `${config.project.repository_url}/pull/${config.version.slug}`,
    };
    return elem;
  }

  render() {
    library.add(faCircleXmark);
    const xmark = icon(faCircleXmark, {
      title: "Close",
    });

    const bannerClass = this.floating ? "floating" : "";

    return html`
<div class="${bannerClass}" @click=${this.closeBanner}>
  <div class="title">
    Warning
    <div class="right">
      ${xmark.node[0]}
    </div>
  </div>
  <p>
    This page
    <a href="${this.urls.build}">was created</a>
    from a pull request
    (<a href="${this.urls.external}">#${this.config.version.slug}</a>).
  </p>
</div>`;
  }

  closeBanner(e) {
    // TODO add cookie to allow closing this banner for all page views on this
    // PR build.
    this.remove();
  }
}

/**
 * Inject a warning informing the documentation comes from an external version (e.g. pull request)
 */
export function injectExternalVersionWarning(config) {
  // TODO drop this function and move this logic to index.js instead. This
  // function can go away once all addons share a similar interface for common
  // logic, like checking if an addon is needed.
  if (ExternalVersionWarningAddon.is_enabled) {
    return new ExternalVersionWarningAddon(config);
  }
}

/**
  * External (pull request) version warning addon
  *
  * The default implementation is a floating element, but this can also be hard
  * coded into the page from the author or theme author. If there is a hardcoded
  * element, we do not inject a new element, but the web component is
  * initialized as normal by the browser.
  *
  * @param {Object} config - Addon configuration object
  */
export class ExternalVersionWarningAddon {
  constructor(config) {
    customElements.define('readthedocs-banner', ExternalVersionBannerElement);
    const elems = document.querySelector('readthedocs-banner');
    if (!elems) {
      this.banner = ExternalVersionBannerElement.fromConfig(config);
      render(this.banner, document.body);
    }
  }

  // TODO: make all these banners (injected HTML) templates that users can override with their own.
  // This way, we allow customization of the look&feel without compromising the logic.
  // Allow to override the admonition template
  // if (config.features.banner.external.template) {
  //     admonition = config.features.banner.external.template;
  // }

  /**
    * Test if addon is enabled in the configuration
    *
    * @param {Object} config - Addon configuration object
    */
  static is_enabled(config) {
    return (
      config.features &&
      config.features.external_version_warning.enabled &&
      config.version.external
    );
  }
}
