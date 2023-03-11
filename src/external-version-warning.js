/**
 * Inject warning informing the documentation comes from an external version (e.g. pull request)
 *
 */
export function injectExternalVersionWarning(config) {
    // TODO: make all these banners (injected HTML) templates that users can override with their own.
    // This way, we allow customization of the look&feel without compromising the logic.

    return new Promise((resolve, reject) => {
        let admonition = `
<div class="admonition warning">
  <p class="admonition-title">Warning</p>
  <p>
    This page
    <a class="reference external" href="${ window.location.protocol }//${ config.domains.dashboard }/projects/${ config.project.slug }/builds/${ config.build.id }/">was created </a>
    from a pull request
    (<a class="reference external" href="${ config.project.repository_url }/pull/${ config.version.slug }">#${ config.version.slug }</a>).
  </p>
</div>
`;

        // Allow to override the admonition template
        // if (config.features.banner.external.template) {
        //     admonition = config.features.banner.external.template;
        // }

        let main = document.querySelector('[role=main]') || document.querySelector('#main');
        let node = document.createElement("div");
        node.innerHTML = admonition;
        main.insertBefore(node, main.firstChild);
    });
}
