import { getReadTheDocsConfig } from "./readthedocs-config";
import * as notification from "./notification";
import * as analytics from "./analytics";
import * as search from "./search";
import * as newflyout from "./new-flyout";
import * as ethicalads from "./ethicalads";
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
        let addons = [
          analytics.AnalyticsAddon,
          notification.NotificationAddon,
          newflyout.FlyoutAddon,
        ];

        if (!IS_PRODUCTION) {
          // Addons that are only available on development
          addons.push(ethicalads.EthicalAdsAddon);
          // NOTE: Disabling search for now because it's incompatible with Flyout
          addons.push(search.SearchAddon);
        }

        for (const addon of addons) {
          if (addon.isEnabled(config)) {
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
