import { default as objectPath } from "object-path";
import { AddonBase } from "./utils";
import { ContextConsumer } from "@lit/context";
import { configContext } from "./context.js";
import { nothing, render, LitElement } from "lit";

const SCRIPT_ID = "readthedocs-addons-custom-script";

export class CustomScriptElement extends LitElement {
  static elementName = "readthedocs-customscript";

  // `_config` is the context we are going to consume when it's updated.
  _config = new ContextConsumer(this, {
    context: configContext,
    subscribe: true,
  });

  constructor() {
    super();
    this.config = null;
  }

  render() {
    // Validate the context (`this._config.value`) on each update and return
    // nothing if it's invalid. ``nothing`` is a special Lit response type.
    if (!CustomScriptAddon.isEnabled(this._config.value)) {
      return nothing;
    }

    this.config = this._config.value;

    if (objectPath.get(this.config, "addons.customscript.src")) {
      this.injectJavaScriptFile();
    }
    return nothing;
  }

  injectJavaScriptFile() {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = objectPath.get(this.config, "addons.customscript.src");
    script.async = true;

    document.body.appendChild(script);
  }
}

/**
 * User JavaScript file.
 *
 * Allow a user to inject a custom JavaScript file in all the pages.
 */
export class CustomScriptAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.customscript.json";
  static addonEnabledPath = "addons.customscript.enabled";
  static addonName = "CustomScript";
  static enabledOnHttpStatus = [200, 403, 404, 500];

  constructor() {
    super();

    // If there are no elements found, inject one
    let elems = document.querySelectorAll("readthedocs-customscript");
    if (!elems.length) {
      render(new CustomScriptElement(), document.body);
    }
  }
}

customElements.define("readthedocs-customscript", CustomScriptElement);
