import { compare } from "doc-diff";

export function initializeDocDiff(config) {
  if (!config.features.doc_diff.enabled) {
    return false;
  }

  return compare(config.features.doc_diff);
}
