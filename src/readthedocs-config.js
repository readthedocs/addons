import { default as fetch } from "unfetch";
import {
  CLIENT_VERSION,
  ADDONS_API_VERSION,
  ADDONS_API_ENDPOINT,
  IS_TESTING,
} from "./utils";

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
  }).then((response) => {
    if (!response.ok) {
      console.debug("Error parsing configuration data");
      return undefined;
    }
    return response.json();
  });
}
