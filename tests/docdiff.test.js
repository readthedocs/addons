import { expect, assert, fixture, html } from "@open-wc/testing";
import {
  DocDiffAddon,
  DocDiffElement,
  buildBaseDocument,
  renderDocument,
} from "../src/docdiff";

// Simulates copybutton.js: adds a button to the title from JavaScript
const COPYBUTTON_SCRIPT = `
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.createElement("button");
    button.className = "copybutton";
    button.textContent = "Copy";
    document.querySelector("[role=main] h1").append(button);
  });
`;

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
          options: {
            root_selector: "[role=main]",
          },
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
          options: {
            root_selector: "[role=main]",
          },
          doc_diff: {
            enabled: true,
            base_url: "http://project.readthedocs.io/en/latest/index.html",
          },
        },
      }),
    ).to.be.true;
  });

  describe("buildBaseDocument", () => {
    const pageHtml = `<!DOCTYPE html><html><head>
      <script async src="/_/static/javascript/readthedocs-addons.js"></script>
      <link rel="preload" href="/_/static/javascript/readthedocs-addons.js" as="script">
      <script src="/_static/copybutton.js"></script>
      </head><body><div role="main"><h1>Title</h1><p>New text</p></div></body></html>`;

    it("replaces the root element with the base content", () => {
      const result = buildBaseDocument(
        pageHtml,
        '<div role="main"><h1>Title</h1><p>Old text</p></div>',
        "[role=main]",
      );
      expect(result).to.match(/^<!DOCTYPE html>/);
      expect(result).to.include("<p>Old text</p>");
      expect(result).to.not.include("<p>New text</p>");
    });

    it("keeps the page scripts but removes addons", () => {
      const result = buildBaseDocument(
        pageHtml,
        '<div role="main"></div>',
        "[role=main]",
      );
      expect(result).to.include("copybutton.js");
      expect(result).to.not.include("readthedocs-addons");
    });

    it("falls back to the first element when the selector doesn't match the base content", () => {
      const page =
        '<html><body><main><div class="content"><p>New</p></div></main></body></html>';
      const result = buildBaseDocument(
        page,
        '<div class="content"><p>Old</p></div>',
        "main > div.content",
      );
      expect(result).to.include(
        '<main><div class="content"><p>Old</p></div></main>',
      );
    });

    it("throws when the root element is not in the page source", () => {
      expect(() =>
        buildBaseDocument(
          "<html><body></body></html>",
          '<div role="main"></div>',
          "[role=main]",
        ),
      ).to.throw();
    });
  });

  describe("renderDocument", function () {
    this.timeout(10000);

    it("runs the page scripts over the base content", async () => {
      const page = `<!DOCTYPE html><html><head><script>
        ${COPYBUTTON_SCRIPT}
        window.addEventListener("load", () => {
          setTimeout(() => {
            document.querySelector("[role=main]").append("after load");
          }, 100);
        });
      </script></head><body><div role="main"><h1>Title</h1></div></body></html>`;

      const root = await renderDocument(page, "[role=main]");

      expect(root.querySelector("h1 button.copybutton")).to.not.be.null;
      expect(root.textContent).to.include("after load");
      expect(root.ownerDocument).to.equal(document);
      expect(document.querySelector("iframe[sandbox]")).to.be.null;
    });

    it("rejects when the root element is missing and removes the iframe", async () => {
      let error = null;
      try {
        await renderDocument("<html><body></body></html>", "[role=main]");
      } catch (e) {
        error = e;
      }
      expect(error).to.not.be.null;
      expect(document.querySelector("iframe[sandbox]")).to.be.null;
    });
  });

  describe("compare", function () {
    this.timeout(10000);

    // NOTE: `fixture()` waits for an animation frame on plain elements, which
    // never fires on hidden pages when test files run concurrently.
    // Build the DOM by hand instead.
    let element;

    function addRoot(markup) {
      document.body.insertAdjacentHTML("beforeend", markup);
      return document.querySelector("[role=main]");
    }

    beforeEach(() => {
      element = document.createElement("readthedocs-docdiff");
      document.body.append(element);
    });

    afterEach(() => {
      element.remove();
      document.querySelector("[role=main]")?.remove();

      // Drop params set by enableDocDiff so they don't leak into other tests
      const url = new URL(window.location.href);
      url.searchParams.delete("readthedocs-diff");
      url.searchParams.delete("readthedocs-diff-chunk");
      window.history.replaceState({}, "", url);
    });

    const config = {
      addons: {
        options: {
          root_selector: "[role=main]",
        },
        doc_diff: {
          enabled: true,
          base_url: "http://project.readthedocs.io/en/latest/index.html",
        },
      },
    };

    it("ignores elements generated by JavaScript", async () => {
      // Same markup as the page source below, whitespace included
      const root = addRoot(
        '<div role="main"><h1>Title<button class="copybutton">Copy</button></h1><p>New text</p></div>',
      );
      element.fetchBaseContent = () =>
        Promise.resolve('<div role="main"><h1>Title</h1><p>Old text</p></div>');
      element.fetchPageSource = () =>
        Promise.resolve(
          `<!DOCTYPE html><html><head><script>${COPYBUTTON_SCRIPT}</script></head>` +
            '<body><div role="main"><h1>Title</h1><p>New text</p></div></body></html>',
        );
      element.loadConfig(config);

      await element.enableDocDiff();

      const diffed = document.querySelector("[role=main]");
      expect(
        diffed.querySelector("del.doc-diff-removed").textContent,
      ).to.include("Old");
      expect(diffed.querySelector("ins.doc-diff-added").textContent).to.include(
        "New",
      );
      const button = diffed.querySelector("button.copybutton");
      expect(button).to.not.be.null;
      expect(button.closest(".doc-diff-added, .doc-diff-removed")).to.be.null;

      element.disableDocDiff();
      expect(document.querySelector("[role=main]")).to.equal(root);
    });

    it("falls back to the raw base content when rendering fails", async () => {
      addRoot(
        '<div role="main"><h1>Title<button class="copybutton">Copy</button></h1></div>',
      );
      element.fetchBaseContent = () =>
        Promise.resolve('<div role="main"><h1>Title</h1></div>');
      element.fetchPageSource = () => Promise.reject(new Error("Boom"));
      element.loadConfig(config);

      await element.enableDocDiff();

      const button = document.querySelector("[role=main] button.copybutton");
      expect(button).to.not.be.null;
      expect(button.closest(".doc-diff-added")).to.not.be.null;

      element.disableDocDiff();
    });
  });
});
