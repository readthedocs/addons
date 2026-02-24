import { ajv } from "./data-validation";
import { AddonBase } from "./utils";
import { default as objectPath } from "object-path";
import styleSheet from "./ethicalads.css";
import { IS_TESTING, docTool } from "./utils.js";

// https://docs.readthedocs.io/en/stable/advertising/ad-customization.html#controlling-the-placement-of-an-ad
const EXPLICIT_PLACEMENT_SELECTORS = [
  "#ethical-ad-placement",
  "[data-ea-publisher]",
];

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

  loadConfig(config) {
    this.config = config;

    // Do not add another ad if we already added one
    if (document.querySelector(`#${AD_SCRIPT_ID}`) !== null) {
      return;
    }

    this.injectEthicalAds();
  }

  createAdPlacement() {
    let placement;
    let fixedFooterAdSelectors;

    const placementIdSuffix = docTool.getDocumentationTool() || "nodoctool";

    // TODO: fix this on testing. It works fine on production/regular browser.
    // TypeError: Failed to execute 'indexed value' on 'ObservableArray<CSSStyleSheet>': Failed to convert value to 'CSSStyleSheet'.
    if (!IS_TESTING) {
      // Include CSS into the DOM so they can be read.
      document.adoptedStyleSheets.push(styleSheet);
    }

    for (const explicitSelector of EXPLICIT_PLACEMENT_SELECTORS) {
      placement = document.querySelector(explicitSelector);
      if (placement) break;
    }

    if (placement) {
      if (
        placement.getAttribute("data-ea-type") !== "image" &&
        placement.getAttribute("data-ea-type") !== "text"
      ) {
        placement.setAttribute("data-ea-type", "readthedocs-sidebar");
      }
    } else {
      // Inject our own floating element
      placement = document.createElement("div");
      placement.classList.add("raised");

      // Define where to inject the Ad based on the theme and if it's above the fold or not.
      let selector;
      let element;
      let knownPlacementFound = false;

      if (docTool.isSphinxReadTheDocsLikeTheme()) {
        selector = "nav.wy-nav-side > div.wy-side-scroll";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.classList.add("ethical-rtd");
          placement.classList.add("ethical-dark-theme");
          knownPlacementFound = true;
        } else {
          // We know it's RTD theme and the ad in the navbar is not above the fold at this point.
          // Then, we render the ad as fixed footer.
          fixedFooterAdSelectors = ["section", "nav"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isSphinxFuroLikeTheme()) {
        // NOTE: The code to handle furo theme shouldn't be required,
        // since furo uses explicit placement.
        // However, the Jinja context variable READTHEDOCS is not injected anymore,
        // and furo does not includes the explicit placement due to this.
        // This is a temporal solution while they fix this.
        selector = ".sidebar-tree";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          // NOTE: I'm using `image` instead of `readthedocs-sidebar` because
          // the later doesn't support dark mode.
          //
          // placement.classList.add("ethical-alabaster");
          // placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-type", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div.main", "aside.sidebar-drawer"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isSphinxBookThemeLikeTheme()) {
        selector = ".sidebar-primary-items__start.sidebar-primary__section";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div.bd-container__inner"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isSphinxAlabasterLikeTheme()) {
        selector = "div.sphinxsidebar > div.sphinxsidebarwrapper";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-alabaster");
          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div.footer"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isMaterialMkDocsTheme()) {
        // Detect the left navbar if it's not hidden or grab the navbar from a post page
        selector =
          ".md-sidebar--primary:not([hidden]) > .md-sidebar__scrollwrap, .md-sidebar--post > .md-sidebar__scrollwrap";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          knownPlacementFound = true;
          // TODO: re-enable fixed footer ad for Material for MkDocs when we are ready.
          // https://github.com/readthedocs/addons/pull/641#pullrequestreview-3288251971
          // } else {
          //   fixedFooterAdSelectors = ["footer.md-footer"];
          //   this.setFixedFooterAdProperties(placement);
          //   knownPlacementFound = true;
        }
      } else if (docTool.isDocusaurusTheme()) {
        selector = ".menu.thin-scrollbar.menu_SIkG";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");
          placement.classList.add("ethical-docusaurus");

          placement.setAttribute("data-ea-type", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["footer.footer"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isDocsify()) {
        selector = "main > aside > div.sidebar-nav";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");
          placement.classList.add("ethical-docsify");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = [
            "section.content",
            "aside.sidebar",
            "button.sidebar-toggle",
          ];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isAntora()) {
        selector = "aside nav.nav-menu";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["footer.footer"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isMdBook()) {
        selector = "nav#sidebar mdbook-sidebar-scrollbox";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div#body-container"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isVitePress()) {
        selector = "aside";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div#VPContent"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      } else if (docTool.isZensical()) {
        selector = "div.md-sidebar__scrollwrap";
        element = document.querySelector(selector);

        if (this.elementAboveTheFold(element)) {
          placement.classList.add("ethical-light-theme");

          placement.setAttribute("data-ea-type", "readthedocs-sidebar");
          placement.setAttribute("data-ea-style", "image");
          knownPlacementFound = true;
        } else {
          fixedFooterAdSelectors = ["div.md-footer-meta"];
          this.setFixedFooterAdProperties(placement);
          knownPlacementFound = true;
        }
      }

      const placementStyle =
        placement.getAttribute("data-ea-style") || "nostyle";

      // Always append the ad to the body when it's fixed footer.
      // This avoids issues with z-index on parent elements.
      if (placementStyle === "fixedfooter") {
        selector = "body";
      }

      if (selector && knownPlacementFound) {
        const elementToAppend = document.querySelector(selector);
        if (elementToAppend) {
          elementToAppend.append(placement);
        }
      } else {
        // Default to a text ad appended to the root selector when no known placement found
        placement.setAttribute("data-ea-type", "text");

        const rootSelector = docTool.getRootSelector();
        const rootElement = document.querySelector(rootSelector);

        if (rootElement) {
          rootElement.append(placement);
        } else {
          console.debug("Could not find root element to append ad");
        }
      }
    }

    // Optional attributes coming from the API JSON response.
    // We get them if exists or return default values otherwise.
    const data = this.config.addons.ethicalads;
    const keywords = objectPath.get(data, "keywords", []);
    const campaign_types = objectPath.get(data, "campaign_types", []);

    if (placement !== null) {
      // Allow EA to switch between light/dark mode
      placement.classList.add("adaptive-css");

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

      const placementStyle =
        placement.getAttribute("data-ea-style") || "nostyle";
      const placementType = placement.getAttribute("data-ea-type") || "notype";
      const placementIdPrefix = `${placementType}-${placementStyle}`;
      if (!placement.getAttribute("id")) {
        // Set a standardized id attribute
        placement.setAttribute(
          "id",
          `readthedocs-ea-${placementIdPrefix}-${placementIdSuffix}`,
        );
      }

      if (placementStyle == "fixedfooter") {
        // Use a ``MutationObserver`` to listen to style changes in the fixed footer ad.
        // Grab the height of it and use to add some ``padding-bottom`` to the required elements.
        const config = { attributes: true, childList: false, subtree: false };
        const callback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.type === "attributes") {
              const fixedFooterAdHeight = window.getComputedStyle(
                mutation.target,
              ).height;
              console.debug("fixedFooterAdHeight", fixedFooterAdHeight);
              for (const selector of fixedFooterAdSelectors) {
                const element = document.querySelector(selector);
                element.style.setProperty(
                  "padding-bottom",
                  fixedFooterAdHeight,
                );
              }
            }
          }
        };
        const observer = new MutationObserver(callback);
        observer.observe(placement, config);
      }
    }

    return placement;
  }

  elementAboveTheFold(element) {
    // Return false if element doesn't exist
    if (!element) {
      return false;
    }

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

  setFixedFooterAdProperties(placement) {
    placement.setAttribute("data-ea-type", "text");
    placement.setAttribute("data-ea-style", "fixedfooter");
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
      window.location.hostname === "docs.readthedocs.com" ||
      window.location.hostname.endsWith(".devthedocs.org") ||
      // Use new beta client on Furo like themes for now.
      // This allows us to test the dark/light mode.
      docTool.isSphinxFuroLikeTheme()
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

  addWidthListener() {
    // Hide ad when the window is smaller than the stickybox width
    const placement = document.querySelector("#readthedocs-ea");
    if (placement && placement.dataset.eaStyle === "stickybox") {
      window.addEventListener("resize", function () {
        if (window.innerWidth <= 1300) {
          placement.style.display = "none";
        } else {
          placement.style.display = "";
        }
      });
    }
  }

  injectEthicalAds() {
    // Create the placement first and after that load the EthicalAd library.
    // This will automatically "load_placement" and render the ad properly.
    this.createAdPlacement();
    this.addWidthListener();
    this.loadEthicalAdLibrary();
  }

  static isEnabled(config, httpStatus) {
    return (
      objectPath.get(config, "addons.ethicalads.ad_free", false) === false &&
      super.isEnabled(config, httpStatus)
    );
  }
}
