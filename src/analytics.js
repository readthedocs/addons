// Using unfetch 4.2.0 because 5.0.0 has a bug
// https://github.com/developit/unfetch/pull/164
import { default as fetch } from "unfetch";

import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { CLIENT_VERSION } from "./utils";
import { ContextConsumer } from "@lit/context";
import { configContext } from "./context.js";
import { nothing, render, LitElement } from "lit";

export const API_ENDPOINT = "/_/api/v2/analytics/";

export class AnalyticsElement extends LitElement {
  static elementName = "readthedocs-analytics";

  // `_config` is the context we are going to consume when it's updated.
  _config = new ContextConsumer(this, {
    context: configContext,
    subscribe: true,
  });

  constructor() {
    super();
    this.config = null;
  }

  render() {
    // Validate the context (`this._config.value`) on each update and return
    // nothing if it's invalid. ``nothing`` is a special Lit response type.
    if (!AnalyticsAddon.isEnabled(this._config.value)) {
      return nothing;
    }

    this.config = this._config.value;

    // Only register pageviews on non-external versions
    if (this.config.versions.current.type !== "external") {
      this.registerPageView();
    }
    return nothing;
  }

  registerPageView() {
    const params = {
      project: this.config.projects.current.slug,
      version: this.config.versions.current.slug,
      absolute_uri: window.location.href,
    };

    const url = API_ENDPOINT + "?" + new URLSearchParams(params).toString();
    fetch(url, {
      method: "GET",
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error registering page view");
      });
  }
}

/**
 * Analytics addon
 *
 * Register page views that can be seen from the project's dashboard.
 * Besides, it injects the Global Read the Docs analytics.
 *
 * Read more at:
 *  - https://docs.readthedocs.io/en/stable/reference/analytics.html
 *  - https://docs.readthedocs.io/en/stable/advertising/advertising-details.html#analytics
 *
 * @param {Object} config - Addon configuration object
 */
export class AnalyticsAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.analytics.json";
  static addonEnabledPath = "addons.analytics.enabled";
  static addonName = "Analytics";
  static enabledOnHttpStatus = [200, 404];

  constructor() {
    super();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-analytics");
    if (!elems.length) {
      render(new AnalyticsElement(), document.body);
    }
  }
}

customElements.define("readthedocs-analytics", AnalyticsElement);
