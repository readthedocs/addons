import { expect, assert, fixture, html } from "@open-wc/testing";
import { EthicalAdsAddon } from "../src/ethicalads";

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
