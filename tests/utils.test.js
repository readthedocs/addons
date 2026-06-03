import { expect } from "@open-wc/testing";
import { getLinkWithFilename } from "../src/utils";

describe("getLinkWithFilename", () => {
  it("appends resolver filename to URL", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/stable/",
      "/guides/access/index.html",
    );
    expect(result.href).to.equal(
      "https://docs.readthedocs.io/en/stable/guides/access/",
    );
  });

  it("handles /index.html filename", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/latest/",
      "/index.html",
    );
    expect(result.href).to.equal("https://docs.readthedocs.io/en/latest/");
  });

  it("handles filename without index.html", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/stable/",
      "/guides/access/setup.html",
    );
    expect(result.href).to.equal(
      "https://docs.readthedocs.io/en/stable/guides/access/setup.html",
    );
  });

  it("normalizes multiple trailing slashes on URL", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/stable///",
      "/guides/index.html",
    );
    expect(result.href).to.equal(
      "https://docs.readthedocs.io/en/stable/guides/",
    );
  });

  it("falls back to base URL when resolverFilename is null and meta tag is absent", () => {
    // Simulates React hydration wiping the Cloudflare-injected meta tag:
    // resolver.filename is null from the API and getMetadataValue returns
    // undefined, so we must not crash on .replace() and return the base URL.
    const result = getLinkWithFilename(
      "https://pyrit.readthedocs.io/0.13.0/",
      null,
    );
    expect(result.href).to.equal("https://pyrit.readthedocs.io/0.13.0/");
  });

  it("does not crash when resolverFilename is /", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/stable/",
      "/",
    );
    expect(result.href).to.equal("https://docs.readthedocs.io/en/stable/");
  });
});
