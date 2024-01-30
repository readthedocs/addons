import { expect, assert, fixture, html } from "@open-wc/testing";
import { AnalyticsAddon } from "../src/analytics";

describe("Analytics addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      AnalyticsAddon.isEnabled({
        addons: {
          analytics: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled", () => {
    expect(
      AnalyticsAddon.isEnabled({
        addons: {
          analytics: {
            enabled: false,
            code: null,
          },
        },
        projects: {
          current: {
            slug: "project",
            language: {
              code: "es",
            },
            programming_language: {
              code: "py",
            },
          },
        },
        versions: {
          current: {
            slug: "project",
            type: "branch",
          },
        },
      }),
    ).to.be.false;
  });

  it("valid data and enabled", () => {
    expect(
      AnalyticsAddon.isEnabled({
        addons: {
          analytics: {
            enabled: true,
            code: "UA-12345",
          },
        },
        projects: {
          current: {
            slug: "project",
            language: {
              code: "es",
            },
            programming_language: {
              code: "py",
            },
          },
        },
        versions: {
          current: {
            slug: "project",
            type: "branch",
          },
        },
      }),
    ).to.be.true;
  });
});
