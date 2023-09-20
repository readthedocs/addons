import { expect, assert, fixture, html } from "@open-wc/testing";
import { DocDiffAddon, DocDiffElement } from "../src/docdiff";

describe("Doc diff addon", () => {
  it("is disabled by default", () => {
    expect(
      DocDiffAddon.isEnabled({
        addons: {
          doc_diff: {},
        },
      })
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      DocDiffAddon.isEnabled({
        addons: {
          doc_diff: {
            enabled: true,
          },
        },
      })
    ).to.be.true;
  });
});
