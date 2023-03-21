import { getReadTheDocsConfig } from "./readthedocs-config";
import { injectExternalVersionWarning } from "./external-version-warning";
import { injectNonLatestVersionWarning } from "./non-latest-version-warning";
import { injectFlyout, trackFlyoutEvents } from "./flyout";
import { registerPageView, injectAnalytics } from "./analytics";
import { injectEthicalAd } from "./sponsorship";
import { initializeHoverXRef } from "./hoverxref";
import { initializeSearchAsYouType } from "./search";
import { initializeDocDiff } from "./docdiff";

export function IsReadTheDocsEmbedPresent() {
  const url = "/_/static/javascript/readthedocs-doc-embed.js";
  return document.querySelectorAll(`script[src="${url}"]`).length > 0;
}

export function setup() {
  if (IsReadTheDocsEmbedPresent()) {
    console.debug("Read the Docs Embed is present. Skipping...");
    return false;
  }

  const is_loaded = new Promise((resolve) => {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      return resolve();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        () => {
          resolve();
        },
        {
          capture: true,
          once: true,
          passive: true,
        }
      );
    }
    return undefined;
  });

  return new Promise((resolve) => {
    is_loaded
      .then(() => {
        return getReadTheDocsConfig();
      })
      .then((config) => {
        let promises = [];
        const integrations = [
          injectAnalytics,
          injectFlyout,
          initializeSearchAsYouType,
          trackFlyoutEvents,
          registerPageView,
          injectEthicalAd,
          initializeHoverXRef,
          injectNonLatestVersionWarning,
          injectExternalVersionWarning,
          // NOTE: disable DocDiff for now because it breaks other integrations
          // See https://github.com/readthedocs/readthedocs-client/issues/11
          // initializeDocDiff,
        ];

        // Iterate over all the integration functions and create one Promise for each of them.
        // They will be executed concurrently.
        for (let fn of integrations) {
          promises.push(
            new Promise((resolve) => {
              resolve(fn(config));
            })
          );
        }

        return Promise.all(promises);
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
}
