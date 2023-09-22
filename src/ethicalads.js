import { AddonBase } from "./utils";
import { default as objectPath } from "object-path";

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

    // Optional attributes coming from the API JSON response.
    // We get them if exists or return default values otherwise.
    const data = this.config.addons.ethicalads;
    const keywords = objectPath.get(data, "keywords", []);
    const campaign_types = objectPath.get(data, "campaign_types", []);

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
      if (keywords.length) {
        placement.setAttribute("data-ea-keywords", keywords.join("|"));
      }
      if (campaign_types.length) {
        placement.setAttribute(
          "data-ea-campaign-types",
          campaign_types.join("|"),
        );
      }

      // placement.setAttribute("data-ea-manual", "true");
      placement.classList.add("raised");

      // TODO: find the right last resourse to append (probably not `document.body`)
      let main = document.querySelector("[role=main]") || document.body;
      main.insertBefore(placement, main.lastChild);
      console.log("EthicalAd placement injected.");
    }
    return placement;
  }

  loadEthicalAdLibrary() {
    const library = document.createElement("script");
    library.setAttribute("type", "text/javascript");
    library.setAttribute(
      "src",
      "https://media.ethicalads.io/media/client/ethicalads.min.js",
    );
    document.head.appendChild(library);
  }

  injectEthicalAds() {
    // Create the placement first and after that load the EthicalAd library.
    // This will automatically "load_placement" and render the ad properly.
    this.createAdPlacement();
    this.loadEthicalAdLibrary();
  }

  static isEnabled(config) {
    return (
      objectPath.get(config, "addons.ethicalads.enabled", false) === true &&
      // Mandatory attributes for this addon to render properly
      objectPath.get(config, "addons.ethicalads.ad_free", false) !== true &&
      objectPath.get(config, "addons.ethicalads.publisher", undefined) !==
        undefined
    );
  }
}
