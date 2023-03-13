// Register page view.
export function registerPageView(config) {
    const params = {
        project: config.project.slug,
        version: config.version.slug,
        absolute_uri: window.location.href,
    };

    const url = "/_" + '/api/v2/analytics/?' + new URLSearchParams(params).toString();
    fetch(url, {method: 'GET', cache: 'no-store'})
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }
        })
        .catch(error => {
            console.error('Error registering page view');
        });
};
