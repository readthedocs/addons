import { default as fetch } from "unfetch";
import { html, nothing, render, LitElement } from "lit";
import styleSheet from "./linkpreviews.css";

import {
  AddonBase,
  domReady,
  CLIENT_VERSION,
  IS_TESTING,
  docTool,
} from "./utils";
import { EVENT_READTHEDOCS_ROOT_DOM_CHANGED } from "./events";
import { EMBED_API_ENDPOINT } from "./constants";
import {
  computePosition,
  autoPlacement,
  shift,
  offset,
  arrow,
} from "@floating-ui/dom";
import { default as objectPath } from "object-path";

// Remove delay when running tests
const SHOW_TOOLTIP_DELAY = IS_TESTING ? 0 : 300;
const HIDE_TOOLTIP_DELAY = IS_TESTING ? 0 : 300;

const TOOLTIP_DATA_HREF = "data-linkpreview-href";

// Object to save the responses from the EmbedAPI.
// This way we don't have to perform multiple times the same request.
// The key is the URL and the value is the JSON response.
const cachedRemoteResponses = {};

function setupTooltip(el, doctoolname, doctoolversion, selector) {
  // Take the provided element and setup the listeners required to
  // make the linkpreviews work

  const anchorElement = el;
  let relatedTooltip;

  el.addEventListener("mouseenter", delayShowTooltip);
  el.addEventListener("mouseleave", delayHideTooltip);

  let showTooltipTimeoutId = null;
  let hideTooltipTimeoutId = null;

  function delayShowTooltip() {
    if (showTooltipTimeoutId === null) {
      showTooltipTimeoutId = setTimeout(() => {
        showTooltip();
      }, SHOW_TOOLTIP_DELAY);
    }
    // If there is a timeout on hiding, cancel it, otherwise it could hide a newly shown tooltip
    cancelHideDelay();
  }

  function cancelHideDelay() {
    if (hideTooltipTimeoutId !== null) {
      clearTimeout(hideTooltipTimeoutId);
      hideTooltipTimeoutId = null;
    }
  }

  function cancelShowDelay() {
    if (showTooltipTimeoutId !== null) {
      clearTimeout(showTooltipTimeoutId);
      showTooltipTimeoutId = null;
    }
  }

  function delayHideTooltip() {
    cancelShowDelay();
    const tooltip = getRelatedTooltip();
    if (hideTooltipTimeoutId === null) {
      hideTooltipTimeoutId = setTimeout(() => {
        hideTooltip();
      }, HIDE_TOOLTIP_DELAY);
    }
  }

  function showTooltip() {
    // First hide any other linkpreviews
    const existingLinkPreviews = document.querySelectorAll(
      `div[${TOOLTIP_DATA_HREF}]`,
    );
    existingLinkPreviews.forEach((tooltip) => (tooltip.style.display = "none"));

    // Then get the tooltip for this element, place it correctly and show it
    const newTooltip = getRelatedTooltip();

    if (newTooltip !== undefined) {
      const url = getEmbedURL(anchorElement.href);

      let promiseData;
      // Check if we have the response already cached
      if (Object.keys(cachedRemoteResponses).includes(url)) {
        console.debug("URL was found cached, reusing it.");
        promiseData = Promise.resolve(cachedRemoteResponses[url]);
      } else {
        console.debug("URL not found cached, performing a fetch.");
        promiseData = fetch(url, {
          method: "GET",
          headers: {
            "X-RTD-Hosting-Integrations-Version": CLIENT_VERSION,
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Error hitting Read the Docs embed API");
          }
          return response.json();
        });
      }

      promiseData
        .then((data) => {
          // Cache the response to use it later
          cachedRemoteResponses[url] = data;

          // TODO: decide whether or not to truncate the content
          // Do we want to have "modals" as well? are those useful?
          const content = data["content"];
          newTooltip.firstChild.innerHTML = content;
          newTooltip.style.display = "flex";
          const arrowElement = newTooltip.querySelector(".arrow");
          computePosition(anchorElement, newTooltip, {
            placement: "right",
            middleware: [
              offset(10),
              autoPlacement(),
              shift({
                padding: 10, // 0 by default
              }),
              arrow({ element: arrowElement }),
            ],
          }).then(({ x, y, middlewareData, placement }) => {
            Object.assign(newTooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const staticSide = {
              top: "bottom",
              right: "left",
              bottom: "top",
              left: "right",
            }[placement.split("-")[0]];

            Object.assign(arrowElement.style, {
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              right: "",
              bottom: "",
              [staticSide]: "-4px",
            });
          });
          newTooltip.classList.remove("hide");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function hideTooltip() {
    const tooltip = getRelatedTooltip();
    cancelShowDelay();
    tooltip.style.display = "";
  }

  function getRelatedTooltip() {
    // Return relatedTooltip, if already set, otherwise find it in DOM
    // or create a new one
    if (relatedTooltip) {
      return relatedTooltip;
    }

    const existingTooltip = anchorElement.parentElement.querySelector(
      `div[${TOOLTIP_DATA_HREF}="${anchorElement.href}"]`,
    );
    if (existingTooltip) {
      relatedTooltip = existingTooltip;
      return existingTooltip;
    } else {
      const newTooltip = document.createElement("div");
      newTooltip.insertAdjacentHTML("afterbegin", '<div class="arrow"></div>');
      newTooltip.insertAdjacentHTML(
        "afterbegin",
        '<div class="tooltip-content">Loading...</div>',
      );
      newTooltip.setAttribute(TOOLTIP_DATA_HREF, anchorElement.href);
      newTooltip.classList.add("tooltip");
      document.body.insertAdjacentElement("beforeend", newTooltip);
      // Let's add event listeners on the tooltip as well, to prevent hiding, when
      // mouse moves away from the anchor element
      newTooltip.addEventListener("mouseenter", cancelHideDelay);
      newTooltip.addEventListener("mouseleave", delayHideTooltip);
      relatedTooltip = newTooltip;
      return newTooltip;
    }
  }

  function getEmbedURL(url) {
    const params = {
      url: url,
    };

    if (doctoolname !== null) {
      params["doctool"] = doctoolname;
    }

    if (doctoolversion !== null) {
      params["doctoolversion"] = doctoolversion;
    }

    if (selector !== null) {
      params["maincontent"] = selector;
    }

    return EMBED_API_ENDPOINT + "?" + new URLSearchParams(params).toString();
  }
}

export class LinkPreviewsElement extends LitElement {
  static elementName = "readthedocs-linkpreviews";

  static properties = {
    config: {
      state: true,
    },
  };

  constructor() {
    super();

    if (!IS_TESTING) {
      // Include CSS into the DOM so they can be read.
      // We can't include these CSS in the LitElement, because we need them to be globally available.
      document.adoptedStyleSheets.push(styleSheet);
    }

    this.config = null;
  }

  setupTooltips() {
    // Autodetect if the page is built with Sphinx and send the `doctool=` attribute in that case.
    const doctoolName = docTool.getDocumentationTool();
    const rootSelector =
      this.config.addons.options.root_selector || docTool.getRootSelector();

    const selector =
      this.config.addons.linkpreviews.selector || docTool.getLinkSelector();

    console.debug(
      `${LinkPreviewsAddon.addonName}: Using '${selector}' as CSS selector.`,
    );

    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      try {
        // Do not create Link Previews on elements where:
        //
        //  1. The hostname is outside the current domain
        //  2. The URL points to the same page the user is reading
        let elementUrl = new URL(element.href);
        let elementHostname = elementUrl.hostname;
        const pointToSamePage =
          window.location.pathname.replace("/index.html", "") ==
          elementUrl.pathname.replace("/index.html", "");
        if (elementHostname === window.location.hostname && !pointToSamePage) {
          element.classList.add("link-preview");
          setupTooltip(element, doctoolName, null, rootSelector);
        }
      } catch (error) {
        console.debug(
          `Skipping link preview on element due to invalid URL: ${element}`,
        );
      }
    }
  }

  render() {
    return nothing;
  }

  loadConfig(config) {
    if (!LinkPreviewsAddon.isEnabled(config)) {
      return;
    }

    this.config = config;
    this.setupTooltips();
  }

  _handleRootDOMChanged = (e) => {
    // Trigger the setup again since the DOM has changed
    if (this.config) {
      this.setupTooltips();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
      this._handleRootDOMChanged,
    );
  }

  disconnectedCallback() {
    document.removeEventListener(
      EVENT_READTHEDOCS_ROOT_DOM_CHANGED,
      this._handleRootDOMChanged,
    );
    super.disconnectedCallback();
  }
}

/**
 * LinkPreviews addon
 *
 * @param {Object} config - Addon configuration object
 */
export class LinkPreviewsAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.linkpreviews.json";
  static addonEnabledPath = "addons.linkpreviews.enabled";
  static addonName = "LinkPreviews";
  static elementClass = LinkPreviewsElement;
}

customElements.define(LinkPreviewsElement.elementName, LinkPreviewsElement);
