import styleSheetFlyout from "./flyout.css";
import styleSheetFiletreediff from "./filetreediff.css";
import styleSheetNotification from "./notification.css";

import { CSSResult } from "lit";

// We use a native construct here as Lit's CSSResult is largely read only.
export const defaultStyleSheet = new CSSStyleSheet();

/*
 * Specific styles based on documentation tools and themes
 *
 * Usage of `@layer` at-rule pushes this rules down a step in
 * precedence/priority. This allows a user `:root` rule to override these
 * values.
 **/
defaultStyleSheet.replaceSync(`
@layer defaults {
  :root {
    --readthedocs-font-family: Lato, proxima-nova, "Helvetica Neue", Arial, sans-serif;
    --readthedocs-font-size: 1rem;
  }

  :root[data-readthedocs-tool="mkdocs-material"] {
    --readthedocs-font-size: 0.58rem;
  }

  :root[data-readthedocs-tool="antora"] {
    --readthedocs-font-size: 0.7rem;
  }

  :root[data-readthedocs-tool="mdbook"] {
    --readthedocs-font-size: 1.3rem;
  }

  :root[data-readthedocs-tool="sphinx"][data-readthedocs-tool-theme="furo"] {
    --readthedocs-font-size: 0.725rem;
  }

  :root[data-readthedocs-tool="sphinx"][data-readthedocs-tool-theme="immaterial"] {
    --readthedocs-font-size: 0.58rem;
  }
}
`);

const styleSheets = [
  styleSheetFlyout,
  styleSheetFiletreediff,
  styleSheetNotification,
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
