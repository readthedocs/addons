import packagejson from "../package.json";

export function isReadTheDocsEmbedPresent() {
  const urls = [
    "/_/static/javascript/readthedocs-doc-embed.js",
    "https://assets.readthedocs.org/static/javascript/readthedocs-doc-embed.js",
  ];
  for (const url of urls) {
    return document.querySelectorAll(`script[src="${url}"]`).length > 0;
  }
}

export const CLIENT_VERSION = packagejson.version;

export const domReady = new Promise((resolve) => {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    return resolve();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        resolve();
      },
      {
        capture: true,
        once: true,
        passive: true,
      }
    );
  }
  return undefined;
});
