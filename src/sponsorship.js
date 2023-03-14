// FIXME: how should we remove the `dist/` from this path?
// NOTE: it requires this PR to work: https://github.com/readthedocs/ethical-ad-client/pull/148
import { load_placements } from "ethical-ad-client/dist/ethicalads";

const EXPLICIT_PLACEMENT_SELECTOR = "[data-ea-publisher]";

function createAdPlacement() {
    let placement;

    placement = document.querySelector(EXPLICIT_PLACEMENT_SELECTOR);
    if (placement) {
        placement.setAttribute("data-ea-publisher", "readthedocs");
        placement.setAttribute("data-ea-manual", "true");
        if (placement.getAttribute("data-ea-type") !== "image" && placement.getAttribute("data-ea-type") !== "text") {
            placement.setAttribute("data-ea-type", "readthedocs-sidebar");
        }
    } else {
        // Inject our own floating element
        placement = document.createElement("div");
        placement.setAttribute("data-ea-publisher", "readthedocs");
        placement.setAttribute("data-ea-type", "image");
        // placement.setAttribute("data-ea-manual", "true");
        placement.setAttribute("data-ea-style", "stickybox");
        placement.classList.add("raised");

        // TODO: find the right last resourse to append (probably not `document.body`)
        let main = document.querySelector("[role=main]") || document.body;
        main.insertBefore(placement, main.lastChild);
        console.log("EthicalAd placement injected.");
    }
    return placement;
};

export function injectEthicalAd(config) {
    createAdPlacement();
    // FIXME: the function `ethicalads.load_placements()` is called automatically when the module is imported,
    // but we want to call it manually because we need to inject our `div` first.
    load_placements();
};
