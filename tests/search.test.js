import { expect, assert, fixture, html } from "@open-wc/testing";
import { SearchElement, SearchAddon } from "../src/search";

describe("Search addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      SearchAddon.isEnabled({
        addons: {
          search: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled with valid data", () => {
    expect(
      SearchAddon.isEnabled({
        addons: {
          search: {
            enabled: false,
            default_filter: "project:project",
            filters: [],
          },
        },
        projects: {
          current: {
            slug: "project",
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled with valid data", () => {
    expect(
      SearchAddon.isEnabled({
        addons: {
          search: {
            enabled: true,
            default_filter: "project:project",
            filters: [],
          },
        },
        projects: {
          current: {
            slug: "project",
          },
        },
      }),
    ).to.be.true;
  });
});

describe("Search element", () => {
  it("is defined", async () => {
    const elem = await fixture(html`<readthedocs-search></readthedocs-search>`);
    assert.instanceOf(elem, SearchElement);
  });

  it("doesn't render if the config is missing", async () => {
    const elem = await fixture(html`<readthedocs-search></readthedocs-search>`);
    assert.shadowDom.equal(elem, ``);
  });
});
