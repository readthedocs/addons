import { expect, assert, fixture, html } from "@open-wc/testing";
import { LinkPreviewsAddon } from "../src/linkpreviews";

describe("LinkPreviews addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          linkpreviews: {
            enabled: null,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          linkpreviews: {
            enabled: false,
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          linkpreviews: {
            enabled: true,
          },
        },
      }),
    ).to.be.true;
  });
});
