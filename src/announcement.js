import { AddonBase } from "./utils";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import styleSheet from "./announcement.css";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { html, nothing, LitElement } from "lit";

export class AnnouncementElement extends LitElement {
  static elementName = "readthedocs-announcement";

  static properties = {
    config: {
      state: true,
    },
    enabled: {
      type: Boolean,
    },
  };

  static styles = styleSheet;

  constructor() {
    super();

    this.content = undefined;
  }

  loadConfig(config) {
    this.config = config;
    this.content =
      this.config.addons.announcement.versions[
        this.config.versions.current.slug
      ] || this.config.addons.announcement.versions.all.content;
  }

  render() {
    library.add(faCircleXmark);
    const xmark = icon(faCircleXmark, {
      title: "Close announcement",
    });

    return html`<div>
      <p>${unsafeHTML(this.content)}</p>
      <a href="#" class="icon" @click=${this.closeAnnouncement}>
        ${xmark.node[0]}
      </a>
    </div>`;
  }

  closeAnnouncement(e) {
    this.remove();
    // Avoid event propagation
    return false;
  }
}

export class AnnouncementAddon extends AddonBase {
  constructor(config) {
    super();

    customElements.define("readthedocs-announcement", AnnouncementElement);
    let elems = document.querySelectorAll("readthedocs-announcement");
    if (!elems.length) {
      elems = [new AnnouncementElement()];
      document.body.append(elems[0]);
      elems[0].requestUpdate();
    }

    for (const elem of elems) {
      elem.loadConfig(config);
    }
  }

  static isEnabled(config) {
    return config.addons && config.addons.announcement.enabled;
  }
}
