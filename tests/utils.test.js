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

  it("returns undefined when url is undefined", () => {
    const result = getLinkWithFilename(undefined, "/");
    expect(result).to.be.undefined;
  });

  it("returns undefined when url is undefined and resolverFilename is a path", () => {
    const result = getLinkWithFilename(undefined, "/index.html");
    expect(result).to.be.undefined;
  });

  it("does not crash when resolverFilename is /", () => {
    const result = getLinkWithFilename(
      "https://docs.readthedocs.io/en/stable/",
      "/",
    );
    expect(result.href).to.equal("https://docs.readthedocs.io/en/stable/");
  });
});
