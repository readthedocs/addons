import { ADDONS_API_VERSION, getMetadataValue } from "./utils";

export const EVENT_READTHEDOCS_SEARCH_SHOW = "readthedocs-search-show";
export const EVENT_READTHEDOCS_SEARCH_HIDE = "readthedocs-search-hide";
export const EVENT_READTHEDOCS_DOCDIFF_TOGGLE = "readthedocs-docdiff-toggle";
export const EVENT_READTHEDOCS_FLYOUT_SHOW = "readthedocs-flyout-show";
export const EVENT_READTHEDOCS_FLYOUT_HIDE = "readthedocs-flyout-hide";
export const EVENT_READTHEDOCS_ADDONS_DATA_READY =
  "readthedocs-addons-data-ready";

/**
 * Object to pass to user subscribing to `EVENT_READTHEDOCS_ADDONS_DATA_READY`.
 *
 * This object allows us to have a better communication with the user.
 * Instead of passing the raw data, we pass this object and enforce them
 * to use it in an expected way:
 *
 *   document.addEventListener(
 *     "readthedocs-addons-data-ready",
 *     function (event) {
 *       const data = event.detail.data();
 *     }
 *   );
 *
 * Note that we perform some checks/validations when `.data()` is called,
 * to make sure the user is using the pattern in the expected way.
 * Otherwise, we throw an exception.
 */
export class ReadTheDocsEventData {
  constructor(data) {
    this._initialized = false;
    this._data = data;
  }

  initialize() {
    const metadataAddonsAPIVersion = getMetadataValue(
      "readthedocs-addons-api-version",
    );
    if (metadataAddonsAPIVersion === undefined) {
      throw `Subscribing to '${EVENT_READTHEDOCS_ADDONS_DATA_READY}' requires defining the '<meta name="readthedocs-addons-api-version" content="${ADDONS_API_VERSION}" />' tag in the HTML.`;
    }

    this._initialized = true;
  }

  data() {
    if (!this._initialized) {
      this.initialize();
    }
    return this._data;
  }

  httpStatus() {
    const httpStatus = getMetadataValue("readthedocs-http-status");
    return httpStatus;
  }
}
