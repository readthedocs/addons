import { CLIENT_VERSION } from "./utils";

/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsConfig() {
  let url =
    "/_/readthedocs-config/?" +
    new URLSearchParams({
      url: window.location.href,
    });

  // Retrieve a static JSON file when working in development mode
  if (window.location.href.startsWith("http://localhost")) {
    url = "/_/readthedocs-config.json";
  }

  return fetch(url, {
    method: "GET",
    headers: { "X-RTD-Hosting-Integrations-Version": CLIENT_VERSION },
  }).then((response) => {
    if (!response.ok) {
      console.debug("Error parsing configuration data");
      return undefined;
    }
    return response.json();
  });
}
