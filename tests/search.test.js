import { expect, assert, fixture, html } from "@open-wc/testing";
import { SearchElement, SearchAddon } from "../src/search";

describe("Search addon", () => {
  it("is disabled by default", () => {
    expect(
      SearchAddon.isEnabled({
        addons: {
          search: {},
        },
      }),
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      SearchAddon.isEnabled({
        addons: {
          search: {
            enabled: true,
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
