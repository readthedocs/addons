import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { default as objectPath } from "object-path";

// https://docs.readthedocs.io/en/stable/advertising/ad-customization.html#controlling-the-placement-of-an-ad
const EXPLICIT_PLACEMENT_SELECTOR = "#ethical-ad-placement";

// https://ethical-ad-client.readthedocs.io/en/latest/
const AD_TYPE = "image";
const AD_STYLE = "stickybox";
const AD_SIZE = 200; // pixels

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

  isSphinxAlabasterLikeTheme() {
    const selectors = [
      'link[href^="_static/alabaster.css"]',
      'link[href^="_static/flask.css"]',
      'link[href^="_static/jinja.css"]',
      'link[href^="_static/click.css"]',
      'link[href^="_static/celery.css"]',
      'link[href^="_static/babel.css"]',
      'link[href^="_static/platter.css"]',
      'link[href^="_static/werkzeug.css"]',
    ];
    for (const selector of selectors) {
      if (document.querySelectorAll(selector).length === 1) {
        return true;
      }
    }
    return false;
  }

  isSphinxReadTheDocsLikeTheme() {
    if (
      document.querySelectorAll('script[src^="_static/js/theme.js"]').length ===
      1
    ) {
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
      // Always load the ad manually after ethicalad library is injected.
      // This ensure us that all the `data-ea-*` attributes are already set in the HTML tag.
      placement.setAttribute("data-ea-manual", "true");

      placement.setAttribute("data-ea-publisher", data.publisher);
      if (
        placement.getAttribute("data-ea-type") !== "image" &&
        placement.getAttribute("data-ea-type") !== "text"
      ) {
        placement.setAttribute("data-ea-type", "readthedocs-sidebar");
      }
    }
    // NOTE: we are testing EthicalAds on our own platform only for now.
    // We plan to expand this to more project soon.
    else if (window.location.hostname === "docs.readthedocs.io") {
      // Inject our own floating element
      placement = document.createElement("div");

      // Set the keyword, campaign data, and publisher
      placement.setAttribute("data-ea-publisher", data.publisher);
      placement.setAttribute("data-ea-type", AD_TYPE);
      placement.setAttribute("data-ea-style", AD_STYLE);
      placement.setAttribute("data-ea-placement-bottom", "90px");

      // Always load the ad manually after ethicalad library is injected.
      // This ensure us that all the `data-ea-*` attributes are already set in the HTML tag.
      placement.setAttribute("data-ea-manual", "true");

      if (keywords.length) {
        placement.setAttribute("data-ea-keywords", keywords.join("|"));
      }
      if (campaign_types.length) {
        placement.setAttribute(
          "data-ea-campaign-types",
          campaign_types.join("|"),
        );
      }

      placement.classList.add("raised");

      // Define where to inject the Ad based on the theme and if it's above the fold or not.
      let selector;
      let element;
      if (this.isSphinxReadTheDocsLikeTheme()) {
        selector = "nav.wy-nav-side > div.wy-side-scroll";
        element = document.querySelector(selector);

        if (!this.elementAboveTheFold(element)) {
          selector = "footer hr";
        }
      } else if (this.isSphinxAlabasterLikeTheme()) {
        selector = "div.sphinxsidebar > div.sphinxsidebarwrapper";
        element = document.querySelector(selector);
        if (!this.elementAboveTheFold(element)) {
          selector = "div.bodywrapper .body";
        }
      }

      let main = document.querySelector(selector);
      if (main) {
        main.append(placement);
      } else {
        main = document.querySelector("[role=main]") || document.body;
        main.insertBefore(placement, main.lastChild);
      }

      console.log("EthicalAd placement injected.");
    }

    if (placement) {
      // Add CSS classes based on the theme
      if (this.isSphinxReadTheDocsLikeTheme()) {
        placement.classList.add("ethical-rtd");
        placement.classList.add("ethical-dark-theme");
      } else if (this.isSphinxAlabasterLikeTheme()) {
        placement.classList.add("ethical-alabaster");
      }
    }

    return placement;
  }

  elementAboveTheFold(element) {
    // Determine if this element would be above the fold.
    // If this is off screen, instead create an ad in the footer.
    // Assumes the ad would be AD_SIZE pixels high.
    const div = document.createElement("div");

    // Append a temporary element to check if it's visible on the screen.
    element.append(div);
    const offsetTop = div.offsetTop;
    div.remove();

    if (
      !offsetTop ||
      offsetTop - window.scrollY + AD_SIZE > window.innerHeight
    ) {
      return false;
    }

    return true;
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
