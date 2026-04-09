import { expect, assert, fixture, html } from "@open-wc/testing";
import {
  FileTreeDiffAddon,
  FileTreeDiffElement,
  DIFF_SOURCE_BUILD,
  DIFF_SOURCE_VCS,
} from "../src/filetreediff";

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
        versions: {
          current: {
            type: "external",
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
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
          },
        },
        versions: {
          current: {
            type: "external",
            slug: "1234",
            urls: {
              vcs: "https://github.com/organization/repository/pull/1234/",
            },
          },
        },
      }),
    ).to.be.true;
  });

  it("valid data with outdated flag", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: true,
            outdated: true,
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
          },
        },
        versions: {
          current: {
            type: "external",
            slug: "1234",
            urls: {
              vcs: "https://github.com/organization/repository/pull/1234/",
            },
          },
        },
      }),
    ).to.be.true;
  });

  it("valid data with vcs_diff", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: true,
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
            vcs_diff: {
              added: [
                {
                  filename: "new-page.html",
                  urls: {
                    current:
                      "http://project.readthedocs.io/en/pr/new-page.html",
                    base: "",
                  },
                },
              ],
              modified: [],
              deleted: [],
            },
          },
        },
        versions: {
          current: {
            type: "external",
            slug: "1234",
            urls: {
              vcs: "https://github.com/organization/repository/pull/1234/",
            },
          },
        },
      }),
    ).to.be.true;
  });

  it("valid data with diff_source override", () => {
    expect(
      FileTreeDiffAddon.isEnabled({
        addons: {
          filetreediff: {
            enabled: true,
            diff_source: "build",
            diff: {
              added: [],
              modified: [],
              deleted: [],
            },
            vcs_diff: {
              added: [],
              modified: [],
              deleted: [],
            },
          },
        },
        versions: {
          current: {
            type: "external",
            slug: "1234",
            urls: {
              vcs: "https://github.com/organization/repository/pull/1234/",
            },
          },
        },
      }),
    ).to.be.true;
  });
});

describe("FileTreeDiffElement diff source selection", () => {
  let element;

  beforeEach(() => {
    element = new FileTreeDiffElement();
  });

  it("defaults to build diff when only build diff is available", () => {
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff: { added: [], modified: [], deleted: [] },
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    expect(element.diffSource).to.equal(DIFF_SOURCE_BUILD);
  });

  it("prefers vcs diff when both are available", () => {
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff: { added: [], modified: [], deleted: [] },
          vcs_diff: { added: [], modified: [], deleted: [] },
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    expect(element.diffSource).to.equal(DIFF_SOURCE_VCS);
  });

  it("respects explicit diff_source=build override", () => {
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff_source: "build",
          diff: { added: [], modified: [], deleted: [] },
          vcs_diff: { added: [], modified: [], deleted: [] },
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    expect(element.diffSource).to.equal(DIFF_SOURCE_BUILD);
  });

  it("returns build diff data when diffSource is build", () => {
    const buildDiff = {
      added: [{ filename: "build-only.html", urls: { current: "", base: "" } }],
      modified: [],
      deleted: [],
    };
    const vcsDiff = {
      added: [{ filename: "vcs-only.html", urls: { current: "", base: "" } }],
      modified: [],
      deleted: [],
    };
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff_source: "build",
          diff: buildDiff,
          vcs_diff: vcsDiff,
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    const data = element.getDiffData();
    expect(data.added[0].filename).to.equal("build-only.html");
  });

  it("returns vcs diff data when diffSource is vcs", () => {
    const buildDiff = {
      added: [{ filename: "build-only.html", urls: { current: "", base: "" } }],
      modified: [],
      deleted: [],
    };
    const vcsDiff = {
      added: [{ filename: "vcs-only.html", urls: { current: "", base: "" } }],
      modified: [],
      deleted: [],
    };
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff: buildDiff,
          vcs_diff: vcsDiff,
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    // Should default to VCS when both available
    const data = element.getDiffData();
    expect(data.added[0].filename).to.equal("vcs-only.html");
  });

  it("falls back to build diff when vcs requested but not available", () => {
    const buildDiff = {
      added: [{ filename: "build-only.html", urls: { current: "", base: "" } }],
      modified: [],
      deleted: [],
    };
    element.loadConfig({
      addons: {
        filetreediff: {
          enabled: true,
          diff: buildDiff,
        },
      },
      versions: {
        current: {
          type: "external",
          slug: "1",
          urls: { vcs: "https://github.com/org/repo/pull/1/" },
        },
      },
    });
    element.diffSource = DIFF_SOURCE_VCS;
    const data = element.getDiffData();
    expect(data.added[0].filename).to.equal("build-only.html");
  });
});
