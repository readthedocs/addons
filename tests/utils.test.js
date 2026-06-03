import { expect } from "@open-wc/testing";
import { getLinkWithFilename, addUtmParameters } from "../src/utils";

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

describe("addUtmParameters", () => {
  it("appends utm_source from the project slug and utm_content", () => {
    const result = addUtmParameters(
      "https://about.readthedocs.com/",
      "flyout",
      "my-project",
    );
    expect(result).to.equal(
      "https://about.readthedocs.com/?utm_source=my-project&utm_content=flyout",
    );
  });

  it("preserves existing query parameters in the URL", () => {
    const result = addUtmParameters(
      "https://about.readthedocs.com/?foo=bar",
      "search",
      "my-project",
    );
    expect(result).to.equal(
      "https://about.readthedocs.com/?foo=bar&utm_source=my-project&utm_content=search",
    );
  });

  it("uses the project slug from the config, not from the DOM", () => {
    // Regression test: the slug is passed in from the addons config
    // (``config.projects.current.slug``) instead of read from a ``<meta>`` tag,
    // so it keeps working on pages where client-side hydration rewrites the DOM
    // and removes the ``readthedocs-project-slug`` meta tag.
    const meta = document.createElement("meta");
    meta.setAttribute("name", "readthedocs-project-slug");
    meta.setAttribute("content", "dom-slug");
    document.head.append(meta);

    try {
      const result = addUtmParameters(
        "https://about.readthedocs.com/",
        "flyout",
        "config-slug",
      );
      expect(result).to.equal(
        "https://about.readthedocs.com/?utm_source=config-slug&utm_content=flyout",
      );
    } finally {
      meta.remove();
    }
  });
});
