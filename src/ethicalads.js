import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { default as objectPath } from "object-path";

// https://docs.readthedocs.io/en/stable/advertising/ad-customization.html#controlling-the-placement-of-an-ad
const EXPLICIT_PLACEMENT_SELECTOR = "#ethical-ad-placement";

// https://ethical-ad-client.readthedocs.io/en/latest/
const AD_TYPE = "text";
const AD_STYLE = "fixedfooter";

const AD_SCRIPT_ID = "ethicaladsjs";

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
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.ethicalads.json";
  static addonEnabledPath = "addons.ethicalads.enabled";
  static addonName = "EthicalAds";

  constructor(config) {
    super();
    this.config = config;

    this.injectEthicalAds();
  }

  // Borrowed from:
  // https://github.com/readthedocs/readthedocs.org/blob/6538d987c2fd26ef7ac38d35f135e52f43a9c6d0/readthedocs/core/static-src/core/js/doc-embed/rtd-data.js#L10-L18
  isReadTheDocsLikeTheme() {
    // Returns true for the Read the Docs theme on both sphinx and mkdocs
    if (document.querySelectorAll("div.rst-other-versions").length === 1) {
      // Crappy heuristic, but people change the theme name
      // So we have to do some duck typing.
      return true;
    }
    return false;
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
      if (
        placement.getAttribute("data-ea-type") !== "image" &&
        placement.getAttribute("data-ea-type") !== "text"
      ) {
        placement.setAttribute("data-ea-type", "readthedocs-sidebar");
      }
      if (this.isReadTheDocsLikeTheme()) {
        placement.classList.add("ethical-rtd");
        placement.classList.add("ethical-dark-theme");
      } else {
        placement.classList.add("ethical-alabaster");
      }
    }

    //
    // TODO: re-enable the case when there is no explicit placement defined and auto-inject the ad.
    // This is currently disabled because we have decided to start supporting explicit ad placements for now.
    // See https://github.com/readthedocs/meta/issues/132
    //
    // else {
    //   // Inject our own floating element
    //   placement = document.createElement("div");

    //   // Set the keyword, campaign data, and publisher
    //   placement.setAttribute("data-ea-publisher", data.publisher);
    //   placement.setAttribute("data-ea-type", AD_TYPE);
    //   placement.setAttribute("data-ea-style", AD_STYLE);
    //   if (keywords.length) {
    //     placement.setAttribute("data-ea-keywords", keywords.join("|"));
    //   }
    //   if (campaign_types.length) {
    //     placement.setAttribute(
    //       "data-ea-campaign-types",
    //       campaign_types.join("|"),
    //     );
    //   }

    //   placement.classList.add("raised");

    //   // TODO: find the right last resourse to append (probably not `document.body`)
    //   let main = document.querySelector("[role=main]") || document.body;
    //   main.insertBefore(placement, main.lastChild);
    //   console.log("EthicalAd placement injected.");
    // }

    if (placement) {
      // Always load the ad manually after ethicalad library is injected.
      // This ensure us that all the `data-ea-*` attributes are already set in the HTML tag.
      placement.setAttribute("data-ea-manual", "true");
    }

    return placement;
  }

  loadEthicalAdLibrary() {
    const library = document.createElement("script");
    library.setAttribute("id", AD_SCRIPT_ID);
    library.setAttribute("type", "text/javascript");
    library.setAttribute("async", true);
    library.setAttribute(
      "src",
      "https://media.ethicalads.io/media/client/ethicalads.min.js",
    );
    document.head.appendChild(library);

    document.getElementById(AD_SCRIPT_ID).addEventListener("load", function () {
      if (typeof ethicalads !== "undefined") {
        ethicalads.load();
      }
    });
  }

  injectEthicalAds() {
    // Create the placement first and after that load the EthicalAd library.
    // This will automatically "load_placement" and render the ad properly.
    this.createAdPlacement();
    this.loadEthicalAdLibrary();
  }

  static isEnabled(config) {
    return (
      super.isEnabled(config) && config.addons.ethicalads.ad_free === false
    );
  }
}
