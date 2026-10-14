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

// A node whose children can be aligned one by one: it only holds elements
// (and whitespace between them), no text of its own.
function isContainer(node) {
  const children = Array.from(node.childNodes);
  return (
    children.length > 0 &&
    children.every((child) => isElement(child) || isWhitespace(child))
  );
}

function sameHTML(oldNode, newNode) {
  if (isElement(oldNode) && isElement(newNode)) {
    return oldNode.outerHTML === newNode.outerHTML;
  }
  return oldNode.nodeType === newNode.nodeType && oldNode.data === newNode.data;
}

function mark(node, className) {
  if (isElement(node)) {
    node.classList.add(className);
  }
  return node;
}

/**
 * Rewrite ``url`` relative to the page it was found in.
 *
 * The two versions of a page live under different URLs (another host for
 * pull request previews, another version path otherwise) and the Embed API
 * rewrites the links of the base version to absolute URLs. Making links
 * relative to their own page gives the same value on both sides for the same
 * target, so a page full of links still compares equal.
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
 * Diff two versions of the same node.
 *
 * Returns the node to show, with the changes marked. The children of the
 * nodes passed are moved into the result.
 */
function diffNode(oldNode, newNode) {
  if (isContainer(oldNode) && isContainer(newNode)) {
    return diffChildren(oldNode, newNode);
  }
  if (oldNode.textContent.trim() === "" && newNode.textContent.trim() === "") {
    // Nothing to diff word by word (an image, a rule): show both versions
    const fragment = newNode.ownerDocument.createDocumentFragment();
    fragment.append(mark(oldNode, REMOVED_CLASS), mark(newNode, ADDED_CLASS));
    return fragment;
  }
  return diffText(oldNode, newNode);
}

/**
 * Align the children of two containers and diff them.
 *
 * Equal children are kept as they are, children on one side only are
 * marked as added or removed as a whole, and an added child of the same
 * kind as a removed one is diffed against it as a changed block.
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
      removed = part.value;
      continue;
    }
    // Pair each added child with a removed one of the same kind, if any
    const changed = new Map();
    if (part.added) {
      for (const node of part.value) {
        const index = removed.findIndex(
          (candidate) => candidate.nodeName === node.nodeName,
        );
        if (index !== -1) {
          changed.set(node, removed.splice(index, 1)[0]);
        }
      }
    }
    for (const node of removed) {
      output.appendChild(mark(node, REMOVED_CLASS));
    }
    removed = [];
    for (const node of part.value) {
      if (changed.has(node)) {
        output.appendChild(diffNode(changed.get(node), node));
      } else if (part.added) {
        output.appendChild(mark(node, ADDED_CLASS));
      } else {
        output.appendChild(node);
      }
    }
  }
  for (const node of removed) {
    output.appendChild(mark(node, REMOVED_CLASS));
  }
  return output;
}

/**
 * Diff the text of two versions of the same block, word by word.
 *
 * The result keeps the block's own element but not the markup inside it.
 */
function diffText(oldNode, newNode) {
  const document = newNode.ownerDocument;
  const output = newNode.cloneNode(false);
  for (const part of diffWords(oldNode.textContent, newNode.textContent)) {
    if (part.added) {
      const ins = document.createElement("ins");
      ins.classList.add(ADDED_CLASS);
      ins.textContent = part.value;
      output.appendChild(ins);
    } else if (part.removed) {
      const del = document.createElement("del");
      del.classList.add(REMOVED_CLASS);
      del.textContent = part.value;
      output.appendChild(del);
    } else {
      output.appendChild(document.createTextNode(part.value));
    }
  }
  return output;
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
  return diffNode(oldRoot, newRoot);
}
