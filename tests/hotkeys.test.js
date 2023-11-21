import { expect, assert, fixture, html } from "@open-wc/testing";
import { HotKeysElement, HotKeysAddon } from "../src/hotkeys";

describe("Hotkeys addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      HotKeysAddon.isEnabled({
        addons: {
          hotkeys: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled", () => {
    expect(
      HotKeysAddon.isEnabled({
        addons: {
          hotkeys: {
            enabled: true,
            doc_diff: {
              enabled: true,
              trigger: "Key D",
            },
            search: {
              enabled: true,
              trigger: "Slash",
            },
          },
        },
      }),
    ).to.be.true;
  });

  it("is disabled", () => {
    expect(
      HotKeysAddon.isEnabled({
        addons: {
          hotkeys: {
            enabled: false,
            doc_diff: {
              enabled: true,
              trigger: "Key D",
            },
            search: {
              enabled: true,
              trigger: "Slash",
            },
          },
        },
      }),
    ).to.be.false;
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
