import { CSSResult } from "lit";

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
import * as application from "./application";
import { default as objectPath } from "object-path";
import {
  docTool,
  domReady,
  isEmbedded,
  IS_PRODUCTION,
  setupLogging,
  getMetadataValue,
} from "./utils";

import doctoolsStyleSheet from "./doctools.css";
import { html, nothing, render, LitElement } from "lit";
import { ContextConsumer } from "@lit/context";
import { configContext } from "./context.js";

export class AddonsAppElement extends LitElement {
  static elementName = "readthedocs-application";

  // `_config` is the context we are going to consume when it's updated.
  _config = new ContextConsumer(this, {
    context: configContext,
    subscribe: true,
  });

  constructor() {
    super();

    console.log(
      "Addons Application _config (from constructor() method)",
      this._config.value,
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
    getReadTheDocsConfig(this.sendUrlParam()); // .then(() => console.log("Finished"));;
  }

  render() {
    console.log(
      "Addons Application _config (from render() method)",
      this._config.value,
    );

    if (!this._config.value) {
      return nothing;
    }

    if (this._config.value && !this.loadWhenEmbedded()) {
      return nothing;
    }

    let promises = [];
    for (const addon of this.addons) {
      if (addon.isEnabled(this._config.value, this.httpStatus)) {
        promises.push(
          new Promise((resolve) => {
            resolve(new addon(this._config.value));
          }),
        );
      }
    }

    Promise.all(promises).catch((err) => {
      console.error(err);
    });

    return nothing;
  }

  loadWhenEmbedded() {
    const loadWhenEmbedded = objectPath.get(
      this._config.value,
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

customElements.define("readthedocs-application", AddonsAppElement);
render(new AddonsAppElement(), document.body);
