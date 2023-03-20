/**
 * Load Read the Docs configuration from API endpoint.
 *
 */
export function getReadTheDocsConfig() {
    const url = "/_/readthedocs-config/?" + new URLSearchParams({
        url: window.location.href,
    });
  return fetch(url, { method: "GET" }).then(
    (response) => {
      if (!response.ok) {
        console.debug("Error parsing configuration data");
        return undefined;
      }
      return response.json();
    }
  );
}
