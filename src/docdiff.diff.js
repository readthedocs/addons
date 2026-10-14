/**
 * Visual diff between two versions of the main content of a page.
 *
 * ``visual-dom-diff`` flattens the whole page into one string and diffs that,
 * which misaligns repeated structure: an inserted section gets matched against
 * the next one, and unchanged tables with a ``<colgroup>`` are duplicated.
 *
 * This module aligns the page block by block first, and only uses
 * ``visual-dom-diff`` to mark the changed words inside pairs of changed leaf
 * blocks (a paragraph, a heading, a table cell).
 *
 * The steps, top to bottom:
 *
 * 1. ``diffDocuments``: copy both versions and make their links comparable.
 * 2. ``diffNode``: for a container, align its children; for anything else,
 *    diff the words.
 * 3. ``alignChildren``: decide which children are equal, removed, added or
 *    changed (a removed one replaced by an added one of the same kind).
 * 4. ``renderOperations``: build the result from that list of operations,
 *    recursing into the changed pairs.
 */

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

const { diff_match_patch, DIFF_EQUAL, DIFF_INSERT, DIFF_DELETE } =
  DiffMatchPatch;

// Depending on the context, visualDomDiff function is found under a different path.
// When running tests we use a different path for it.
const visualDomDiffFunction =
  visualDomDiff.visualDomDiff || visualDomDiff.default?.visualDomDiff;

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

// Elements that lay out as blocks. A node containing them is a container
// whose children are aligned one by one.
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

// Each child is given one UTF-16 character for the alignment, see `alignChildren`
const MAX_CHILDREN = 65535;

// The operations `alignChildren` produces
const EQUAL = "equal";
const REMOVED = "removed";
const ADDED = "added";
const CHANGED = "changed";

function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}

function isBlock(node) {
  return isElement(node) && BLOCK_ELEMENTS.has(node.nodeName);
}

function isWhitespace(node) {
  return node.nodeType === Node.TEXT_NODE && node.data.trim() === "";
}

/**
 * Whether the children of a node can be aligned one by one.
 *
 * That's the case when the node holds blocks, possibly with other elements
 * in between (like the empty ``span`` anchors Sphinx adds) and whitespace,
 * but no text of its own. A paragraph or a heading isn't a container, and is
 * diffed word by word instead.
 */
function isContainer(children) {
  if (children.length === 0 || children.length > MAX_CHILDREN) {
    return false;
  }
  if (!children.some(isBlock)) {
    return false;
  }
  return children.every((child) => isElement(child) || isWhitespace(child));
}

/**
 * Rewrite ``url`` relative to the page it was found in.
 *
 * The two versions of a page live under different URLs (another host for
 * pull request previews, another version path otherwise) and the Embed API
 * rewrites the links of the base version to absolute URLs. Making links
 * relative to their own page gives the same value on both sides for the same
 * target, so a page full of links still aligns, and the same image isn't
 * reported as changed.
 */
export function relativeURL(url, pageURL) {
  let target;
  let page;
  try {
    target = new URL(url, pageURL);
    page = new URL(pageURL);
  } catch (error) {
    return url;
  }
  if (target.origin !== page.origin) {
    return target.href;
  }

  // Drop the directories the page and the target have in common, then go up
  // from the page's remaining directories and down into the target's
  const pageDirectories = page.pathname.split("/").slice(1, -1);
  const targetParts = target.pathname.split("/").slice(1);
  while (
    pageDirectories.length &&
    targetParts.length &&
    pageDirectories[0] === targetParts[0]
  ) {
    pageDirectories.shift();
    targetParts.shift();
  }
  const up = "../".repeat(pageDirectories.length);
  return up + targetParts.join("/") + target.search + target.hash;
}

function relativizeURLs(root, pageURL) {
  for (const link of root.querySelectorAll("a[href]")) {
    // Skip SVG links, which don't resolve the same way
    if (link instanceof HTMLAnchorElement) {
      link.setAttribute(
        "href",
        relativeURL(link.getAttribute("href"), pageURL),
      );
    }
  }
  for (const image of root.querySelectorAll("img[src]")) {
    image.setAttribute("src", relativeURL(image.getAttribute("src"), pageURL));
  }
}

/**
 * How different the text of two nodes is.
 *
 * Used to pick which removed block an added one replaces. Only the start of
 * long texts is compared, that's enough to tell blocks apart.
 */
function textDistance(oldNode, newNode) {
  const oldText = oldNode.textContent.slice(0, 1000);
  const newText = newNode.textContent.slice(0, 1000);
  return dmp.diff_levenshtein(dmp.diff_main(oldText, newText));
}

/**
 * Diff two versions of the same node.
 *
 * Returns a new node (or a fragment, for the word diff) with the changes
 * marked. The children of the nodes passed are moved into the result.
 */
function diffNode(oldNode, newNode) {
  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);
  if (isContainer(oldChildren) && isContainer(newChildren)) {
    const operations = alignChildren(oldChildren, newChildren);
    return renderOperations(newNode.cloneNode(false), operations);
  }
  return visualDomDiffFunction(oldNode, newNode, VISUAL_DIFF_OPTIONS);
}

