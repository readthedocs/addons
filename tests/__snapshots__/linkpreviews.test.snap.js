/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Link previews tests trigger mouseenter event to show tooltip"] = 
`<div
  class="tooltip"
  data-linkpreview-href="http://localhost:8000/link.html"
  style="display: flex; left: 10px; top: 35px;"
>
  <div class="tooltip-content">
    <section>
      <h1>
        Title
      </h1>
      <p>
        Paragraph
      </p>
    </section>
  </div>
  <div
    class="arrow"
    style="left: 103.102px; top: -4px;"
  >
  </div>
</div>
`;
/* end snapshot Link previews tests trigger mouseenter event to show tooltip */

snapshots["Link previews tests trigger mouseenter event without response to show Loading... tooltip"] = 
`<div
  class="tooltip"
  data-linkpreview-href="http://localhost:8000/link.html"
  style="display: none;"
>
  <div class="tooltip-content">
    Loading...
  </div>
  <div class="arrow">
  </div>
</div>
`;
/* end snapshot Link previews tests trigger mouseenter event without response to show Loading... tooltip */

