export function isReadTheDocsEmbedPresent() {
  const url = "/_/static/javascript/readthedocs-doc-embed.js";
  return document.querySelectorAll(`script[src="${url}"]`).length > 0;
}

export const domReady = new Promise((resolve) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    return resolve();
  } else {
    // Deduplicate DOM complete events
    let is_loaded = false;
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        if (!is_loaded) {
          resolve();
        }
        is_loaded = true; 
      },
      {
        capture: true,
        once: true,
        passive: true,
      }
    );
  }
});

/**
  * Addon base class
  *
  * Provides a common interface for addon configuration testing, customization,
  * and loading.
  */
export class AddonBase {
  static isEnabled() {
    return false;
  }
}
