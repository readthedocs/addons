import { getReadTheDocsConfig } from "./readthedocs-config";
import * as notification from "./notification";
import * as analytics from "./analytics";
import * as search from "./search";
import * as docdiff from "./docdiff";
import * as flyout from "./flyout";
import * as ethicalads from "./ethicalads";
import * as hotkeys from "./hotkeys";
import {
  domReady,
  isReadTheDocsEmbedPresent,
  isEmbedded,
  IS_PRODUCTION,
  setupLogging,
  getMetadataValue,
} from "./utils";

export function setup() {
  if (isReadTheDocsEmbedPresent()) {
    console.debug("Read the Docs Embed is present. Skipping...");
    // TODO: return ``Promise.reject()`` or similar here to avoid hybrid async/sync functions.
    return false;
  }

  if (isEmbedded()) {
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
        setupLogging();

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
        const httpStatus = getMetadataValue("readthedocs-http-status");
        let promises = [];

        if (!IS_PRODUCTION) {
          // Addons that are only available on development
          console.log("Development mode.");
        }

        for (const addon of addons) {
          if (addon.isEnabled(config, httpStatus)) {
            promises.push(
              new Promise((resolve) => {
                return resolve(new addon(config));
              }),
            );
          }
        }
        return Promise.all(promises);
      })
      .then(() => {
        return resolve();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
