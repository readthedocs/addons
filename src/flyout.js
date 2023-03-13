/**
   Injects the footer into the page

   There are 2 main cases:
   * EXPLICIT_FLYOUT_PLACEMENT_SELECTOR is defined, inject it there
   * `div.rst-other-versions` is defined (theme that looks like Read the Docs)
   * All other pages just get it appended to the <body>
*/
export function injectFlyout(config) {
    // Default placement for the flyout
    const EXPLICIT_FLYOUT_PLACEMENT_SELECTOR = '#readthedocs-embed-flyout';

    const params = {
        project: config.project.slug,
        version: config.version.slug,
        page: "",
        theme: "",
        docroot: "",
        source_suffix: "",
        subproject: false,
    };
    const flyout_url = "/_" + "/api/v2/footer_html/?" + new URLSearchParams(params).toString();
    fetch(flyout_url, {method: 'GET'})
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then(flyout => {
            // Placement for the flyout
            const placements = [
                EXPLICIT_FLYOUT_PLACEMENT_SELECTOR,
                'div.rst-other-versions',
            ];

            for (const query_selector of placements) {
                let placement = document.querySelector(query_selector);
                if (placement !== null) {
                    // TODO: does it make sense to implement a new flyout endpoint as suggested in
                    // https://github.com/readthedocs/readthedocs.org/pull/8052
                    placement.innerHTML = flyout['html'];
                    return;
                }
            }

            document.body.insertAdjacentHTML('beforeend', flyout);
        })
        .catch(error => {
            console.error('Error injecting the flyout');
        });
};
