import { html, nothing, render, LitElement } from "lit";
import { ContextProvider } from "@lit/context";
import { createContext } from "@lit/context";
import { getReadTheDocsConfig } from "./readthedocs-config.js";
import { EVENT_READTHEDOCS_ADDONS_DATA_READY } from "./events";

export const configContext = createContext(Symbol("readthedocs-config"));

export class AddonsApp extends LitElement {
  config = new ContextProvider(this, { context: configContext });

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      EVENT_READTHEDOCS_ADDONS_DATA_READY,
      this._handleAddonsDataReady,
    );
  }

  createRenderRoot() {
    return this;
  }

  _handleAddonsDataReady = (event) => {
    console.log("_handleAddonsDataReady");
    this.config.setValue(event.detail.data());
  };
}

customElements.define("readthedocs-context", AddonsApp);
