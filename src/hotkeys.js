import { toString as keyboardEventToString } from "keyboard-event-to-string";

import { AddonBase } from "./utils";
import { LitElement } from "lit";
import {
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
  EVENT_READTHEDOCS_DOCDIFF_HIDE,
} from "./events";

export class HotKeysElement extends LitElement {
  static elementName = "readthedocs-hotkeys";

  static properties = {
    config: {
      state: true,
    },
    enabled: {
      type: Boolean,
    },
  };

  constructor() {
    super();

    this.config = null;
  }

  loadConfig(config) {
    // Validate the config object before assigning it to the Addon.
    // Later, ``render()`` method will check whether this object exists and (not) render
    // accordingly
    if (!HotKeysAddon.isEnabled(config)) {
      return;
    }

    this.config = config;

    this.docDiffHotKeyEnabled = this.config.addons.hotkeys.doc_diff.enabled;
    this.docDiffEnabled = false;

    this.searchHotKeyEnabled = this.config.addons.hotkeys.search.enabled;
  }

  _handleKeydown = (e) => {
    // Close docdiff with single-stroke `d` (no Ctrl, no Shift, no Alt and no Meta)
    // (I'm checking `document.activeElement` to check if it not inside an INPUT to avoid enable/disable while typing on forms)
    // Read more about these decisions at https://github.com/readthedocs/addons/issues/80

    let event;
    // DocDiff
    if (
      this.docDiffHotKeyEnabled &&
      keyboardEventToString(e) ===
        this.config.addons.hotkeys.doc_diff.trigger &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      document.activeElement.tagName !== "READTHEDOCS-SEARCH"
    ) {
      if (this.docDiffEnabled) {
        event = new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_HIDE);
      } else {
        event = new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW);
      }
      if (event !== undefined) {
        console.log(event);
        document.dispatchEvent(event);
      }
    }

    // Search
    if (
      this.searchHotKeyEnabled &&
      keyboardEventToString(e) === this.config.addons.hotkeys.search.trigger &&
      document.activeElement.tagName !== "INPUT" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      document.activeElement.tagName !== "READTHEDOCS-SEARCH"
    ) {
      event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
    }

    if (event !== undefined) {
      document.dispatchEvent(event);
      e.preventDefault();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this._handleKeydown);

    document.addEventListener(
      EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW,
      function (event) {
        console.log("DD Show");
        this.docDiffEnabled = true;
      },
    );
    document.addEventListener(EVENT_READTHEDOCS_DOCDIFF_HIDE, function (event) {
      console.log("DD Hide");
      this.docDiffEnabled = false;
    });
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleKeydown);
    super.disconnectedCallback();
  }
}

export class HotKeysAddon extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.hotkeys.json";
  static addonEnabledPath = "addons.hotkeys.enabled";
  static addonName = "HotKeys";

  constructor(config) {
    super();

    // TODO: is it possible to move this `constructor` to the `AddonBase` class?
    let elems = document.querySelectorAll("readthedocs-hotkeys");
    if (!elems.length) {
      elems = [new HotKeysElement()];
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }
}

customElements.define("readthedocs-hotkeys", HotKeysElement);
