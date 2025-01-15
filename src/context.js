import {
  ContextProvider,
  ContextRoot,
  createContext,
} from "@lit/context";
import { EVENT_READTHEDOCS_ADDONS_DATA_READY } from "./events";

export const contextRoot = new ContextRoot().attach(document.body);
export const configContext = createContext(Symbol("readthedocs-config"));

/**
 * Because `config` provider is not attached to a ReactiveElement, and is
 * instead connected to `document.html`, we have to call `hostConnected()`
 * manually. See:
 *
 * https://github.com/lit/lit/blob/935697d47e62ed75e3157423400163a8371c62fc/packages/context/src/lib/controllers/context-provider.ts#L55-L58
 **/
const config = new ContextProvider(document.documentElement, {
  context: configContext,
});
config.hostConnected();

document.addEventListener(EVENT_READTHEDOCS_ADDONS_DATA_READY, (event) => {
  console.log("Event:", EVENT_READTHEDOCS_ADDONS_DATA_READY);
  config.setValue(event.detail.data());
});
