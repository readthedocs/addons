/**
 * Visual diff between two versions of the main content of a page.
 *
 * The page is compared block by block: a node that only holds other
 * elements (a section, a list, a table) has its children aligned one by one,
 * and a node with text of its own (a paragraph, a heading, a cell) is diffed
 * word by word. The diffing itself is done by jsdiff.
 *
 * Inside a changed paragraph the text is shown without its inline markup
 * (links, code), which keeps this module free of any markup juggling.
 */

import { diffArrays, diffWords } from "diff";

const ADDED_CLASS = "doc-diff-added";
const REMOVED_CLASS = "doc-diff-removed";

function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}

function isWhitespace(node) {
  return node.nodeType === Node.TEXT_NODE && node.data.trim() === "";
}

function hasText(node) {
  return node.textContent.trim() !== "";
}

// A node whose children can be aligned one by one: it only holds elements
// (and whitespace between them), no text of its own.
function isContainer(node) {
  const children = Array.from(node.childNodes);
  return (
    children.length > 0 &&
    children.every((child) => isElement(child) || isWhitespace(child))
  );
}

/**
 * The HTML of a node as compared between the two versions.
 *
 * Link targets are left out, and only the file name of an image is kept:
 * the two versions live under different URLs, and the Embed API rewrites
 * the links of the base version to absolute ones, so the same link or image
 * is written differently on each side.
 */
function comparableHTML(node) {
  if (!isElement(node)) {
    return node.data;
  }
  return node.outerHTML
    .replace(/ href="[^"]*"/g, "")
    .replace(/ src="[^"]*\//g, ' src="');
}

function sameHTML(oldNode, newNode) {
  return comparableHTML(oldNode) === comparableHTML(newNode);
}

// Whether a removed block and an added one are the same block, changed, so
// that it's worth diffing inside it. An image has no words to diff and is
// shown as removed and added instead.
function isChangedBlock(oldNode, newNode) {
  return oldNode.nodeName === newNode.nodeName && hasText(newNode);
}

// Append nodes to the output, marked as added or removed when a class is
// given. Text nodes (the whitespace between blocks) can't be marked.
function appendAll(output, nodes, className = null) {
  for (const node of nodes) {
    if (className !== null && isElement(node)) {
      node.classList.add(className);
    }
    output.appendChild(node);
  }
}

/**
 * Diff two versions of the same node.
 *
 * Returns the node to show, with the changes marked. The children of the
 * nodes passed are moved into the result.
 */
function diffNode(oldNode, newNode) {
  if (isContainer(oldNode) && isContainer(newNode)) {
    return diffChildren(oldNode, newNode);
  }
  return diffText(oldNode, newNode);
}

/**
 * Align the children of two containers and diff them.
 *
 * Equal children are kept as they are and children on one side only are
 * marked as added or removed as a whole. When a run of children was
 * replaced by another, an added child of the same kind as a removed one is
 * the same block, changed, and is diffed in turn.
 */
function diffChildren(oldNode, newNode) {
  const output = newNode.cloneNode(false);
  const parts = diffArrays(
    Array.from(oldNode.childNodes),
    Array.from(newNode.childNodes),
    { comparator: sameHTML },
  );

  // jsdiff reports a replaced run as a removed part followed by an added one
  let removed = [];
  for (const part of parts) {
    if (part.removed) {
      removed = Array.from(part.value);
    } else if (part.added) {
      // Each added child takes the first removed one it's a changed version
      // of, if any. Whitespace never pairs, so it's looked past.
      const changed = new Map();
      for (const node of part.value) {
        const index = removed.findIndex((candidate) =>
          isChangedBlock(candidate, node),
        );
        if (index !== -1) {
          changed.set(node, removed.splice(index, 1)[0]);
        }
      }
      appendAll(output, removed, REMOVED_CLASS);
      for (const node of part.value) {
        if (changed.has(node)) {
          output.appendChild(diffNode(changed.get(node), node));
        } else {
          appendAll(output, [node], ADDED_CLASS);
        }
      }
      removed = [];
    } else {
      appendAll(output, removed, REMOVED_CLASS);
      appendAll(output, part.value);
      removed = [];
    }
  }
  appendAll(output, removed, REMOVED_CLASS);
  return output;
}

/**
 * Diff the text of two versions of the same block, word by word.
 *
 * The result keeps the block's own element but not the markup inside it.
 */
function diffText(oldNode, newNode) {
  const output = newNode.cloneNode(false);
  for (const part of diffWords(oldNode.textContent, newNode.textContent)) {
    if (!part.added && !part.removed) {
      output.append(part.value);
      continue;
    }
    const element = newNode.ownerDocument.createElement(
      part.added ? "ins" : "del",
    );
    element.className = part.added ? ADDED_CLASS : REMOVED_CLASS;
    element.textContent = part.value;
    output.append(element);
  }
  return output;
}

/**
 * Diff two versions of the main content of a page.
 *
 * The nodes passed are not modified. Returns the element to show instead of
 * the current content, with the changes marked up.
 */
export function diffDocuments(oldRoot, newRoot) {
  return diffNode(oldRoot.cloneNode(true), newRoot.cloneNode(true));
}
