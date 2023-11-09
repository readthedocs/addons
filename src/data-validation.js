import Ajv from "ajv";

// Validator for Analytics Addon
const addons_analytics = {
  $id: "https://readthedocs.org/schemas/addons.analytics.json",
  type: "object",
  properties: {
    addons: {
      type: "object",
      properties: {
        analytics: {
          type: "object",
          properties: {
            code: { type: ["string", "null"] },
            enabled: { type: "boolean" },
          },
        },
      },
    },
    projects: {
      type: "object",
      properties: {
        current: {
          type: "object",
          properties: {
            slug: { type: "string" },
            // Optional
            language: {
              type: "object",
              properties: {
                code: { type: "string" },
              },
            },
            programming_language: {
              type: "object",
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

// Validator for EthicalAds Addon
const addons_ethicalads = {
  $id: "https://readthedocs.org/schemas/addons.ethicalads.json",
  type: "object",
  properties: {
    addons: {
      type: "object",
      properties: {
        ethicalads: {
          type: "object",
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

// Validator for Notifications Addon
const addons_notifications = {
  $id: "https://readthedocs.org/schemas/addons.notifications.json",
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
  schemas: [addons_analytics, addons_ethicalads, addons_notifications],
});

// NOTE: export the ajv object for debugging purposes only.
// window.ajv = ajv;
