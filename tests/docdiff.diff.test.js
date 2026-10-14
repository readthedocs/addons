import { expect } from "@open-wc/testing";
import { diffDocuments } from "../src/docdiff.diff";

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
  return diffDocuments(parse(oldHtml), parse(newHtml));
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

  it("marks nothing for an unchanged table with a colgroup", () => {
    const node = diff(TABLE, TABLE);
    expect(marks(node)).to.have.length(0);
  });

  it("marks only the changed cell of a table", () => {
    const node = diff(TABLE, TABLE.replace("<p>2</p>", "<p>3</p>"));
    expect(marks(node).map((mark) => mark.closest("td"))).to.not.include(null);
    expect(node.querySelectorAll("table")).to.have.length(1);
  });

  it("marks nothing for the same image with a relative and an absolute URL", () => {
    const image = (src) =>
      page([`<section><p><img src="${src}"></p></section>`]);
    const node = diff(
      image(new URL("_images/x.png", document.baseURI).href),
      image("_images/x.png"),
    );
    expect(marks(node)).to.have.length(0);
  });

  it("does not modify the nodes it's given", () => {
    const oldRoot = parse(page([ALPHA]));
    const newRoot = parse(page([ALPHA, NEW]));
    const oldHtml = oldRoot.outerHTML;
    const newHtml = newRoot.outerHTML;
    diffDocuments(oldRoot, newRoot);
    expect(oldRoot.outerHTML).to.equal(oldHtml);
    expect(newRoot.outerHTML).to.equal(newHtml);
  });
});
