import { expect, assert, fixture, html } from "@open-wc/testing";
import { HotKeysElement, HotKeysAddon } from "../src/hotkeys";

describe("Hotkeys addon", () => {
  it("is disabled by default", () => {
    expect(
      HotKeysAddon.isEnabled({
        addons: {
          hotkeys: {},
        },
      }),
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      HotKeysAddon.isEnabled({
        addons: {
          hotkeys: {
            enabled: true,
          },
        },
      }),
    ).to.be.true;
  });
});

describe("Hotkeys element", () => {
  it("is defined", async () => {
    const elem = await fixture(
      html`<readthedocs-hotkeys></readthedocs-hotkeys>`,
    );
    assert.instanceOf(elem, HotKeysElement);
  });

  it("doesn't render if the config is missing", async () => {
    const elem = await fixture(
      html`<readthedocs-hotkeys></readthedocs-hotkeys>`,
    );
    assert.shadowDom.equal(elem, ``);
  });
});
