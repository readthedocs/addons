import { ajv } from "./data-validation";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleInfo,
  faCircleXmark,
  faFlask,
  faCodePullRequest,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, render, LitElement } from "lit";
import { default as objectPath } from "object-path";

import styleSheet from "./notification.css";
import { AddonBase, getLinkWithFilename } from "./utils";

export class NotificationElement extends LitElement {
  /** @static @property {string} - registered HTML element tag name */
  static elementName = "readthedocs-notification";

  /** @static @property {Object} - Lit reactive properties */
  static properties = {
    config: { state: true },
    urls: { state: true },
    highest_version: { state: true },
    dismissedTimestamp: { state: true },
    autoDismissed: { state: true },
    localStorageKey: { state: true },
  };

  /** @static @property {Object} - Lit stylesheets to apply to elements */
  static styles = styleSheet;

  constructor() {
    super();

    this.timerID = null;
    this.config = null;
    this.urls = {
      external: null,
      stable: null,
    };
    this.readingLatestVersion = false;
    this.readingStableVersion = false;
    this.stableVersionAvailable = false;
    // This will store information like user dimissing the notification. Any Notification sharing
    // the same localStorageKey will be affected.
    this.localStorageKey = null;
    this.dismissedTimestamp = null;
    this.autoDismissed = false;
    // When ``true``, the auto-dismiss timer is suppressed so the notification
    // stays visible. Used by the tiny PR-build badge, which doesn't cover any
    // content and is meant to remain a persistent passive indicator.
    this.persistent = false;
    // Tracks whether we have already prefixed ``document.title`` for this
    // external version, to avoid double-prefixing on re-renders.
    this.titlePrefixed = false;

    // Trigger the auto-dismiss timer at startup
    this.triggerAutoDismissTimer();
  }

  loadDismissedTimestamp(config) {
    // Check if this notification (as determined by localStorageKey) has been dismissed already.
    // Once a notification has been dismissed, it stays dismissed. This information however is not passed
    // over different subdomains, so if a notification has been dismissed on a PR build, it will not affect
    // other builds.
    this.localStorageKey = this.getLocalStorageKeyFromConfig(this.config);
    const notificationStorage =
      NotificationAddon.getLocalStorage()[this.localStorageKey];
    if (notificationStorage && notificationStorage.dismissedTimestamp) {
      this.dismissedTimestamp = notificationStorage.dismissedTimestamp;
    }
  }

  triggerAutoDismissTimer() {
    // Persistent notifications (e.g. the small PR-build badge) opt out of
    // auto-dismissal: they don't cover any content, so there is no reason to
    // hide them automatically.
    if (this.persistent) {
      return;
    }
    if (!document.hidden && !this.autoDismissed) {
      clearTimeout(this.timerID);
      this.timerID = setTimeout(() => {
        this.autoDismissed = true;
        this.requestUpdate();
      }, 5000);
    }
  }

  clearAutoDismissTimer() {
    clearTimeout(this.timerID);
    this.timerID = null;
  }

  _handleMouseEnter = (e) => {
    // Stop the timer when notification is hovered (mouseenter event)
    clearTimeout(this.timerID);
    this.timerID = null;
  };

  _handleMouseLeave = (e) => {
    // Start the timer when the notification is hovered away (mouseleave)
    this.triggerAutoDismissTimer();
  };

  _handleVisibilityChange = (e) => {
    if (document.hidden) {
      // Page is hidden. The user is not looking at it.
      // Clear the timeout to hide the notification.
      this.clearAutoDismissTimer();
    } else {
      // Page became visible.
      // Trigger a timeout to hide the notification.
      this.triggerAutoDismissTimer();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this._handleVisibilityChange);

    this.addEventListener("mouseenter", this._handleMouseEnter);
    this.addEventListener("mouseleave", this._handleMouseLeave);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("mouseenter", this._handleMouseEnter);
    this.removeEventListener("mouseleave", this._handleMouseLeave);

    document.removeEventListener(
      "visibilitychange",
      this._handleVisibilityChange,
    );
    clearTimeout(this.timerID);
    this.timerID = null;
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
      this.config.addons.notifications.enabled &&
      this.config.versions.current.type === "external"
    ) {
      this.urls = {
        external: objectPath.get(config, "versions.current.urls.vcs", null),
      };

      // The PR-build indicator is a small pill that sits in a corner of the
      // viewport. It does not cover content, so we disable auto-dismiss and
      // cancel any timer started by the constructor.
      this.persistent = true;
      this.clearAutoDismissTimer();

      // Prefix the document title with the PR number so that the browser tab,
      // bookmarks and history unambiguously show this is a preview build --
      // zero visual footprint on the page itself.
      this.maybePrefixDocumentTitle();
    }

