import { expect, assert, fixture, html } from "@open-wc/testing";
import { CustomScriptAddon } from "../src/customscript";

describe("CustomScript addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      CustomScriptAddon.isEnabled({
        addons: {
          customscript: {
            invalid: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      CustomScriptAddon.isEnabled({
        addons: {
          customscript: {
            enabled: false,
            src: "/en/latest/_static/readthedocs.js",
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      CustomScriptAddon.isEnabled({
        addons: {
          customscript: {
            enabled: true,
            src: "/en/latest/_static/readthedocs.js",
          },
        },
      }),
    ).to.be.true;
  });
});
