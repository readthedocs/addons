import { compare } from "doc-diff";

export function initializeDocDiff(config) {
  if (!config.addons.doc_diff.enabled) {
    return false;
  }

  return compare(config.addons.doc_diff);
}
