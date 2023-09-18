import { toString as keyboardEventToString } from "keyboard-event-to-string";

import { AddonBase } from "./utils";
import { html, nothing, LitElement } from "lit";
import {
  EVENT_READTHEDOCS_SEARCH_SHOW,
  EVENT_READTHEDOCS_SEARCH_HIDE,
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

    this.docDiffShow = false;
  }

  loadConfig(config) {
    this.config = config;
    this.docDiffHotKeyEnabled = this.config.addons.hotkeys.doc_diff.enabled;
    this.docDiffShowed = false;

    this.searchHotKeyEnabled = this.config.addons.hotkeys.search.enabled;
    this.searchShowed = false;
  }

  _handleKeydown = (e) => {
    // Close docdiff with single-stroke `d` (no Ctrl, no Shift, no Alt and no Meta)
    // (I'm checking `document.activeElement` to check if it's the BODY to avoid enable/disable while typing on forms)
    // Read more about these decisions at https://github.com/readthedocs/addons/issues/80

    let event;
    // DocDiff
    if (
      this.docDiffHotKeyEnabled &&
      keyboardEventToString(e) ===
        this.config.addons.hotkeys.doc_diff.trigger &&
      document.activeElement.tagName == "BODY"
    ) {
      if (this.docDiffShowed) {
        event = new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_HIDE);
        this.docDiffShowed = false;
      } else {
        event = new CustomEvent(EVENT_READTHEDOCS_DOCDIFF_ADDED_REMOVED_SHOW);
        this.docDiffShowed = true;
      }
    }

    // Search
    if (
      (this.searchHotKeyEnabled &&
        keyboardEventToString(e) ===
          this.config.addons.hotkeys.search.trigger &&
        document.activeElement.tagName == "BODY") ||
      document.querySelector("div[role=search] input") ===
        document.activeElement
    ) {
      if (this.searchShowed) {
        event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_HIDE);
        this.searchShowed = false;
      } else {
        event = new CustomEvent(EVENT_READTHEDOCS_SEARCH_SHOW);
        this.searchShowed = true;
      }
    }

    if (event !== undefined) {
      document.dispatchEvent(event);
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this._handleKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", this._handleKeydown);
    super.disconnectedCallback();
  }
}

export class HotKeysAddon extends AddonBase {
  constructor(config) {
    super();

    // TODO: is it possible to move this `constructor` to the `AddonBase` class?
    customElements.define("readthedocs-hotkeys", HotKeysElement);
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

  static isEnabled(config) {
    return config.addons && config.addons.hotkeys.enabled;
  }
}