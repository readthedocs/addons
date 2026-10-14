import { default as DiffMatchPatch } from "diff-match-patch";

// Note that it took as a while to make it work on production and also on tests.
// We have to import it as:
//   import * as  visualDomDiff from "visual-dom-diff";
//
// We have to use it as:
//   visualDomDiff.visualDomDiff();
//
// See https://github.com/readthedocs/addons/pull/234
import * as visualDomDiff from "visual-dom-diff";

const { diff_match_patch, DIFF_EQUAL, DIFF_DELETE } = DiffMatchPatch;

// Depending on the context, visualDomDiff function is found under a different path.
// When running tests we use a different path for it.
const visualDomDiffFunction =
  visualDomDiff.visualDomDiff || visualDomDiff.default.visualDomDiff;

const dmp = new diff_match_patch();

const ADDED_CLASS = "doc-diff-added";
const REMOVED_CLASS = "doc-diff-removed";

/**
 * visual-dom-diff options
 *
 * See https://github.com/Teamwork/visual-dom-diff#options
 */
const VISUAL_DIFF_OPTIONS = {
  addedClass: ADDED_CLASS,
  modifiedClass: "doc-diff-modified",
  removedClass: REMOVED_CLASS,
  skipModified: true,
};

// Elements that lay out as blocks. A node containing them is aligned child by
// child before diffing, instead of diffing the whole page as one piece of text.
const BLOCK_ELEMENTS = new Set([
  "ARTICLE",
  "ASIDE",
  "BLOCKQUOTE",
  "CAPTION",
  "COLGROUP",
  "DD",
  "DETAILS",
  "DIV",
  "DL",
  "DT",
  "FIGCAPTION",
  "FIGURE",
  "FOOTER",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "HR",
  "LI",
  "MAIN",
  "NAV",
  "OL",
  "P",
  "PRE",
  "SECTION",
  "SUMMARY",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "UL",
]);

const isElement = (node) => node.nodeType === Node.ELEMENT_NODE;
const isBlock = (node) => isElement(node) && BLOCK_ELEMENTS.has(node.nodeName);

// Children of a node, ignoring whitespace between them (it isn't rendered).
function getChildren(node) {
  return Array.from(node.childNodes).filter(
    (child) =>
      isElement(child) ||
      (child.nodeType === Node.TEXT_NODE && child.data.trim() !== ""),
  );
}

// A container holds blocks (and maybe other elements, like the empty `span`
// anchors Sphinx adds), but no text of its own. Its children can be aligned
// one by one; anything else, like a paragraph, is diffed word by word.
function isContainer(children) {
  return children.some(isBlock) && children.every(isElement);
}

/**
 * Make links and images comparable between the two versions.
 *
 * The Embed API rewrites ``href`` and ``src`` to absolute URLs, while the
 * current page has them as written (usually relative). Images are compared
 * by their attributes, so the same image would otherwise show as changed.
 */
function resolveURLs(root) {
  for (const link of root.querySelectorAll("a[href]")) {
    link.setAttribute("href", link.href);
  }
  for (const image of root.querySelectorAll("img[src]")) {
    image.setAttribute("src", image.src);
  }
}

function markNode(node, className) {
  node.classList.add(className);
  return node;
}

function diffNodes(oldNode, newNode) {
  const oldChildren = getChildren(oldNode);
  const newChildren = getChildren(newNode);
  if (isContainer(oldChildren) && isContainer(newChildren)) {
    return diffChildren(newNode.cloneNode(false), oldChildren, newChildren);
  }
  return visualDomDiffFunction(oldNode, newNode, VISUAL_DIFF_OPTIONS);
}

/**
 * Align the children of two containers one by one, into ``output``.
 *
 * Children are compared by their serialized HTML. Equal children are kept as
 * they are, children present on only one side are marked as added or removed
 * as a whole, and a removed child followed by an added one of the same kind
 * is diffed recursively as a changed block.
 *
 * The children are moved into ``output``, not copied.
 */
function diffChildren(output, oldChildren, newChildren) {
  // Give each distinct child a character, so the children can be aligned
  // with a text diff. The same HTML on both sides gets the same character.
  const chars = new Map();
  const toChars = (nodes) =>
    nodes
      .map((node) => {
        const html = node.outerHTML;
        if (!chars.has(html)) {
          chars.set(html, String.fromCharCode(chars.size + 1));
        }
        return chars.get(html);
      })
      .join("");
  const diffs = dmp.diff_main(
    toChars(oldChildren),
    toChars(newChildren),
    false,
  );

  let oldIndex = 0;
  let newIndex = 0;
  let removed = [];
  const flushRemoved = () => {
    for (const node of removed) {
      output.appendChild(markNode(node, REMOVED_CLASS));
    }
    removed = [];
  };

  for (const [operation, text] of diffs) {
    // Each character of the diff text stands for one child.
    for (let i = 0; i < text.length; i++) {
      if (operation === DIFF_EQUAL) {
        flushRemoved();
        output.appendChild(newChildren[newIndex++]);
        oldIndex++;
      } else if (operation === DIFF_DELETE) {
        removed.push(oldChildren[oldIndex++]);
      } else {
        const newNode = newChildren[newIndex++];
        if (removed.length && removed[0].nodeName === newNode.nodeName) {
          output.appendChild(diffNodes(removed.shift(), newNode));
        } else {
          flushRemoved();
          output.appendChild(markNode(newNode, ADDED_CLASS));
        }
      }
    }
  }
  flushRemoved();

  return output;
}

/**
 * Diff two versions of the main content of a page.
 *
 * ``visual-dom-diff`` flattens the whole page into one string and diffs that,
 * which misaligns repeated structure: an inserted section gets matched against
 * the next one, and unchanged tables with a ``<colgroup>`` are duplicated.
 * Here, blocks are aligned first and only pairs of changed leaf blocks
 * (paragraphs, headings, cells) are diffed word by word.
 *
 * The nodes passed are not modified. Returns the element to show instead of
 * the current content, with the changes marked up.
 */
export function diffDocuments(oldRoot, newRoot) {
  oldRoot = oldRoot.cloneNode(true);
  newRoot = newRoot.cloneNode(true);
  resolveURLs(oldRoot);
  resolveURLs(newRoot);

  const node = diffNodes(oldRoot, newRoot);
  // visual-dom-diff returns a fragment with the root element inside
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return node.firstElementChild;
  }
  return node;
}
