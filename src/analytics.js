// Using unfetch 4.2.0 because 5.0.0 has a bug
// https://github.com/developit/unfetch/pull/164
import { default as fetch } from "unfetch";

import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { CLIENT_VERSION } from "./utils";

export const API_ENDPOINT = "/_/api/v2/analytics/";

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

  constructor(config) {
    super();
    this.config = config;

    this.registerPageView();
    this.injectGlobalAnalytics();
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

  injectGlobalAnalytics() {
    // Skip analytics for users with Do Not Track enabled
    if (navigator.doNotTrack === "1") {
      console.debug("Respecting DNT with respect to analytics...");
    } else {
      if (this.config.readthedocs.analytics.code) {
        (() => {
          // New Google Site Tag (gtag.js) tagging/analytics framework
          // https://developers.google.com/gtagjs
          let script = document.createElement("script");
          script.src =
            "https://www.googletagmanager.com/gtag/js?id=" +
            this.config.readthedocs.analytics.code;
          script.type = "text/javascript";
          script.async = true;
          document.getElementsByTagName("head")[0].appendChild(script);
        })();

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        // Setup the Read the Docs global analytics code and send a pageview
        gtag("config", this.config.readthedocs.analytics.code, {
          anonymize_ip: true,
          cookie_expires: 0, // Session cookie (non-persistent)
          dimension1: this.config.projects.current.slug,
          dimension2: this.config.versions.current.slug,
          dimension3: this.config.projects.current.language.code,
          dimension5: this.config.projects.current.programming_language.code,
          groups: "rtfd",
        });
      }
    }
  }
}
