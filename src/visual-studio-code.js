import { AddonBase } from "./utils";


/**
 * VisualStudioCode addon
 *
 * Open https://github.dev/ (Visual Studio Code) on the specific file for the current page.
 *
 * @param {Object} config - Addon configuration object
 */
export class VisualStudioCodeAddon extends AddonBase {
  constructor(config) {
    super();
    this.config = config;

    document.addEventListener("keydown", this._handleHotKey);
  }

  openVisualStudioCode() {
    // TODO: find a way to get the GitHub URL from the API that matches the current page.
    // Note it could be an ``.md``, ``.rst`` or anything.
    // I know we have some Python code already written for this, but I think it's not reliable
    // and it may need som modifications / a complete refactor.
    //
    // window.location.href = this.config.addons.visualstudiocode.url;
    window.location.href = "https://github.dev/readthedocs/test-builds/blob/main/README.rst";
  }

  _handleHotKey = (e) => {
    e.preventDefault();
    // TODO: make this check a helper in ``src/utils.js``
    if (e.keyCode === 190 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey && document.activeElement.tagName == "BODY") {
      this.openVisualStudioCode();
    }
  };

  static isEnabled(config) {
    return config.addons && config.addons.visualstudiocode.enabled;
  }
}
