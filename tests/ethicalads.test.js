import { expect, assert, fixture, html } from "@open-wc/testing";
import { EthicalAdsAddon } from "../src/ethicalads";

describe("EthicalAds addon", () => {
  it("invalid configuration disables the addon", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled with valid data", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: false,
            ad_free: false,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.false;
  });

  it("is enabled with valid data", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
            ad_free: false,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.true;
  });

  it("is disabled when ad-free", () => {
    expect(
      EthicalAdsAddon.isEnabled({
        addons: {
          ethicalads: {
            enabled: true,
            ad_free: true,
            campaign_types: ["community", "paid"],
            keywords: ["docs", "data-science"],
            publisher: "readthedocs",
          },
        },
      }),
    ).to.be.false;
  });

  it("is disabled on 404 pages", () => {
    expect(
      EthicalAdsAddon.isEnabled(
        {
          addons: {
            ethicalads: {
              enabled: true,
              ad_free: false,
              campaign_types: ["community", "paid"],
              keywords: ["docs", "data-science"],
              publisher: "readthedocs",
            },
          },
        },
        404,
      ),
    ).to.be.false;
  });
});

describe("EthicalAds secondary sidebar detection", () => {
  const isVisible = (element) =>
    EthicalAdsAddon.prototype.isSecondarySidebarVisible(element);

  it("returns false when the element is missing", () => {
    expect(isVisible(null)).to.be.false;
  });

  it("returns false when the element is not rendered", async () => {
    const el = await fixture(html`
      <div>
        <main
          style="position: absolute; left: 0; top: 0; width: 300px; height: 200px"
        ></main>
        <div id="toc" style="display: none">On this page</div>
      </div>
    `);
    expect(isVisible(el.querySelector("#toc"))).to.be.false;
  });

  it("returns true for a fixed full-width column (Starlight)", async () => {
    // Starlight renders the right sidebar as ``position: fixed; width: 100%``
    // so its right edge always extends past the viewport.
    const el = await fixture(html`
      <div>
        <main
          style="position: absolute; left: 0; top: 0; width: 300px; height: 200px"
        ></main>
        <div
          style="position: fixed; top: 0; left: 400px; width: 100%; height: 200px"
        >
          <div id="toc">On this page</div>
        </div>
      </div>
    `);
    expect(isVisible(el.querySelector("#toc"))).to.be.true;
  });

  it("returns true for a column inside the root element (pydata)", async () => {
    // pydata renders ``.bd-sidebar-secondary`` inside ``[role=main]``.
    const el = await fixture(html`
      <main
        style="position: absolute; left: 0; top: 0; width: 600px; height: 200px"
      >
        <div
          id="toc"
          style="position: absolute; left: 400px; top: 0; width: 150px; height: 100px"
        >
          On this page
        </div>
      </main>
    `);
    expect(isVisible(el.querySelector("#toc"))).to.be.true;
  });

  it("returns false for a column that is not to the right of the content", async () => {
    const el = await fixture(html`
      <div>
        <main
          style="position: absolute; left: 300px; top: 0; width: 300px; height: 200px"
        ></main>
        <div
          id="toc"
          style="position: absolute; left: 0; top: 0; width: 150px; height: 100px"
        >
          On this page
        </div>
      </div>
    `);
    expect(isVisible(el.querySelector("#toc"))).to.be.false;
  });
});
