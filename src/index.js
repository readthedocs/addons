import { getReadTheDocsConfig } from "./readthedocs-config";
import * as notification from "./notification";
import * as analytics from "./analytics";
import { injectNonLatestVersionWarning } from "./non-latest-version-warning";
import { injectFlyout, trackFlyoutEvents } from "./flyout";
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
          injectFlyout,
          initializeSearchAsYouType,
          trackFlyoutEvents,
          injectEthicalAd,
          initializeTooltips,
          injectNonLatestVersionWarning,
          // NOTE: disable DocDiff for now because it breaks other integrations
          // See https://github.com/readthedocs/readthedocs-client/issues/11
          // initializeDocDiff,
        ];

        // Iterate over all the integration functions and create one Promise for each of them.
        // They will be executed concurrently.
        for (const fn of integrations) {
          promises.push(
            new Promise((resolve) => {
              resolve(fn(config));
            })
          );
        }

        // TODO migrate the above to use a common pattern for addon injection.
        // Addons should not execute or inject anything if they are not enabled.
        const addons = [
          notification.NotificationAddon,
          analytics.AnalyticsAddon,
        ];

        for (const addon of addons) {
          if (addon.isEnabled) {
            promises.push(
              new Promise((resolve) => {
                resolve(new addon(config));
              })
            );
          }
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
