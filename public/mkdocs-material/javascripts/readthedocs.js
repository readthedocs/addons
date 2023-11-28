// NOTE: this is auto-injected by Read the Docs when serving the files.
const metaApiVersion = document.createElement("meta");
metaApiVersion.setAttribute("name", "readthedocs-addons-api-version");
metaApiVersion.setAttribute("content", "0");
document.head.append(metaApiVersion);

const metaProject = document.createElement("meta");
metaProject.setAttribute("name", "readthedocs-project-slug");
metaProject.setAttribute("content", "project");
document.head.append(metaProject);

const metaVersion = document.createElement("meta");
metaVersion.setAttribute("name", "readthedocs-version-slug");
metaVersion.setAttribute("content", "latest");
document.head.append(metaVersion);

document.addEventListener("DOMContentLoaded", function(event) {
  // Trigger Read the Docs' search addon instead of Material MkDocs default
  document.querySelector(".md-search__input").addEventListener("focus", (e) => {
    const event = new CustomEvent("readthedocs-search-show");
    document.dispatchEvent(event);
  });
});


// Use CustomEvent to generate the version selector
// https://github.com/readthedocs/sphinx_rtd_theme/pull/1526/
document.addEventListener(
        "readthedocs-addons-data-ready",
        function (event) {
          const versioning = `
<div class="md-version">
  <button class="md-version__current" aria-label="Select version">
    ${event.detail.versions.current.slug}
  </button>

  <ul class="md-version__list">
  ${ event.detail.addons.flyout.versions.map(
    (version) => `
    <li class="md-version__item">
      <a href="${ version.url }" class="md-version__link">
        ${ version.slug }
      </a>
            </li>`).join("\n")}
  </ul>
</div>`;

          document.querySelector(".md-header__topic").insertAdjacentHTML("beforeend", versioning);
 });
