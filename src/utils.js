import { ajv } from "./data-validation";
import { default as objectPath } from "object-path";
export const ADDONS_API_VERSION = "1";
export const ADDONS_API_ENDPOINT = "/_/addons/";
// This is managed by bumpver automatically
export const CLIENT_VERSION = "0.18.0";

// WEBPACK_ variables come from Webpack's DefinePlugin and Web Test Runner's RollupReplace plugin
export const IS_TESTING =
  typeof WEBPACK_IS_TESTING === "undefined" ? false : WEBPACK_IS_TESTING;
export const IS_PRODUCTION =
  typeof WEBPACK_IS_PRODUCTION === "undefined" ? false : WEBPACK_IS_PRODUCTION;

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
  // The key to be used for Local Storage purposes. If not provided, `readthedocs-<addonName>-storage-key`
  // will be used
  static addonLocalStorageKey = null;
  static enabledOnHttpStatus = [200];

  static isConfigValid(config) {
    const validate = ajv.getSchema(this.jsonValidationURI);
    const valid = validate(config);
    if (!valid && !IS_TESTING) {
      console.debug(`Validation error on addon "${this.addonName}":`);
      console.debug(validate.errors);
    }
    return valid;
  }

  static isEnabled(config, httpStatus) {
    // Validate the addons is enabled before validating the config itself. This
    // allows us to omit returning a field completely when the addon is not
    // allowed for page the user is reading. Example: `doc_diff` is not returned
    // when `url=` is not sent.
    //
    // If `httpStatus` is passed, it checks the status code is on the list where
    // this addons has to be enabled.

    // Return false immediately if the HTTP status code is not one of the expected ones
    const httpStatusInt = parseInt(httpStatus, 10);
    if (
      httpStatusInt !== null &&
      httpStatusInt !== undefined &&
      !isNaN(httpStatusInt) &&
      !this.enabledOnHttpStatus.includes(httpStatusInt)
    ) {
      return false;
    }

    return (
      objectPath.get(config, this.addonEnabledPath, false) === true &&
      this.isConfigValid(config)
    );
  }

  static getAddonLocalStorageKey() {
    // Return a key to be used for Local Storage
    return (
      this.addonLocalStorageKey ||
      `readthedocs-${this.addonName.toLowerCase()}-storage-key`
    );
  }

  static requiresUrlParam() {
    // Decide whether or not this addons requires sending `url=` parameter to the API endpoint.
    // Sending this attribute will make the API response to contain extra data (e.g. resolved URLs that depend on the exact URL)
    //
    // Note that sending `url=` attribute reduces the possibilities to use a cached response accross all the pages for the same project/version.
    return false;
  }

  static getLocalStorage() {
    // Get the object stored in Local Storage for this addon
    const addonLocalStorage = window.localStorage.getItem(
      this.getAddonLocalStorageKey(),
    );
    return addonLocalStorage ? JSON.parse(addonLocalStorage) : {};
  }

  static setLocalStorage(obj) {
    // Update the existing object in Local Storage with the provided object and store it under
    // the key for this addon.
    // For example, if obj provided is {foo: 'bar'}, and the existing object is {a: 1, foo: 'baz'}
    // This will update the existing object to {a: 1, foo: 'bar'} and store it under this.getAddonLocalStorageKey()
    const addonLocalStorage = this.getLocalStorage() || {};
    const updatedStorage = { ...addonLocalStorage, ...obj };
    window.localStorage.setItem(
      this.getAddonLocalStorageKey(),
      JSON.stringify(updatedStorage),
    );
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
 * Setup logging based on query argument.
 *
 * Add `?logging=DEBUG` to the URL to expose logs in the console.
 *
 */
export function setupLogging() {
  const url = new URL(window.location.href);
  const debug = url.searchParams.get("logging");
  if (debug === null || debug.toLowerCase() !== "debug") {
    console.debug = () => {};
  }
}

export function addUtmParameters(url, content) {
  const metaProject = document.querySelector(
    "meta[name='readthedocs-project-slug']",
  );
  const projectSlug = metaProject.content;
  const newUrl = new URL(url);
  newUrl.searchParams.append("utm_source", projectSlug);
  newUrl.searchParams.append("utm_content", content);
  return newUrl.href;
}

/**
 * Get a value from a META element injected by Cloudflare Worker.
 *
 */
export function getMetadataValue(name) {
  const meta = document.querySelector(`meta[name=${name}]`);
  if (meta !== null) {
    return meta.getAttribute("content");
  }
  return undefined;
}
