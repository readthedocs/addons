import { expect } from "@open-wc/testing";
import { diffDocuments, relativeURL } from "../src/docdiff.diff";

// The base version and the pull request preview live under different URLs
const OLD_URL = "https://project.readthedocs.io/en/latest/guide/page.html";
const NEW_URL =
  "https://project--123.org.readthedocs.build/en/123/guide/page.html";

function section(id, title, paragraphs) {
  return `
<section id="${id}">
<h2>${title}<a class="headerlink" href="#${id}">¶</a></h2>
${paragraphs.map((text) => `<p>${text}</p>`).join("\n")}
</section>`;
}

function page(sections) {
  return `<div role="main">
<section id="doc">
<h1>Doc<a class="headerlink" href="#doc">¶</a></h1>
${sections.join("\n")}
</section>
</div>`;
}

// What the Embed API returns for the base version: links made absolute
function absolutized(html) {
  return html.replace(/href="#/g, `href="${OLD_URL}#`);
}

const ALPHA = section("alpha", "Alpha", ["Alpha body one.", "Alpha body two."]);
const BETA = section("beta", "Beta", ["Beta body one.", "Beta body two."]);
const GAMMA = section("gamma", "Gamma", ["Gamma body one.", "Gamma body two."]);
const NEW = section("new", "New section", ["New body one.", "New body two."]);

const TABLE = `<div role="main"><section id="table">
<table class="docutils">
<colgroup><col style="width: 50%"><col style="width: 50%"></colgroup>
<thead><tr><th><p>A</p></th><th><p>B</p></th></tr></thead>
<tbody><tr><td><p>1</p></td><td><p>2</p></td></tr></tbody>
</table>
</section></div>`;

function parse(html) {
  return new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
}

function diff(oldHtml, newHtml) {
  return diffDocuments(parse(absolutized(oldHtml)), parse(newHtml), {
    oldURL: OLD_URL,
    newURL: NEW_URL,
  });
}

function marks(node) {
  return Array.from(
    node.querySelectorAll(".doc-diff-added, .doc-diff-removed"),
  );
}

describe("Doc diff algorithm", () => {
  it("marks nothing for identical pages", () => {
    const node = diff(page([ALPHA, BETA]), page([ALPHA, BETA]));
    expect(marks(node)).to.have.length(0);
  });

  it("marks a changed word inside its paragraph", () => {
    const node = diff(
      page([ALPHA, BETA, GAMMA]),
      page([ALPHA, BETA.replace("Beta body one.", "Beta body uno."), GAMMA]),
    );
    expect(node.querySelector("del").textContent).to.equal("one");
    expect(node.querySelector("ins").textContent).to.equal("uno");
    expect(marks(node)).to.have.length(2);
  });

  it("marks an inserted section as a whole, without touching its neighbours", () => {
    const node = diff(
      page([ALPHA, BETA, GAMMA]),
      page([ALPHA, NEW, BETA, GAMMA]),
    );
    expect(marks(node)).to.deep.equal([node.querySelector("#new")]);
    expect(node.querySelector("#new").classList.contains("doc-diff-added")).to
      .be.true;
  });

  it("marks a removed section as a whole, without touching its neighbours", () => {
    const node = diff(page([ALPHA, BETA, GAMMA]), page([ALPHA, GAMMA]));
    expect(marks(node)).to.deep.equal([node.querySelector("#beta")]);
    expect(node.querySelector("#beta").classList.contains("doc-diff-removed"))
      .to.be.true;
  });

  it("keeps aligning inside a section that starts with an empty anchor span", () => {
    // Sphinx emits `<span id="label"></span>` for explicit targets. The
    // section must still be aligned block by block, or the unchanged table
    // inside it would be duplicated.
    const anchored = (text) =>
      page([
        `<section id="anchored"><span id="target"></span><h2>Title</h2>
<table><colgroup><col></colgroup><tbody><tr><td><p>cell</p></td></tr></tbody></table>
<p>${text}</p></section>`,
      ]);
    const node = diff(anchored("Old text."), anchored("New text."));
    expect(node.querySelectorAll("table")).to.have.length(1);
    expect(marks(node).map((mark) => mark.closest("p"))).to.not.include(null);
  });

  it("marks an added paragraph as a whole", () => {
    const node = diff(
      page([ALPHA, BETA]),
      page([ALPHA, BETA.replace("</section>", "<p>Beta three.</p></section>")]),
    );
    const [mark] = marks(node);
    expect(marks(node)).to.have.length(1);
    expect(mark.tagName).to.equal("P");
    expect(mark.textContent).to.equal("Beta three.");
  });

  it("pairs a changed paragraph with the right one when another was removed", () => {
    const paragraphs = (texts) => page([section("s", "Title", texts)]);
    const node = diff(
      paragraphs(["First.", "Second.", "Third paragraph."]),
      paragraphs(["First.", "Third paragraph, edited."]),
    );
    const removed = node.querySelectorAll("p.doc-diff-removed");
    expect(removed).to.have.length(1);
    expect(removed[0].textContent).to.equal("Second.");
    expect(node.querySelector("ins").textContent).to.equal(", edited");
  });

  it("shows a rewritten paragraph as removed and added, not as a word diff", () => {
    const node = diff(
      page([section("s", "Title", ["The quick brown fox."])]),
      page([
        section("s", "Title", ["Lorem ipsum dolor sit amet, consectetur."]),
      ]),
    );
    expect(node.querySelector("p.doc-diff-removed").textContent).to.equal(
      "The quick brown fox.",
    );
    expect(node.querySelector("p.doc-diff-added").textContent).to.equal(
      "Lorem ipsum dolor sit amet, consectetur.",
    );
  });

  it("marks nothing for an unchanged table with a colgroup", () => {
    const node = diff(TABLE, TABLE);
    expect(marks(node)).to.have.length(0);
  });

  it("marks only the changed cell of a table", () => {
    const node = diff(TABLE, TABLE.replace("<p>2</p>", "<p>3</p>"));
    expect(marks(node).map((mark) => mark.closest("td"))).to.not.include(null);
    expect(node.querySelectorAll("table")).to.have.length(1);
  });

  it("marks nothing for the same image served from the two versions", () => {
    const image = (src) =>
      page([`<section><p><img src="${src}"></p></section>`]);
    const node = diff(
      image("https://project.readthedocs.io/en/latest/_images/x.png"),
      image("../_images/x.png"),
    );
    expect(marks(node)).to.have.length(0);
  });

  it("keeps the whitespace between inline elements", () => {
    const badges = (text) =>
      page([
        `<section><div class="badges"><span>Stable</span> <span>${text}</span></div><p>Body.</p></section>`,
      ]);
    const node = diff(badges("v1"), badges("v2"));
    expect(node.querySelector(".badges").textContent).to.equal("Stable v12");
  });

  it("does not modify the nodes it's given", () => {
    const oldRoot = parse(page([ALPHA]));
    const newRoot = parse(page([ALPHA, NEW]));
    const oldHtml = oldRoot.outerHTML;
    const newHtml = newRoot.outerHTML;
    diffDocuments(oldRoot, newRoot, { oldURL: OLD_URL, newURL: NEW_URL });
    expect(oldRoot.outerHTML).to.equal(oldHtml);
    expect(newRoot.outerHTML).to.equal(newHtml);
  });
});

describe("Doc diff relative URLs", () => {
  it("gives the same value for the same target on both versions", () => {
    expect(relativeURL(`${OLD_URL}#alpha`, OLD_URL)).to.equal(
      relativeURL("#alpha", NEW_URL),
    );
    expect(
      relativeURL(
        "https://project.readthedocs.io/en/latest/_images/x.png",
        OLD_URL,
      ),
    ).to.equal(relativeURL("../_images/x.png", NEW_URL));
  });

  it("keeps links to other sites absolute", () => {
    expect(relativeURL("https://example.com/a.png", OLD_URL)).to.equal(
      "https://example.com/a.png",
    );
  });

  it("leaves invalid URLs alone", () => {
    expect(relativeURL("a.png", "not a url")).to.equal("a.png");
  });
});
