import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { default as objectPath } from "object-path";
import styleSheet from "./ethicalads.css";
import { IS_TESTING } from "./utils.js";

// https://docs.readthedocs.io/en/stable/advertising/ad-customization.html#controlling-the-placement-of-an-ad
const EXPLICIT_PLACEMENT_SELECTOR = "#ethical-ad-placement";

// https://ethical-ad-client.readthedocs.io/en/latest/
const AD_PLACEMENT_BOTTOM = "90px";
const AD_SIZE = 300; // pixels
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

  isSphinxBookThemeLikeTheme() {
    if (
      document.querySelectorAll(
        'link[href^="_static/styles/sphinx-book-theme.css"]',
      ).length === 1
    ) {
      return true;
    }
    return false;
  }

  isMaterialMkDocsTheme() {
    if (
      document.querySelectorAll(
        'meta[name="generator"][content*="mkdocs-material"]',
      ).length === 1
    ) {
      return true;
    }
    return false;
  }

  isDocusaurusTheme() {
    if (
      document.querySelectorAll('meta[name="generator"][content*="Docusaurus"]')
        .length === 1
    ) {
      return true;
    }
    return false;
  }

  createAdPlacement() {
    let placement;

    // TODO: fix this on testing. It works fine on production/regular browser.
    // TypeError: Failed to execute 'indexed value' on 'ObservableArray<CSSStyleSheet>': Failed to convert value to 'CSSStyleSheet'.
    if (!IS_TESTING) {
      // Include CSS into the DOM so they can be read.
      document.adoptedStyleSheets.push(styleSheet);
    }

    placement = document.querySelector(EXPLICIT_PLACEMENT_SELECTOR);
    if (placement) {
      if (
        placement.getAttribute("data-ea-type") !== "image" &&
        placement.getAttribute("data-ea-type") !== "text"
      ) {
        placement.setAttribute("data-ea-type", "readthedocs-sidebar");
      }
    }
    // NOTE: we are testing EthicalAds on our own platform only for now.
    // We plan to expand this to more project soon.
    else if (
      window.location.hostname === "docs.readthedocs.io" ||
      window.location.hostname.endsWith(".devthedocs.org")
    ) {
      // Inject our own floating element
      placement = document.createElement("div");
      placement.setAttribute("id", "readthedocs-ea");
      placement.classList.add("raised");

      // Define where to inject the Ad based on the theme and if it's above the fold or not.
      let selector;
      let element;
      let insertPlacement = true;

      if (this.isSphinxReadTheDocsLikeTheme()) {
        selector = "nav.wy-nav-side > div.wy-side-scroll";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.classList.add("ethical-rtd");
          placement.classList.add("ethical-dark-theme");
        } else {
          selector = "footer hr";
          placement.setAttribute("data-ea-type", "image");
          placement.setAttribute("data-ea-style", "stickybox");
          this.addEaPlacementToElement(placement);
        }
      } else if (this.isSphinxBookThemeLikeTheme()) {
        selector = ".sidebar-primary-items__start.sidebar-primary__section";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-alabaster");
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
        } else {
          selector = "article";
          placement.setAttribute("data-ea-type", "image");
          placement.setAttribute("data-ea-style", "stickybox");
          this.addEaPlacementToElement(placement);
        }
      } else if (this.isSphinxAlabasterLikeTheme()) {
        selector = "div.sphinxsidebar > div.sphinxsidebarwrapper";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-alabaster");
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
        } else {
          selector = "div.bodywrapper .body";
          placement.setAttribute("data-ea-type", "image");
          placement.setAttribute("data-ea-style", "stickybox");
          this.addEaPlacementToElement(placement);
        }
      } else if (this.isMaterialMkDocsTheme()) {
        selector = ".md-sidebar__scrollwrap";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          // TODO: use a more styled CSS class.
          // See https://github.com/readthedocs/ethical-ad-client/issues/193
          placement.classList.add("ethical-alabaster");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
        } else {
          selector = "main";
          placement.setAttribute("data-ea-type", "image");
          placement.setAttribute("data-ea-style", "stickybox");
          this.addEaPlacementToElement(placement);

          document
            .querySelector(selector)
            .insertAdjacentElement("afterend", placement);
          insertPlacement = false;
        }
      } else if (this.isDocusaurusTheme()) {
        selector = ".menu.thin-scrollbar.menu_SIkG";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          // TODO: use a more styled CSS class.
          // See https://github.com/readthedocs/ethical-ad-client/issues/193
          placement.classList.add("ethical-alabaster");
          placement.classList.add("ethical-docusaurus");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
        } else {
          selector = "article";
          placement.setAttribute("data-ea-type", "image");
          placement.setAttribute("data-ea-style", "stickybox");
          this.addEaPlacementToElement(placement);
        }
      } else {
        placement.setAttribute("data-ea-type", "image");
        placement.setAttribute("data-ea-style", "stickybox");
        this.addEaPlacementToElement(placement);
      }

      // Force a specific ad while testing this implementation.
      // TODO: remove this after we have tested for some time.
      placement.setAttribute(
        "data-ea-force-ad",
        "ethicaladsio-coming-soon-build-commands",
      );

      if (insertPlacement) {
        let main = document.querySelector(selector);
        if (main) {
          main.append(placement);
        } else {
          main = document.querySelector("[role=main]") || document.body;
          main.insertBefore(placement, main.lastChild);
        }
      }

      console.log("EthicalAd placement injected.");
    }

    // Optional attributes coming from the API JSON response.
    // We get them if exists or return default values otherwise.
    const data = this.config.addons.ethicalads;
    const keywords = objectPath.get(data, "keywords", []);
    const campaign_types = objectPath.get(data, "campaign_types", []);

    if (placement !== null) {
      // This ensure us that all the `data-ea-*` attributes are already set in the HTML tag.
      placement.setAttribute("data-ea-manual", "true");

      // Set the keyword, campaign data, and publisher
      placement.setAttribute("data-ea-publisher", data.publisher);

      if (keywords.length) {
        placement.setAttribute("data-ea-keywords", keywords.join("|"));
      }
      if (campaign_types.length) {
        placement.setAttribute(
          "data-ea-campaign-types",
          campaign_types.join("|"),
        );
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

  addEaPlacementToElement(element) {
    // Add `ea-placement-bottom` to the element only if the flyout is enabled.
    const flyoutEnabled = objectPath.get(
      this.config,
      "addons.flyout.enabled",
      false,
    );
    if (flyoutEnabled) {
      element.setAttribute("data-ea-placement-bottom", AD_PLACEMENT_BOTTOM);
    }
  }

  loadEthicalAdLibrary() {
    const library = document.createElement("script");
    library.setAttribute("id", AD_SCRIPT_ID);
    library.setAttribute("type", "text/javascript");
    library.setAttribute("async", true);

    // TODO: inject the stable version after we have tested this.
    // Inject the Ethical Ad client (beta) only for our own documentation.
    let src;
    if (
      window.location.hostname === "docs.readthedocs.io" ||
      window.location.hostname.endsWith(".devthedocs.org")
    ) {
      src = "https://media.ethicalads.io/media/client/beta/ethicalads.min.js";
    } else {
      src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
    }

    library.setAttribute("src", src);
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
