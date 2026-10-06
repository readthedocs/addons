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

import { IS_TESTING } from "./utils";

const { diff_match_patch, DIFF_EQUAL, DIFF_DELETE } = DiffMatchPatch;

const ADDED_CLASS = "doc-diff-added";
const REMOVED_CLASS = "doc-diff-removed";

// Class added to each block containing a change. The File Tree Diff addon
// uses it to jump between changes.
export const DOCDIFF_CHUNK_CLASS = "doc-diff-chunk";

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

// Elements that lay out as blocks. Their children are aligned one by one
// before diffing, and a change inside them is reported as a chunk on them.
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

function isBlock(node) {
  return (
    node.nodeType === Node.ELEMENT_NODE && BLOCK_ELEMENTS.has(node.nodeName)
  );
}

// Children of a node, ignoring whitespace between them (it isn't rendered).
function getChildren(node) {
  return Array.from(node.childNodes).filter(
    (child) =>
      child.nodeType === Node.ELEMENT_NODE ||
      (child.nodeType === Node.TEXT_NODE && child.data.trim() !== ""),
  );
}

// A container only has block children, so we can keep aligning its children
// instead of diffing it word by word.
function isContainer(node) {
  const children = getChildren(node);
  return children.length > 0 && children.every(isBlock);
}

function getVisualDomDiff() {
  // Depending on the context, visualDomDiff function is found under a different path.
  // When running tests we use a different path for it.
  let visualDomDiffFunction = visualDomDiff.visualDomDiff;
  if (!visualDomDiffFunction && IS_TESTING) {
    visualDomDiffFunction = visualDomDiff.default.visualDomDiff;
  }
  return visualDomDiffFunction;
}

function diffNodes(oldNode, newNode, dmp) {
  if (isContainer(oldNode) && isContainer(newNode)) {
    return diffContainer(oldNode, newNode, dmp);
  }
  return getVisualDomDiff()(oldNode, newNode, VISUAL_DIFF_OPTIONS);
}

/**
 * Align the children of two containers block by block.
 *
 * Children are compared by their serialized HTML with a line-based diff.
 * Equal children are copied as they are, children present on only one side
 * are marked as added or removed as a whole, and a removed child followed by
 * an added one of the same kind is diffed recursively as a changed block.
 */
function diffContainer(oldElement, newElement, dmp) {
  const output = newElement.cloneNode(false);
  const oldChildren = getChildren(oldElement);
  const newChildren = getChildren(newElement);

  // One "line" per child. Serialized nodes may contain newlines themselves.
  const toLines = (nodes) =>
    nodes
      .map((node) => node.outerHTML.replace(/\n/g, "\u0001") + "\n")
      .join("");
  const { chars1, chars2 } = dmp.diff_linesToChars_(
    toLines(oldChildren),
    toLines(newChildren),
  );

  let oldIndex = 0;
  let newIndex = 0;
  let removed = [];
  const flushRemoved = () => {
    for (const node of removed) {
      const clone = node.cloneNode(true);
      clone.classList.add(REMOVED_CLASS);
      output.appendChild(clone);
    }
    removed = [];
  };

  for (const [operation, text] of dmp.diff_main(chars1, chars2, false)) {
    // Each character of the diff text stands for one child.
    for (let i = 0; i < text.length; i++) {
      if (operation === DIFF_EQUAL) {
        flushRemoved();
        output.appendChild(newChildren[newIndex++].cloneNode(true));
        oldIndex++;
      } else if (operation === DIFF_DELETE) {
        removed.push(oldChildren[oldIndex++]);
      } else {
        const newNode = newChildren[newIndex++];
        if (removed.length && removed[0].nodeName === newNode.nodeName) {
          output.appendChild(diffNodes(removed.shift(), newNode, dmp));
        } else {
          flushRemoved();
          const clone = newNode.cloneNode(true);
          clone.classList.add(ADDED_CLASS);
          output.appendChild(clone);
        }
      }
    }
  }
  flushRemoved();

  return output;
}

// The closest block to each change, dropping blocks nested inside another one
// (a whole added section is one chunk).
function getChunks(root) {
  const chunks = new Set();
  for (const mark of root.querySelectorAll(
    `.${ADDED_CLASS}, .${REMOVED_CLASS}`,
  )) {
    let node = mark;
    while (node !== root && !isBlock(node)) {
      node = node.parentElement;
    }
    if (node !== root) {
      chunks.add(node);
    }
  }
  return Array.from(chunks).filter(
    (chunk) =>
      !Array.from(chunks).some(
        (other) => other !== chunk && other.contains(chunk),
      ),
  );
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
 * Returns the element to show instead of the current content, with each
 * changed block tagged with ``DOCDIFF_CHUNK_CLASS``, and the list of chunks.
 */
export function diffDocuments(oldRoot, newRoot) {
  let node = diffNodes(oldRoot, newRoot, new diff_match_patch());
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    node = node.firstElementChild;
  }

  const chunks = getChunks(node);
  for (const chunk of chunks) {
    chunk.classList.add(DOCDIFF_CHUNK_CLASS);
  }
  return { node, chunks };
}
