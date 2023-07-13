// FIXME: how should we remove the `dist/` from this path?
// NOTE: it requires this PR to work: https://github.com/readthedocs/ethical-ad-client/pull/148
import { load_placements } from "ethical-ad-client/dist/ethicalads";
import { AddonBase } from "./utils";

const EXPLICIT_PLACEMENT_SELECTOR = "[data-ea-publisher]";

// https://ethical-ad-client.readthedocs.io/en/latest/
const AD_TYPE = "text";
const AD_STYLE = "fixedfooter";

/**
 * EthicalAds addon
 *
 * Show an ad in the documentation page.
 *
 * Read more at:
 *  - https://docs.readthedocs.io/en/stable/advertising/ethical-advertising.html
 *
 * @param {Object} config - Addon configuration object
 */
export class EthicalAdsAddon extends AddonBase {
  constructor(config) {
    super();
    this.config = config;

    this.injectEthicalAds();
  }

  createAdPlacement() {
    let placement;
    const data = this.config.addons.ethicalads;

    placement = document.querySelector(EXPLICIT_PLACEMENT_SELECTOR);
    if (placement) {
      placement.setAttribute("data-ea-publisher", data.publisher);
      placement.setAttribute("data-ea-manual", "true");
      if (
        placement.getAttribute("data-ea-type") !== "image" &&
        placement.getAttribute("data-ea-type") !== "text"
      ) {
        placement.setAttribute("data-ea-type", "readthedocs-sidebar");
      }
    } else {
      // Inject our own floating element
      placement = document.createElement("div");

      // Set the keyword, campaign data, and publisher
      placement.setAttribute("data-ea-publisher", data.publisher);
      placement.setAttribute("data-ea-type", AD_TYPE);
      placement.setAttribute("data-ea-style", AD_STYLE);
      if (data.keywords) {
        placement.setAttribute("data-ea-keywords", data.keywords.join("|"));
      }
      if (data.campaign_types) {
        placement.setAttribute(
          "data-ea-campaign-types",
          data.campaign_types.join("|")
        );
      }

      // placement.setAttribute("data-ea-manual", "true");
      placement.setAttribute("data-ea-style", "stickybox");
      placement.classList.add("raised");

      // TODO: find the right last resourse to append (probably not `document.body`)
      let main = document.querySelector("[role=main]") || document.body;
      main.insertBefore(placement, main.lastChild);
      console.log("EthicalAd placement injected.");
    }
    return placement;
  }

  injectEthicalAds() {
    this.createAdPlacement();
    // FIXME: the function `ethicalads.load_placements()` is called automatically when the module is imported,
    // but we want to call it manually because we need to inject our `div` first.
    load_placements();
  }

  static isEnabled(config) {
    return (
      config.addons &&
      config.addons.ethicalads.enabled &&
      !config.addons.ethicalads.ad_free
    );
  }
}
