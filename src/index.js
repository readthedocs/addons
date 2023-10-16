import { getReadTheDocsConfig } from "./readthedocs-config";
import * as notification from "./notification";
import * as analytics from "./analytics";
import * as search from "./search";
import * as docdiff from "./docdiff";
import * as flyout from "./flyout";
import * as ethicalads from "./ethicalads";
import * as hotkeys from "./hotkeys";
import { domReady, isReadTheDocsEmbedPresent } from "./utils";

export function setup() {
  if (isReadTheDocsEmbedPresent()) {
    console.debug("Read the Docs Embed is present. Skipping...");
    return false;
  }

  const addons = [
    flyout.FlyoutAddon,
    notification.NotificationAddon,
    analytics.AnalyticsAddon,
    ethicalads.EthicalAdsAddon,
    search.SearchAddon,
    docdiff.DocDiffAddon,
    hotkeys.HotKeysAddon,
  ];

  return new Promise((resolve) => {
    domReady
      .then(() => {
        let sendUrlParam = false;
        for (const addon of addons) {
          if (addon.requiresUrlParam()) {
            sendUrlParam = true;
            break;
          }
        }

        return getReadTheDocsConfig(sendUrlParam);
      })
      .then((config) => {
        let promises = [];

        // IS_PRODUCTION comes from Webpack and is undeclared otherwise
        if (typeof IS_PRODUCTION === "undefined" ? false : IS_PRODUCTION) {
          // Addons that are only available on development
        }

        for (const addon of addons) {
          if (addon.isEnabled(config)) {
            promises.push(
              new Promise((resolve) => {
                resolve(new addon(config));
              }),
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
