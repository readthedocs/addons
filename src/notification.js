import { ajv } from "./data-validation";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faFlask,
  faCodePullRequest,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, render, LitElement } from "lit";

import styleSheet from "./notification.css";
import { AddonBase } from "./utils";

export class NotificationElement extends LitElement {
  /** @static @property {string} - registered HTML element tag name */
  static elementName = "readthedocs-notification";

  /** @static @property {Object} - Lit reactive properties */
  static properties = {
    config: { state: true },
    urls: { state: true },
    highest_version: { state: true },
  };

  /** @static @property {Object} - Lit stylesheets to apply to elements */
  static styles = styleSheet;

  constructor() {
    super();

    this.config = null;
    this.urls = {
      build: null,
      external: null,
      stable: null,
    };
    this.readingLatestVersion = false;
    this.readingStableVersion = false;
    this.stableVersionAvailable = false;
  }

  loadConfig(config) {
    // Validate the config object before assigning it to the Addon.
    // Later, ``render()`` method will check whether this object exists and (not) render
    // accordingly
    if (!NotificationAddon.isEnabled(config)) {
      return;
    }

    this.config = config;

    if (
      config.addons.external_version_warning.enabled &&
      config.versions.current.type === "external"
    ) {
      // TODO: this URL should come from the backend API.
      // Doing a simple replacement for now to solve the most common cases.
      const vcs_external_url = config.projects.current.repository.url
        .replace(".git", "")
        .replace("git@github.com:", "https://github.com/");

      this.urls = {
        build: `${window.location.protocol}//${config.domains.dashboard}/projects/${config.projects.current.slug}/builds/${config.builds.current.id}/`,
        external: `${vcs_external_url}/pull/${config.versions.current.slug}`,
      };
    }

    if (
      config.addons.non_latest_version_warning.enabled &&
      config.projects.current.versioning_schema !==
        "single_version_without_translations" &&
      config.versions.current.type !== "external"
    ) {
      this.calculateStableLatestVersionWarning();
    }
  }

  firstUpdated() {
    // Add CSS classes to the element on ``firstUpdated`` because we need the
    // HTML element to exist in the DOM before being able to add tag attributes.
    this.className = this.className || "raised floating";
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (this.config === null) {
      // nothing is a special Lit response type
      return nothing;
    }

    if (this.config.versions.current.type === "external") {
      if (this.config.addons.external_version_warning.enabled) {
        return this.renderExternalVersionWarning();
      }
    } else if (
      this.config.addons.non_latest_version_warning.enabled &&
      (this.readingLatestVersion || this.stableVersionAvailable)
    ) {
      return this.renderStableLatestVersionWarning();
    }
    return nothing;
  }

  calculateStableLatestVersionWarning() {
    // The logic is pretty simple:
    //  - if the user is reading the "latest" version: shows a notification to warn
    //    the user about reading the latest development version.
    //  - if the user is reading a non-"stable" version: shows a notification to warn
    //    the user about reading a version that may be old.
    //
    // This does not cover all the cases where this notification could be useful,
    // but users with different needs should be able to implement their own custom logic.
    const versions = this.config.addons.non_latest_version_warning.versions;
    const stable_index = versions.indexOf("stable");
    const current_version = this.config.versions.current;
    const current_project = this.config.projects.current;

    // TODO: support aliases here
    // https://github.com/readthedocs/addons/issues/132
    if (current_version.slug === "latest") {
      this.readingLatestVersion = true;
    }

    if (current_version.slug === "stable") {
      this.readingStableVersion = true;
    }

    if (stable_index !== -1) {
      this.stableVersionAvailable = true;
      // TODO: we need to use, somehow, the "resolver.resolve" logic from the Python backend
      // to support all the posibilities. Those cases won't work for now until we find a proper solution.
      this.urls.stable = `/${current_project.language.code}/stable/`;
    }
  }

  renderStableLatestVersionWarning() {
    library.add(faCircleXmark);
    library.add(faHourglassHalf);
    library.add(faFlask);
    const xmark = icon(faCircleXmark, {
      title: "Close notification",
    });
    if (this.readingLatestVersion && this.stableVersionAvailable) {
      const iconFlask = icon(faFlask, {
        classes: ["header", "icon"],
      });

      return html`
        <div>
          ${iconFlask.node[0]}
          <div class="title">
            This is the <span>latest development version</span>
            <a href="#" class="right" @click=${this.closeNotification}>
              ${xmark.node[0]}
            </a>
          </div>
          <div class="content">
            Some features may not yet be available in the published stable
            version. Read the
            <a href="${this.urls.stable}"
              >stable version of this documentation</a
            >.
          </div>
        </div>
      `;
    }

    if (!this.readingStableVersion && this.stableVersionAvailable) {
      const iconHourglassHalf = icon(faHourglassHalf, {
        classes: ["header", "icon"],
      });

      return html`
        <div>
          ${iconHourglassHalf.node[0]}
          <div class="title">
            This <em>may</em> be an
            <span>old version of this documentation</span>
            <a href="#" class="right" @click=${this.closeNotification}>
              ${xmark.node[0]}
            </a>
          </div>
          <div class="content">
            You may be reading an old version of this documentation. Read the
            <a href="${this.urls.stable}"
              >latest stable version of this documentation</a
            >.
          </div>
        </div>
      `;
    }

    return nothing;
  }

  renderExternalVersionWarning() {
    library.add(faCircleXmark);
    library.add(faCodePullRequest);
    const xmark = icon(faCircleXmark, {
      title: "Close notification",
    });
    const iconPullRequest = icon(faCodePullRequest, {
      title: "This version is a pull request version",
      classes: ["header", "icon"],
    });

    return html`
      <div>
        ${iconPullRequest.node[0]}
        <div class="title">
          This page was created from a pull request build
          <a href="#" class="right" @click=${this.closeNotification}>
            ${xmark.node[0]}
          </a>
        </div>
        <div class="content">
          See the
          <a href="${this.urls.build}">build's detail page</a>
          or
          <a href="${this.urls.external}"
            >pull request #${this.config.versions.current.slug}</a
          >
          for more information.
        </div>
      </div>
    `;
  }

  closeNotification(e) {
    // TODO add cookie to allow closing this notification for all page views on this
    // PR build.
    this.remove();

    // Avoid event propagation
    return false;
  }
}

/**
 * Notification addon
 *
 * Currently this addon is used to warn readers that the documentation is built
 * from a pull request.
 *
 * The default implementation is a floating element, but this can also be hard
 * coded into the page from the author or theme author. If there is a hardcoded
 * element, we do not inject a new element, but the web component is
 * initialized as normal by the browser.
 *
 * We load the param ``config`` into the elements after creation and API
 * response, as this is needed to give hardcoded elements access to ``config``
 *
 * @param {Object} config - Addon configuration object
 */
export class NotificationAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.notifications.json";
  static addonName = "HotKeys";

  constructor(config) {
    super();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-notification");
    if (!elems.length) {
      elems = [new NotificationElement()];
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  /**
   * Test if addon is enabled in the configuration
   *
   * @param {Object} config - Addon configuration object
   */
  static isEnabled(config) {
    return (
      (super.isConfigValid(config) &&
        config.addons.external_version_warning.enabled === true &&
        config.versions.current.type === "external") ||
      (config.addons.non_latest_version_warning.enabled === true &&
        config.versions.current.type !== "external")
    );
  }
}

customElements.define("readthedocs-notification", NotificationElement);
