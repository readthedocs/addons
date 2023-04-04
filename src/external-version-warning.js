import styles from "./external-version-warning.css";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

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
    // BUG resolve, reject are never called in this function
    document.adoptedStyleSheets.push(styles);
    library.add(faCircleXmark);

    const xmark = icon(faCircleXmark, {
      title: "Close",
      classes: ["close-icon"],
    });
    const elem_xmark = xmark.node[0];

    // Attach click event directly, not through jQuery
    // TODO this does not play well with HTML templates as strings yet
    elem_xmark.onclick = function () {
      adominition.style.display = "none";
    };

    // TODO the URLs here should come from a backend API, instead of manually
    // created here.
    // TODO the pull request URL likely
    const admonition = `
<div class="readthedocs-banner version-warning">
  <div class="title">
    Warning
    <div class="right">
      ${elem_xmark.outerHTML}
    </div>
  </div>
  <p>
    This page
    <a href="${window.location.protocol}//${config.domains.dashboard}/projects/${config.project.slug}/builds/${config.build.id}/">was created</a>
    from a pull request
    (<a href="${config.project.repository_url}/pull/${config.version.slug}">#${config.version.slug}</a>).
  </p>
</div>
`;

    // Allow to override the admonition template
    // if (config.features.banner.external.template) {
    //     admonition = config.features.banner.external.template;
    // }

    document.body.insertAdjacentHTML("beforeend", admonition);
  });
}
