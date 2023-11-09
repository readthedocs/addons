import Ajv from "ajv";

// Validator for Analytics Addon
const addons_analytics = {
  $id: "https://readthedocs.org/schemas/addons.analytics.json",
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

// Validator for EthicalAds Addon
const addons_ethicalads = {
  $id: "https://readthedocs.org/schemas/addons.ethicalads.json",
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
