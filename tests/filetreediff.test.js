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
});

describe("FileTreeDiff chunks", () => {
  let element;

  function render(markup) {
    document.body.insertAdjacentHTML("beforeend", `<main>${markup}</main>`);
    return document.querySelector("main");
  }

  beforeEach(() => {
    element = document.createElement("readthedocs-filetreediff");
  });

  afterEach(() => {
    document.querySelector("main")?.remove();
  });

  it("returns the paragraph of a changed word", () => {
    render(
      '<section><p>This was <ins class="doc-diff-added">added</ins>.</p></section>',
    );
    const chunks = element.getChunks();
    expect(chunks.map((chunk) => chunk.tagName)).to.deep.equal(["P"]);
  });

  it("returns a whole added section as the chunk, not its parent", () => {
    const main = render(
      '<section id="doc"><p>Unchanged.</p><section id="new" class="doc-diff-added"><h2>New</h2><p>Body.</p></section></section>',
    );
    const chunks = element.getChunks();
    expect(chunks).to.have.length(1);
    expect(chunks[0]).to.equal(main.querySelector("#new"));
  });

  it("ignores marks that only contain whitespace", () => {
    render(
      '<section id="doc"><p>Unchanged.</p><ins class="doc-diff-added">\n</ins><p>Also unchanged.</p></section>',
    );
    expect(element.getChunks()).to.have.length(0);
  });

  it("lists a change only once when it's inside another chunk", () => {
    const main = render(
      '<section id="doc"><section id="new" class="doc-diff-added"><p>Body <ins class="doc-diff-added">text</ins>.</p></section></section>',
    );
    const chunks = element.getChunks();
    expect(chunks).to.have.length(1);
    expect(chunks[0]).to.equal(main.querySelector("#new"));
  });
});
