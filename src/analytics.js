import { CLIENT_VERSION } from "./utils";

const API_ENDPOINT = "/_/api/v2/analytics/";

/**
  Register page view on Read the Docs analytics feature.
  https://docs.readthedocs.io/en/stable/reference/analytics.html
*/
export function registerPageView(config) {
  const params = {
    project: config.project.slug,
    version: config.version.slug,
    absolute_uri: window.location.href,
  };

  const url = API_ENDPOINT + "?" + new URLSearchParams(params).toString();
  fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { "X-RTD-Hosting-Integrations-Version": CLIENT_VERSION },
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

/**
  For more details on analytics at Read the Docs, please see:
  https://docs.readthedocs.io/en/stable/advertising/advertising-details.html#analytics
*/
export function injectAnalytics(config) {
  // Skip analytics for users with Do Not Track enabled
  if (navigator.doNotTrack === "1") {
    console.debug("Respecting DNT with respect to analytics...");
  } else {
    if (config.readthedocs.analytics.code) {
      (function () {
        // New Google Site Tag (gtag.js) tagging/analytics framework
        // https://developers.google.com/gtagjs
        let script = document.createElement("script");
        script.src =
          "https://www.googletagmanager.com/gtag/js?id=" +
          config.readthedocs.analytics.code;
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
      gtag("config", config.readthedocs.analytics.code, {
        anonymize_ip: true,
        cookie_expires: 0, // Session cookie (non-persistent)
        dimension1: config.project.slug,
        dimension2: config.version.slug,
        dimension3: config.project.language,
        dimension5: config.project.programming_language,
        groups: "rtfd",
      });
    }
  }
}
