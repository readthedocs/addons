import { expect, assert, fixture, html } from "@open-wc/testing";
import { TooltipsAddon } from "../src/tooltips";

describe("Tooltips addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      TooltipsAddon.isEnabled({
        addons: {
          tooltips: {
            enabled: true,
            root_selector: 25, // a number is invalid here
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      TooltipsAddon.isEnabled({
        addons: {
          tooltips: {
            enabled: false,
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      TooltipsAddon.isEnabled({
        addons: {
          tooltips: {
            enabled: true,
          },
        },
      }),
    ).to.be.true;
  });
});
