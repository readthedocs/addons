import styles from "./external-version-warning.css";

/**
 * Inject a warning informing the documentation comes from an external version (e.g. pull request)
 *
 */
export function injectExternalVersionWarning(config) {
  // TODO: make all these banners (injected HTML) templates that users can override with their own.
  // This way, we allow customization of the look&feel without compromising the logic.
  if (
    !config.features.external_version_warning.enabled ||
    !config.version.external
  ) {
    return false;
  }
  document.adoptedStyleSheets.push(styles);

  return new Promise((resolve, reject) => {
    let admonition = `
<div id="readthedocs-external-version-warning">
  <p>
    This page
    <a class="reference external" href="${window.location.protocol}//${config.domains.dashboard}/projects/${config.project.slug}/builds/${config.build.id}/">was created </a>
    from a pull request
    (<a class="reference external" href="${config.project.repository_url}/pull/${config.version.slug}">#${config.version.slug}</a>).
  </p>
  <i class="close icon"></i>
</div>
`;

    // Allow to override the admonition template
    // if (config.features.banner.external.template) {
    //     admonition = config.features.banner.external.template;
    // }

    let node = document.createElement("div");
    node.innerHTML = admonition;
    document.body.append(node);

    // Connect the X to close the banner
    const close = document.querySelector("#readthedocs-external-version-warning i.close");
      close.onclick = function() {
        document.querySelector("#readthedocs-external-version-warning").style.display = "none";
      };
  });
}
