import { getReadTheDocsConfig } from "./readthedocs-config";
import { injectExternalVersionWarning } from "./external-version-warning";
import { injectNonLatestVersionWarning } from "./non-latest-version-warning";
import { injectFlyout, trackFlyoutEvents } from "./flyout";
import { registerPageView, injectAnalytics } from "./analytics";
import { injectEthicalAd } from "./sponsorship";
import { initializeSearchAsYouType } from "./search";
import { initializeDocDiff } from "./docdiff";
import { initializeTooltips } from "./tooltips";
import { domReady, isReadTheDocsEmbedPresent } from "./utils";

export function setup() {
  if (isReadTheDocsEmbedPresent()) {
    console.debug("Read the Docs Embed is present. Skipping...");
    return false;
  }

  return new Promise((resolve) => {
    domReady
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
          initializeTooltips,
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
        console.error(err);
      });
  });
}
