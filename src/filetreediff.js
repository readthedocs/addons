import { ajv } from "./data-validation";
import { default as objectPath } from "object-path";

import { AddonBase } from "./utils";

/**
 * File Tree Diff addon
 *
 * UNDER DEVELOPMENT.
 *
 * Currently, this addon shows in the console all the file changed compared to
 * the LATEST version of the project.
 *
 * @param {Object} config - Addon configuration object
 */
export class FileTreeDiffAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.filetreediff.json";
  static addonEnabledPath = "addons.filetreediff.enabled";
  static addonName = "File Tree Diff";

  constructor(config) {
    super();

    this.config = config;
    this.showDiff();
  }

  showDiff() {
    // const outdated = objectPath.get(this.config, "addons.filetreediff.oudated", false);
    const diffdata = objectPath.get(this.config, "addons.filetreediff.diff");

    for (let f of diffdata.added) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
    for (let f of diffdata.modified) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
    for (let f of diffdata.deleted) {
      console.debug(`File: ${f.filename}, URL: ${f.urls.current}`);
    }
  }
}
