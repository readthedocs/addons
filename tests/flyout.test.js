import { expect, assert, fixture, html } from "@open-wc/testing";
import { FlyoutAddon, FlyoutElement } from "../src/flyout";

describe("Flyout addon", () => {
  it("is disabled by default", () => {
    expect(
      FlyoutAddon.isEnabled({
        addons: {
          flyout: {},
        },
      })
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      FlyoutAddon.isEnabled({
        addons: {
          flyout: {
            enabled: true,
          },
        },
      })
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
