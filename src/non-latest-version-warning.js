// We cannot use named imports for this module
// https://stackoverflow.com/a/64553998/2187091
import maxSatisfying from "semver/ranges/max-satisfying";

/**
 * Inject a warning informing the documentation is not the latest.
 *
 */
export function injectNonLatestVersionWarning(config) {
    const highest = maxSatisfying(config.features.non_latest_version_warning.versions, '0.0.0');
    console.log(config.features.non_latest_version_warning.versions);
    console.log(highest);

    if (highest && highest !== config.version.slug) {
        let admonition = `
<div class="admonition warning">
  <p class="admonition-title">Warning</p>
  <p>
    This page documents version
    <a class="reference" href="${ window.location.protocol }//${ window.location.hostname }/${ config.project.language }/${ config.version.slug }/">${ config.version.slug }</a>.
    The latest version is
    <a class="reference" href="${ window.location.protocol }//${ window.location.hostname }/${ config.project.language }/${ config.version.slug }/">${ config.version.slug }</a>.
  </p>
</div>
`;

        // Borrowed and adapted from:
        // https://github.com/readthedocs/readthedocs.org/blob/7ce98a4d4f34a4c1845dc6e3e0e5112af7c39b0c/readthedocs/core/static-src/core/js/doc-embed/version-compare.js#L1
        let main = document.querySelector(config.features.non_latest_version_warning.query_selector);
        let node = document.createElement("div");
        node.innerHTML = admonition;
        main.insertBefore(node, main.firstChild);
    }
}
