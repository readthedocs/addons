import { CLIENT_VERSION } from "./utils";
import { EVENT_READTHEDOCS_ADDONS_DATA_READY } from "./events";

/**
 * Get the Read the Docs API version supported by user's integrations.
 *
 */
function _getMetadataAddonsAPIVersion() {
  const meta = document.querySelector(
    "meta[name=readthedocs-addons-api-version]"
  );
  if (meta !== undefined) {
    return meta.getAttribute("content");
  }
  return undefined;
}

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
    url = "http://localhost:8000/_/readthedocs-addons.json";
  }

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        console.debug("Error parsing configuration data");
        return undefined;
      }
      return response.json();
    })
    .then((data) => {
      // We force the user to define the `<meta>` tag to be able to use Read the Docs data directly.
      // This is to keep forward/backward compatibility without breaking integrations.
      const metadataAddonsAPIVersion = _getMetadataAddonsAPIVersion();
      if (metadataAddonsAPIVersion !== undefined) {
        if (metadataAddonsAPIVersion !== data.api_version) {
          // When the API scheme version returned doesn't match the one defined via `<meta>` tag by the user,
          // we perform another request to get the Read the Docs response in the structure
          // that's supported by the user and dispatch a custom event letting them know
          // this data is ready to be consumed under `event.detail`.

          url =
            "/_/addons/?" +
            new URLSearchParams({
              url: window.location.href,
              "client-version": CLIENT_VERSION,
              "api-version": metadataAddonsAPIVersion,
            });
          fetch(url, {
            method: "GET",
          })
            .then((response) => {
              if (!response.ok) {
                console.debug("Error parsing configuration data");
                return undefined;
              }
              return response.json();
            })
            .then((data) => {
              const readthedocsDataReady = new CustomEvent(
                EVENT_READTHEDOCS_ADDONS_DATA_READY,
                { detail: data }
              );
              document.dispatchEvent(readthedocsDataReady);
              return undefined;
            });
        } else {
          const readthedocsDataReady = new CustomEvent(
            EVENT_READTHEDOCS_ADDONS_DATA_READY,
            {
              detail: data,
            }
          );
          document.dispatchEvent(readthedocsDataReady);
        }
      }

      return data;
    });
}
