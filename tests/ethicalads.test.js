import { expect, assert, fixture, html, aTimeout } from "@open-wc/testing";
import { EthicalAdsAddon } from "../src/ethicalads";

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
  });

  it("adds the dark class when the page uses Material's slate color scheme", () => {
    document.body.setAttribute("data-md-color-scheme", "slate");

    new EthicalAdsAddon(config);

    const placement = document.querySelector("[data-ea-publisher]");
    expect(placement.classList.contains("dark")).to.be.true;
  });

  it("does not add the dark class when the page has no color scheme attribute", () => {
    new EthicalAdsAddon(config);

    const placement = document.querySelector("[data-ea-publisher]");
    expect(placement.classList.contains("dark")).to.be.false;
  });

  it("toggles the dark class when the page color scheme changes", async () => {
    document.body.setAttribute("data-md-color-scheme", "default");

    new EthicalAdsAddon(config);

    const placement = document.querySelector("[data-ea-publisher]");
    expect(placement.classList.contains("dark")).to.be.false;

    document.body.setAttribute("data-md-color-scheme", "slate");
    await aTimeout(0);
    expect(placement.classList.contains("dark")).to.be.true;

    document.body.setAttribute("data-md-color-scheme", "default");
    await aTimeout(0);
    expect(placement.classList.contains("dark")).to.be.false;
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