    if (
      objectPath.get(
        this.config,
        "addons.notifications.show_on_latest",
        false,
      ) &&
      config.projects.current.versioning_scheme !==
        "single_version_without_translations" &&
      config.versions.current.type !== "external"
    ) {
      this.calculateStableLatestVersionWarning();
    }
    this.loadDismissedTimestamp(this.config);
  }

  getLocalStorageKeyFromConfig(config) {
    const projectSlug = config.projects.current.slug;
    const languageCode = config.projects.current.language.code;
    const versionSlug = config.versions.current.slug;
    return `${projectSlug}-${languageCode}-${versionSlug}-notification`;
  }

  firstUpdated() {
    // Add CSS classes to the element on ``firstUpdated`` because we need the
    // HTML element to exist in the DOM before being able to add tag attributes.
    //
    // External (pull request) versions get a dedicated ``pr-badge`` class so
    // they render as a tiny corner pill instead of the large ``toast`` card.
    if (this.className) {
      return;
    }
    if (
      this.config !== null &&
      this.config.versions.current.type === "external"
    ) {
      this.className = "raised pr-badge";
    } else {
      this.className = "raised toast";
    }
  }

  maybePrefixDocumentTitle() {
    if (this.titlePrefixed) {
      return;
    }
    const slug = objectPath.get(this.config, "versions.current.slug", null);
    if (!slug) {
      return;
    }
    const prefix = `[PR #${slug}] `;
    // Guard against double-prefixing if the addon is re-initialized (e.g. on
    // a client-side navigation) or if the author already added a similar tag.
    if (document.title && !document.title.startsWith(prefix)) {
      document.title = prefix + document.title;
    }
    this.titlePrefixed = true;
  }

  shouldSkipExternalBadge() {
    // If File Tree Diff is active and has diff data for this PR, it already
    // surfaces a ``#1234`` link and an info icon next to its file selector
    // (see ``src/filetreediff.js``). Rendering this badge on top of that is
    // redundant, so we bail out and let the File Tree Diff bar be the single
    // "this is a pull request preview" affordance.
    const filetreediffEnabled = objectPath.get(
      this.config,
      "addons.filetreediff.enabled",
      false,
    );
    const diffData = objectPath.get(
      this.config,
      "addons.filetreediff.diff",
      null,
    );
    return Boolean(filetreediffEnabled && diffData);
  }

  render() {
    if (this.autoDismissed) {
      return nothing;
    }

    // The element doesn't yet have our config, don't render it.
    if (this.config === null) {
      // nothing is a special Lit response type
      return nothing;
    }

    // This notification has been dimissed, so don't render it
    if (this.dismissedTimestamp) {
      return nothing;
    }

    if (!this.config.addons.notifications.enabled) {
      return nothing;
    }

    if (this.config.versions.current.type === "external") {
      if (
        objectPath.get(
          this.config,
          "addons.notifications.show_on_external",
          false,
        )
      ) {
        if (this.shouldSkipExternalBadge()) {
          return nothing;
        }
        return this.renderExternalVersionWarning();
      }
    }

    if (
      this.readingLatestVersion &&
      this.stableVersionAvailable &&
      this.config.versions.current.slug !==
        this.config.projects.current.default_version &&
      objectPath.get(this.config, "addons.notifications.show_on_latest", false)
    ) {
      return this.renderLatestVersionWarning();
    }

    if (
      !this.readingStableVersion &&
      this.stableVersionAvailable &&
      this.config.versions.current.slug !==
        this.config.projects.current.default_version &&
      objectPath.get(
        this.config,
        "addons.notifications.show_on_non_stable",
        false,
      )
    ) {
      return this.renderStableVersionWarning();
    }

    return nothing;
  }

  calculateStableLatestVersionWarning() {
    // The logic is pretty simple:
    //  - if the user is reading the "latest" version: shows a notification to warn
    //    the user about reading the latest development version.
    //  - if the user is reading a non-"stable" version: shows a notification to warn
    //    the user about reading a version that may be old.
    //  - Both notifications are skipped if the current version is the **default** version,
    //    as we assume then the author wants the user to be reading that version.
    //
    // This does not cover all the cases where this notification could be useful,
    // but users with different needs should be able to implement their own custom logic.
    const stableVersion = this.config.versions.active.find(
      (version) => version.slug === "stable",
    );
    const latestVersion = this.config.versions.active.find(
      (version) => version.slug === "latest",
    );
    const currentVersion = this.config.versions.current;

    // Current version is "latest" or its alias
    if (
      currentVersion.slug === "latest" ||
      (latestVersion !== undefined &&
        latestVersion.aliases.find(
          (version) => version.slug === currentVersion.slug,
        ) !== undefined)
    ) {
      this.readingLatestVersion = true;
    }

    // Current version is "stable" or its alias
    if (
      currentVersion.slug === "stable" ||
      (stableVersion !== undefined &&
        stableVersion.aliases.find(
          (version) => version.slug === currentVersion.slug,
        ) !== undefined)
    ) {
      this.readingStableVersion = true;
    }

    if (stableVersion !== undefined) {
      this.stableVersionAvailable = true;
      this.urls.stable = getLinkWithFilename(
        stableVersion.urls.documentation,
        this.config.readthedocs.resolver.filename,
      );
    }
  }

  renderLatestVersionWarning() {
    library.add(faFlask);
    const iconFlask = icon(faFlask, {
      classes: ["header", "icon"],
    });

    return html`
      <div>
        ${iconFlask.node[0]}
        <div class="title">
          This is the <span>latest development version</span>
          ${this.renderCloseButton()}
        </div>
        <div class="content">
          Some features may not yet be available in the published stable
          version. Read the
          <a href="${this.urls.stable}">stable version of this documentation</a
          >.
        </div>
      </div>
    `;
  }

  renderStableVersionWarning() {
    library.add(faHourglassHalf);
    const iconHourglassHalf = icon(faHourglassHalf, {
      classes: ["header", "icon"],
    });

    return html`
      <div>
        ${iconHourglassHalf.node[0]}
        <div class="title">
          This <em>may</em> be an
          <span>old version of this documentation</span>
          ${this.renderCloseButton()}
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

  renderExternalVersionWarning() {
    // Tiny corner pill used to signal "this is a pull request preview build"
    // without covering any content. Layout is roughly:
    //
    //     [ PR #1234  ⓘ  ✕ ]
    //
    // The whole element intentionally stays small: no headline, no body copy,
    // no build-log link. Users who need more context can click through to the
    // pull request, open the docs via the info icon, or rely on the File Tree
    // Diff bar (which already surfaces the same affordances).
    library.add(faCodePullRequest);
    library.add(faCircleInfo);

    const iconPullRequest = icon(faCodePullRequest, {
      title: "This page was built from a pull request",
      classes: ["icon"],
    });
    const iconInfo = icon(faCircleInfo, {
      title: "Open Visual Diff documentation",
      classes: ["icon"],
    });

    return html`
      <div>
        ${iconPullRequest.node[0]}
        <a
          class="pr-link"
          href="${this.urls.external}"
          target="_blank"
          rel="noopener"
          title="Go to pull request #${this.config.versions.current.slug}"
          >PR #${this.config.versions.current.slug}</a
        >
        <a
          class="pr-info"
          href="https://docs.readthedocs.com/platform/stable/pull-requests.html"
          target="_blank"
          rel="noopener"
          title="Open pull request preview documentation"
          >${iconInfo.node[0]}</a
        >
        ${this.renderCloseButton()}
      </div>
    `;
  }

  renderCloseButton() {
    library.add(faCircleXmark);
    const xmark = icon(faCircleXmark, {
      title: "Close notification",
    });
    return html`
      <a href="#" class="right" @click=${this.closeNotification}>
        ${xmark.node[0]}
      </a>
    `;
  }

  closeNotification(e) {
    // Avoid going back to the top of the page when closing the notification
    e.preventDefault();

    // Store the information about dismissal in the Local Storage
    // Make sure to store the timestamp, so that we have the option to maybe add a TTL on the dismissal
    this.dismissedTimestamp = Date.now();
    const dismissedObj = {
      [this.localStorageKey]: { dismissedTimestamp: this.dismissedTimestamp },
    };
    NotificationAddon.setLocalStorage(dismissedObj);

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
  static addonEnabledPath = "addons.notifications.enabled";
  static addonName = "Notification";
  static elementClass = NotificationElement;
}

customElements.define(NotificationElement.elementName, NotificationElement);
