import { expect, assert, fixture, html } from "@open-wc/testing";
import { FileTreeDiffAddon } from "../src/filetreediff";

describe("FileTreeDiff addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: true,
            diff: 52, // invalid value
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: false,
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: true,
            ignored_files: ["^changelogs/.+.html$", "guides/index.html"],
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
          },
        },
      }),
    ).to.be.true;
  });
});
