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
            versioning_scheme: "multiple_versions_with_translations",
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
            versioning_scheme: "multiple_versions_with_translations",
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

  // This test is a copy of the previous one.
  // We should probably create a `config` variable and adapt it depending on the test,
  // instead of duplicating the whole object.
  it("enabled with multiple_versions_without_translations", () => {
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
            versioning_scheme: "multiple_versions_without_translations",
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
