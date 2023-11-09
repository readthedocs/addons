import Ajv from "ajv";

const schema = {
  $id: "https://readthedocs.org/schemas/response.json",
  title: "Read the Docs Addons.",
  description: "Read the Docs Addons API response",
  type: "object",
  properties: {
    addons: { $ref: "https://readthedocs.org/schemas/addons.json" },
    api_version: { type: "string" },
    builds: { $ref: "https://readthedocs.org/schemas/builds.json" },
    comment: { type: "string" },
    domains: { $ref: "https://readthedocs.org/schemas/domains.json" },
    extras: { type: "object" },
    projects: { $ref: "https://readthedocs.org/schemas/projects.json" },
    readthedocs: { $ref: "https://readthedocs.org/schemas/readthedocs.json" },
    versions: { $ref: "https://readthedocs.org/schemas/versions.json" },
  },
  required: [
    "addons",
    "api_version",
    "builds",
    "comment",
    "domains",
    // "extras",
    "projects",
    "readthedocs",
    "versions",
  ],
  additionalProperties: false,
};

const addons = {
  $id: "https://readthedocs.org/schemas/addons.json",
  type: "object",
  properties: {
    analytics: { $ref: "addons.analytics.json" },
    ethicalads: { $ref: "addons.ethicalads.json" },
  },
  // FIXME: remove allow additional properties after defining the schema completely
  additionalProperties: true,
};

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

const builds = {
  $id: "https://readthedocs.org/schemas/builds.json",
  type: "object",
  additionalProperties: true,
};

const domains = {
  $id: "https://readthedocs.org/schemas/domains.json",
  type: "object",
  additionalProperties: true,
};

const projects = {
  $id: "https://readthedocs.org/schemas/projects.json",
  type: "object",
  additionalProperties: true,
};

const readthedocs = {
  $id: "https://readthedocs.org/schemas/readthedocs.json",
  type: "object",
  additionalProperties: true,
};

const versions = {
  $id: "https://readthedocs.org/schemas/versions.json",
  type: "object",
  additionalProperties: true,
};

export const ajv = new Ajv({
  allErrors: true,
  schemas: [
    schema,
    addons,
    addons_analytics,
    addons_ethicalads,
    builds,
    domains,
    projects,
    readthedocs,
    versions,
  ],
});

// NOTE: export the ajv object for debugging purposes only.
// window.ajv = ajv;
