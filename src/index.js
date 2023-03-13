import { getReadTheDocsConfig } from "./readthedocs-config";
import { injectExternalVersionWarning } from "./external-version-warning";
import { injectNonLatestVersionWarning } from "./non-latest-version-warning";

function setup() {
    const is_loaded = new Promise((resolve) => {
        if (
            document.readyState === "interactive" ||
                document.readyState === "complete"
        ) {
            return resolve();
        } else {
            document.addEventListener(
                "DOMContentLoaded",
                () => {
                    resolve();
                },
                {
                    capture: true,
                    once: true,
                    passive: true,
                }
            );
        };
        return undefined;
    });

    return new Promise((resolve) => {
        is_loaded
            .then(() => {
                return getReadTheDocsConfig();
            })
            .then((config) => {
                let promises = [];
                if (config.features.non_latest_version_warning.enabled && !config.version.external) {
                    promises.push(injectNonLatestVersionWarning(config));
                };

                if (config.features.external_version_warning.enabled && config.version.external) {
                    promises.push(injectExternalVersionWarning(config));
                };
                return Promise.all(promises);
            })
            .then(() => {
                resolve();
            })
            .catch((err) => {
                console.error(err.message);
            });
    });
}

setup();
