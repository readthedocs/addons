import tippy from "tippy.js";
import styles from "tippy.js/dist/tippy.css";
import lightTheme from "tippy.js/themes/light.css";
import { domReady } from "./utils";

export function initializeTooltips(config) {
  // Inject our styles for the flyout
  document.adoptedStyleSheets.push(styles);
  document.adoptedStyleSheets.push(lightTheme);

  domReady.then(() => {
    // TODO: decide what's the correct selector.
    // Our Sphinx extension is adding a class depending on the configuration.
    // However, we won't have this for other doctools or when the extension is not installed.
    const elements = document.querySelectorAll("[role=main] a.internal"); // .each(function () { this.removeAttr('title'); });
    tippy(elements, {
      content: "Loading...",
      allowHTML: true,
      arrow: true,
      hideOnClick: false,
      interactive: true,
      theme: "light",
      placement: "auto",
      maxWidth: 550,
      // TODO: make the content of the tooltip scrollable
      onShow(instance) {
        const href = instance.reference.href;

        // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
        if (instance.reference.getAttribute("loaded") !== "true") {
          const hrefAttribute =
            "http://docs.devthedocs.org/en/stable/tutorial/index.html#modifying-versions";
          // "http://docs.devthedocs.org/en/stable/tutorial/index.html#upgrading-the-python-version";
          // "http://docs.devthedocs.org/en/stable/tutorial/index.html";
          const url = getEmbedURL(hrefAttribute);

          fetch(url, {
            method: "GET",
            headers: { "X-HoverXRef-Version": "unknown" },
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
              instance.setContent(content);

              // to remember that the data has been loaded
              instance.reference.setAttribute("loaded", "true");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }
      },
    });
  });
}

function getEmbedURL(url) {
  // TODO: there are some data we don't have here currently
  // We need the doctool to communicate this to us
  const params = {
    doctool: "unknown",
    doctoolversion: "unknown",
    url: url,
  };

  const api_url = "/_/api/v3/embed/?" + new URLSearchParams(params).toString();
  return api_url;
}
