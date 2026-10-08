import { expect, assert, fixture, html } from "@open-wc/testing";
import { EthicalAdsAddon } from "../src/ethicalads";
import styleSheet from "../src/ethicalads.css";

describe("EthicalAds addon dark mode", () => {
  const config = {
    addons: {
      ethicalads: {
        enabled: true,
        ad_free: false,
        campaign_types: ["community", "paid"],
        keywords: ["docs"],
        publisher: "readthedocs",
      },
    },
  };

  afterEach(() => {
    // Remove the elements injected by the addon so each test starts clean.
    const script = document.querySelector("#ethicaladsjs");
    if (script) {
      script.remove();
    }
    for (const placement of document.querySelectorAll("[data-ea-publisher]")) {
      placement.remove();
    }
    document.body.removeAttribute("data-md-color-scheme");
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(
      (sheet) => sheet !== styleSheet.styleSheet,
    );
  });

  it("sets a dark selector when the page uses Material's color scheme attribute", () => {
    document.body.setAttribute("data-md-color-scheme", "default");

    new EthicalAdsAddon(config);

    const placement = document.querySelector("[data-ea-publisher]");
    expect(placement.getAttribute("data-ea-dark-selector")).to.equal(
      "body[data-md-color-scheme='slate']",
    );
    expect(document.querySelector("#ethicaladsjs").src).to.equal(
      "https://media.ethicalads.io/media/client/ethicalads.min.js",
    );
  });

  it("does not set a dark selector when the page has no color scheme attribute", () => {
    new EthicalAdsAddon(config);

    const placement = document.querySelector("[data-ea-publisher]");
    expect(placement.hasAttribute("data-ea-dark-selector")).to.be.false;
    expect(document.querySelector("#ethicaladsjs").src).to.equal(
      "https://media.ethicalads.io/media/client/ethicalads.min.js",
    );
  });

  it("styles a readthedocs-sidebar ad dark when the client adds the dark class", () => {
    // The addon doesn't adopt its stylesheet under test, so adopt it here to
    // get real computed styles.
    document.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      styleSheet.styleSheet,
    ];
    new EthicalAdsAddon(config);

    // Simulate the ad server's `readthedocs-sidebar` markup injected by the client.
    const placement = document.querySelector("[data-ea-publisher]");
    placement.innerHTML = `
      <div class="ethical-sidebar">
        <div class="ethical-content"><div class="ethical-text">Ad text</div></div>
        <div class="ethical-callout"><a href="#">Ad by EthicalAds</a></div>
      </div>
    `;
    const sidebar = placement.querySelector(".ethical-sidebar");
    expect(getComputedStyle(sidebar).backgroundColor).to.equal(
      "rgb(238, 238, 238)",
    );

    // The client toggles this class when `data-ea-dark-selector` matches.
    placement.classList.add("dark");

    expect(getComputedStyle(sidebar).backgroundColor).to.equal(
      "rgb(78, 75, 75)",
    );
  });
});

describe("EthicalAds addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled with valid data", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: false,
            ad_free: false,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled with valid data", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
            ad_free: false,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.true;
  });

  it("is disabled when ad-free", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
            ad_free: true,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled on 404 pages", () => {
    expect(
      EthicalAdsAddon.isEnabled(
        {
          addons: {
            ethicalads: {
              enabled: true,
              ad_free: false,
              campaign_types: ["community", "paid"],
              keywords: ["docs", "data-science"],
              publisher: "readthedocs",
            },
          },
        },
        404,
      ),
    ).to.be.false;
  });
});
