import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { html, render } from "lit";

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

  return new Promise((resolve, reject) => {
    // BUG resolve, reject are never called in this function
    document.adoptedStyleSheets.push(styles);
    library.add(faCircleXmark);

    let admonition;

    const xmark = icon(faCircleXmark, {
      title: "Close",
      classes: ["close-icon"],
    });
    const clickClose = (event) => {
      // Remove the event the event listener was added on
      event.currentTarget.remove();
    };

    // TODO the URLs here should come from a backend API, instead of manually
    // created here.
    admonition = html`
      <div class="readthedocs-banner version-warning" @click=${clickClose}>
        <div class="title">
          Warning
          <div class="right">${xmark.node[0]}</div>
        </div>
        <p>
          This page
          <a
            href="${window.location.protocol}//${config.domains
              .dashboard}/projects/${config.project.slug}/builds/${config.build
              .id}/"
            >was created</a
          >
          from a pull request (<a
            href="${config.project.repository_url}/pull/${config.version.slug}"
            >#${config.version.slug}</a
          >).
        </p>
      </div>
    `;

    // Allow to override the admonition template
    // if (config.features.banner.external.template) {
    //     admonition = config.features.banner.external.template;
    // }

    try {
      render(admonition, document.body);
      resolve();
    } catch {
      reject();
    }
  });
}
