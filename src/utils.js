import { ajv } from "./data-validation";
import { default as objectPath } from "object-path";
export const ADDONS_API_VERSION = "0";
export const ADDONS_API_ENDPOINT = "/_/addons/";
// This is managed by bumpver automatically
export const CLIENT_VERSION = "0.8.0";

export function isReadTheDocsEmbedPresent() {
  const urls = [
    "/_/static/javascript/readthedocs-doc-embed.js",
    "https://assets.readthedocs.org/static/javascript/readthedocs-doc-embed.js",
  ];
  for (const url of urls) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
  }
}

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
      },
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
  static jsonValidationURI = null;
  static addonName = null;
  static addonEnabledPath = null;

  static isConfigValid(config) {
    const validate = ajv.getSchema(this.jsonValidationURI);
    const valid = validate(config);
    if (!valid && typeof IS_TESTING === "undefined" ? true : false) {
      console.debug(`Validation error on addon "${this.addonName}":`);
      console.debug(validate.errors);
    }
    return valid;
  }

  static isEnabled(config) {
    return (
      this.isConfigValid(config) &&
      objectPath.get(config, this.addonEnabledPath, false) === true
    );
  }

  static requiresUrlParam() {
    // Decide whether or not this addons requires sending `url=` parameter to the API endpoint.
    // Sending this attribute will make the API response to contain extra data (e.g. resolved URLs that depend on the exact URL)
    //
    // Note that sending `url=` attribute reduces the possibilities to use a cached response accross all the pages for the same project/version.
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
