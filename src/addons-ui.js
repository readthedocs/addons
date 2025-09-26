import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDown,
  faBars,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { html, nothing, LitElement } from "lit";
import { default as objectPath } from "object-path";
import styleSheet from "./addons-ui.css";
import { getQueryParam } from "./utils";
import { AddonBase } from "./utils";

export class AddonsUIElement extends LitElement {
  static elementName = "readthedocs-addons-ui";

  static properties = {
    config: { state: true },
    menuOpened: { state: true },
    selectedAddon: { state: true },
    _children: { state: true },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.config = null;
    this.menuOpened = false;

    this._children = [];
    this.selectedAddon = null;

    library.add(faArrowDown);
    library.add(faBars);

    this.iconBars = icon(faBars, {
      classes: ["icon"],
    });
    this.iconArrowDown = icon(faArrowDown, {
      classes: ["icon"],
    });
    this.iconCircleInfo = icon(faCircleInfo, {
      classes: ["icon"],
    });
  }

  loadConfig(config) {
    if (!AddonsUI.isEnabled(config)) {
      return;
    }
    this.config = config;
  }

 _onSlotChange(e) {
    const slot = e.target;
    this._children = slot.assignedElements();
    this._children.forEach(c => c.classList.add("hide"));
    if (this.selectedAddon === null) {
      this.selectedAddon = this._children[0];
      this.selectedAddon.classList.remove("hide");
    }
    this.requestUpdate(); // force re-render when new children arrive
  }

  _onAddonSelect(addon) {
    this.selectedAddon = addon;
    this._children.forEach(c => c.classList.add("hide"));
    this.selectedAddon.classList.remove("hide");
  }

  render() {
    // The element doesn't yet have our config, don't render it.
    if (this.config === null) {
      return nothing;
    }

    console.log(this.selectedAddon);

    return html`
      <div class="ui-container">
        <main>
          <div class="top-menu">
            <span class="bars" @click=${() => this.menuOpened = !this.menuOpened}>${this.iconBars.node[0]}</span>
            <!-- children’s main body goes here -->
            <div class="top-menu-content">
              <!-- ${this.selectedAddon ? this.selectedAddon.renderMain() : nothing} -->
              <slot @slotchange=${this._onSlotChange}></slot>
            </div>
          </div>
          ${!this.menuOpened ? nothing : html`
            <div class="menu">
              <div class="addon-icons">
                ${this._children.map(child => html`<div @click=${() => this._onAddonSelect(child)}>${child.renderIcon()}</div>`)}
              </div>
              <!-- children can project extra menu content here -->
              <div class="addon-specific-menu-content">
                ${this.selectedAddon ? this.selectedAddon.renderMenu() : nothing}
              </div>
            </div>`}
        </main>
      </div>
    `;
  }
}

/**
 * Addons UI
 *
 * This Addon shows a small UI element at the top to contain all the other Addons, that are included.
 *
 * @param {Object} config - Addon configuration object
 */
export class AddonsUI extends AddonBase {
  static jsonValidationURI =
    "http://v1.schemas.readthedocs.org/addons.filetreediff.json";
  static addonEnabledPath = "addons.filetreediff.enabled";
  static addonName = "Addons UI";
  static elementClass = AddonsUIElement;

  static isEnabled(config, httpStatus) {
    return (
      // The order is important since we don't even want to run the data
      // validation if the version is not external.
      // We have to use `objectPath` here becase we haven't validated the data yet.
      objectPath.get(config, "versions.current.type") === "external" &&
      super.isEnabled(config, httpStatus)
    );
  }
}

customElements.define(AddonsUIElement.elementName, AddonsUIElement);
