import { expect, assert, fixture, html } from "@open-wc/testing";
import { LinkPreviewsAddon } from "../src/linkpreviews";

describe("LinkPreviews addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          linkpreviews: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          options: {
            root_selector: "[role=main]",
          },
          linkpreviews: {
            enabled: false,
            selector: "[role=main] a.internal",
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      LinkPreviewsAddon.isEnabled({
        addons: {
          options: {
            root_selector: "[role=main]",
          },
          linkpreviews: {
            enabled: true,
            selector: "[role=main] a.internal",
          },
        },
      }),
    ).to.be.true;
  });
});
