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

// Each child is mapped to one UTF-16 character for the alignment
const MAX_CHILDREN = 65535;

const isElement = (node) => node.nodeType === Node.ELEMENT_NODE;
const isBlock = (node) => isElement(node) && BLOCK_ELEMENTS.has(node.nodeName);
const isWhitespace = (node) =>
  node.nodeType === Node.TEXT_NODE && node.data.trim() === "";

// Children of a node, ignoring whitespace between them (it isn't rendered).
function getChildren(node) {
  return Array.from(node.childNodes).filter(
    (child) =>
      isElement(child) ||
      (child.nodeType === Node.TEXT_NODE && !isWhitespace(child)),
  );
}

// A container holds blocks (and maybe other elements, like the empty `span`
// anchors Sphinx adds), but no text of its own. Its children can be aligned
// one by one; anything else, like a paragraph, is diffed word by word.
function isContainer(children) {
  return (
    children.length <= MAX_CHILDREN &&
    children.some(isBlock) &&
    children.every(isElement)
  );
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
  const from = page.pathname.split("/").slice(1, -1);
  const to = target.pathname.split("/").slice(1);
  while (from.length && to.length && from[0] === to[0]) {
    from.shift();
    to.shift();
  }
  return "../".repeat(from.length) + to.join("/") + target.search + target.hash;
}

function relativizeURLs(root, pageURL) {
  for (const link of root.querySelectorAll("a[href]")) {
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

function markNode(node, className) {
  node.classList.add(className);
  return node;
}

// The whitespace text nodes that follow `node`
function trailingWhitespace(node) {
  const whitespace = [];
  for (
    let next = node.nextSibling;
    next && isWhitespace(next);
    next = next.nextSibling
  ) {
    whitespace.push(next);
  }
  return whitespace;
}

// Move `node` into `output`, with the whitespace that followed it
function move(output, node) {
  output.append(node, ...trailingWhitespace(node));
}

// How different the text of two nodes is, to pick which removed block an
// added one replaces
function distance(oldNode, newNode) {
  const diffs = dmp.diff_main(
    oldNode.textContent.slice(0, 1000),
    newNode.textContent.slice(0, 1000),
  );
  return dmp.diff_levenshtein(diffs);
}

function diffNodes(oldNode, newNode) {
  const oldChildren = getChildren(oldNode);
  const newChildren = getChildren(newNode);
  if (isContainer(oldChildren) && isContainer(newChildren)) {
    return diffChildren(oldNode, newNode, oldChildren, newChildren);
  }
  return visualDomDiffFunction(oldNode, newNode, VISUAL_DIFF_OPTIONS);
}

/**
 * Align the children of two containers one by one.
 *
 * Children are compared by their serialized HTML. Equal children are kept as
 * they are, children present on only one side are marked as added or removed
 * as a whole, and an added child that replaces a removed one of the same kind
 * is diffed recursively as a changed block.
 *
 * The children are moved into the result, not copied.
 */
function diffChildren(oldNode, newNode, oldChildren, newChildren) {
  const output = newNode.cloneNode(false);
  // Whitespace before the first child
  for (const child of Array.from(newNode.childNodes)) {
    if (!isWhitespace(child)) {
      break;
    }
    output.appendChild(child);
  }

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
  const flushRemoved = (count = removed.length) => {
    for (const node of removed.splice(0, count)) {
      move(output, markNode(node, REMOVED_CLASS));
    }
  };

  for (const [operation, text] of diffs) {
    // Each character of the diff text stands for one child.
    for (let i = 0; i < text.length; i++) {
      if (operation === DIFF_EQUAL) {
        flushRemoved();
        move(output, newChildren[newIndex++]);
        oldIndex++;
      } else if (operation === DIFF_DELETE) {
        removed.push(oldChildren[oldIndex++]);
      } else {
        const newNode = newChildren[newIndex++];
        // The removed block this one replaces: the closest in text among
        // those of the same kind, if any
        let pair = -1;
        let best = Infinity;
        removed.forEach((oldNode, index) => {
          if (oldNode.nodeName !== newNode.nodeName) {
            return;
          }
          const value = distance(oldNode, newNode);
          if (value < best) {
            pair = index;
            best = value;
          }
        });
        if (pair === -1) {
          flushRemoved();
          move(output, markNode(newNode, ADDED_CLASS));
        } else {
          flushRemoved(pair);
          const whitespace = trailingWhitespace(newNode);
          output.append(diffNodes(removed.shift(), newNode), ...whitespace);
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
 * ``oldURL`` and ``newURL`` are the URLs the two versions were served from.
 * The nodes passed are not modified. Returns the element to show instead of
 * the current content, with the changes marked up.
 */
export function diffDocuments(oldRoot, newRoot, { oldURL, newURL }) {
  oldRoot = oldRoot.cloneNode(true);
  newRoot = newRoot.cloneNode(true);
  relativizeURLs(oldRoot, oldURL);
  relativizeURLs(newRoot, newURL);

  const node = diffNodes(oldRoot, newRoot);
  // visual-dom-diff returns a fragment with the root element inside
  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    return node.firstElementChild;
  }
  return node;
}
