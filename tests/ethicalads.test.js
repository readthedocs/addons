import { expect, assert, fixture, html } from "@open-wc/testing";
import { EthicalAdsAddon } from "../src/ethicalads";

describe("EthicalAds addon", () => {
  it("is disabled by default", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {},
        },
      }),
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
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
          },
        },
      }),
    ).to.be.false;
  });
});
