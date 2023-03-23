import styles from "./external-version-warning.css";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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

  return new Promise((resolve, reject) => {
    document.adoptedStyleSheets.push(styles);
    library.add(faTriangleExclamation);
    library.add(faCircleXmark);

    const warning = icon(faTriangleExclamation, {
      title: "Warning",
        classes: ["warning"],
    });
    const xmark = icon(faCircleXmark, {
      title: "Close",
      classes: ["close"],
    });

    const admonition = `
<div id="readthedocs-external-version-warning">
  ${warning.html[0]}
  <p>
    This page
    <a class="reference external" href="${window.location.protocol}//${config.domains.dashboard}/projects/${config.project.slug}/builds/${config.build.id}/">was created</a>
    from a pull request
    (<a class="reference external" href="${config.project.repository_url}/pull/${config.version.slug}">#${config.version.slug}</a>)
  </p>
  ${warning.html[0]}
  ${xmark.html[0]}
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
    const close = document.querySelector(
      "#readthedocs-external-version-warning svg.close"
    );
    close.onclick = function () {
      document.querySelector(
        "#readthedocs-external-version-warning"
      ).style.display = "none";
    };
  });
}
