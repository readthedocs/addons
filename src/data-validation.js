import Ajv from "ajv";

// Validator for Analytics Addon
const addons_analytics = {
  $id: "http://v1.schemas.readthedocs.org/addons.analytics.json",
  type: "object",
  required: ["addons", "projects", "versions"],
  properties: {
    addons: {
      type: "object",
      required: ["analytics"],
      properties: {
        analytics: {
          type: "object",
          required: ["code", "enabled"],
          properties: {
            code: { type: ["string", "null"] },
            enabled: { type: "boolean" },
          },
        },
      },
    },
    projects: {
      type: "object",
      required: ["current"],
      properties: {
        current: {
          type: "object",
          required: ["slug", "language", "programming_language"],
          properties: {
            slug: { type: "string" },
            // Optional
            language: {
              type: "object",
              required: ["code"],
              properties: {
                code: { type: "string" },
              },
            },
            programming_language: {
              type: "object",
              required: ["code"],
              properties: {
                code: { type: "string" },
              },
            },
          },
        },
      },
    },
    versions: {
      type: "object",
      required: ["current"],
      properties: {
        current: {
          type: "object",
          required: ["slug"],
          properties: {
            slug: { type: "string" },
          },
        },
      },
    },
  },
};

// Validator for DocDiff Addon
const addons_docdiff = {
  $id: "http://v1.schemas.readthedocs.org/addons.docdiff.json",
  type: "object",
  required: ["addons"],
  properties: {
    addons: {
      type: "object",
      required: ["doc_diff"],
      properties: {
        doc_diff: {
          type: "object",
          required: ["base_url", "enabled"],
          properties: {
            base_url: { type: "string" },
            enabled: { type: "boolean" },
          },
        },
      },
    },
  },
};

// Validator for EthicalAds Addon
const addons_ethicalads = {
  $id: "http://v1.schemas.readthedocs.org/addons.ethicalads.json",
  type: "object",
  required: ["addons"],
  properties: {
    addons: {
      type: "object",
      required: ["ethicalads"],
      properties: {
        ethicalads: {
          type: "object",
          required: [
            "ad_free",
            "campaign_types",
            "enabled",
            "keywords",
            "publisher",
          ],
          properties: {
            ad_free: { type: "boolean" },
            campaign_types: { type: "array" },
            enabled: { type: "boolean" },
            keywords: { type: "array" },
            publisher: { type: "string" },
          },
        },
      },
    },
  },
};

// Validator for Flyout Addon
const addons_flyout = {
  $id: "http://v1.schemas.readthedocs.org/addons.flyout.json",
  type: "object",
  required: ["addons"],
  properties: {
    addons: {
      type: "object",
      required: ["flyout"],
      properties: {
        flyout: {
          type: "object",
          required: [
            "enabled",
            "downloads",
            "translations",
            "versions",
            // TODO: make it required when we support VCS links
            // "vcs",
          ],
          properties: {
            enabled: { type: "boolean" },
            downloads: { type: "array" },
            translations: { type: "array" },
            versions: { type: "array" },
            vcs: {
              type: "object",
              properties: {
                view_url: { type: "string" },
              },
            },
          },
        },
      },
    },
    domains: {
      type: "object",
      properties: {
        dashboard: { type: "string" },
      },
    },
    projects: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            slug: { type: "string" },
            single_version: { type: "boolean" },
          },
        },
      },
    },
    versions: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            slug: { type: "string" },
          },
        },
      },
    },
  },
};

// Validator for Notifications Addon
const addons_notifications = {
  $id: "http://v1.schemas.readthedocs.org/addons.notifications.json",
  type: "object",
  properties: {
    addons: {
      type: "object",
      properties: {
        external_version_warning: {
          type: "object",
          properties: {
            enabled: { type: "boolean" },
          },
        },
        non_latest_version_warning: {
          type: "object",
          properties: {
            enabled: { type: "boolean" },
            versions: { type: "array" },
          },
        },
      },
    },
    builds: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
    domains: {
      type: "object",
      properties: {
        dashboard: { type: "string" },
      },
    },
    projects: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            slug: { type: "string" },
            single_version: { type: "boolean" },
            // TODO: use ajv-formats URI type
            repository_url: { type: "string" },
          },
        },
      },
    },
    versions: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            slug: { type: "string" },
            type: { enum: ["internal", "external"] },
          },
        },
      },
    },
  },
};

export const ajv = new Ajv({
  allErrors: true,
  schemas: [
    addons_analytics,
    addons_docdiff,
    addons_ethicalads,
    addons_flyout,
    addons_notifications,
  ],
});

// NOTE: export the ajv object for debugging purposes only.
// window.ajv = ajv;
