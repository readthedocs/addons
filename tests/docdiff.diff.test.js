import { expect } from "@open-wc/testing";
import { diffDocuments, DOCDIFF_CHUNK_CLASS } from "../src/docdiff.diff";

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

function diff(oldHtml, newHtml) {
  const parse = (html) =>
    new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
  return diffDocuments(parse(oldHtml), parse(newHtml));
}

function describeChunks(chunks) {
  return chunks.map(
    (chunk) => chunk.tagName.toLowerCase() + (chunk.id ? `#${chunk.id}` : ""),
  );
}

describe("Doc diff algorithm", () => {
  it("reports no chunks for identical pages", () => {
    const { chunks } = diff(page([ALPHA, BETA]), page([ALPHA, BETA]));
    expect(chunks).to.have.length(0);
  });

  it("marks a changed word inside its paragraph", () => {
    const { chunks, node } = diff(
      page([ALPHA, BETA, GAMMA]),
      page([ALPHA, BETA.replace("Beta body one.", "Beta body uno."), GAMMA]),
    );
    expect(describeChunks(chunks)).to.deep.equal(["p"]);
    expect(node.querySelector("del").textContent).to.equal("one");
    expect(node.querySelector("ins").textContent).to.equal("uno");
    expect(node.querySelectorAll(`.${DOCDIFF_CHUNK_CLASS}`)).to.have.length(1);
  });

  it("reports an inserted section as a single chunk", () => {
    const { chunks, node } = diff(
      page([ALPHA, BETA, GAMMA]),
      page([ALPHA, NEW, BETA, GAMMA]),
    );
    expect(describeChunks(chunks)).to.deep.equal(["section#new"]);
    expect(chunks[0].classList.contains("doc-diff-added")).to.be.true;
    // The surrounding sections are untouched
    expect(node.querySelectorAll(".doc-diff-removed")).to.have.length(0);
  });

  it("reports a removed section as a single chunk", () => {
    const { chunks, node } = diff(
      page([ALPHA, BETA, GAMMA]),
      page([ALPHA, GAMMA]),
    );
    expect(describeChunks(chunks)).to.deep.equal(["section#beta"]);
    expect(chunks[0].classList.contains("doc-diff-removed")).to.be.true;
    expect(node.querySelectorAll(".doc-diff-added")).to.have.length(0);
  });

  it("reports an added paragraph as its own chunk", () => {
    const { chunks } = diff(
      page([ALPHA, BETA]),
      page([ALPHA, BETA.replace("</section>", "<p>Beta three.</p></section>")]),
    );
    expect(describeChunks(chunks)).to.deep.equal(["p"]);
    expect(chunks[0].textContent).to.equal("Beta three.");
  });

  it("does not report an unchanged table with a colgroup", () => {
    const { chunks } = diff(TABLE, TABLE);
    expect(chunks).to.have.length(0);
  });

  it("marks a changed table cell", () => {
    const { chunks } = diff(TABLE, TABLE.replace("<p>2</p>", "<p>3</p>"));
    expect(describeChunks(chunks)).to.deep.equal(["p"]);
    expect(chunks[0].closest("td")).to.not.be.null;
  });
});