/**
 * Decide what happened to each child between the two versions.
 *
 * Returns a list of operations, in document order:
 *
 * - ``{type: EQUAL, node}``: the child is identical on both sides.
 * - ``{type: REMOVED, node}``: the child only exists in the old version.
 * - ``{type: ADDED, node}``: the child only exists in the new version.
 * - ``{type: CHANGED, oldNode, newNode}``: a removed child replaced by an
 *   added one of the same kind; the pair is diffed further.
 *
 * Children are compared by their HTML. ``diff-match-patch`` compares
 * strings, so each distinct child is given a one-character code and the two
 * sequences of codes are diffed, as if each child were a line of text.
 */
function alignChildren(oldChildren, newChildren) {
  const codes = new Map();
  function codeFor(node) {
    const html = isElement(node) ? node.outerHTML : node.data;
    if (!codes.has(html)) {
      codes.set(html, String.fromCharCode(codes.size + 1));
    }
    return codes.get(html);
  }
  const oldText = oldChildren.map(codeFor).join("");
  const newText = newChildren.map(codeFor).join("");

  // One operation per child, reading the diff in order
  const operations = [];
  let oldIndex = 0;
  let newIndex = 0;
  for (const [kind, text] of dmp.diff_main(oldText, newText, false)) {
    for (let i = 0; i < text.length; i++) {
      if (kind === DIFF_EQUAL) {
        operations.push({ type: EQUAL, node: newChildren[newIndex] });
        oldIndex++;
        newIndex++;
      } else if (kind === DIFF_DELETE) {
        operations.push({ type: REMOVED, node: oldChildren[oldIndex] });
        oldIndex++;
      } else if (kind === DIFF_INSERT) {
        operations.push({ type: ADDED, node: newChildren[newIndex] });
        newIndex++;
      }
    }
  }

  return pairChanges(operations);
}

/**
 * Turn a removed block followed by an added one of the same kind into a
 * single CHANGED operation.
 *
 * The diff reports an edited block as removed plus added. Pairing them lets
 * us diff inside the block and show only the words that changed. When
 * several blocks were removed in a row, each added one is paired with the
 * removed one whose text is the closest.
 */
function pairChanges(operations) {
  const result = [];
  let index = 0;
  while (index < operations.length) {
    // Collect a run of removed children followed by a run of added ones
    const removed = [];
    const added = [];
    while (index < operations.length && operations[index].type === REMOVED) {
      removed.push(operations[index].node);
      index++;
    }
    while (index < operations.length && operations[index].type === ADDED) {
      added.push(operations[index].node);
      index++;
    }
    if (removed.length === 0 && added.length === 0) {
      result.push(operations[index]);
      index++;
      continue;
    }

    for (const newNode of added) {
      const pairIndex = closestRemoved(removed, newNode);
      if (pairIndex === -1) {
        result.push({ type: ADDED, node: newNode });
        continue;
      }
      // The removed children before the pair stay removed, in their order
      for (const oldNode of removed.splice(0, pairIndex)) {
        result.push({ type: REMOVED, node: oldNode });
      }
      const oldNode = removed.shift();
      result.push({ type: CHANGED, oldNode, newNode });
    }
    for (const oldNode of removed) {
      result.push({ type: REMOVED, node: oldNode });
    }
  }
  return result;
}

/**
 * Index of the removed element that ``newNode`` most likely replaces, or -1.
 *
 * Only elements of the same kind qualify (a paragraph replaces a paragraph).
 */
function closestRemoved(removed, newNode) {
  if (!isElement(newNode)) {
    return -1;
  }
  let bestIndex = -1;
  let bestDistance = Infinity;
  for (let index = 0; index < removed.length; index++) {
    const oldNode = removed[index];
    if (oldNode.nodeName !== newNode.nodeName) {
      continue;
    }
    const distance = textDistance(oldNode, newNode);
    if (distance < bestDistance) {
      bestIndex = index;
      bestDistance = distance;
    }
  }
  return bestIndex;
}

/**
 * Build the result of a container from the list of operations.
 *
 * Equal children are kept as they are, removed and added ones are marked
 * with a class, and changed pairs are diffed recursively. Whitespace text
 * nodes have nothing to mark and are just kept, so the layout doesn't change.
 */
function renderOperations(output, operations) {
  for (const operation of operations) {
    if (operation.type === EQUAL) {
      output.appendChild(operation.node);
    } else if (operation.type === REMOVED) {
      output.appendChild(markNode(operation.node, REMOVED_CLASS));
    } else if (operation.type === ADDED) {
      output.appendChild(markNode(operation.node, ADDED_CLASS));
    } else if (operation.type === CHANGED) {
      output.appendChild(diffNode(operation.oldNode, operation.newNode));
    }
  }
  return output;
}

function markNode(node, className) {
  if (isElement(node)) {
    node.classList.add(className);
  }
  return node;
}

/**
 * Diff two versions of the main content of a page.
 *
 * ``oldURL`` and ``newURL`` are the URLs the two versions were served from.
 * The nodes passed are not modified. Returns the element to show instead of
 * the current content, with the changes marked up.
 */
export function diffDocuments(oldRoot, newRoot, { oldURL, newURL }) {
  oldRoot = oldRoot.cloneNode(true);
  newRoot = newRoot.cloneNode(true);
  relativizeURLs(oldRoot, oldURL);
  relativizeURLs(newRoot, newURL);

  const result = diffNode(oldRoot, newRoot);
  // visual-dom-diff returns a fragment with the root element inside
  if (result.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return result.firstElementChild;
  }
  return result;
}
