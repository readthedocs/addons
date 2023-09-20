import { assert, fixture, html } from "@open-wc/testing";
import { NotificationElement } from "../src/notification";

describe("Notification element", () => {
  it("is defined", async () => {
    const elem = await fixture(
      html`<readthedocs-notification></readthedocs-notification>`
    );
    assert.instanceOf(elem, NotificationElement);
  });

  it("doesn't render if the config is missing", async () => {
    const elem = await fixture(
      html`<readthedocs-notification></readthedocs-notification>`
    );
    assert.shadowDom.equal(elem, ``);
  });
});
