import styles from "./tooltips.css";

import { domReady, CLIENT_VERSION } from "./utils";
import { computePosition, flip, shift, offset } from "@floating-ui/dom";

export function initializeTooltips(config) {


  domReady.then(() => {
    // Inject our styles for the tooltips
    document.adoptedStyleSheets.push(styles);
    // TODO: decide what's the correct selector.
    // Our Sphinx extension is adding a class depending on the configuration.
    // However, we won't have this for other doctools or when the extension is not installed.
    const elements = document.querySelectorAll("[role=main] a.internal"); // .each(function () { this.removeAttr('title'); });
    elements.forEach(el => el.addEventListener("mouseenter", showTooltip));
    elements.forEach(el => el.addEventListener("mouseleave", hideTooltip));

  });
}

function getRelatedTooltip(anchorElement) {
  const existingTooltip = anchorElement.parentElement.querySelector(`div[data-tooltip-href="${anchorElement.href}"]`);
  if (existingTooltip) {
    return existingTooltip;
  }
  else {
    const newTooltip = document.createElement("div");
    newTooltip.insertAdjacentHTML("afterbegin", '<div class="tooltip-content">Loading...</div>');
    newTooltip.setAttribute("data-tooltip-href", anchorElement.href);
    newTooltip.classList.add("tooltip");
    anchorElement.insertAdjacentElement("afterend", newTooltip);
    return newTooltip;
  }
}

function showTooltip(el) {
  const anchorElement = el.target;

  const newTooltip = getRelatedTooltip(anchorElement);

  if (newTooltip !== undefined) {
    const href = anchorElement.href;

    // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
      const hrefAttribute =
        "http://docs.devthedocs.org/en/stable/tutorial/index.html#modifying-versions";
      // "http://docs.devthedocs.org/en/stable/tutorial/index.html#upgrading-the-python-version";
      // "http://docs.devthedocs.org/en/stable/tutorial/index.html";
      const url = getEmbedURL(hrefAttribute);

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
          // call the 'content' method to update the content of our tooltip with the returned data.
          // note: this content update will trigger an update animation (see the updateAnimation option)
          // TODO: decide whether or not to truncate the content
          // Do we want to have "modals" as well? are those useful?
          // const content = truncateContent(data["content"]);
          const content = data["content"];
          newTooltip.firstChild.innerHTML = content;
          newTooltip.style.display = 'block';
          computePosition(anchorElement, newTooltip, {placement: "right", middleware: [offset(10), flip(), shift(20)]}).then(({x, y}) => {
            Object.assign(newTooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          });
          newTooltip.classList.remove("hide");
        })
        .catch((error) => {
          console.log(error.message);
        });
  }
}

function hideTooltip(el) {
  const anchorElement = el.fromElement;
  const newTooltip = getRelatedTooltip(anchorElement);
  newTooltip.style.display = '';
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
  const api_url = "https://sphinx-hoverxref.readthedocs.io/_/api/v3/embed/?doctool=sphinx&doctoolversion=7.4.7&url=https%3A%2F%2Fwww.sphinx-doc.org%2Fen%2Fmaster%2Findex.html";
  return api_url;
}
