import packagejson from "../package.json";

export function isReadTheDocsEmbedPresent() {
  const urls = [
    "/_/static/javascript/readthedocs-doc-embed.js",
    "https://assets.readthedocs.org/static/javascript/readthedocs-doc-embed.js",
  ];
  for (const url of urls) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
  }
}

export const CLIENT_VERSION = packagejson.version;

export const domReady = new Promise((resolve) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    return resolve();
  } else {
    // Deduplicate DOM complete events
    let is_loaded = false;
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        if (!is_loaded) {
          resolve();
        }
        is_loaded = true;
      },
      {
        capture: true,
        once: true,
        passive: true,
      }
    );
  }
});

/**
 * Addon base class
 *
 * Provides a common interface for addon configuration testing, customization,
 * and loading.
 */
export class AddonBase {
  static isEnabled(config) {
    return false;
  }
}

/**
 * Debounce a function.
 *
 * Usage::
 *
 *    let func = debounce(() => console.log("Hello World"), 3000);
 *
 *    // calling the func
 *    func();
 *
 *    //cancelling the execution of the func (if not executed)
 *    func.cancel();
 *
 * @param {Function} func function to be debounced
 * @param {Number} wait time to wait before running func (in miliseconds)
 * @return {Function} debounced function
 */
export function debounce(func, wait) {
  let timeout;

  let debounced = function () {
    let context = this;
    let args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

/**
 * Recursive depth-first search to find all shadow roots within a webpage.
 *
 * Example usage: let's imagine you come across a page that has a bunch of
 * expandable information sections, and you would like to expand all of those
 * info sections for the sake of printing to a PDF or for the ease of
 * performing a simple `CTRL+F` search across the information. Let's assume
 * those expanding buttons are buried within Shadow DOM. (Perhaps the site is
 * using Angular or something of the sort & the buttons are separate
 * components, thus by default they end up in a Shadow DOM whenever included.)
 * Of course, you're not going click 30 different buttons like some mortal, but
 * Shadow DOM prevents you from simply saying:
 * `document.body.querySelectorAll('button.btn-expand-more-details')`
 *
 * This is where the `findRoots` function can help you out. Instead of
 * resorting to clicking each button by hand, you can "Search in the Shadows"
 * by leveraging the `findRoots(...)` function to locate all shadow document
 * fragments. You can then execute `querySelectorAll('...')` across all
 * document fragments to locate the buttons you want to click. Your code might
 * read:
 *
 * ```javascript
 * [
 *   document.body,
 *   ...findRoots(document.body)
 * ].flatMap(
 *   e=>e.querySelectorAll('button.btn-expand-more-details')
 * ).forEach(e=>e.click())
 * ```
 *
 * @param {Node} ele - An element that we should search for ShadowRoots within.
 * @returns {Array<ShadowRoot>} Array of ShadowRoots found below/contained
 *   within the given node, `ele`.
 *
 *
 * https://gist.github.com/Spencer-Doak/9954daae8a859337a08f0022293313a6
 */
export function findRoots(ele) {
  return [ele, ...ele.querySelectorAll("*")]
    .filter((e) => !!e.shadowRoot)
    .flatMap((e) => [e.shadowRoot, ...findRoots(e.shadowRoot)]);
}
