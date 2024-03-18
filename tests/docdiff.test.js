import { expect, assert, fixture, html } from "@open-wc/testing";
import { DocDiffAddon, DocDiffElement } from "../src/docdiff";

describe("Doc diff addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      DocDiffAddon.isEnabled({
        addons: {
          doc_diff: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled with valid data", () => {
    expect(
      DocDiffAddon.isEnabled({
        addons: {
          doc_diff: {
            enabled: false,
            base_url: "http://project.readthedocs.io/en/latest/index.html",
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled with valid data", () => {
    expect(
      DocDiffAddon.isEnabled({
        addons: {
          doc_diff: {
            enabled: true,
            base_url: "http://project.readthedocs.io/en/latest/index.html",
            root_selector: "[role=main]",
          },
        },
      }),
    ).to.be.true;
  });
});
