import { CLIENT_VERSION, ADDONS_API_VERSION } from "./utils";

/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsConfig() {
  let url =
    "/_/addons/?" +
    new URLSearchParams({
      url: window.location.href,
      "client-version": CLIENT_VERSION,
      "api-version": ADDONS_API_VERSION,
    });

  // Retrieve a static JSON file when working in development mode
  if (window.location.href.startsWith("http://localhost")) {
    url = "/_/readthedocs-addons.json";
  }

  return fetch(url, {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      console.debug("Error parsing configuration data");
      return undefined;
    }
    return response.json();
  });
}
