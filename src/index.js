import { injectExternalVersionWarning } from "./external-version-warning";

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
                return getReadTheDocsData();
            })
            .then((config) => {
                return injectExternalVersionWarning();
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
