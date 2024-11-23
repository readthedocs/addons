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
import * as commands from "./commands";
import { default as objectPath } from "object-path";
import {
  domReady,
  isEmbedded,
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
    commands.CommandsAddon,
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
        const loadWhenEmbedded = objectPath.get(
          config,
          "addons.options.load_when_embedded",
          false,
        );
        if (isEmbedded() && !loadWhenEmbedded) {
          return false;
        }

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
                console.debug("Enabling addon:", addon.addonName);
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
