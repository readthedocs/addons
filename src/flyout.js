import styles from "./flyout.css";

/**
   Injects the footer into the page

   There are 2 main cases:
   * EXPLICIT_FLYOUT_PLACEMENT_SELECTOR is defined, inject it there
   * `div.rst-other-versions` is defined (theme that looks like Read the Docs)
   * All other pages just get it appended to the <body>
*/
export function injectFlyout(config) {
    // Inject our styles for the flyout
    document.adoptedStyleSheets.push(styles);

    const languageTemplate = (translation) =>
          `
<dd class="rtd-current-item">
  <a href="${translation.name}">${translation.code}</a>
</dd>
`;
    const versionTemplate = (version) =>
          `
<dd>
  <a href="${version.url}">${version.slug}</a>
</dd>
`;
    const downloadTemplate = (download) =>
          `
<dd>
  <a href="${download.url}">${download.slug}</a>
</dd>
`;

    function get_languages(config) {
        if (config.features.flyout.translations.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Languages</dt>`
        ];
        for (const language of config.features.flyout.translations) {
            result.push(languageTemplate(language));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    function get_versions(config) {
        if (config.features.flyout.versions.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Versions</dt>`
        ];
        for (const version of config.features.flyout.versions) {
            result.push(versionTemplate(version));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    function get_downloads(config) {
        if (config.features.flyout.downloads.length === 0) {
            return "";
        }

        let result = [
            // TODO: how do we handle translations here?
            `<dl><dt>Downloads</dt>`
        ];
        for (const download of config.features.flyout.downloads) {
            result.push(downloadTemplate(download));
        }
        result.push(`</dl>`);
        return result.join("");
    }

    const template = `
<div class="injected">
   <div class="rst-versions rst-badge shift-down" data-toggle="rst-versions">
      <span class="rst-current-version" data-toggle="rst-current-version">
      <span class="fa fa-book">&nbsp;</span>
      v: ${config.version.slug}
      <span class="fa fa-caret-down"></span>
      </span>
      <div class="rst-other-versions">
         ${get_languages(config)}

         ${get_versions(config)}

         ${get_downloads(config)}

         <dl>
            <dt>On Read the Docs</dt>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/">Project Home</a>
            </dd>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/builds/">Builds</a>
            </dd>
            <dd>
               <a href="//${config.domains.dashboard}/projects/${config.project.slug}/downloads/">Downloads</a>
            </dd>
         </dl>

         <dl>
            <dt>On GitHub</dt>
            <dd>
               <a href="${config.features.flyout.vcs.url}/${config.features.flyout.vcs.username}/${config.features.flyout.vcs.repository}/blob/${config.features.flyout.vcs.branch}/${config.features.flyout.vcs.filepath}">View</a>
            </dd>
            <dd>
               <a href="${config.features.flyout.vcs.url}/${config.features.flyout.vcs.username}/${config.features.flyout.vcs.repository}/edit/${config.features.flyout.vcs.branch}/${config.features.flyout.vcs.filepath}">Edit</a>
            </dd>
         </dl>

         <dl>
            <dt>Search</dt>
            <dd>
               <div style="padding: 6px;">
                  <form id="flyout-search-form" class="wy-form" target="_blank" action="//${config.domains.dashboard}/projects/${config.project.slug}/search/" method="get">
                     <input type="text" name="q" aria-label="Search docs" placeholder="Search docs">
                  </form>
               </div>
            </dd>
         </dl>

         <hr>
         <small>
         <span>Hosted by <a href="${config.domains.dashboard}">Read the Docs</a></span>
         <span> &middot; </span>
         <a href="https://docs.readthedocs.io/page/privacy-policy.html">Privacy Policy</a>
         </small>
      </div>
   </div>
</div>
`;

    // Default placement for the flyout
    const EXPLICIT_FLYOUT_PLACEMENT_SELECTOR = "#readthedocs-embed-flyout";
    const placements = [
        EXPLICIT_FLYOUT_PLACEMENT_SELECTOR,
        // NOTE: avoid integrating it with Sphinx themes because we need more CSS work for this
        // "div.rst-other-versions",
    ];

    for (const query_selector of placements) {
        let placement = document.querySelector(query_selector);
        if (placement !== null) {
            // TODO: does it make sense to implement a new flyout endpoint as suggested in
            // https://github.com/readthedocs/readthedocs.org/pull/8052
            placement.innerHTML = template;
            return;
        }
    }

    document.body.insertAdjacentHTML("beforeend", template);
};

/**
   Track clicks on flyout.
*/
export function trackFlyoutEvents(config) {
    // TODO: `div.injected` is not the best selector.
    // We should probably change it to use `EXPLICIT_FLYOUT_PLACEMENT_SELECTOR`
    const flyout = document.querySelector("[data-toggle='rst-current-version']");

    if (flyout != null) {
        flyout.addEventListener('click', function () {
            const state = document.querySelector("[data-toggle='rst-versions']").classList.contains("shift-up") ? 'was_open' : 'was_closed';

            // Only report back if analytics is enabled
            if (typeof window.ga !== 'undefined') {
                window.ga('rtfd.send', 'event', 'Flyout', 'Click', state);
            };
        });
    };
}
