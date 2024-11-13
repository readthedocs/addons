import { default as objectPath } from "object-path";
import { AddonBase } from "./utils";

const SCRIPT_ID = "readthedocs-addons-user-js-file";

/**
 * User JavaScript file.
 *
 * Allow a user to inject a custom JavaScript file in all the pages.
 */
export class UserJsFileAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.userjsfile.json";
  static addonEnabledPath = "addons.userjsfile.enabled";
  static addonName = "UserJsFile";
  static enabledOnHttpStatus = [200, 403, 404, 500];

  constructor(config) {
    super();
    this.config = config;

    if (objectPath.get(this.config, "addons.userjsfile.src")) {
      this.injectJavaScriptFile();
    }
  }

  injectJavaScriptFile() {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = objectPath.get(this.config, "addons.userjsfile.src");
    script.async = true;

    document.body.appendChild(script);
  }
}
