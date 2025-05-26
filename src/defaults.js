import styleSheetDefaults from "./defaults.css";
import styleSheetFlyout from "./flyout.css";
import styleSheetFiletreediff from "./filetreediff.css";
import styleSheetNotification from "./notification.css";
import styleSheetSearch from "./search.css";

import { CSSResult } from "lit";

// We use a native construct here as Lit's CSSResult is largely read only.
export const defaultStyleSheet = new CSSStyleSheet();

const styleSheets = [
  styleSheetDefaults,
  styleSheetFlyout,
  styleSheetFiletreediff,
  styleSheetNotification,
  styleSheetSearch,
];

for (let styleSheet of styleSheets) {
  if (styleSheet instanceof CSSResult) {
    styleSheet = styleSheet.styleSheet;
  }
  for (const rule of styleSheet.cssRules) {
    if (rule instanceof CSSLayerBlockRule && rule.name == "defaults") {
      defaultStyleSheet.insertRule(rule.cssText);
    }
  }
}
