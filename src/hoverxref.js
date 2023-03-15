import $ from "jquery";
import * as tooltipster from "tooltipster";
import styles from "./hoverxref.css";

// TODO: what's the correct way to import these?
// Note I'm using a relative path from inside `node_modules`.
// I need to use "dist/" for example.
// However, I didn't find how these files are exported by the npm module.
import tooltipsterStyle from "tooltipster/dist/css/tooltipster.main.min.css";
import tooltipsterSideTip from "tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-shadow.min.css";
import tooltipsterShadowTheme from "tooltipster/dist/css/plugins/tooltipster/sideTip/themes/tooltipster-sideTip-shadow.min.css";

export function initializeHoverXRef(config) {
    // Inject our styles for the flyout
    document.adoptedStyleSheets.push(styles);
    document.adoptedStyleSheets.push(tooltipsterStyle);
    document.adoptedStyleSheets.push(tooltipsterSideTip);
    document.adoptedStyleSheets.push(tooltipsterShadowTheme);

    $(document).ready(function() {
        // TODO: decide what's the correct selector.
        // Our Sphinx extension is adding a class depending on the configuration.
        // However, we won't have this for other doctools or when the extension is not installed.
        const elements = document.querySelectorAll('[role=main] a.internal'); // .each(function () { this.removeAttr('title'); });
        for (const element of elements) {
            addTooltip(element);
        }
    });
};

function getEmbedURL(url) {
    // TODO: there are some data we don't have here currently
    // We need the doctool to communicate this to us
    const params = {
        doctool: 'unknown',
        doctoolversion: 'unknown',
        url: url,
    };

    const api_url = '/_/api/v3/embed/?' + new URLSearchParams(params).toString();
    return api_url;
}

function addTooltip(target) {
    // NOTE: we need to call the target as `$()` because the `.tooltipster` method comes from a jQuery plugin
    return $(target).tooltipster({
        // TODO: all these values are settings from the sphinx-hoverxref extension.
        // The user should be able to configure them.
        theme: ['tooltipster-shadow', 'tooltipster-shadow-custom'],
        interactive: 'true',
        maxWidth: 450,
        animation: "fade",
        animationDuration: 0,
        side: "right",
        content: "Loading...",
        contentAsHTML: true,

        functionBefore: function(instance, helper) {
            const origin = helper.origin;
            const href = origin.href;

            // we set a variable so the data is only loaded once via Ajax, not every time the tooltip opens
            if (origin.getAttribute('loaded') !== "true") {
                const url = getEmbedURL(href);
                fetch(url, {method: 'GET', headers: {"X-HoverXRef-Version": "unknown"}})
                    .then(response => {
                        if (!response.ok) {
                            console.debug("Error hitting Read the Docs embed API");
                            return undefined;
                        }
                        return response.json();
                    })
                    .then(data => {
                        // call the 'content' method to update the content of our tooltip with the returned data.
                        // note: this content update will trigger an update animation (see the updateAnimation option)
                        instance.content(data["content"]);
                        instance.enable();
                        instance.open();

                        // to remember that the data has been loaded
                        origin.setAttribute("loaded", "true");
                    });
            }
        },

        functionReady: function(instance, helper) {
            // most of Read the Docs Sphinx theme bases its style on "rst-content".
            // We add that class to the tooltipser HTML tag here by default or a user-defined one.
            helper.tooltip.classList.add("rst-content");
        }
    });
}
