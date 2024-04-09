import { default as fetch } from "unfetch";
import { EVENT_READTHEDOCS_ADDONS_DATA_READY } from "./events";
import {
  CLIENT_VERSION,
  IS_TESTING,
  ADDONS_API_VERSION,
  ADDONS_API_ENDPOINT,
} from "./utils";

/**
 * Get the Read the Docs API version supported by user's integrations.
 *
 */
function _getMetadataAddonsAPIVersion() {
  const meta = document.querySelector(
    "meta[name=readthedocs-addons-api-version]",
  );
  if (meta !== undefined) {
    return meta.getAttribute("content");
  }
  return undefined;
}

/**
 * Get the Addons API endpoint URL to hit.
 *
 * It uses META HTML tags to get project/version slugs and `sendUrlParam` to
 * decide whether or not sending `url=`.
 */
function _getAPIURL(sendUrlParam) {
  const metaProject = document.querySelector(
    "meta[name='readthedocs-project-slug']",
  );
  const metaVersion = document.querySelector(
    "meta[name='readthedocs-version-slug']",
  );

  let projectSlug;
  let versionSlug;
  let params = {
    "client-version": CLIENT_VERSION,
    "api-version": ADDONS_API_VERSION,
  };

  if (sendUrlParam) {
    params["url"] = window.location.href;
  }

  if (metaProject && metaVersion) {
    projectSlug = metaProject.content;
    versionSlug = metaVersion.content;

    params["project-slug"] = projectSlug;
    params["version-slug"] = versionSlug;
  }

  let url = ADDONS_API_ENDPOINT + "?" + new URLSearchParams(params);

  // Retrieve a static JSON file when working in development mode
  if (window.location.href.startsWith("http://localhost") && !IS_TESTING) {
    url = "/_/readthedocs-addons.json";
  }

  return url;
}

/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsConfig(sendUrlParam) {
  const url = _getAPIURL(sendUrlParam);

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw "Error parsing configuration data";
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
            ADDONS_API_ENDPOINT +
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
                throw "Error parsing configuration data";
              }
              return response.json();
            })
            .then((data) => {
              dispatchEvent(
                EVENT_READTHEDOCS_ADDONS_DATA_READY,
                document,
                data,
              );
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          dispatchEvent(EVENT_READTHEDOCS_ADDONS_DATA_READY, document, data);
        }
      }

      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

function dispatchEvent(eventName, element, data) {
  const event = new CustomEvent(eventName, { detail: data });
  element.dispatchEvent(event);
}
