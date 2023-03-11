/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsData() {
    return fetch("/_/readthedocs-config.json", {method: 'GET'})
    .then(response => {
        if (!response.ok) {
            console.debug("Error parsing configuration data");
            return undefined;
        }
        return response.json();
    });
}
