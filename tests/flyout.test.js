import { expect, assert, fixture, html } from "@open-wc/testing";
import { FlyoutAddon, FlyoutElement } from "../src/flyout";

describe("Flyout addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      FlyoutAddon.isEnabled({
        addons: {
          flyout: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled with valid data", () => {
    expect(
      FlyoutAddon.isEnabled({
        addons: {
          flyout: {
            enabled: false,
            downloads: [],
            translations: [],
            versions: [],
          },
        },
        domains: {
          dashboard: "readthedocs.org",
        },
        projects: {
          current: {
            slug: "project",
            single_version: false,
          },
        },
        versions: {
          current: {
            slug: "latest",
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled with valid data", () => {
    expect(
      FlyoutAddon.isEnabled({
        addons: {
          flyout: {
            enabled: true,
            downloads: [],
            translations: [],
            versions: [],
          },
        },
        domains: {
          dashboard: "readthedocs.org",
        },
        projects: {
          current: {
            slug: "project",
            single_version: false,
          },
        },
        versions: {
          current: {
            slug: "latest",
          },
        },
      }),
    ).to.be.true;
  });
});

describe("Flyout element", () => {
  it("is defined", async () => {
    const elem = await fixture(html`<readthedocs-flyout></readthedocs-flyout>`);
    assert.instanceOf(elem, FlyoutElement);
  });

  it("doesn't render if the config is missing", async () => {
    const elem = await fixture(html`<readthedocs-flyout></readthedocs-flyout>`);
    assert.shadowDom.equal(elem, ``);
  });
});
