import styleSheetDefaults from "./defaults.css";
import styleSheetFlyout from "./flyout.css";
import styleSheetFlyoutV2 from "./flyout-v2.css";
import styleSheetFiletreediff from "./filetreediff.css";
import styleSheetFiletreediffPanel from "./filetreediff-panel.css";
import styleSheetNotification from "./notification.css";
import styleSheetSearch from "./search.css";
import styleSheetSearchPanel from "./search-panel.css";

import { CSSResult } from "lit";

// We use a native construct here as Lit's CSSResult is largely read only.
export const defaultStyleSheet = new CSSStyleSheet();

const styleSheets = [
  styleSheetDefaults,
  styleSheetFlyout,
  styleSheetFlyoutV2,
  styleSheetFiletreediff,
  styleSheetFiletreediffPanel,
  styleSheetNotification,
  styleSheetSearch,
  styleSheetSearchPanel,
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
