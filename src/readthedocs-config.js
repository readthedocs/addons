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
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsConfig(sendUrlParam) {
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
                console.debug("Error parsing configuration data");
                return undefined;
              }
              return response.json();
            })
            .then((data) => {
              const readthedocsDataReady = new CustomEvent(
                EVENT_READTHEDOCS_ADDONS_DATA_READY,
                { detail: data },
              );
              document.dispatchEvent(readthedocsDataReady);
              return undefined;
            });
        } else {
          const readthedocsDataReady = new CustomEvent(
            EVENT_READTHEDOCS_ADDONS_DATA_READY,
            {
              detail: data,
            },
          );
          document.dispatchEvent(readthedocsDataReady);
        }
      }

      return data;
    });
}
