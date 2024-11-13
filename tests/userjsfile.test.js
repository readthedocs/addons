import { expect, assert, fixture, html } from "@open-wc/testing";
import { UserJsFileAddon } from "../src/userjsfile";

describe("UserJsFile addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      UserJsFileAddon.isEnabled({
        addons: {
          userjsfile: {
            invalid: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      UserJsFileAddon.isEnabled({
        addons: {
          userjsfile: {
            enabled: false,
            src: "/en/latest/_static/readthedocs.js",
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      UserJsFileAddon.isEnabled({
        addons: {
          userjsfile: {
            enabled: true,
            src: "/en/latest/_static/readthedocs.js",
          },
        },
      }),
    ).to.be.true;
  });
});
