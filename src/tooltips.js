import styles from "./tooltips.css";

import { domReady, CLIENT_VERSION } from "./utils";
import { computePosition, autoPlacement, shift, offset, arrow } from "@floating-ui/dom";

const SHOW_TOOLTIP_DELAY = 300;
const HIDE_TOOLTIP_DELAY = 300;

export function initializeTooltips(config) {
  domReady.then(() => {
    // Inject our styles for the tooltips
    document.adoptedStyleSheets.push(styles);
    // TODO: decide what's the correct selector.
    // Our Sphinx extension is adding a class depending on the configuration.
    // However, we won't have this for other doctools or when the extension is not installed.
    const elements = document.querySelectorAll("[role=main] a.internal");
    elements.forEach((el) => setupTooltip(el));
  });
}

function setupTooltip(el) {
  // Take the provided element and setup the listeners required to
  // make the tooltips work

  const anchorElement = el;
  let relatedTooltip;

  el.addEventListener("mouseenter", delayShowTooltip);
  el.addEventListener("mouseleave", delayHideTooltip);

  let showTooltipTimeoutId = null;
  let hideTooltipTimeoutId = null;

  function delayShowTooltip() {
    if (showTooltipTimeoutId === null) {
      showTooltipTimeoutId = setTimeout(() => { showTooltip(); }, SHOW_TOOLTIP_DELAY);
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
      hideTooltipTimeoutId = setTimeout(() => { hideTooltip(); }, HIDE_TOOLTIP_DELAY);
    }
  }

  function showTooltip() {
    // First hide any other tooltips
    const existingTooltips = document.querySelectorAll("div[data-tooltip-href]");
    existingTooltips.forEach(tooltip => tooltip.style.display = "none");

    // Then get the tooltip for this element, place it correctly and show it
    const newTooltip = getRelatedTooltip();

    if (newTooltip !== undefined) {
      const url = getEmbedURL(anchorElement.href);

      fetch(url, {
        method: "GET",
        headers: {
          "X-RTD-Hosting-Integrations-Version": CLIENT_VERSION,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error hitting Read the Docs embed API");
          }
          return response.json();
        })
        .then((data) => {
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
            const {x: arrowX, y: arrowY} = middlewareData.arrow;
            const staticSide = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right',
            }[placement.split('-')[0]];

            Object.assign(arrowElement.style, {
              left: arrowX != null ? `${arrowX}px` : '',
              top: arrowY != null ? `${arrowY}px` : '',
              right: '',
              bottom: '',
              [staticSide]: '-4px',
            });
          });
          newTooltip.classList.remove("hide");
        })
        .catch((error) => {
          console.log(error.message);
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
      `div[data-tooltip-href="${anchorElement.href}"]`,
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
      newTooltip.setAttribute("data-tooltip-href", anchorElement.href);
      newTooltip.classList.add("tooltip");
      anchorElement.insertAdjacentElement("afterend", newTooltip);
      // Let's add event listeners on the tooltip as well, to prevent hiding, when
      // mouse moves away from the anchor element
      newTooltip.addEventListener("mouseenter", cancelHideDelay);
      newTooltip.addEventListener("mouseleave", delayHideTooltip);
      relatedTooltip = newTooltip;
      return newTooltip;
    }
  }
}



function getEmbedURL(url) {
  // TODO: there are some data we don't have here currently
  // We need the doctool to communicate this to us
  const params = {
    doctool: "unknown",
    doctoolversion: "unknown",
    url: url,
  };

  // const api_url = "https://docs.readthedocs.io/_/api/v3/embed/?doctool=sphinx&doctoolversion=7.3.7&url=https%3A%2F%2Fdocs.readthedocs.io%2Fen%2Fstable%2Fversions.html%23how-we-envision-versions-working";
  // const api_url = "https://sphinx-hoverxref.readthedocs.io/_/api/v3/embed/?doctool=sphinx&doctoolversion=7.4.7&url=https%3A%2F%2Fsphinx-hoverxref.readthedocs.io%2Fen%2Flatest%2Fhoverxref.html%23hoverxref";
  const api_url = "/_/api/v3/embed/?" + new URLSearchParams(params).toString();
  console.log(api_url);
  return api_url;
}
