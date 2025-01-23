import { CSSResult } from "lit";

import {
  docTool,
  domReady,
  isEmbedded,
  IS_PRODUCTION,
  setupLogging,
  setupHistoryEvents,
  getMetadataValue,
} from "./utils";
import { getReadTheDocsConfig } from "./readthedocs-config";
import {
  EVENT_READTHEDOCS_ADDONS_INTERNAL_DATA_READY,
  EVENT_READTHEDOCS_URL_CHANGED,
} from "./events";

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
import * as application from "./application";
import { default as objectPath } from "object-path";

import doctoolsStyleSheet from "./doctools.css";

export class AddonsApplication {
  constructor() {
    this.config = null;

    console.log(
      "Addons Application config (from constructor() method)",
      this.config,
    );

    this.addons = [
      flyout.FlyoutAddon,
      notification.NotificationAddon,
      analytics.AnalyticsAddon,
      ethicalads.EthicalAdsAddon,
      search.SearchAddon,

      // HotKeys has to be initialized before DocDiff because when
      // `?readthedocs-diff=true` DocDiff triggers an event that HotKeys has to
      // listen to to update its internal state.
      hotkeys.HotKeysAddon,
      docdiff.DocDiffAddon,

      linkpreviews.LinkPreviewsAddon,
      filetreediff.FileTreeDiffAddon,
      customscript.CustomScriptAddon,
    ];

    this.httpStatus = getMetadataValue("readthedocs-http-status");

    setupLogging();
    setupHistoryEvents();
    this.addDoctoolData();
    getReadTheDocsConfig(this.sendUrlParam()); // .then(() => console.log("Finished"));;
  }

  reload(config) {
    console.log("Addons Application config (from reload() method)", config);

    if (!config) {
      return null;
    }

    this.config = config;

    if (this.config && !this.loadWhenEmbedded()) {
      return null;
    }

    let promises = [];
    for (const addon of this.addons) {
      if (addon.isEnabled(this.config, this.httpStatus)) {
        promises.push(
          new Promise((resolve) => {
            resolve(new addon(this.config));
          }),
        );
      }
    }

    Promise.all(promises).catch((err) => {
      console.error(err);
    });

    return null;
  }

  loadWhenEmbedded() {
    const loadWhenEmbedded = objectPath.get(
      this.config,
      "addons.options.load_when_embedded",
      false,
    );
    if (isEmbedded() && !loadWhenEmbedded) {
      return false;
    }
    return true;
  }

  sendUrlParam() {
    for (const addon of this.addons) {
      if (addon.requiresUrlParam()) {
        return true;
      }
    }
    return false;
  }

  addDoctoolData() {
    // Apply fixes to variables for individual documentation tools
    const elementHtml = document.querySelector("html");
    if (elementHtml) {
      // Inject styles at the parent DOM to set variables at :root
      let styleSheet = doctoolsStyleSheet;
      if (doctoolsStyleSheet instanceof CSSResult) {
        styleSheet = doctoolsStyleSheet.styleSheet;
      }
      document.adoptedStyleSheets = [styleSheet];

      // If we detect a documentation tool, set attributes on :root to allow
      // for CSS selectors to utilize these values.
      if (docTool.documentationTool) {
        elementHtml.setAttribute(
          "data-readthedocs-tool",
          docTool.documentationTool,
        );
      }
      if (docTool.documentationTheme) {
        elementHtml.setAttribute(
          "data-readthedocs-tool-theme",
          docTool.documentationTheme,
        );
      }
    }
  }
}

export const addonsApplication = new AddonsApplication();

/**
 * Subscribe to `EVENT_READTHEDOCS_ADDONS_INTERNAL_DATA_READY` to reload all the
 * addons with fresh Addons API data once it's ready.
 *
 */
document.addEventListener(
  EVENT_READTHEDOCS_ADDONS_INTERNAL_DATA_READY,
  (event) => {
    addonsApplication.reload(event.detail.data(true));
  },
);

/**
 * Subscribe to `EVENT_READTHEDOCS_URL_CHANGED` to trigger a new request to
 * Addons API to fetch fresh data.
 *
 */
window.addEventListener(EVENT_READTHEDOCS_URL_CHANGED, (event) => {
  console.debug("URL Change detected. Triggering a new API call", event);
  // TODO: find a way to get access to the `AddonApplication.sendUrlParam()` method.
  getReadTheDocsConfig(true);
});
