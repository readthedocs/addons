import { getReadTheDocsConfig } from "./readthedocs-config";
import * as notification from "./notification";
import * as analytics from "./analytics";
import * as search from "./search";
import * as docdiff from "./docdiff";
import * as flyout from "./flyout";
import * as ethicalads from "./ethicalads";
import * as hotkeys from "./hotkeys";
import * as linkpreviews from "./linkpreviews";
import * as filetreediff from "./filetreediff";
import * as customscript from "./customscript";
import {
  domReady,
  IS_PRODUCTION,
  setupLogging,
  getMetadataValue,
} from "./utils";

export function setup() {
  const addons = [
    flyout.FlyoutAddon,
    notification.NotificationAddon,
    analytics.AnalyticsAddon,
    ethicalads.EthicalAdsAddon,
    search.SearchAddon,
    docdiff.DocDiffAddon,
    hotkeys.HotKeysAddon,
    linkpreviews.LinkPreviewsAddon,
    filetreediff.FileTreeDiffAddon,
    customscript.CustomScriptAddon,
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
