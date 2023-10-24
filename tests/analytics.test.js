import { expect, assert, fixture, html } from "@open-wc/testing";
import { AnalyticsAddon } from "../src/analytics";

describe("Analytics addon", () => {
  it("is disabled by default", () => {
    expect(
      AnalyticsAddon.isEnabled({
        addons: {
          analytics: {},
        },
      }),
    ).to.be.false;
  });

  it("is enabled with configuration", () => {
    expect(
      AnalyticsAddon.isEnabled({
        projects: {
          current: {
            slug: "project-slug",
          },
        },
        versions: {
          current: {
            slug: "version-slug",
          },
        },
        addons: {
          analytics: {
            enabled: true,
          },
        },
      }),
    ).to.be.true;
  });
});
