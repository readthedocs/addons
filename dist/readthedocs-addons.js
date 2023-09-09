(() => {
  var t = {
      794: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => l });
        var r = n(537),
          i = n.n(r),
          o = n(645),
          a = n.n(o)()(i());
        a.push([
          t.id,
          '/* Example copied from */\n/* https://www.w3schools.com/howto/howto_css_switch.asp */\n\n/* The switch - the box around the slider */\n:host .switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n:host .switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n:host .slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n:host .slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n:host input:checked + .slider {\n  background-color: #2196f3;\n}\n\n:host input:focus + .slider {\n  box-shadow: 0 0 1px #2196f3;\n}\n\n:host input:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n:host .slider.round {\n  border-radius: 34px;\n}\n\n:host .slider.round:before {\n  border-radius: 50%;\n}\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/docdiff.css"],
            names: [],
            mappings:
              "AAAA,wBAAwB;AACxB,yDAAyD;;AAEzD,2CAA2C;AAC3C;EACE,kBAAkB;EAClB,qBAAqB;EACrB,WAAW;EACX,YAAY;AACd;;AAEA,+BAA+B;AAC/B;EACE,UAAU;EACV,QAAQ;EACR,SAAS;AACX;;AAEA,eAAe;AACf;EACE,kBAAkB;EAClB,eAAe;EACf,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,sBAAsB;EACtB,wBAAwB;EACxB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,WAAW;EACX,SAAS;EACT,WAAW;EACX,uBAAuB;EACvB,wBAAwB;EACxB,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,mCAAmC;EACnC,+BAA+B;EAC/B,2BAA2B;AAC7B;;AAEA,oBAAoB;AACpB;EACE,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB",
            sourcesContent: [
              '/* Example copied from */\n/* https://www.w3schools.com/howto/howto_css_switch.asp */\n\n/* The switch - the box around the slider */\n:host .switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n:host .switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n/* The slider */\n:host .slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n:host .slider:before {\n  position: absolute;\n  content: "";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n:host input:checked + .slider {\n  background-color: #2196f3;\n}\n\n:host input:focus + .slider {\n  box-shadow: 0 0 1px #2196f3;\n}\n\n:host input:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n:host .slider.round {\n  border-radius: 34px;\n}\n\n:host .slider.round:before {\n  border-radius: 50%;\n}\n',
            ],
            sourceRoot: "",
          },
        ]);
        var s = new CSSStyleSheet();
        s.replaceSync(a.toString());
        const l = s;
      },
      111: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => l });
        var r = n(537),
          i = n.n(r),
          o = n(645),
          a = n.n(o)()(i());
        a.push([
          t.id,
          ".doc-diff-added {\n  background-color: rgb(171, 242, 188);\n  text-decoration: none;\n}\n\n.doc-diff-modified {\n}\n\n.doc-diff-removed {\n  background-color: rgba(255, 129, 130, 0.4);\n  text-decoration: none;\n}\n",
          "",
          {
            version: 3,
            sources: ["webpack://./src/docdiff.document.css"],
            names: [],
            mappings:
              "AAAA;EACE,oCAAoC;EACpC,qBAAqB;AACvB;;AAEA;AACA;;AAEA;EACE,0CAA0C;EAC1C,qBAAqB;AACvB",
            sourcesContent: [
              ".doc-diff-added {\n  background-color: rgb(171, 242, 188);\n  text-decoration: none;\n}\n\n.doc-diff-modified {\n}\n\n.doc-diff-removed {\n  background-color: rgba(255, 129, 130, 0.4);\n  text-decoration: none;\n}\n",
            ],
            sourceRoot: "",
          },
        ]);
        var s = new CSSStyleSheet();
        s.replaceSync(a.toString());
        const l = s;
      },
      432: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => l });
        var r = n(537),
          i = n.n(r),
          o = n(645),
          a = n.n(o)()(i());
        a.push([
          t.id,
          '/* New */\n\n.container {\n  position: fixed;\n  max-width: 300px;\n  width: auto;\n  height: auto;\n}\n\n.container.bottom-right {\n  right: 20px;\n  bottom: 50px;\n}\n\n.container.bottom-left {\n  left: 20px;\n  bottom: 50px;\n}\n\n.container.top-left {\n  left: 20px;\n  top: 50px;\n}\n\n.container.top-right {\n  right: 20px;\n  top: 50px;\n}\n\n:host > div {\n  font-family: var(\n    --readthedocs-flyout-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-flyout-font-size, 0.8rem);\n  color: var(--readthedocs-flyout-color, rgb(128, 128, 128));\n  background-color: var(--readthedocs-flyout-background-color, rgb(39, 39, 37));\n  z-index: 3000;\n  padding: 10px;\n  overflow-y: auto;\n}\n\nheader {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n\nheader > span {\n  color: var(--readthedocs-flyout-current-version-color, #27ae60);\n  font-size: var(--readthedocs-flyout-header-font-size, 0.9rem);\n}\n\nheader > img.logo {\n  text-align: center;\n  width: 106px;\n  margin-right: 20px;\n}\n\nmain {\n  padding: 5px;\n  margin-top: 5px;\n}\n\nmain.closed {\n  display: none;\n}\n\ndl {\n  margin: 0;\n  padding: 0;\n}\n\ndl > dt {\n  font-size: var(--readthedocs-flyout-dt-font-size, 0.9rem);\n  color: var(--readthedocs-flyout-section-heading-color, rgb(128, 128, 128));\n}\n\ndl > dd {\n  display: inline-block;\n  margin: 0;\n  font-size: var(--readthedocs-flyout-dd-font-size, 0.9rem);\n}\n\ndd a {\n  text-decoration: none;\n  color: var(--readthedocs-flyout-item-link-color, rgb(252, 252, 252));\n  padding: 6px;\n  display: inline-block;\n}\n\ndd form {\n  padding: 6px;\n  margin: 0;\n}\n\ndd input {\n  padding: 6px;\n  font-size: 80%;\n}\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  margin: 20px 0;\n  padding: 0;\n  border-top-width: 1px;\n  border-top-style: solid;\n  border-top-color: var(--readthedocs-flyout-divider-color, #413d3d);\n}\n\nsmall a {\n  text-decoration: none;\n  color: var(--readthedocs-flyout-link-color, rgb(42, 128, 185));\n}\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/flyout.css"],
            names: [],
            mappings:
              "AAAA,QAAQ;;AAER;EACE,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA;EACE,WAAW;EACX,SAAS;AACX;;AAEA;EACE;;;;;;;GAOC;EACD,sDAAsD;EACtD,0DAA0D;EAC1D,6EAA6E;EAC7E,aAAa;EACb,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,+DAA+D;EAC/D,6DAA6D;AAC/D;;AAEA;EACE,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,yDAAyD;EACzD,0EAA0E;AAC5E;;AAEA;EACE,qBAAqB;EACrB,SAAS;EACT,yDAAyD;AAC3D;;AAEA;EACE,qBAAqB;EACrB,oEAAoE;EACpE,YAAY;EACZ,qBAAqB;AACvB;;AAEA;EACE,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,WAAW;EACX,SAAS;EACT,cAAc;EACd,UAAU;EACV,qBAAqB;EACrB,uBAAuB;EACvB,kEAAkE;AACpE;;AAEA;EACE,qBAAqB;EACrB,8DAA8D;AAChE",
            sourcesContent: [
              '/* New */\n\n.container {\n  position: fixed;\n  max-width: 300px;\n  width: auto;\n  height: auto;\n}\n\n.container.bottom-right {\n  right: 20px;\n  bottom: 50px;\n}\n\n.container.bottom-left {\n  left: 20px;\n  bottom: 50px;\n}\n\n.container.top-left {\n  left: 20px;\n  top: 50px;\n}\n\n.container.top-right {\n  right: 20px;\n  top: 50px;\n}\n\n:host > div {\n  font-family: var(\n    --readthedocs-flyout-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-flyout-font-size, 0.8rem);\n  color: var(--readthedocs-flyout-color, rgb(128, 128, 128));\n  background-color: var(--readthedocs-flyout-background-color, rgb(39, 39, 37));\n  z-index: 3000;\n  padding: 10px;\n  overflow-y: auto;\n}\n\nheader {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: center;\n  cursor: pointer;\n}\n\nheader > span {\n  color: var(--readthedocs-flyout-current-version-color, #27ae60);\n  font-size: var(--readthedocs-flyout-header-font-size, 0.9rem);\n}\n\nheader > img.logo {\n  text-align: center;\n  width: 106px;\n  margin-right: 20px;\n}\n\nmain {\n  padding: 5px;\n  margin-top: 5px;\n}\n\nmain.closed {\n  display: none;\n}\n\ndl {\n  margin: 0;\n  padding: 0;\n}\n\ndl > dt {\n  font-size: var(--readthedocs-flyout-dt-font-size, 0.9rem);\n  color: var(--readthedocs-flyout-section-heading-color, rgb(128, 128, 128));\n}\n\ndl > dd {\n  display: inline-block;\n  margin: 0;\n  font-size: var(--readthedocs-flyout-dd-font-size, 0.9rem);\n}\n\ndd a {\n  text-decoration: none;\n  color: var(--readthedocs-flyout-item-link-color, rgb(252, 252, 252));\n  padding: 6px;\n  display: inline-block;\n}\n\ndd form {\n  padding: 6px;\n  margin: 0;\n}\n\ndd input {\n  padding: 6px;\n  font-size: 80%;\n}\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  margin: 20px 0;\n  padding: 0;\n  border-top-width: 1px;\n  border-top-style: solid;\n  border-top-color: var(--readthedocs-flyout-divider-color, #413d3d);\n}\n\nsmall a {\n  text-decoration: none;\n  color: var(--readthedocs-flyout-link-color, rgb(42, 128, 185));\n}\n',
            ],
            sourceRoot: "",
          },
        ]);
        var s = new CSSStyleSheet();
        s.replaceSync(a.toString());
        const l = s;
      },
      661: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => l });
        var r = n(537),
          i = n.n(r),
          o = n(645),
          a = n.n(o)()(i());
        a.push([
          t.id,
          ':host > div {\n  margin: 1rem 0rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  overflow: auto;\n  border-radius: 0.5rem;\n  font-family: var(\n    --readthedocs-notification-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-notification-font-size, 1rem);\n  color: var(--readthedocs-notification-color, rgb(64, 64, 64));\n  background-color: var(\n    --readthedocs-notification-background-color,\n    rgb(234, 234, 234)\n  );\n}\n\n:host(.floating) > div {\n  position: fixed;\n  top: 2rem;\n  left: 20%; /* (100 - width) / 2 */\n  width: 60%;\n  z-index: 1750;\n}\n\n:host(.toast) > div {\n  position: fixed;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  margin: 0.75rem 0rem;\n  top: 2rem;\n  right: 2rem;\n  z-index: 1750;\n  font-size: 0.85rem;\n  width: 35rem;\n}\n\n:host(.raised) > div {\n  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),\n    0 2px 10px 0 rgba(34, 36, 38, 0.15);\n}\n\n:host(.titled) > div {\n  padding: 0rem;\n  text-align: center;\n}\n\n:host > div > svg.header.icon {\n  height: 2rem;\n  padding: 0.5rem 1.5rem;\n  float: left;\n}\n\n:host(.toast) > div > svg.header.icon {\n  height: 1.5rem;\n}\n\n:host(.titled) > div > svg.header.icon {\n  display: none;\n}\n\n:host(.inverted) > div {\n  color: var(--readthedocs-notification-color, rgb(234, 234, 234));\n  background-color: var(\n    --readthedocs-notification-background-color,\n    rgb(64, 64, 64)\n  );\n}\n\n:host > div a {\n  color: var(--readthedocs-notification-link-color, rgb(8, 140, 219));\n  text-decoration: none;\n}\n\n:host(.inverted) > div a {\n  color: var(--readthedocs-notification-link-color, rgb(134, 203, 243));\n}\n\n:host > div > .title {\n  padding: 0.25rem 1rem;\n  margin-bottom: 0.25rem;\n  line-height: 1rem;\n  font-weight: bold;\n}\n:host > div > div.content {\n  line-height: 1rem;\n  font-size: 0.85em;\n}\n\n:host(.toast) > div > .title {\n  padding: 0rem 1rem;\n}\n\n:host(.titled) > div > .title {\n  display: block;\n  margin: 0rem;\n  padding: 0.1rem 1rem;\n  line-height: 2rem;\n  border-radius: 0.5rem 0.5rem 0 0;\n  color: var(--readthedocs-notification-title-color, rgb(96, 96, 96));\n  background-color: var(\n    --readthedocs-notification-title-background-color,\n    rgb(224, 224, 224)\n  );\n  vertical-align: middle;\n  font-weight: bold;\n}\n:host(.titled) > div > div.content {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  padding: 0rem 0.65rem 0rem 0.65rem;\n}\n\n:host(.inverted) > div > .title {\n  color: var(--readthedocs-notification-title-color, rgba(255, 255, 255, 0.9));\n}\n\n:host(.inverted.titled) > div > .title {\n  background-color: var(\n    --readthedocs-notification-title-background-color,\n    rgb(48, 48, 48)\n  );\n}\n\n:host > div > .title > .right {\n  float: right;\n}\n\n:host > div > .title > .right > svg {\n  display: inline-block;\n  height: 1rem;\n  vertical-align: middle;\n  cursor: pointer;\n  color: var(--readthedocs-notification-title-color, rgba(96, 96, 96));\n  font-weight: normal;\n}\n\n:host(.inverted) > div > .title > .right > svg {\n  color: var(--readthedocs-notification-title-color, rgba(255, 255, 255, 0.9));\n}\n:host(.titled) > div > .title > .right > svg {\n  margin: 0.5rem 0rem;\n}\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/notification.css"],
            names: [],
            mappings:
              "AAAA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;EACpB,cAAc;EACd,qBAAqB;EACrB;;;;;;;GAOC;EACD,0DAA0D;EAC1D,6DAA6D;EAC7D;;;GAGC;AACH;;AAEA;EACE,eAAe;EACf,SAAS;EACT,SAAS,EAAE,sBAAsB;EACjC,UAAU;EACV,aAAa;AACf;;AAEA;EACE,eAAe;EACf,oBAAoB;EACpB,uBAAuB;EACvB,oBAAoB;EACpB,SAAS;EACT,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE;uCACqC;AACvC;;AAEA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,sBAAsB;EACtB,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gEAAgE;EAChE;;;GAGC;AACH;;AAEA;EACE,mEAAmE;EACnE,qBAAqB;AACvB;;AAEA;EACE,qEAAqE;AACvE;;AAEA;EACE,qBAAqB;EACrB,sBAAsB;EACtB,iBAAiB;EACjB,iBAAiB;AACnB;AACA;EACE,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,oBAAoB;EACpB,iBAAiB;EACjB,gCAAgC;EAChC,mEAAmE;EACnE;;;GAGC;EACD,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,kCAAkC;AACpC;;AAEA;EACE,4EAA4E;AAC9E;;AAEA;EACE;;;GAGC;AACH;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,sBAAsB;EACtB,eAAe;EACf,oEAAoE;EACpE,mBAAmB;AACrB;;AAEA;EACE,4EAA4E;AAC9E;AACA;EACE,mBAAmB;AACrB",
            sourcesContent: [
              ':host > div {\n  margin: 1rem 0rem;\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n  overflow: auto;\n  border-radius: 0.5rem;\n  font-family: var(\n    --readthedocs-notification-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-notification-font-size, 1rem);\n  color: var(--readthedocs-notification-color, rgb(64, 64, 64));\n  background-color: var(\n    --readthedocs-notification-background-color,\n    rgb(234, 234, 234)\n  );\n}\n\n:host(.floating) > div {\n  position: fixed;\n  top: 2rem;\n  left: 20%; /* (100 - width) / 2 */\n  width: 60%;\n  z-index: 1750;\n}\n\n:host(.toast) > div {\n  position: fixed;\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  margin: 0.75rem 0rem;\n  top: 2rem;\n  right: 2rem;\n  z-index: 1750;\n  font-size: 0.85rem;\n  width: 35rem;\n}\n\n:host(.raised) > div {\n  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),\n    0 2px 10px 0 rgba(34, 36, 38, 0.15);\n}\n\n:host(.titled) > div {\n  padding: 0rem;\n  text-align: center;\n}\n\n:host > div > svg.header.icon {\n  height: 2rem;\n  padding: 0.5rem 1.5rem;\n  float: left;\n}\n\n:host(.toast) > div > svg.header.icon {\n  height: 1.5rem;\n}\n\n:host(.titled) > div > svg.header.icon {\n  display: none;\n}\n\n:host(.inverted) > div {\n  color: var(--readthedocs-notification-color, rgb(234, 234, 234));\n  background-color: var(\n    --readthedocs-notification-background-color,\n    rgb(64, 64, 64)\n  );\n}\n\n:host > div a {\n  color: var(--readthedocs-notification-link-color, rgb(8, 140, 219));\n  text-decoration: none;\n}\n\n:host(.inverted) > div a {\n  color: var(--readthedocs-notification-link-color, rgb(134, 203, 243));\n}\n\n:host > div > .title {\n  padding: 0.25rem 1rem;\n  margin-bottom: 0.25rem;\n  line-height: 1rem;\n  font-weight: bold;\n}\n:host > div > div.content {\n  line-height: 1rem;\n  font-size: 0.85em;\n}\n\n:host(.toast) > div > .title {\n  padding: 0rem 1rem;\n}\n\n:host(.titled) > div > .title {\n  display: block;\n  margin: 0rem;\n  padding: 0.1rem 1rem;\n  line-height: 2rem;\n  border-radius: 0.5rem 0.5rem 0 0;\n  color: var(--readthedocs-notification-title-color, rgb(96, 96, 96));\n  background-color: var(\n    --readthedocs-notification-title-background-color,\n    rgb(224, 224, 224)\n  );\n  vertical-align: middle;\n  font-weight: bold;\n}\n:host(.titled) > div > div.content {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  padding: 0rem 0.65rem 0rem 0.65rem;\n}\n\n:host(.inverted) > div > .title {\n  color: var(--readthedocs-notification-title-color, rgba(255, 255, 255, 0.9));\n}\n\n:host(.inverted.titled) > div > .title {\n  background-color: var(\n    --readthedocs-notification-title-background-color,\n    rgb(48, 48, 48)\n  );\n}\n\n:host > div > .title > .right {\n  float: right;\n}\n\n:host > div > .title > .right > svg {\n  display: inline-block;\n  height: 1rem;\n  vertical-align: middle;\n  cursor: pointer;\n  color: var(--readthedocs-notification-title-color, rgba(96, 96, 96));\n  font-weight: normal;\n}\n\n:host(.inverted) > div > .title > .right > svg {\n  color: var(--readthedocs-notification-title-color, rgba(255, 255, 255, 0.9));\n}\n:host(.titled) > div > .title > .right > svg {\n  margin: 0.5rem 0rem;\n}\n',
            ],
            sourceRoot: "",
          },
        ]);
        var s = new CSSStyleSheet();
        s.replaceSync(a.toString());
        const l = s;
      },
      272: (t, e, n) => {
        "use strict";
        n.d(e, { Z: () => l });
        var r = n(537),
          i = n.n(r),
          o = n(645),
          a = n.n(o)()(i());
        a.push([
          t.id,
          ':host > div {\n  font-family: var(\n    --readthedocs-search-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-search-font-size, 16px);\n\n  /* TODO: make some of this variables */\n  color: rgb(64, 64, 64);\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 3000;\n  line-height: 1.875;\n}\n\n:host > div a {\n  color: #2980b9;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n:host > div code {\n  background: #fff;\n  padding: 2px 5px;\n  border: solid 1px #e1e4e5;\n  color: #333;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  font-size: 0.875em;\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",\n    "Courier New", monospace;\n  border-radius: 0;\n}\n\n:host > div .background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1250;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(3px);\n}\n\n:host > div > div.content {\n  margin: 5em auto auto auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 100000;\n  height: 60%;\n  width: 60%;\n  max-height: 1000px;\n  max-width: 1500px;\n  overflow-y: hidden;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.7rem;\n  line-height: 1.875;\n  background-color: #fcfcfc;\n  box-shadow: rgba(0, 0, 0, 0.05) 5px 5px 5px 5px,\n    rgba(0, 0, 0, 0.05) -5px -5px 5px 5px;\n  text-align: left;\n}\n\n:host > div form {\n  background-color: #eaeaea;\n  margin: 1.2rem;\n  border-radius: 0.25em;\n  font-size: 1.15em;\n  padding: 5px;\n  display: flex;\n}\n\n:host > div form.focus {\n  outline: 2px solid #6ea0ec;\n  border-shadow: inset 0 0 1px white transparent;\n}\n\n:host > div form > label {\n  font-size: 1.15em;\n  padding-left: 10px;\n  color: #333;\n}\n\n:host > div form label svg {\n  height: 1em;\n  position: relative;\n  top: 5px;\n}\n\n:host > div form > input {\n  border: 0;\n  outline: none;\n  background: inherit;\n  width: max-content;\n  font-size: 1.15em;\n  box-shadow: none;\n  width: 100%;\n  padding: 6px;\n  line-height: 1;\n}\n\n:host > div .results {\n  margin-top: 10px;\n  padding: 5px;\n  margin: 1.15em;\n  overflow-y: scroll;\n  height: 100%;\n  hyphens: auto;\n}\n\n:host > div .results a.hit {\n  width: 100%;\n  display: inline-block;\n  padding: 0 1.15em;\n  box-sizing: border-box;\n}\n\n:host > div .results a.hit:hover {\n  background-color: rgb(245, 245, 245);\n}\n\n:host > div .results h2 {\n  display: inline-block;\n  font-weight: 500;\n  margin-bottom: 15px;\n  margin-top: 0;\n  font-size: 15px;\n  color: #6ea0ec;\n  border-bottom: 1px solid #6ea0ec;\n  line-height: inherit;\n}\n\n:host > div .results .hit .subheading {\n  color: black;\n  font-weight: 700;\n  float: left;\n  width: 20%;\n  font-size: 15px;\n  margin-right: 10px;\n  overflow-x: hidden;\n  margin: inherit;\n  line-height: inherit;\n}\n\n:host > div .results .hit .content {\n  margin: 0;\n  text-decoration: none;\n  color: black;\n  font-size: 15px;\n  display: block;\n  margin-bottom: 5px;\n  margin-bottom: 0;\n  line-height: inherit;\n  float: right;\n  width: calc(80% - 15px);\n  text-align: left;\n}\n\n:host > div .results span {\n  font-style: normal;\n}\n\n:host > div .results .hit h2 span {\n  background-color: #e5f6ff;\n  padding-bottom: 3px;\n  border-bottom-color: black;\n}\n\n:host > div .results .hit span {\n  color: #6ea0ec;\n  font-style: italic;\n  font-weight: bold;\n}\n\n:host > div .results .hit .active {\n  background-color: rgb(245, 245, 245);\n}\n\n:host div.content > div.footer {\n  width: 100%;\n  display: inline-block;\n  height: 30px;\n  background-color: rgb(234, 234, 234);\n  color: #404040;\n}\n\n:host > div .credits {\n  float: right;\n  margin: 0 15px;\n}\n\n:host > div .credits a img {\n  display: inline-block;\n  width: 125px;\n  vertical-align: middle;\n}\n\n/* TODO: find an example for domain role and style it properly */\n:host > div .readthedocs-search-result-hit--domain-role {\n  font-size: 80%;\n  letter-spacing: 1px;\n}\n\n:host > div .filters li.title {\n  font-size: 0.9rem;\n  position: absolute;\n  top: 75px;\n  background: rgb(252, 252, 252);\n  margin: 0 5px;\n  padding: 0 5px;\n}\n\n:host > div .filters {\n  padding: 5px 10px;\n  margin: 0 1.15em;\n  border-radius: 0.3rem;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #80808057;\n}\n\n:host > div .filters li {\n  display: inline-block;\n  margin: 0 0 0 15px;\n}\n\n:host > div .filters li label {\n  padding: 3px;\n}\n\n:host > div .filters label {\n  font-size: 0.9rem;\n}\n\n:host > div .no-results {\n  text-align: center;\n  margin-top: 1.15em;\n  padding: 15px;\n  margin: 0 auto;\n  width: 80%;\n}\n\n:host > div .no-results > p.title {\n  margin-top: 0;\n  margin-bottom: 0.5em;\n}\n\n:host > div .no-results > svg {\n  height: 5.5rem;\n  margin-bottom: 1.15em;\n}\n\n:host > div .no-results > div.footer p {\n  font-size: small;\n}\n\n:host > div .no-results > .tips {\n  padding: 0;\n  text-align: left;\n  font-size: 15px;\n  margin-bottom: 1.15em;\n}\n\n:host > div .no-results > .tips ul {\n  padding: 0 0 0 0.7em;\n  margin: 0;\n}\n:host > div .no-results > .tips li {\n  list-style-position: inside;\n  list-style-type: "\\BB  ";\n  margin: 0;\n}\n\n:host > div .help {\n  display: inline-block;\n  font-size: small;\n  margin: 0 15px;\n  padding: 0;\n}\n\n:host > div .help li {\n  list-style: none;\n  display: inline-block;\n  margin: 0 0.4em;\n}\n',
          "",
          {
            version: 3,
            sources: ["webpack://./src/search.css"],
            names: [],
            mappings:
              "AAAA;EACE;;;;;;;GAOC;EACD,oDAAoD;;EAEpD,sCAAsC;EACtC,sBAAsB;EACtB,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,yBAAyB;EACzB,WAAW;EACX,qBAAqB;EACrB,qBAAqB;EACrB,kBAAkB;EAClB;4BAC0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,MAAM;EACN,OAAO;EACP,aAAa;EACb,WAAW;EACX,YAAY;EACZ,oCAAoC;EACpC,0BAA0B;AAC5B;;AAEA;EACE,0BAA0B;EAC1B,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,eAAe;EACf,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,kBAAkB;EAClB,yBAAyB;EACzB;yCACuC;EACvC,gBAAgB;AAClB;;AAEA;EACE,yBAAyB;EACzB,cAAc;EACd,qBAAqB;EACrB,iBAAiB;EACjB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,0BAA0B;EAC1B,8CAA8C;AAChD;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,cAAc;EACd,kBAAkB;EAClB,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,iBAAiB;EACjB,sBAAsB;AACxB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,cAAc;EACd,gCAAgC;EAChC,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,gBAAgB;EAChB,WAAW;EACX,UAAU;EACV,eAAe;EACf,kBAAkB;EAClB,kBAAkB;EAClB,eAAe;EACf,oBAAoB;AACtB;;AAEA;EACE,SAAS;EACT,qBAAqB;EACrB,YAAY;EACZ,eAAe;EACf,cAAc;EACd,kBAAkB;EAClB,gBAAgB;EAChB,oBAAoB;EACpB,YAAY;EACZ,uBAAuB;EACvB,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,0BAA0B;AAC5B;;AAEA;EACE,cAAc;EACd,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,oCAAoC;AACtC;;AAEA;EACE,WAAW;EACX,qBAAqB;EACrB,YAAY;EACZ,oCAAoC;EACpC,cAAc;AAChB;;AAEA;EACE,YAAY;EACZ,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,YAAY;EACZ,sBAAsB;AACxB;;AAEA,gEAAgE;AAChE;EACE,cAAc;EACd,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,SAAS;EACT,8BAA8B;EAC9B,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,aAAa;EACb,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,oBAAoB;AACtB;;AAEA;EACE,cAAc;EACd,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,oBAAoB;EACpB,SAAS;AACX;AACA;EACE,2BAA2B;EAC3B,wBAAwB;EACxB,SAAS;AACX;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,cAAc;EACd,UAAU;AACZ;;AAEA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,eAAe;AACjB",
            sourcesContent: [
              ':host > div {\n  font-family: var(\n    --readthedocs-search-font-family,\n    "Lato",\n    "proxima-nova",\n    "Helvetica Neue",\n    "Arial",\n    "sans-serif"\n  );\n  font-size: var(--readthedocs-search-font-size, 16px);\n\n  /* TODO: make some of this variables */\n  color: rgb(64, 64, 64);\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 3000;\n  line-height: 1.875;\n}\n\n:host > div a {\n  color: #2980b9;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n:host > div code {\n  background: #fff;\n  padding: 2px 5px;\n  border: solid 1px #e1e4e5;\n  color: #333;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  font-size: 0.875em;\n  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",\n    "Courier New", monospace;\n  border-radius: 0;\n}\n\n:host > div .background {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1250;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(3px);\n}\n\n:host > div > div.content {\n  margin: 5em auto auto auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 100000;\n  height: 60%;\n  width: 60%;\n  max-height: 1000px;\n  max-width: 1500px;\n  overflow-y: hidden;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #e0e0e0;\n  border-radius: 0.7rem;\n  line-height: 1.875;\n  background-color: #fcfcfc;\n  box-shadow: rgba(0, 0, 0, 0.05) 5px 5px 5px 5px,\n    rgba(0, 0, 0, 0.05) -5px -5px 5px 5px;\n  text-align: left;\n}\n\n:host > div form {\n  background-color: #eaeaea;\n  margin: 1.2rem;\n  border-radius: 0.25em;\n  font-size: 1.15em;\n  padding: 5px;\n  display: flex;\n}\n\n:host > div form.focus {\n  outline: 2px solid #6ea0ec;\n  border-shadow: inset 0 0 1px white transparent;\n}\n\n:host > div form > label {\n  font-size: 1.15em;\n  padding-left: 10px;\n  color: #333;\n}\n\n:host > div form label svg {\n  height: 1em;\n  position: relative;\n  top: 5px;\n}\n\n:host > div form > input {\n  border: 0;\n  outline: none;\n  background: inherit;\n  width: max-content;\n  font-size: 1.15em;\n  box-shadow: none;\n  width: 100%;\n  padding: 6px;\n  line-height: 1;\n}\n\n:host > div .results {\n  margin-top: 10px;\n  padding: 5px;\n  margin: 1.15em;\n  overflow-y: scroll;\n  height: 100%;\n  hyphens: auto;\n}\n\n:host > div .results a.hit {\n  width: 100%;\n  display: inline-block;\n  padding: 0 1.15em;\n  box-sizing: border-box;\n}\n\n:host > div .results a.hit:hover {\n  background-color: rgb(245, 245, 245);\n}\n\n:host > div .results h2 {\n  display: inline-block;\n  font-weight: 500;\n  margin-bottom: 15px;\n  margin-top: 0;\n  font-size: 15px;\n  color: #6ea0ec;\n  border-bottom: 1px solid #6ea0ec;\n  line-height: inherit;\n}\n\n:host > div .results .hit .subheading {\n  color: black;\n  font-weight: 700;\n  float: left;\n  width: 20%;\n  font-size: 15px;\n  margin-right: 10px;\n  overflow-x: hidden;\n  margin: inherit;\n  line-height: inherit;\n}\n\n:host > div .results .hit .content {\n  margin: 0;\n  text-decoration: none;\n  color: black;\n  font-size: 15px;\n  display: block;\n  margin-bottom: 5px;\n  margin-bottom: 0;\n  line-height: inherit;\n  float: right;\n  width: calc(80% - 15px);\n  text-align: left;\n}\n\n:host > div .results span {\n  font-style: normal;\n}\n\n:host > div .results .hit h2 span {\n  background-color: #e5f6ff;\n  padding-bottom: 3px;\n  border-bottom-color: black;\n}\n\n:host > div .results .hit span {\n  color: #6ea0ec;\n  font-style: italic;\n  font-weight: bold;\n}\n\n:host > div .results .hit .active {\n  background-color: rgb(245, 245, 245);\n}\n\n:host div.content > div.footer {\n  width: 100%;\n  display: inline-block;\n  height: 30px;\n  background-color: rgb(234, 234, 234);\n  color: #404040;\n}\n\n:host > div .credits {\n  float: right;\n  margin: 0 15px;\n}\n\n:host > div .credits a img {\n  display: inline-block;\n  width: 125px;\n  vertical-align: middle;\n}\n\n/* TODO: find an example for domain role and style it properly */\n:host > div .readthedocs-search-result-hit--domain-role {\n  font-size: 80%;\n  letter-spacing: 1px;\n}\n\n:host > div .filters li.title {\n  font-size: 0.9rem;\n  position: absolute;\n  top: 75px;\n  background: rgb(252, 252, 252);\n  margin: 0 5px;\n  padding: 0 5px;\n}\n\n:host > div .filters {\n  padding: 5px 10px;\n  margin: 0 1.15em;\n  border-radius: 0.3rem;\n  border-style: solid;\n  border-width: 1px;\n  border-color: #80808057;\n}\n\n:host > div .filters li {\n  display: inline-block;\n  margin: 0 0 0 15px;\n}\n\n:host > div .filters li label {\n  padding: 3px;\n}\n\n:host > div .filters label {\n  font-size: 0.9rem;\n}\n\n:host > div .no-results {\n  text-align: center;\n  margin-top: 1.15em;\n  padding: 15px;\n  margin: 0 auto;\n  width: 80%;\n}\n\n:host > div .no-results > p.title {\n  margin-top: 0;\n  margin-bottom: 0.5em;\n}\n\n:host > div .no-results > svg {\n  height: 5.5rem;\n  margin-bottom: 1.15em;\n}\n\n:host > div .no-results > div.footer p {\n  font-size: small;\n}\n\n:host > div .no-results > .tips {\n  padding: 0;\n  text-align: left;\n  font-size: 15px;\n  margin-bottom: 1.15em;\n}\n\n:host > div .no-results > .tips ul {\n  padding: 0 0 0 0.7em;\n  margin: 0;\n}\n:host > div .no-results > .tips li {\n  list-style-position: inside;\n  list-style-type: "\\BB  ";\n  margin: 0;\n}\n\n:host > div .help {\n  display: inline-block;\n  font-size: small;\n  margin: 0 15px;\n  padding: 0;\n}\n\n:host > div .help li {\n  list-style: none;\n  display: inline-block;\n  margin: 0 0.4em;\n}\n',
            ],
            sourceRoot: "",
          },
        ]);
        var s = new CSSStyleSheet();
        s.replaceSync(a.toString());
        const l = s;
      },
      645: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = [];
          return (
            (e.toString = function () {
              return this.map(function (e) {
                var n = "",
                  r = void 0 !== e[5];
                return (
                  e[4] && (n += "@supports (".concat(e[4], ") {")),
                  e[2] && (n += "@media ".concat(e[2], " {")),
                  r &&
                    (n += "@layer".concat(
                      e[5].length > 0 ? " ".concat(e[5]) : "",
                      " {"
                    )),
                  (n += t(e)),
                  r && (n += "}"),
                  e[2] && (n += "}"),
                  e[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (e.i = function (t, n, r, i, o) {
              "string" == typeof t && (t = [[null, t, void 0]]);
              var a = {};
              if (r)
                for (var s = 0; s < this.length; s++) {
                  var l = this[s][0];
                  null != l && (a[l] = !0);
                }
              for (var c = 0; c < t.length; c++) {
                var u = [].concat(t[c]);
                (r && a[u[0]]) ||
                  (void 0 !== o &&
                    (void 0 === u[5] ||
                      (u[1] = "@layer"
                        .concat(u[5].length > 0 ? " ".concat(u[5]) : "", " {")
                        .concat(u[1], "}")),
                    (u[5] = o)),
                  n &&
                    (u[2]
                      ? ((u[1] = "@media "
                          .concat(u[2], " {")
                          .concat(u[1], "}")),
                        (u[2] = n))
                      : (u[2] = n)),
                  i &&
                    (u[4]
                      ? ((u[1] = "@supports ("
                          .concat(u[4], ") {")
                          .concat(u[1], "}")),
                        (u[4] = i))
                      : (u[4] = "".concat(i))),
                  e.push(u));
              }
            }),
            e
          );
        };
      },
      537: (t) => {
        "use strict";
        t.exports = function (t) {
          var e = t[1],
            n = t[3];
          if (!n) return e;
          if ("function" == typeof btoa) {
            var r = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
              i =
                "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                  r
                ),
              o = "/*# ".concat(i, " */");
            return [e].concat([o]).join("\n");
          }
          return [e].join("\n");
        };
      },
      27: (t) => {
        var e = function () {
            (this.Diff_Timeout = 1),
              (this.Diff_EditCost = 4),
              (this.Match_Threshold = 0.5),
              (this.Match_Distance = 1e3),
              (this.Patch_DeleteThreshold = 0.5),
              (this.Patch_Margin = 4),
              (this.Match_MaxBits = 32);
          },
          n = -1;
        (e.Diff = function (t, e) {
          return [t, e];
        }),
          (e.prototype.diff_main = function (t, n, r, i) {
            void 0 === i &&
              (i =
                this.Diff_Timeout <= 0
                  ? Number.MAX_VALUE
                  : new Date().getTime() + 1e3 * this.Diff_Timeout);
            var o = i;
            if (null == t || null == n)
              throw new Error("Null input. (diff_main)");
            if (t == n) return t ? [new e.Diff(0, t)] : [];
            void 0 === r && (r = !0);
            var a = r,
              s = this.diff_commonPrefix(t, n),
              l = t.substring(0, s);
            (t = t.substring(s)),
              (n = n.substring(s)),
              (s = this.diff_commonSuffix(t, n));
            var c = t.substring(t.length - s);
            (t = t.substring(0, t.length - s)),
              (n = n.substring(0, n.length - s));
            var u = this.diff_compute_(t, n, a, o);
            return (
              l && u.unshift(new e.Diff(0, l)),
              c && u.push(new e.Diff(0, c)),
              this.diff_cleanupMerge(u),
              u
            );
          }),
          (e.prototype.diff_compute_ = function (t, r, i, o) {
            var a;
            if (!t) return [new e.Diff(1, r)];
            if (!r) return [new e.Diff(n, t)];
            var s = t.length > r.length ? t : r,
              l = t.length > r.length ? r : t,
              c = s.indexOf(l);
            if (-1 != c)
              return (
                (a = [
                  new e.Diff(1, s.substring(0, c)),
                  new e.Diff(0, l),
                  new e.Diff(1, s.substring(c + l.length)),
                ]),
                t.length > r.length && (a[0][0] = a[2][0] = n),
                a
              );
            if (1 == l.length) return [new e.Diff(n, t), new e.Diff(1, r)];
            var u = this.diff_halfMatch_(t, r);
            if (u) {
              var f = u[0],
                d = u[1],
                h = u[2],
                p = u[3],
                g = u[4],
                m = this.diff_main(f, h, i, o),
                y = this.diff_main(d, p, i, o);
              return m.concat([new e.Diff(0, g)], y);
            }
            return i && t.length > 100 && r.length > 100
              ? this.diff_lineMode_(t, r, o)
              : this.diff_bisect_(t, r, o);
          }),
          (e.prototype.diff_lineMode_ = function (t, r, i) {
            var o = this.diff_linesToChars_(t, r);
            (t = o.chars1), (r = o.chars2);
            var a = o.lineArray,
              s = this.diff_main(t, r, !1, i);
            this.diff_charsToLines_(s, a),
              this.diff_cleanupSemantic(s),
              s.push(new e.Diff(0, ""));
            for (var l = 0, c = 0, u = 0, f = "", d = ""; l < s.length; ) {
              switch (s[l][0]) {
                case 1:
                  u++, (d += s[l][1]);
                  break;
                case n:
                  c++, (f += s[l][1]);
                  break;
                case 0:
                  if (c >= 1 && u >= 1) {
                    s.splice(l - c - u, c + u), (l = l - c - u);
                    for (
                      var h = this.diff_main(f, d, !1, i), p = h.length - 1;
                      p >= 0;
                      p--
                    )
                      s.splice(l, 0, h[p]);
                    l += h.length;
                  }
                  (u = 0), (c = 0), (f = ""), (d = "");
              }
              l++;
            }
            return s.pop(), s;
          }),
          (e.prototype.diff_bisect_ = function (t, r, i) {
            for (
              var o = t.length,
                a = r.length,
                s = Math.ceil((o + a) / 2),
                l = s,
                c = 2 * s,
                u = new Array(c),
                f = new Array(c),
                d = 0;
              d < c;
              d++
            )
              (u[d] = -1), (f[d] = -1);
            (u[l + 1] = 0), (f[l + 1] = 0);
            for (
              var h = o - a, p = h % 2 != 0, g = 0, m = 0, y = 0, A = 0, v = 0;
              v < s && !(new Date().getTime() > i);
              v++
            ) {
              for (var M = -v + g; M <= v - m; M += 2) {
                for (
                  var L = l + M,
                    b =
                      (N =
                        M == -v || (M != v && u[L - 1] < u[L + 1])
                          ? u[L + 1]
                          : u[L - 1] + 1) - M;
                  N < o && b < a && t.charAt(N) == r.charAt(b);

                )
                  N++, b++;
                if (((u[L] = N), N > o)) m += 2;
                else if (b > a) g += 2;
                else if (p) {
                  if ((j = l + h - M) >= 0 && j < c && -1 != f[j])
                    if (N >= (w = o - f[j]))
                      return this.diff_bisectSplit_(t, r, N, b, i);
                }
              }
              for (var E = -v + y; E <= v - A; E += 2) {
                for (
                  var w,
                    j = l + E,
                    C =
                      (w =
                        E == -v || (E != v && f[j - 1] < f[j + 1])
                          ? f[j + 1]
                          : f[j - 1] + 1) - E;
                  w < o && C < a && t.charAt(o - w - 1) == r.charAt(a - C - 1);

                )
                  w++, C++;
                if (((f[j] = w), w > o)) A += 2;
                else if (C > a) y += 2;
                else if (!p) {
                  if ((L = l + h - E) >= 0 && L < c && -1 != u[L]) {
                    var N;
                    b = l + (N = u[L]) - L;
                    if (N >= (w = o - w))
                      return this.diff_bisectSplit_(t, r, N, b, i);
                  }
                }
              }
            }
            return [new e.Diff(n, t), new e.Diff(1, r)];
          }),
          (e.prototype.diff_bisectSplit_ = function (t, e, n, r, i) {
            var o = t.substring(0, n),
              a = e.substring(0, r),
              s = t.substring(n),
              l = e.substring(r),
              c = this.diff_main(o, a, !1, i),
              u = this.diff_main(s, l, !1, i);
            return c.concat(u);
          }),
          (e.prototype.diff_linesToChars_ = function (t, e) {
            var n = [],
              r = {};
            function i(t) {
              for (
                var e = "", i = 0, a = -1, s = n.length;
                a < t.length - 1;

              ) {
                -1 == (a = t.indexOf("\n", i)) && (a = t.length - 1);
                var l = t.substring(i, a + 1);
                (r.hasOwnProperty ? r.hasOwnProperty(l) : void 0 !== r[l])
                  ? (e += String.fromCharCode(r[l]))
                  : (s == o && ((l = t.substring(i)), (a = t.length)),
                    (e += String.fromCharCode(s)),
                    (r[l] = s),
                    (n[s++] = l)),
                  (i = a + 1);
              }
              return e;
            }
            n[0] = "";
            var o = 4e4,
              a = i(t);
            return (o = 65535), { chars1: a, chars2: i(e), lineArray: n };
          }),
          (e.prototype.diff_charsToLines_ = function (t, e) {
            for (var n = 0; n < t.length; n++) {
              for (var r = t[n][1], i = [], o = 0; o < r.length; o++)
                i[o] = e[r.charCodeAt(o)];
              t[n][1] = i.join("");
            }
          }),
          (e.prototype.diff_commonPrefix = function (t, e) {
            if (!t || !e || t.charAt(0) != e.charAt(0)) return 0;
            for (
              var n = 0, r = Math.min(t.length, e.length), i = r, o = 0;
              n < i;

            )
              t.substring(o, i) == e.substring(o, i) ? (o = n = i) : (r = i),
                (i = Math.floor((r - n) / 2 + n));
            return i;
          }),
          (e.prototype.diff_commonSuffix = function (t, e) {
            if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1))
              return 0;
            for (
              var n = 0, r = Math.min(t.length, e.length), i = r, o = 0;
              n < i;

            )
              t.substring(t.length - i, t.length - o) ==
              e.substring(e.length - i, e.length - o)
                ? (o = n = i)
                : (r = i),
                (i = Math.floor((r - n) / 2 + n));
            return i;
          }),
          (e.prototype.diff_commonOverlap_ = function (t, e) {
            var n = t.length,
              r = e.length;
            if (0 == n || 0 == r) return 0;
            n > r ? (t = t.substring(n - r)) : n < r && (e = e.substring(0, n));
            var i = Math.min(n, r);
            if (t == e) return i;
            for (var o = 0, a = 1; ; ) {
              var s = t.substring(i - a),
                l = e.indexOf(s);
              if (-1 == l) return o;
              (a += l),
                (0 != l && t.substring(i - a) != e.substring(0, a)) ||
                  ((o = a), a++);
            }
          }),
          (e.prototype.diff_halfMatch_ = function (t, e) {
            if (this.Diff_Timeout <= 0) return null;
            var n = t.length > e.length ? t : e,
              r = t.length > e.length ? e : t;
            if (n.length < 4 || 2 * r.length < n.length) return null;
            var i = this;
            function o(t, e, n) {
              for (
                var r,
                  o,
                  a,
                  s,
                  l = t.substring(n, n + Math.floor(t.length / 4)),
                  c = -1,
                  u = "";
                -1 != (c = e.indexOf(l, c + 1));

              ) {
                var f = i.diff_commonPrefix(t.substring(n), e.substring(c)),
                  d = i.diff_commonSuffix(t.substring(0, n), e.substring(0, c));
                u.length < d + f &&
                  ((u = e.substring(c - d, c) + e.substring(c, c + f)),
                  (r = t.substring(0, n - d)),
                  (o = t.substring(n + f)),
                  (a = e.substring(0, c - d)),
                  (s = e.substring(c + f)));
              }
              return 2 * u.length >= t.length ? [r, o, a, s, u] : null;
            }
            var a,
              s,
              l,
              c,
              u,
              f = o(n, r, Math.ceil(n.length / 4)),
              d = o(n, r, Math.ceil(n.length / 2));
            return f || d
              ? ((a = d ? (f && f[4].length > d[4].length ? f : d) : f),
                t.length > e.length
                  ? ((s = a[0]), (l = a[1]), (c = a[2]), (u = a[3]))
                  : ((c = a[0]), (u = a[1]), (s = a[2]), (l = a[3])),
                [s, l, c, u, a[4]])
              : null;
          }),
          (e.prototype.diff_cleanupSemantic = function (t) {
            for (
              var r = !1,
                i = [],
                o = 0,
                a = null,
                s = 0,
                l = 0,
                c = 0,
                u = 0,
                f = 0;
              s < t.length;

            )
              0 == t[s][0]
                ? ((i[o++] = s),
                  (l = u),
                  (c = f),
                  (u = 0),
                  (f = 0),
                  (a = t[s][1]))
                : (1 == t[s][0] ? (u += t[s][1].length) : (f += t[s][1].length),
                  a &&
                    a.length <= Math.max(l, c) &&
                    a.length <= Math.max(u, f) &&
                    (t.splice(i[o - 1], 0, new e.Diff(n, a)),
                    (t[i[o - 1] + 1][0] = 1),
                    o--,
                    (s = --o > 0 ? i[o - 1] : -1),
                    (l = 0),
                    (c = 0),
                    (u = 0),
                    (f = 0),
                    (a = null),
                    (r = !0))),
                s++;
            for (
              r && this.diff_cleanupMerge(t),
                this.diff_cleanupSemanticLossless(t),
                s = 1;
              s < t.length;

            ) {
              if (t[s - 1][0] == n && 1 == t[s][0]) {
                var d = t[s - 1][1],
                  h = t[s][1],
                  p = this.diff_commonOverlap_(d, h),
                  g = this.diff_commonOverlap_(h, d);
                p >= g
                  ? (p >= d.length / 2 || p >= h.length / 2) &&
                    (t.splice(s, 0, new e.Diff(0, h.substring(0, p))),
                    (t[s - 1][1] = d.substring(0, d.length - p)),
                    (t[s + 1][1] = h.substring(p)),
                    s++)
                  : (g >= d.length / 2 || g >= h.length / 2) &&
                    (t.splice(s, 0, new e.Diff(0, d.substring(0, g))),
                    (t[s - 1][0] = 1),
                    (t[s - 1][1] = h.substring(0, h.length - g)),
                    (t[s + 1][0] = n),
                    (t[s + 1][1] = d.substring(g)),
                    s++),
                  s++;
              }
              s++;
            }
          }),
          (e.prototype.diff_cleanupSemanticLossless = function (t) {
            function n(t, n) {
              if (!t || !n) return 6;
              var r = t.charAt(t.length - 1),
                i = n.charAt(0),
                o = r.match(e.nonAlphaNumericRegex_),
                a = i.match(e.nonAlphaNumericRegex_),
                s = o && r.match(e.whitespaceRegex_),
                l = a && i.match(e.whitespaceRegex_),
                c = s && r.match(e.linebreakRegex_),
                u = l && i.match(e.linebreakRegex_),
                f = c && t.match(e.blanklineEndRegex_),
                d = u && n.match(e.blanklineStartRegex_);
              return f || d
                ? 5
                : c || u
                ? 4
                : o && !s && l
                ? 3
                : s || l
                ? 2
                : o || a
                ? 1
                : 0;
            }
            for (var r = 1; r < t.length - 1; ) {
              if (0 == t[r - 1][0] && 0 == t[r + 1][0]) {
                var i = t[r - 1][1],
                  o = t[r][1],
                  a = t[r + 1][1],
                  s = this.diff_commonSuffix(i, o);
                if (s) {
                  var l = o.substring(o.length - s);
                  (i = i.substring(0, i.length - s)),
                    (o = l + o.substring(0, o.length - s)),
                    (a = l + a);
                }
                for (
                  var c = i, u = o, f = a, d = n(i, o) + n(o, a);
                  o.charAt(0) === a.charAt(0);

                ) {
                  (i += o.charAt(0)),
                    (o = o.substring(1) + a.charAt(0)),
                    (a = a.substring(1));
                  var h = n(i, o) + n(o, a);
                  h >= d && ((d = h), (c = i), (u = o), (f = a));
                }
                t[r - 1][1] != c &&
                  (c ? (t[r - 1][1] = c) : (t.splice(r - 1, 1), r--),
                  (t[r][1] = u),
                  f ? (t[r + 1][1] = f) : (t.splice(r + 1, 1), r--));
              }
              r++;
            }
          }),
          (e.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/),
          (e.whitespaceRegex_ = /\s/),
          (e.linebreakRegex_ = /[\r\n]/),
          (e.blanklineEndRegex_ = /\n\r?\n$/),
          (e.blanklineStartRegex_ = /^\r?\n\r?\n/),
          (e.prototype.diff_cleanupEfficiency = function (t) {
            for (
              var r = !1,
                i = [],
                o = 0,
                a = null,
                s = 0,
                l = !1,
                c = !1,
                u = !1,
                f = !1;
              s < t.length;

            )
              0 == t[s][0]
                ? (t[s][1].length < this.Diff_EditCost && (u || f)
                    ? ((i[o++] = s), (l = u), (c = f), (a = t[s][1]))
                    : ((o = 0), (a = null)),
                  (u = f = !1))
                : (t[s][0] == n ? (f = !0) : (u = !0),
                  a &&
                    ((l && c && u && f) ||
                      (a.length < this.Diff_EditCost / 2 &&
                        l + c + u + f == 3)) &&
                    (t.splice(i[o - 1], 0, new e.Diff(n, a)),
                    (t[i[o - 1] + 1][0] = 1),
                    o--,
                    (a = null),
                    l && c
                      ? ((u = f = !0), (o = 0))
                      : ((s = --o > 0 ? i[o - 1] : -1), (u = f = !1)),
                    (r = !0))),
                s++;
            r && this.diff_cleanupMerge(t);
          }),
          (e.prototype.diff_cleanupMerge = function (t) {
            t.push(new e.Diff(0, ""));
            for (var r, i = 0, o = 0, a = 0, s = "", l = ""; i < t.length; )
              switch (t[i][0]) {
                case 1:
                  a++, (l += t[i][1]), i++;
                  break;
                case n:
                  o++, (s += t[i][1]), i++;
                  break;
                case 0:
                  o + a > 1
                    ? (0 !== o &&
                        0 !== a &&
                        (0 !== (r = this.diff_commonPrefix(l, s)) &&
                          (i - o - a > 0 && 0 == t[i - o - a - 1][0]
                            ? (t[i - o - a - 1][1] += l.substring(0, r))
                            : (t.splice(0, 0, new e.Diff(0, l.substring(0, r))),
                              i++),
                          (l = l.substring(r)),
                          (s = s.substring(r))),
                        0 !== (r = this.diff_commonSuffix(l, s)) &&
                          ((t[i][1] = l.substring(l.length - r) + t[i][1]),
                          (l = l.substring(0, l.length - r)),
                          (s = s.substring(0, s.length - r)))),
                      (i -= o + a),
                      t.splice(i, o + a),
                      s.length && (t.splice(i, 0, new e.Diff(n, s)), i++),
                      l.length && (t.splice(i, 0, new e.Diff(1, l)), i++),
                      i++)
                    : 0 !== i && 0 == t[i - 1][0]
                    ? ((t[i - 1][1] += t[i][1]), t.splice(i, 1))
                    : i++,
                    (a = 0),
                    (o = 0),
                    (s = ""),
                    (l = "");
              }
            "" === t[t.length - 1][1] && t.pop();
            var c = !1;
            for (i = 1; i < t.length - 1; )
              0 == t[i - 1][0] &&
                0 == t[i + 1][0] &&
                (t[i][1].substring(t[i][1].length - t[i - 1][1].length) ==
                t[i - 1][1]
                  ? ((t[i][1] =
                      t[i - 1][1] +
                      t[i][1].substring(
                        0,
                        t[i][1].length - t[i - 1][1].length
                      )),
                    (t[i + 1][1] = t[i - 1][1] + t[i + 1][1]),
                    t.splice(i - 1, 1),
                    (c = !0))
                  : t[i][1].substring(0, t[i + 1][1].length) == t[i + 1][1] &&
                    ((t[i - 1][1] += t[i + 1][1]),
                    (t[i][1] =
                      t[i][1].substring(t[i + 1][1].length) + t[i + 1][1]),
                    t.splice(i + 1, 1),
                    (c = !0))),
                i++;
            c && this.diff_cleanupMerge(t);
          }),
          (e.prototype.diff_xIndex = function (t, e) {
            var r,
              i = 0,
              o = 0,
              a = 0,
              s = 0;
            for (
              r = 0;
              r < t.length &&
              (1 !== t[r][0] && (i += t[r][1].length),
              t[r][0] !== n && (o += t[r][1].length),
              !(i > e));
              r++
            )
              (a = i), (s = o);
            return t.length != r && t[r][0] === n ? s : s + (e - a);
          }),
          (e.prototype.diff_prettyHtml = function (t) {
            for (
              var e = [], r = /&/g, i = /</g, o = />/g, a = /\n/g, s = 0;
              s < t.length;
              s++
            ) {
              var l = t[s][0],
                c = t[s][1]
                  .replace(r, "&amp;")
                  .replace(i, "&lt;")
                  .replace(o, "&gt;")
                  .replace(a, "&para;<br>");
              switch (l) {
                case 1:
                  e[s] = '<ins style="background:#e6ffe6;">' + c + "</ins>";
                  break;
                case n:
                  e[s] = '<del style="background:#ffe6e6;">' + c + "</del>";
                  break;
                case 0:
                  e[s] = "<span>" + c + "</span>";
              }
            }
            return e.join("");
          }),
          (e.prototype.diff_text1 = function (t) {
            for (var e = [], n = 0; n < t.length; n++)
              1 !== t[n][0] && (e[n] = t[n][1]);
            return e.join("");
          }),
          (e.prototype.diff_text2 = function (t) {
            for (var e = [], r = 0; r < t.length; r++)
              t[r][0] !== n && (e[r] = t[r][1]);
            return e.join("");
          }),
          (e.prototype.diff_levenshtein = function (t) {
            for (var e = 0, r = 0, i = 0, o = 0; o < t.length; o++) {
              var a = t[o][0],
                s = t[o][1];
              switch (a) {
                case 1:
                  r += s.length;
                  break;
                case n:
                  i += s.length;
                  break;
                case 0:
                  (e += Math.max(r, i)), (r = 0), (i = 0);
              }
            }
            return (e += Math.max(r, i));
          }),
          (e.prototype.diff_toDelta = function (t) {
            for (var e = [], r = 0; r < t.length; r++)
              switch (t[r][0]) {
                case 1:
                  e[r] = "+" + encodeURI(t[r][1]);
                  break;
                case n:
                  e[r] = "-" + t[r][1].length;
                  break;
                case 0:
                  e[r] = "=" + t[r][1].length;
              }
            return e.join("\t").replace(/%20/g, " ");
          }),
          (e.prototype.diff_fromDelta = function (t, r) {
            for (
              var i = [], o = 0, a = 0, s = r.split(/\t/g), l = 0;
              l < s.length;
              l++
            ) {
              var c = s[l].substring(1);
              switch (s[l].charAt(0)) {
                case "+":
                  try {
                    i[o++] = new e.Diff(1, decodeURI(c));
                  } catch (t) {
                    throw new Error("Illegal escape in diff_fromDelta: " + c);
                  }
                  break;
                case "-":
                case "=":
                  var u = parseInt(c, 10);
                  if (isNaN(u) || u < 0)
                    throw new Error("Invalid number in diff_fromDelta: " + c);
                  var f = t.substring(a, (a += u));
                  "=" == s[l].charAt(0)
                    ? (i[o++] = new e.Diff(0, f))
                    : (i[o++] = new e.Diff(n, f));
                  break;
                default:
                  if (s[l])
                    throw new Error(
                      "Invalid diff operation in diff_fromDelta: " + s[l]
                    );
              }
            }
            if (a != t.length)
              throw new Error(
                "Delta length (" +
                  a +
                  ") does not equal source text length (" +
                  t.length +
                  ")."
              );
            return i;
          }),
          (e.prototype.match_main = function (t, e, n) {
            if (null == t || null == e || null == n)
              throw new Error("Null input. (match_main)");
            return (
              (n = Math.max(0, Math.min(n, t.length))),
              t == e
                ? 0
                : t.length
                ? t.substring(n, n + e.length) == e
                  ? n
                  : this.match_bitap_(t, e, n)
                : -1
            );
          }),
          (e.prototype.match_bitap_ = function (t, e, n) {
            if (e.length > this.Match_MaxBits)
              throw new Error("Pattern too long for this browser.");
            var r = this.match_alphabet_(e),
              i = this;
            function o(t, r) {
              var o = t / e.length,
                a = Math.abs(n - r);
              return i.Match_Distance ? o + a / i.Match_Distance : a ? 1 : o;
            }
            var a = this.Match_Threshold,
              s = t.indexOf(e, n);
            -1 != s &&
              ((a = Math.min(o(0, s), a)),
              -1 != (s = t.lastIndexOf(e, n + e.length)) &&
                (a = Math.min(o(0, s), a)));
            var l,
              c,
              u = 1 << (e.length - 1);
            s = -1;
            for (var f, d = e.length + t.length, h = 0; h < e.length; h++) {
              for (l = 0, c = d; l < c; )
                o(h, n + c) <= a ? (l = c) : (d = c),
                  (c = Math.floor((d - l) / 2 + l));
              d = c;
              var p = Math.max(1, n - c + 1),
                g = Math.min(n + c, t.length) + e.length,
                m = Array(g + 2);
              m[g + 1] = (1 << h) - 1;
              for (var y = g; y >= p; y--) {
                var A = r[t.charAt(y - 1)];
                if (
                  ((m[y] =
                    0 === h
                      ? ((m[y + 1] << 1) | 1) & A
                      : (((m[y + 1] << 1) | 1) & A) |
                        ((f[y + 1] | f[y]) << 1) |
                        1 |
                        f[y + 1]),
                  m[y] & u)
                ) {
                  var v = o(h, y - 1);
                  if (v <= a) {
                    if (((a = v), !((s = y - 1) > n))) break;
                    p = Math.max(1, 2 * n - s);
                  }
                }
              }
              if (o(h + 1, n) > a) break;
              f = m;
            }
            return s;
          }),
          (e.prototype.match_alphabet_ = function (t) {
            for (var e = {}, n = 0; n < t.length; n++) e[t.charAt(n)] = 0;
            for (n = 0; n < t.length; n++)
              e[t.charAt(n)] |= 1 << (t.length - n - 1);
            return e;
          }),
          (e.prototype.patch_addContext_ = function (t, n) {
            if (0 != n.length) {
              if (null === t.start2) throw Error("patch not initialized");
              for (
                var r = n.substring(t.start2, t.start2 + t.length1), i = 0;
                n.indexOf(r) != n.lastIndexOf(r) &&
                r.length <
                  this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;

              )
                (i += this.Patch_Margin),
                  (r = n.substring(t.start2 - i, t.start2 + t.length1 + i));
              i += this.Patch_Margin;
              var o = n.substring(t.start2 - i, t.start2);
              o && t.diffs.unshift(new e.Diff(0, o));
              var a = n.substring(
                t.start2 + t.length1,
                t.start2 + t.length1 + i
              );
              a && t.diffs.push(new e.Diff(0, a)),
                (t.start1 -= o.length),
                (t.start2 -= o.length),
                (t.length1 += o.length + a.length),
                (t.length2 += o.length + a.length);
            }
          }),
          (e.prototype.patch_make = function (t, r, i) {
            var o, a;
            if ("string" == typeof t && "string" == typeof r && void 0 === i)
              (o = t),
                (a = this.diff_main(o, r, !0)).length > 2 &&
                  (this.diff_cleanupSemantic(a),
                  this.diff_cleanupEfficiency(a));
            else if (t && "object" == typeof t && void 0 === r && void 0 === i)
              (a = t), (o = this.diff_text1(a));
            else if (
              "string" == typeof t &&
              r &&
              "object" == typeof r &&
              void 0 === i
            )
              (o = t), (a = r);
            else {
              if (
                "string" != typeof t ||
                "string" != typeof r ||
                !i ||
                "object" != typeof i
              )
                throw new Error("Unknown call format to patch_make.");
              (o = t), (a = i);
            }
            if (0 === a.length) return [];
            for (
              var s = [],
                l = new e.patch_obj(),
                c = 0,
                u = 0,
                f = 0,
                d = o,
                h = o,
                p = 0;
              p < a.length;
              p++
            ) {
              var g = a[p][0],
                m = a[p][1];
              switch ((c || 0 === g || ((l.start1 = u), (l.start2 = f)), g)) {
                case 1:
                  (l.diffs[c++] = a[p]),
                    (l.length2 += m.length),
                    (h = h.substring(0, f) + m + h.substring(f));
                  break;
                case n:
                  (l.length1 += m.length),
                    (l.diffs[c++] = a[p]),
                    (h = h.substring(0, f) + h.substring(f + m.length));
                  break;
                case 0:
                  m.length <= 2 * this.Patch_Margin && c && a.length != p + 1
                    ? ((l.diffs[c++] = a[p]),
                      (l.length1 += m.length),
                      (l.length2 += m.length))
                    : m.length >= 2 * this.Patch_Margin &&
                      c &&
                      (this.patch_addContext_(l, d),
                      s.push(l),
                      (l = new e.patch_obj()),
                      (c = 0),
                      (d = h),
                      (u = f));
              }
              1 !== g && (u += m.length), g !== n && (f += m.length);
            }
            return c && (this.patch_addContext_(l, d), s.push(l)), s;
          }),
          (e.prototype.patch_deepCopy = function (t) {
            for (var n = [], r = 0; r < t.length; r++) {
              var i = t[r],
                o = new e.patch_obj();
              o.diffs = [];
              for (var a = 0; a < i.diffs.length; a++)
                o.diffs[a] = new e.Diff(i.diffs[a][0], i.diffs[a][1]);
              (o.start1 = i.start1),
                (o.start2 = i.start2),
                (o.length1 = i.length1),
                (o.length2 = i.length2),
                (n[r] = o);
            }
            return n;
          }),
          (e.prototype.patch_apply = function (t, e) {
            if (0 == t.length) return [e, []];
            t = this.patch_deepCopy(t);
            var r = this.patch_addPadding(t);
            (e = r + e + r), this.patch_splitMax(t);
            for (var i = 0, o = [], a = 0; a < t.length; a++) {
              var s,
                l,
                c = t[a].start2 + i,
                u = this.diff_text1(t[a].diffs),
                f = -1;
              if (
                (u.length > this.Match_MaxBits
                  ? -1 !=
                      (s = this.match_main(
                        e,
                        u.substring(0, this.Match_MaxBits),
                        c
                      )) &&
                    (-1 ==
                      (f = this.match_main(
                        e,
                        u.substring(u.length - this.Match_MaxBits),
                        c + u.length - this.Match_MaxBits
                      )) ||
                      s >= f) &&
                    (s = -1)
                  : (s = this.match_main(e, u, c)),
                -1 == s)
              )
                (o[a] = !1), (i -= t[a].length2 - t[a].length1);
              else if (
                ((o[a] = !0),
                (i = s - c),
                u ==
                  (l =
                    -1 == f
                      ? e.substring(s, s + u.length)
                      : e.substring(s, f + this.Match_MaxBits)))
              )
                e =
                  e.substring(0, s) +
                  this.diff_text2(t[a].diffs) +
                  e.substring(s + u.length);
              else {
                var d = this.diff_main(u, l, !1);
                if (
                  u.length > this.Match_MaxBits &&
                  this.diff_levenshtein(d) / u.length >
                    this.Patch_DeleteThreshold
                )
                  o[a] = !1;
                else {
                  this.diff_cleanupSemanticLossless(d);
                  for (var h, p = 0, g = 0; g < t[a].diffs.length; g++) {
                    var m = t[a].diffs[g];
                    0 !== m[0] && (h = this.diff_xIndex(d, p)),
                      1 === m[0]
                        ? (e =
                            e.substring(0, s + h) + m[1] + e.substring(s + h))
                        : m[0] === n &&
                          (e =
                            e.substring(0, s + h) +
                            e.substring(
                              s + this.diff_xIndex(d, p + m[1].length)
                            )),
                      m[0] !== n && (p += m[1].length);
                  }
                }
              }
            }
            return [(e = e.substring(r.length, e.length - r.length)), o];
          }),
          (e.prototype.patch_addPadding = function (t) {
            for (var n = this.Patch_Margin, r = "", i = 1; i <= n; i++)
              r += String.fromCharCode(i);
            for (i = 0; i < t.length; i++)
              (t[i].start1 += n), (t[i].start2 += n);
            var o = t[0],
              a = o.diffs;
            if (0 == a.length || 0 != a[0][0])
              a.unshift(new e.Diff(0, r)),
                (o.start1 -= n),
                (o.start2 -= n),
                (o.length1 += n),
                (o.length2 += n);
            else if (n > a[0][1].length) {
              var s = n - a[0][1].length;
              (a[0][1] = r.substring(a[0][1].length) + a[0][1]),
                (o.start1 -= s),
                (o.start2 -= s),
                (o.length1 += s),
                (o.length2 += s);
            }
            if (
              0 == (a = (o = t[t.length - 1]).diffs).length ||
              0 != a[a.length - 1][0]
            )
              a.push(new e.Diff(0, r)), (o.length1 += n), (o.length2 += n);
            else if (n > a[a.length - 1][1].length) {
              s = n - a[a.length - 1][1].length;
              (a[a.length - 1][1] += r.substring(0, s)),
                (o.length1 += s),
                (o.length2 += s);
            }
            return r;
          }),
          (e.prototype.patch_splitMax = function (t) {
            for (var r = this.Match_MaxBits, i = 0; i < t.length; i++)
              if (!(t[i].length1 <= r)) {
                var o = t[i];
                t.splice(i--, 1);
                for (
                  var a = o.start1, s = o.start2, l = "";
                  0 !== o.diffs.length;

                ) {
                  var c = new e.patch_obj(),
                    u = !0;
                  for (
                    c.start1 = a - l.length,
                      c.start2 = s - l.length,
                      "" !== l &&
                        ((c.length1 = c.length2 = l.length),
                        c.diffs.push(new e.Diff(0, l)));
                    0 !== o.diffs.length && c.length1 < r - this.Patch_Margin;

                  ) {
                    var f = o.diffs[0][0],
                      d = o.diffs[0][1];
                    1 === f
                      ? ((c.length2 += d.length),
                        (s += d.length),
                        c.diffs.push(o.diffs.shift()),
                        (u = !1))
                      : f === n &&
                        1 == c.diffs.length &&
                        0 == c.diffs[0][0] &&
                        d.length > 2 * r
                      ? ((c.length1 += d.length),
                        (a += d.length),
                        (u = !1),
                        c.diffs.push(new e.Diff(f, d)),
                        o.diffs.shift())
                      : ((d = d.substring(
                          0,
                          r - c.length1 - this.Patch_Margin
                        )),
                        (c.length1 += d.length),
                        (a += d.length),
                        0 === f
                          ? ((c.length2 += d.length), (s += d.length))
                          : (u = !1),
                        c.diffs.push(new e.Diff(f, d)),
                        d == o.diffs[0][1]
                          ? o.diffs.shift()
                          : (o.diffs[0][1] = o.diffs[0][1].substring(
                              d.length
                            )));
                  }
                  l = (l = this.diff_text2(c.diffs)).substring(
                    l.length - this.Patch_Margin
                  );
                  var h = this.diff_text1(o.diffs).substring(
                    0,
                    this.Patch_Margin
                  );
                  "" !== h &&
                    ((c.length1 += h.length),
                    (c.length2 += h.length),
                    0 !== c.diffs.length && 0 === c.diffs[c.diffs.length - 1][0]
                      ? (c.diffs[c.diffs.length - 1][1] += h)
                      : c.diffs.push(new e.Diff(0, h))),
                    u || t.splice(++i, 0, c);
                }
              }
          }),
          (e.prototype.patch_toText = function (t) {
            for (var e = [], n = 0; n < t.length; n++) e[n] = t[n];
            return e.join("");
          }),
          (e.prototype.patch_fromText = function (t) {
            var r = [];
            if (!t) return r;
            for (
              var i = t.split("\n"),
                o = 0,
                a = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
              o < i.length;

            ) {
              var s = i[o].match(a);
              if (!s) throw new Error("Invalid patch string: " + i[o]);
              var l = new e.patch_obj();
              for (
                r.push(l),
                  l.start1 = parseInt(s[1], 10),
                  "" === s[2]
                    ? (l.start1--, (l.length1 = 1))
                    : "0" == s[2]
                    ? (l.length1 = 0)
                    : (l.start1--, (l.length1 = parseInt(s[2], 10))),
                  l.start2 = parseInt(s[3], 10),
                  "" === s[4]
                    ? (l.start2--, (l.length2 = 1))
                    : "0" == s[4]
                    ? (l.length2 = 0)
                    : (l.start2--, (l.length2 = parseInt(s[4], 10))),
                  o++;
                o < i.length;

              ) {
                var c = i[o].charAt(0);
                try {
                  var u = decodeURI(i[o].substring(1));
                } catch (t) {
                  throw new Error("Illegal escape in patch_fromText: " + u);
                }
                if ("-" == c) l.diffs.push(new e.Diff(n, u));
                else if ("+" == c) l.diffs.push(new e.Diff(1, u));
                else if (" " == c) l.diffs.push(new e.Diff(0, u));
                else {
                  if ("@" == c) break;
                  if ("" !== c)
                    throw new Error('Invalid patch mode "' + c + '" in: ' + u);
                }
                o++;
              }
            }
            return r;
          }),
          ((e.patch_obj = function () {
            (this.diffs = []),
              (this.start1 = null),
              (this.start2 = null),
              (this.length1 = 0),
              (this.length2 = 0);
          }).prototype.toString = function () {
            for (
              var t,
                e = [
                  "@@ -" +
                    (0 === this.length1
                      ? this.start1 + ",0"
                      : 1 == this.length1
                      ? this.start1 + 1
                      : this.start1 + 1 + "," + this.length1) +
                    " +" +
                    (0 === this.length2
                      ? this.start2 + ",0"
                      : 1 == this.length2
                      ? this.start2 + 1
                      : this.start2 + 1 + "," + this.length2) +
                    " @@\n",
                ],
                r = 0;
              r < this.diffs.length;
              r++
            ) {
              switch (this.diffs[r][0]) {
                case 1:
                  t = "+";
                  break;
                case n:
                  t = "-";
                  break;
                case 0:
                  t = " ";
              }
              e[r + 1] = t + encodeURI(this.diffs[r][1]) + "\n";
            }
            return e.join("").replace(/%20/g, " ");
          }),
          (t.exports = e),
          (t.exports.diff_match_patch = e),
          (t.exports.DIFF_DELETE = n),
          (t.exports.DIFF_INSERT = 1),
          (t.exports.DIFF_EQUAL = 0);
      },
      257: (t, e, n) => {
        const r = Symbol("SemVer ANY");
        class i {
          static get ANY() {
            return r;
          }
          constructor(t, e) {
            if (((e = o(e)), t instanceof i)) {
              if (t.loose === !!e.loose) return t;
              t = t.value;
            }
            (t = t.trim().split(/\s+/).join(" ")),
              c("comparator", t, e),
              (this.options = e),
              (this.loose = !!e.loose),
              this.parse(t),
              this.semver === r
                ? (this.value = "")
                : (this.value = this.operator + this.semver.version),
              c("comp", this);
          }
          parse(t) {
            const e = this.options.loose
                ? a[s.COMPARATORLOOSE]
                : a[s.COMPARATOR],
              n = t.match(e);
            if (!n) throw new TypeError(`Invalid comparator: ${t}`);
            (this.operator = void 0 !== n[1] ? n[1] : ""),
              "=" === this.operator && (this.operator = ""),
              n[2]
                ? (this.semver = new u(n[2], this.options.loose))
                : (this.semver = r);
          }
          toString() {
            return this.value;
          }
          test(t) {
            if (
              (c("Comparator.test", t, this.options.loose),
              this.semver === r || t === r)
            )
              return !0;
            if ("string" == typeof t)
              try {
                t = new u(t, this.options);
              } catch (t) {
                return !1;
              }
            return l(t, this.operator, this.semver, this.options);
          }
          intersects(t, e) {
            if (!(t instanceof i))
              throw new TypeError("a Comparator is required");
            return "" === this.operator
              ? "" === this.value || new f(t.value, e).test(this.value)
              : "" === t.operator
              ? "" === t.value || new f(this.value, e).test(t.semver)
              : (!(e = o(e)).includePrerelease ||
                  ("<0.0.0-0" !== this.value && "<0.0.0-0" !== t.value)) &&
                !(
                  !e.includePrerelease &&
                  (this.value.startsWith("<0.0.0") ||
                    t.value.startsWith("<0.0.0"))
                ) &&
                (!(
                  !this.operator.startsWith(">") || !t.operator.startsWith(">")
                ) ||
                  !(
                    !this.operator.startsWith("<") ||
                    !t.operator.startsWith("<")
                  ) ||
                  !(
                    this.semver.version !== t.semver.version ||
                    !this.operator.includes("=") ||
                    !t.operator.includes("=")
                  ) ||
                  !!(
                    l(this.semver, "<", t.semver, e) &&
                    this.operator.startsWith(">") &&
                    t.operator.startsWith("<")
                  ) ||
                  !!(
                    l(this.semver, ">", t.semver, e) &&
                    this.operator.startsWith("<") &&
                    t.operator.startsWith(">")
                  ));
          }
        }
        t.exports = i;
        const o = n(893),
          { safeRe: a, t: s } = n(765),
          l = n(539),
          c = n(225),
          u = n(376),
          f = n(902);
      },
      902: (t, e, n) => {
        class r {
          constructor(t, e) {
            if (((e = o(e)), t instanceof r))
              return t.loose === !!e.loose &&
                t.includePrerelease === !!e.includePrerelease
                ? t
                : new r(t.raw, e);
            if (t instanceof a)
              return (
                (this.raw = t.value), (this.set = [[t]]), this.format(), this
              );
            if (
              ((this.options = e),
              (this.loose = !!e.loose),
              (this.includePrerelease = !!e.includePrerelease),
              (this.raw = t.trim().split(/\s+/).join(" ")),
              (this.set = this.raw
                .split("||")
                .map((t) => this.parseRange(t.trim()))
                .filter((t) => t.length)),
              !this.set.length)
            )
              throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
            if (this.set.length > 1) {
              const t = this.set[0];
              if (
                ((this.set = this.set.filter((t) => !m(t[0]))),
                0 === this.set.length)
              )
                this.set = [t];
              else if (this.set.length > 1)
                for (const t of this.set)
                  if (1 === t.length && y(t[0])) {
                    this.set = [t];
                    break;
                  }
            }
            this.format();
          }
          format() {
            return (
              (this.range = this.set
                .map((t) => t.join(" ").trim())
                .join("||")
                .trim()),
              this.range
            );
          }
          toString() {
            return this.range;
          }
          parseRange(t) {
            const e =
                ((this.options.includePrerelease && p) |
                  (this.options.loose && g)) +
                ":" +
                t,
              n = i.get(e);
            if (n) return n;
            const r = this.options.loose,
              o = r ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
            (t = t.replace(o, T(this.options.includePrerelease))),
              s("hyphen replace", t),
              (t = t.replace(c[u.COMPARATORTRIM], f)),
              s("comparator trim", t),
              (t = t.replace(c[u.TILDETRIM], d)),
              s("tilde trim", t),
              (t = t.replace(c[u.CARETTRIM], h)),
              s("caret trim", t);
            let l = t
              .split(" ")
              .map((t) => v(t, this.options))
              .join(" ")
              .split(/\s+/)
              .map((t) => x(t, this.options));
            r &&
              (l = l.filter(
                (t) => (
                  s("loose invalid filter", t, this.options),
                  !!t.match(c[u.COMPARATORLOOSE])
                )
              )),
              s("range list", l);
            const y = new Map(),
              A = l.map((t) => new a(t, this.options));
            for (const t of A) {
              if (m(t)) return [t];
              y.set(t.value, t);
            }
            y.size > 1 && y.has("") && y.delete("");
            const M = [...y.values()];
            return i.set(e, M), M;
          }
          intersects(t, e) {
            if (!(t instanceof r)) throw new TypeError("a Range is required");
            return this.set.some(
              (n) =>
                A(n, e) &&
                t.set.some(
                  (t) =>
                    A(t, e) &&
                    n.every((n) => t.every((t) => n.intersects(t, e)))
                )
            );
          }
          test(t) {
            if (!t) return !1;
            if ("string" == typeof t)
              try {
                t = new l(t, this.options);
              } catch (t) {
                return !1;
              }
            for (let e = 0; e < this.set.length; e++)
              if (S(this.set[e], t, this.options)) return !0;
            return !1;
          }
        }
        t.exports = r;
        const i = new (n(62))({ max: 1e3 }),
          o = n(893),
          a = n(257),
          s = n(225),
          l = n(376),
          {
            safeRe: c,
            t: u,
            comparatorTrimReplace: f,
            tildeTrimReplace: d,
            caretTrimReplace: h,
          } = n(765),
          { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = n(295),
          m = (t) => "<0.0.0-0" === t.value,
          y = (t) => "" === t.value,
          A = (t, e) => {
            let n = !0;
            const r = t.slice();
            let i = r.pop();
            for (; n && r.length; )
              (n = r.every((t) => i.intersects(t, e))), (i = r.pop());
            return n;
          },
          v = (t, e) => (
            s("comp", t, e),
            (t = E(t, e)),
            s("caret", t),
            (t = L(t, e)),
            s("tildes", t),
            (t = j(t, e)),
            s("xrange", t),
            (t = N(t, e)),
            s("stars", t),
            t
          ),
          M = (t) => !t || "x" === t.toLowerCase() || "*" === t,
          L = (t, e) =>
            t
              .trim()
              .split(/\s+/)
              .map((t) => b(t, e))
              .join(" "),
          b = (t, e) => {
            const n = e.loose ? c[u.TILDELOOSE] : c[u.TILDE];
            return t.replace(n, (e, n, r, i, o) => {
              let a;
              return (
                s("tilde", t, e, n, r, i, o),
                M(n)
                  ? (a = "")
                  : M(r)
                  ? (a = `>=${n}.0.0 <${+n + 1}.0.0-0`)
                  : M(i)
                  ? (a = `>=${n}.${r}.0 <${n}.${+r + 1}.0-0`)
                  : o
                  ? (s("replaceTilde pr", o),
                    (a = `>=${n}.${r}.${i}-${o} <${n}.${+r + 1}.0-0`))
                  : (a = `>=${n}.${r}.${i} <${n}.${+r + 1}.0-0`),
                s("tilde return", a),
                a
              );
            });
          },
          E = (t, e) =>
            t
              .trim()
              .split(/\s+/)
              .map((t) => w(t, e))
              .join(" "),
          w = (t, e) => {
            s("caret", t, e);
            const n = e.loose ? c[u.CARETLOOSE] : c[u.CARET],
              r = e.includePrerelease ? "-0" : "";
            return t.replace(n, (e, n, i, o, a) => {
              let l;
              return (
                s("caret", t, e, n, i, o, a),
                M(n)
                  ? (l = "")
                  : M(i)
                  ? (l = `>=${n}.0.0${r} <${+n + 1}.0.0-0`)
                  : M(o)
                  ? (l =
                      "0" === n
                        ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0`
                        : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0`)
                  : a
                  ? (s("replaceCaret pr", a),
                    (l =
                      "0" === n
                        ? "0" === i
                          ? `>=${n}.${i}.${o}-${a} <${n}.${i}.${+o + 1}-0`
                          : `>=${n}.${i}.${o}-${a} <${n}.${+i + 1}.0-0`
                        : `>=${n}.${i}.${o}-${a} <${+n + 1}.0.0-0`))
                  : (s("no pr"),
                    (l =
                      "0" === n
                        ? "0" === i
                          ? `>=${n}.${i}.${o}${r} <${n}.${i}.${+o + 1}-0`
                          : `>=${n}.${i}.${o}${r} <${n}.${+i + 1}.0-0`
                        : `>=${n}.${i}.${o} <${+n + 1}.0.0-0`)),
                s("caret return", l),
                l
              );
            });
          },
          j = (t, e) => (
            s("replaceXRanges", t, e),
            t
              .split(/\s+/)
              .map((t) => C(t, e))
              .join(" ")
          ),
          C = (t, e) => {
            t = t.trim();
            const n = e.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
            return t.replace(n, (n, r, i, o, a, l) => {
              s("xRange", t, n, r, i, o, a, l);
              const c = M(i),
                u = c || M(o),
                f = u || M(a),
                d = f;
              return (
                "=" === r && d && (r = ""),
                (l = e.includePrerelease ? "-0" : ""),
                c
                  ? (n = ">" === r || "<" === r ? "<0.0.0-0" : "*")
                  : r && d
                  ? (u && (o = 0),
                    (a = 0),
                    ">" === r
                      ? ((r = ">="),
                        u
                          ? ((i = +i + 1), (o = 0), (a = 0))
                          : ((o = +o + 1), (a = 0)))
                      : "<=" === r &&
                        ((r = "<"), u ? (i = +i + 1) : (o = +o + 1)),
                    "<" === r && (l = "-0"),
                    (n = `${r + i}.${o}.${a}${l}`))
                  : u
                  ? (n = `>=${i}.0.0${l} <${+i + 1}.0.0-0`)
                  : f && (n = `>=${i}.${o}.0${l} <${i}.${+o + 1}.0-0`),
                s("xRange return", n),
                n
              );
            });
          },
          N = (t, e) => (
            s("replaceStars", t, e), t.trim().replace(c[u.STAR], "")
          ),
          x = (t, e) => (
            s("replaceGTE0", t, e),
            t.trim().replace(c[e.includePrerelease ? u.GTE0PRE : u.GTE0], "")
          ),
          T = (t) => (e, n, r, i, o, a, s, l, c, u, f, d, h) =>
            `${(n = M(r)
              ? ""
              : M(i)
              ? `>=${r}.0.0${t ? "-0" : ""}`
              : M(o)
              ? `>=${r}.${i}.0${t ? "-0" : ""}`
              : a
              ? `>=${n}`
              : `>=${n}${t ? "-0" : ""}`)} ${(l = M(c)
              ? ""
              : M(u)
              ? `<${+c + 1}.0.0-0`
              : M(f)
              ? `<${c}.${+u + 1}.0-0`
              : d
              ? `<=${c}.${u}.${f}-${d}`
              : t
              ? `<${c}.${u}.${+f + 1}-0`
              : `<=${l}`)}`.trim(),
          S = (t, e, n) => {
            for (let n = 0; n < t.length; n++) if (!t[n].test(e)) return !1;
            if (e.prerelease.length && !n.includePrerelease) {
              for (let n = 0; n < t.length; n++)
                if (
                  (s(t[n].semver),
                  t[n].semver !== a.ANY && t[n].semver.prerelease.length > 0)
                ) {
                  const r = t[n].semver;
                  if (
                    r.major === e.major &&
                    r.minor === e.minor &&
                    r.patch === e.patch
                  )
                    return !0;
                }
              return !1;
            }
            return !0;
          };
      },
      376: (t, e, n) => {
        const r = n(225),
          { MAX_LENGTH: i, MAX_SAFE_INTEGER: o } = n(295),
          { safeRe: a, t: s } = n(765),
          l = n(893),
          { compareIdentifiers: c } = n(742);
        class u {
          constructor(t, e) {
            if (((e = l(e)), t instanceof u)) {
              if (
                t.loose === !!e.loose &&
                t.includePrerelease === !!e.includePrerelease
              )
                return t;
              t = t.version;
            } else if ("string" != typeof t)
              throw new TypeError(
                `Invalid version. Must be a string. Got type "${typeof t}".`
              );
            if (t.length > i)
              throw new TypeError(`version is longer than ${i} characters`);
            r("SemVer", t, e),
              (this.options = e),
              (this.loose = !!e.loose),
              (this.includePrerelease = !!e.includePrerelease);
            const n = t.trim().match(e.loose ? a[s.LOOSE] : a[s.FULL]);
            if (!n) throw new TypeError(`Invalid Version: ${t}`);
            if (
              ((this.raw = t),
              (this.major = +n[1]),
              (this.minor = +n[2]),
              (this.patch = +n[3]),
              this.major > o || this.major < 0)
            )
              throw new TypeError("Invalid major version");
            if (this.minor > o || this.minor < 0)
              throw new TypeError("Invalid minor version");
            if (this.patch > o || this.patch < 0)
              throw new TypeError("Invalid patch version");
            n[4]
              ? (this.prerelease = n[4].split(".").map((t) => {
                  if (/^[0-9]+$/.test(t)) {
                    const e = +t;
                    if (e >= 0 && e < o) return e;
                  }
                  return t;
                }))
              : (this.prerelease = []),
              (this.build = n[5] ? n[5].split(".") : []),
              this.format();
          }
          format() {
            return (
              (this.version = `${this.major}.${this.minor}.${this.patch}`),
              this.prerelease.length &&
                (this.version += `-${this.prerelease.join(".")}`),
              this.version
            );
          }
          toString() {
            return this.version;
          }
          compare(t) {
            if (
              (r("SemVer.compare", this.version, this.options, t),
              !(t instanceof u))
            ) {
              if ("string" == typeof t && t === this.version) return 0;
              t = new u(t, this.options);
            }
            return t.version === this.version
              ? 0
              : this.compareMain(t) || this.comparePre(t);
          }
          compareMain(t) {
            return (
              t instanceof u || (t = new u(t, this.options)),
              c(this.major, t.major) ||
                c(this.minor, t.minor) ||
                c(this.patch, t.patch)
            );
          }
          comparePre(t) {
            if (
              (t instanceof u || (t = new u(t, this.options)),
              this.prerelease.length && !t.prerelease.length)
            )
              return -1;
            if (!this.prerelease.length && t.prerelease.length) return 1;
            if (!this.prerelease.length && !t.prerelease.length) return 0;
            let e = 0;
            do {
              const n = this.prerelease[e],
                i = t.prerelease[e];
              if (
                (r("prerelease compare", e, n, i), void 0 === n && void 0 === i)
              )
                return 0;
              if (void 0 === i) return 1;
              if (void 0 === n) return -1;
              if (n !== i) return c(n, i);
            } while (++e);
          }
          compareBuild(t) {
            t instanceof u || (t = new u(t, this.options));
            let e = 0;
            do {
              const n = this.build[e],
                i = t.build[e];
              if (
                (r("prerelease compare", e, n, i), void 0 === n && void 0 === i)
              )
                return 0;
              if (void 0 === i) return 1;
              if (void 0 === n) return -1;
              if (n !== i) return c(n, i);
            } while (++e);
          }
          inc(t, e, n) {
            switch (t) {
              case "premajor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  (this.minor = 0),
                  this.major++,
                  this.inc("pre", e, n);
                break;
              case "preminor":
                (this.prerelease.length = 0),
                  (this.patch = 0),
                  this.minor++,
                  this.inc("pre", e, n);
                break;
              case "prepatch":
                (this.prerelease.length = 0),
                  this.inc("patch", e, n),
                  this.inc("pre", e, n);
                break;
              case "prerelease":
                0 === this.prerelease.length && this.inc("patch", e, n),
                  this.inc("pre", e, n);
                break;
              case "major":
                (0 === this.minor &&
                  0 === this.patch &&
                  0 !== this.prerelease.length) ||
                  this.major++,
                  (this.minor = 0),
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "minor":
                (0 === this.patch && 0 !== this.prerelease.length) ||
                  this.minor++,
                  (this.patch = 0),
                  (this.prerelease = []);
                break;
              case "patch":
                0 === this.prerelease.length && this.patch++,
                  (this.prerelease = []);
                break;
              case "pre": {
                const t = Number(n) ? 1 : 0;
                if (!e && !1 === n)
                  throw new Error(
                    "invalid increment argument: identifier is empty"
                  );
                if (0 === this.prerelease.length) this.prerelease = [t];
                else {
                  let r = this.prerelease.length;
                  for (; --r >= 0; )
                    "number" == typeof this.prerelease[r] &&
                      (this.prerelease[r]++, (r = -2));
                  if (-1 === r) {
                    if (e === this.prerelease.join(".") && !1 === n)
                      throw new Error(
                        "invalid increment argument: identifier already exists"
                      );
                    this.prerelease.push(t);
                  }
                }
                if (e) {
                  let r = [e, t];
                  !1 === n && (r = [e]),
                    0 === c(this.prerelease[0], e)
                      ? isNaN(this.prerelease[1]) && (this.prerelease = r)
                      : (this.prerelease = r);
                }
                break;
              }
              default:
                throw new Error(`invalid increment argument: ${t}`);
            }
            return (
              (this.raw = this.format()),
              this.build.length && (this.raw += `+${this.build.join(".")}`),
              this
            );
          }
        }
        t.exports = u;
      },
      539: (t, e, n) => {
        const r = n(718),
          i = n(194),
          o = n(312),
          a = n(903),
          s = n(544),
          l = n(56);
        t.exports = (t, e, n, c) => {
          switch (e) {
            case "===":
              return (
                "object" == typeof t && (t = t.version),
                "object" == typeof n && (n = n.version),
                t === n
              );
            case "!==":
              return (
                "object" == typeof t && (t = t.version),
                "object" == typeof n && (n = n.version),
                t !== n
              );
            case "":
            case "=":
            case "==":
              return r(t, n, c);
            case "!=":
              return i(t, n, c);
            case ">":
              return o(t, n, c);
            case ">=":
              return a(t, n, c);
            case "<":
              return s(t, n, c);
            case "<=":
              return l(t, n, c);
            default:
              throw new TypeError(`Invalid operator: ${e}`);
          }
        };
      },
      38: (t, e, n) => {
        const r = n(376),
          i = n(959),
          { safeRe: o, t: a } = n(765);
        t.exports = (t, e) => {
          if (t instanceof r) return t;
          if (("number" == typeof t && (t = String(t)), "string" != typeof t))
            return null;
          let n = null;
          if ((e = e || {}).rtl) {
            let e;
            for (
              ;
              (e = o[a.COERCERTL].exec(t)) &&
              (!n || n.index + n[0].length !== t.length);

            )
              (n && e.index + e[0].length === n.index + n[0].length) || (n = e),
                (o[a.COERCERTL].lastIndex =
                  e.index + e[1].length + e[2].length);
            o[a.COERCERTL].lastIndex = -1;
          } else n = t.match(o[a.COERCE]);
          return null === n
            ? null
            : i(`${n[2]}.${n[3] || "0"}.${n[4] || "0"}`, e);
        };
      },
      269: (t, e, n) => {
        const r = n(376);
        t.exports = (t, e, n) => new r(t, n).compare(new r(e, n));
      },
      718: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => 0 === r(t, e, n);
      },
      312: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => r(t, e, n) > 0;
      },
      903: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => r(t, e, n) >= 0;
      },
      544: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => r(t, e, n) < 0;
      },
      56: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => r(t, e, n) <= 0;
      },
      194: (t, e, n) => {
        const r = n(269);
        t.exports = (t, e, n) => 0 !== r(t, e, n);
      },
      959: (t, e, n) => {
        const r = n(376);
        t.exports = (t, e, n = !1) => {
          if (t instanceof r) return t;
          try {
            return new r(t, e);
          } catch (t) {
            if (!n) return null;
            throw t;
          }
        };
      },
      295: (t) => {
        const e = Number.MAX_SAFE_INTEGER || 9007199254740991;
        t.exports = {
          MAX_LENGTH: 256,
          MAX_SAFE_COMPONENT_LENGTH: 16,
          MAX_SAFE_BUILD_LENGTH: 250,
          MAX_SAFE_INTEGER: e,
          RELEASE_TYPES: [
            "major",
            "premajor",
            "minor",
            "preminor",
            "patch",
            "prepatch",
            "prerelease",
          ],
          SEMVER_SPEC_VERSION: "2.0.0",
          FLAG_INCLUDE_PRERELEASE: 1,
          FLAG_LOOSE: 2,
        };
      },
      225: (t) => {
        const e =
          "object" == typeof process &&
          process.env &&
          process.env.NODE_DEBUG &&
          /\bsemver\b/i.test(process.env.NODE_DEBUG)
            ? (...t) => console.error("SEMVER", ...t)
            : () => {};
        t.exports = e;
      },
      742: (t) => {
        const e = /^[0-9]+$/,
          n = (t, n) => {
            const r = e.test(t),
              i = e.test(n);
            return (
              r && i && ((t = +t), (n = +n)),
              t === n ? 0 : r && !i ? -1 : i && !r ? 1 : t < n ? -1 : 1
            );
          };
        t.exports = {
          compareIdentifiers: n,
          rcompareIdentifiers: (t, e) => n(e, t),
        };
      },
      893: (t) => {
        const e = Object.freeze({ loose: !0 }),
          n = Object.freeze({});
        t.exports = (t) => (t ? ("object" != typeof t ? e : t) : n);
      },
      765: (t, e, n) => {
        const {
            MAX_SAFE_COMPONENT_LENGTH: r,
            MAX_SAFE_BUILD_LENGTH: i,
            MAX_LENGTH: o,
          } = n(295),
          a = n(225),
          s = ((e = t.exports = {}).re = []),
          l = (e.safeRe = []),
          c = (e.src = []),
          u = (e.t = {});
        let f = 0;
        const d = "[a-zA-Z0-9-]",
          h = [
            ["\\s", 1],
            ["\\d", o],
            [d, i],
          ],
          p = (t, e, n) => {
            const r = ((t) => {
                for (const [e, n] of h)
                  t = t
                    .split(`${e}*`)
                    .join(`${e}{0,${n}}`)
                    .split(`${e}+`)
                    .join(`${e}{1,${n}}`);
                return t;
              })(e),
              i = f++;
            a(t, i, e),
              (u[t] = i),
              (c[i] = e),
              (s[i] = new RegExp(e, n ? "g" : void 0)),
              (l[i] = new RegExp(r, n ? "g" : void 0));
          };
        p("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
          p("NUMERICIDENTIFIERLOOSE", "\\d+"),
          p("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`),
          p(
            "MAINVERSION",
            `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${
              c[u.NUMERICIDENTIFIER]
            })`
          ),
          p(
            "MAINVERSIONLOOSE",
            `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${
              c[u.NUMERICIDENTIFIERLOOSE]
            })\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`
          ),
          p(
            "PRERELEASEIDENTIFIER",
            `(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`
          ),
          p(
            "PRERELEASEIDENTIFIERLOOSE",
            `(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`
          ),
          p(
            "PRERELEASE",
            `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${
              c[u.PRERELEASEIDENTIFIER]
            })*))`
          ),
          p(
            "PRERELEASELOOSE",
            `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
              c[u.PRERELEASEIDENTIFIERLOOSE]
            })*))`
          ),
          p("BUILDIDENTIFIER", `${d}+`),
          p(
            "BUILD",
            `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`
          ),
          p(
            "FULLPLAIN",
            `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`
          ),
          p("FULL", `^${c[u.FULLPLAIN]}$`),
          p(
            "LOOSEPLAIN",
            `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${
              c[u.BUILD]
            }?`
          ),
          p("LOOSE", `^${c[u.LOOSEPLAIN]}$`),
          p("GTLT", "((?:<|>)?=?)"),
          p("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
          p("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`),
          p(
            "XRANGEPLAIN",
            `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${
              c[u.XRANGEIDENTIFIER]
            })(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${
              c[u.BUILD]
            }?)?)?`
          ),
          p(
            "XRANGEPLAINLOOSE",
            `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
              c[u.XRANGEIDENTIFIERLOOSE]
            })(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${
              c[u.PRERELEASELOOSE]
            })?${c[u.BUILD]}?)?)?`
          ),
          p("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`),
          p("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`),
          p(
            "COERCE",
            `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?(?:$|[^\\d])`
          ),
          p("COERCERTL", c[u.COERCE], !0),
          p("LONETILDE", "(?:~>?)"),
          p("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0),
          (e.tildeTrimReplace = "$1~"),
          p("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`),
          p("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`),
          p("LONECARET", "(?:\\^)"),
          p("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0),
          (e.caretTrimReplace = "$1^"),
          p("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`),
          p("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`),
          p("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`),
          p("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`),
          p(
            "COMPARATORTRIM",
            `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`,
            !0
          ),
          (e.comparatorTrimReplace = "$1$2$3"),
          p(
            "HYPHENRANGE",
            `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`
          ),
          p(
            "HYPHENRANGELOOSE",
            `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${
              c[u.XRANGEPLAINLOOSE]
            })\\s*$`
          ),
          p("STAR", "(<|>)?=?\\s*\\*"),
          p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
          p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
      },
      62: (t, e, n) => {
        "use strict";
        const r = n(221),
          i = Symbol("max"),
          o = Symbol("length"),
          a = Symbol("lengthCalculator"),
          s = Symbol("allowStale"),
          l = Symbol("maxAge"),
          c = Symbol("dispose"),
          u = Symbol("noDisposeOnSet"),
          f = Symbol("lruList"),
          d = Symbol("cache"),
          h = Symbol("updateAgeOnGet"),
          p = () => 1;
        const g = (t, e, n) => {
            const r = t[d].get(e);
            if (r) {
              const e = r.value;
              if (m(t, e)) {
                if ((A(t, r), !t[s])) return;
              } else
                n && (t[h] && (r.value.now = Date.now()), t[f].unshiftNode(r));
              return e.value;
            }
          },
          m = (t, e) => {
            if (!e || (!e.maxAge && !t[l])) return !1;
            const n = Date.now() - e.now;
            return e.maxAge ? n > e.maxAge : t[l] && n > t[l];
          },
          y = (t) => {
            if (t[o] > t[i])
              for (let e = t[f].tail; t[o] > t[i] && null !== e; ) {
                const n = e.prev;
                A(t, e), (e = n);
              }
          },
          A = (t, e) => {
            if (e) {
              const n = e.value;
              t[c] && t[c](n.key, n.value),
                (t[o] -= n.length),
                t[d].delete(n.key),
                t[f].removeNode(e);
            }
          };
        class v {
          constructor(t, e, n, r, i) {
            (this.key = t),
              (this.value = e),
              (this.length = n),
              (this.now = r),
              (this.maxAge = i || 0);
          }
        }
        const M = (t, e, n, r) => {
          let i = n.value;
          m(t, i) && (A(t, n), t[s] || (i = void 0)),
            i && e.call(r, i.value, i.key, t);
        };
        t.exports = class {
          constructor(t) {
            if (
              ("number" == typeof t && (t = { max: t }),
              t || (t = {}),
              t.max && ("number" != typeof t.max || t.max < 0))
            )
              throw new TypeError("max must be a non-negative number");
            this[i] = t.max || 1 / 0;
            const e = t.length || p;
            if (
              ((this[a] = "function" != typeof e ? p : e),
              (this[s] = t.stale || !1),
              t.maxAge && "number" != typeof t.maxAge)
            )
              throw new TypeError("maxAge must be a number");
            (this[l] = t.maxAge || 0),
              (this[c] = t.dispose),
              (this[u] = t.noDisposeOnSet || !1),
              (this[h] = t.updateAgeOnGet || !1),
              this.reset();
          }
          set max(t) {
            if ("number" != typeof t || t < 0)
              throw new TypeError("max must be a non-negative number");
            (this[i] = t || 1 / 0), y(this);
          }
          get max() {
            return this[i];
          }
          set allowStale(t) {
            this[s] = !!t;
          }
          get allowStale() {
            return this[s];
          }
          set maxAge(t) {
            if ("number" != typeof t)
              throw new TypeError("maxAge must be a non-negative number");
            (this[l] = t), y(this);
          }
          get maxAge() {
            return this[l];
          }
          set lengthCalculator(t) {
            "function" != typeof t && (t = p),
              t !== this[a] &&
                ((this[a] = t),
                (this[o] = 0),
                this[f].forEach((t) => {
                  (t.length = this[a](t.value, t.key)), (this[o] += t.length);
                })),
              y(this);
          }
          get lengthCalculator() {
            return this[a];
          }
          get length() {
            return this[o];
          }
          get itemCount() {
            return this[f].length;
          }
          rforEach(t, e) {
            e = e || this;
            for (let n = this[f].tail; null !== n; ) {
              const r = n.prev;
              M(this, t, n, e), (n = r);
            }
          }
          forEach(t, e) {
            e = e || this;
            for (let n = this[f].head; null !== n; ) {
              const r = n.next;
              M(this, t, n, e), (n = r);
            }
          }
          keys() {
            return this[f].toArray().map((t) => t.key);
          }
          values() {
            return this[f].toArray().map((t) => t.value);
          }
          reset() {
            this[c] &&
              this[f] &&
              this[f].length &&
              this[f].forEach((t) => this[c](t.key, t.value)),
              (this[d] = new Map()),
              (this[f] = new r()),
              (this[o] = 0);
          }
          dump() {
            return this[f]
              .map(
                (t) =>
                  !m(this, t) && {
                    k: t.key,
                    v: t.value,
                    e: t.now + (t.maxAge || 0),
                  }
              )
              .toArray()
              .filter((t) => t);
          }
          dumpLru() {
            return this[f];
          }
          set(t, e, n) {
            if ((n = n || this[l]) && "number" != typeof n)
              throw new TypeError("maxAge must be a number");
            const r = n ? Date.now() : 0,
              s = this[a](e, t);
            if (this[d].has(t)) {
              if (s > this[i]) return A(this, this[d].get(t)), !1;
              const a = this[d].get(t).value;
              return (
                this[c] && (this[u] || this[c](t, a.value)),
                (a.now = r),
                (a.maxAge = n),
                (a.value = e),
                (this[o] += s - a.length),
                (a.length = s),
                this.get(t),
                y(this),
                !0
              );
            }
            const h = new v(t, e, s, r, n);
            return h.length > this[i]
              ? (this[c] && this[c](t, e), !1)
              : ((this[o] += h.length),
                this[f].unshift(h),
                this[d].set(t, this[f].head),
                y(this),
                !0);
          }
          has(t) {
            if (!this[d].has(t)) return !1;
            const e = this[d].get(t).value;
            return !m(this, e);
          }
          get(t) {
            return g(this, t, !0);
          }
          peek(t) {
            return g(this, t, !1);
          }
          pop() {
            const t = this[f].tail;
            return t ? (A(this, t), t.value) : null;
          }
          del(t) {
            A(this, this[d].get(t));
          }
          load(t) {
            this.reset();
            const e = Date.now();
            for (let n = t.length - 1; n >= 0; n--) {
              const r = t[n],
                i = r.e || 0;
              if (0 === i) this.set(r.k, r.v);
              else {
                const t = i - e;
                t > 0 && this.set(r.k, r.v, t);
              }
            }
          }
          prune() {
            this[d].forEach((t, e) => g(this, e, !1));
          }
        };
      },
      307: (t) => {
        "use strict";
        t.exports = function (t) {
          t.prototype[Symbol.iterator] = function* () {
            for (let t = this.head; t; t = t.next) yield t.value;
          };
        };
      },
      221: (t, e, n) => {
        "use strict";
        function r(t) {
          var e = this;
          if (
            (e instanceof r || (e = new r()),
            (e.tail = null),
            (e.head = null),
            (e.length = 0),
            t && "function" == typeof t.forEach)
          )
            t.forEach(function (t) {
              e.push(t);
            });
          else if (arguments.length > 0)
            for (var n = 0, i = arguments.length; n < i; n++)
              e.push(arguments[n]);
          return e;
        }
        function i(t, e, n) {
          var r = e === t.head ? new s(n, null, e, t) : new s(n, e, e.next, t);
          return (
            null === r.next && (t.tail = r),
            null === r.prev && (t.head = r),
            t.length++,
            r
          );
        }
        function o(t, e) {
          (t.tail = new s(e, t.tail, null, t)),
            t.head || (t.head = t.tail),
            t.length++;
        }
        function a(t, e) {
          (t.head = new s(e, null, t.head, t)),
            t.tail || (t.tail = t.head),
            t.length++;
        }
        function s(t, e, n, r) {
          if (!(this instanceof s)) return new s(t, e, n, r);
          (this.list = r),
            (this.value = t),
            e ? ((e.next = this), (this.prev = e)) : (this.prev = null),
            n ? ((n.prev = this), (this.next = n)) : (this.next = null);
        }
        (t.exports = r),
          (r.Node = s),
          (r.create = r),
          (r.prototype.removeNode = function (t) {
            if (t.list !== this)
              throw new Error(
                "removing node which does not belong to this list"
              );
            var e = t.next,
              n = t.prev;
            return (
              e && (e.prev = n),
              n && (n.next = e),
              t === this.head && (this.head = e),
              t === this.tail && (this.tail = n),
              t.list.length--,
              (t.next = null),
              (t.prev = null),
              (t.list = null),
              e
            );
          }),
          (r.prototype.unshiftNode = function (t) {
            if (t !== this.head) {
              t.list && t.list.removeNode(t);
              var e = this.head;
              (t.list = this),
                (t.next = e),
                e && (e.prev = t),
                (this.head = t),
                this.tail || (this.tail = t),
                this.length++;
            }
          }),
          (r.prototype.pushNode = function (t) {
            if (t !== this.tail) {
              t.list && t.list.removeNode(t);
              var e = this.tail;
              (t.list = this),
                (t.prev = e),
                e && (e.next = t),
                (this.tail = t),
                this.head || (this.head = t),
                this.length++;
            }
          }),
          (r.prototype.push = function () {
            for (var t = 0, e = arguments.length; t < e; t++)
              o(this, arguments[t]);
            return this.length;
          }),
          (r.prototype.unshift = function () {
            for (var t = 0, e = arguments.length; t < e; t++)
              a(this, arguments[t]);
            return this.length;
          }),
          (r.prototype.pop = function () {
            if (this.tail) {
              var t = this.tail.value;
              return (
                (this.tail = this.tail.prev),
                this.tail ? (this.tail.next = null) : (this.head = null),
                this.length--,
                t
              );
            }
          }),
          (r.prototype.shift = function () {
            if (this.head) {
              var t = this.head.value;
              return (
                (this.head = this.head.next),
                this.head ? (this.head.prev = null) : (this.tail = null),
                this.length--,
                t
              );
            }
          }),
          (r.prototype.forEach = function (t, e) {
            e = e || this;
            for (var n = this.head, r = 0; null !== n; r++)
              t.call(e, n.value, r, this), (n = n.next);
          }),
          (r.prototype.forEachReverse = function (t, e) {
            e = e || this;
            for (var n = this.tail, r = this.length - 1; null !== n; r--)
              t.call(e, n.value, r, this), (n = n.prev);
          }),
          (r.prototype.get = function (t) {
            for (var e = 0, n = this.head; null !== n && e < t; e++) n = n.next;
            if (e === t && null !== n) return n.value;
          }),
          (r.prototype.getReverse = function (t) {
            for (var e = 0, n = this.tail; null !== n && e < t; e++) n = n.prev;
            if (e === t && null !== n) return n.value;
          }),
          (r.prototype.map = function (t, e) {
            e = e || this;
            for (var n = new r(), i = this.head; null !== i; )
              n.push(t.call(e, i.value, this)), (i = i.next);
            return n;
          }),
          (r.prototype.mapReverse = function (t, e) {
            e = e || this;
            for (var n = new r(), i = this.tail; null !== i; )
              n.push(t.call(e, i.value, this)), (i = i.prev);
            return n;
          }),
          (r.prototype.reduce = function (t, e) {
            var n,
              r = this.head;
            if (arguments.length > 1) n = e;
            else {
              if (!this.head)
                throw new TypeError(
                  "Reduce of empty list with no initial value"
                );
              (r = this.head.next), (n = this.head.value);
            }
            for (var i = 0; null !== r; i++)
              (n = t(n, r.value, i)), (r = r.next);
            return n;
          }),
          (r.prototype.reduceReverse = function (t, e) {
            var n,
              r = this.tail;
            if (arguments.length > 1) n = e;
            else {
              if (!this.tail)
                throw new TypeError(
                  "Reduce of empty list with no initial value"
                );
              (r = this.tail.prev), (n = this.tail.value);
            }
            for (var i = this.length - 1; null !== r; i--)
              (n = t(n, r.value, i)), (r = r.prev);
            return n;
          }),
          (r.prototype.toArray = function () {
            for (
              var t = new Array(this.length), e = 0, n = this.head;
              null !== n;
              e++
            )
              (t[e] = n.value), (n = n.next);
            return t;
          }),
          (r.prototype.toArrayReverse = function () {
            for (
              var t = new Array(this.length), e = 0, n = this.tail;
              null !== n;
              e++
            )
              (t[e] = n.value), (n = n.prev);
            return t;
          }),
          (r.prototype.slice = function (t, e) {
            (e = e || this.length) < 0 && (e += this.length),
              (t = t || 0) < 0 && (t += this.length);
            var n = new r();
            if (e < t || e < 0) return n;
            t < 0 && (t = 0), e > this.length && (e = this.length);
            for (var i = 0, o = this.head; null !== o && i < t; i++) o = o.next;
            for (; null !== o && i < e; i++, o = o.next) n.push(o.value);
            return n;
          }),
          (r.prototype.sliceReverse = function (t, e) {
            (e = e || this.length) < 0 && (e += this.length),
              (t = t || 0) < 0 && (t += this.length);
            var n = new r();
            if (e < t || e < 0) return n;
            t < 0 && (t = 0), e > this.length && (e = this.length);
            for (var i = this.length, o = this.tail; null !== o && i > e; i--)
              o = o.prev;
            for (; null !== o && i > t; i--, o = o.prev) n.push(o.value);
            return n;
          }),
          (r.prototype.splice = function (t, e, ...n) {
            t > this.length && (t = this.length - 1),
              t < 0 && (t = this.length + t);
            for (var r = 0, o = this.head; null !== o && r < t; r++) o = o.next;
            var a = [];
            for (r = 0; o && r < e; r++)
              a.push(o.value), (o = this.removeNode(o));
            null === o && (o = this.tail),
              o !== this.head && o !== this.tail && (o = o.prev);
            for (r = 0; r < n.length; r++) o = i(this, o, n[r]);
            return a;
          }),
          (r.prototype.reverse = function () {
            for (
              var t = this.head, e = this.tail, n = t;
              null !== n;
              n = n.prev
            ) {
              var r = n.prev;
              (n.prev = n.next), (n.next = r);
            }
            return (this.head = e), (this.tail = t), this;
          });
        try {
          n(307)(r);
        } catch (t) {}
      },
      775: (t, e, n) => {
        const r = n(376),
          i = n(902);
        t.exports = (t, e, n) => {
          let o = null,
            a = null,
            s = null;
          try {
            s = new i(e, n);
          } catch (t) {
            return null;
          }
          return (
            t.forEach((t) => {
              s.test(t) &&
                ((o && -1 !== a.compare(t)) || ((o = t), (a = new r(o, n))));
            }),
            o
          );
        };
      },
      967: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(402),
          i = new Set();
        i.add("IMG"),
          i.add("VIDEO"),
          i.add("IFRAME"),
          i.add("OBJECT"),
          i.add("SVG");
        var o = new Set();
        o.add("BDO"),
          o.add("BDI"),
          o.add("Q"),
          o.add("CITE"),
          o.add("CODE"),
          o.add("DATA"),
          o.add("TIME"),
          o.add("VAR"),
          o.add("DFN"),
          o.add("ABBR"),
          o.add("STRONG"),
          o.add("EM"),
          o.add("BIG"),
          o.add("SMALL"),
          o.add("MARK"),
          o.add("SUB"),
          o.add("SUP"),
          o.add("SAMP"),
          o.add("KBD"),
          o.add("B"),
          o.add("I"),
          o.add("S"),
          o.add("U"),
          o.add("SPAN"),
          (e.optionsToConfig = function (t) {
            var e = void 0 === t ? {} : t,
              n = e.addedClass,
              a = void 0 === n ? "vdd-added" : n,
              s = e.modifiedClass,
              l = void 0 === s ? "vdd-modified" : s,
              c = e.removedClass,
              u = void 0 === c ? "vdd-removed" : c,
              f = e.skipModified,
              d = void 0 !== f && f,
              h = e.skipChildren,
              p = e.skipSelf,
              g = e.diffText;
            return {
              addedClass: a,
              diffText: void 0 === g ? r.diffText : g,
              modifiedClass: l,
              removedClass: u,
              skipModified: d,
              skipChildren: function (t) {
                if (
                  !r.isElement(t) &&
                  !r.isDocumentFragment(t) &&
                  !r.isDocument(t)
                )
                  return !0;
                if (h) {
                  var e = h(t);
                  if ("boolean" == typeof e) return e;
                }
                return i.has(t.nodeName);
              },
              skipSelf: function (t) {
                if (!r.isText(t) && !r.isElement(t)) return !0;
                if (p) {
                  var e = p(t);
                  if ("boolean" == typeof e) return e;
                }
                return o.has(t.nodeName);
              },
            };
          });
      },
      145: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(27),
          i = n(967),
          o = n(844),
          a = n(402),
          s = function (t) {
            return "TH" === t ? "TD" : t;
          },
          l = function (t, e) {
            return new o.DomIterator(t, e).reduce(function (t, e) {
              return (
                t + (a.isText(e) ? e.data : a.charForNodeName(s(e.nodeName)))
              );
            }, "");
          },
          c = function (t) {
            return a.isText(t) ? t.length : 1;
          },
          u = function (t) {
            return "TR" === t.nodeName;
          },
          f = {
            skipChildren: u,
            skipSelf: function (t) {
              return !u(t);
            },
          };
        e.visualDomDiff = function t(e, n, u) {
          var d, h;
          void 0 === u && (u = {});
          var p,
            g,
            m,
            y,
            A,
            v = n.ownerDocument || n,
            M = i.optionsToConfig(u),
            L = M.addedClass,
            b = M.diffText,
            E = M.modifiedClass,
            w = M.removedClass,
            j = M.skipSelf,
            C = M.skipChildren,
            N = function (t) {
              return !j(t);
            },
            x = function (t, e) {
              return a.getAncestors(t, e).filter(N).length;
            },
            T = function (t) {
              return a.isElement(t) && j(t);
            },
            S = function (t, e) {
              return a.getAncestors(t, e).filter(T).reverse();
            },
            D = function (t) {
              return H.has(t) ? 1 : W.has(t) ? -1 : 0;
            },
            k = b(l(e, M), l(n, M)),
            O = 0,
            I = new o.DomIterator(e, M),
            z = new o.DomIterator(n, M),
            _ = 0,
            B = 0,
            R = 0;
          (m = k[O++]),
            (d = I.next()),
            (p = d.done),
            (y = d.value),
            (h = z.next()),
            (g = h.done),
            (A = h.value);
          var P = v.createDocumentFragment(),
            Y = P,
            $ = 0,
            U = P,
            Q = 0,
            G = null,
            F = null,
            W = new Set(),
            H = new Set(),
            Z = new Set(),
            q = new Map(),
            V = new Array(),
            X = new Map();
          function J() {
            for (var t = x(y, e); $ > t; ) {
              if (!Y.parentNode) return a.never();
              Y === G && (G = null), (Y = Y.parentNode), $--;
            }
            if ($ !== t) return a.never();
          }
          function K() {
            for (var t = x(A, n); Q > t; ) {
              if (!U.parentNode) return a.never();
              U === F && (F = null), (U = U.parentNode), Q--;
            }
            if (Q !== t) return a.never();
          }
          function tt(t) {
            if (Y !== U || F || G) return a.never();
            if (a.isText(t)) {
              var r = S(y, e),
                i = S(A, n);
              q.set(t, i);
              var o = r.length;
              if (o !== i.length) Z.add(t);
              else
                for (var s = 0; s < o; ++s)
                  if (!a.areNodesEqual(r[s], i[s])) {
                    Z.add(t);
                    break;
                  }
            } else {
              a.areNodesEqual(y, A) || Z.add(t);
              var l = y.nodeName;
              "TABLE" === l
                ? V.push({ newTable: A, oldTable: y, outputTable: t })
                : "TR" === l && X.set(t, { newRow: A, oldRow: y });
            }
            U.appendChild(t), (Y = t), (U = t), $++, Q++;
          }
          function et(t) {
            if ((G || ((G = t), W.add(t)), a.isText(t))) {
              var n = S(y, e);
              q.set(t, n);
            }
            Y.appendChild(t), (Y = t), $++;
          }
          function nt(t) {
            if ((F || ((F = t), H.add(t)), a.isText(t))) {
              var e = S(A, n);
              q.set(t, e);
            }
            U.appendChild(t), (U = t), Q++;
          }
          function rt(t) {
            var e = m[1].length;
            if ((_ += t) === e) (m = k[O++]), (_ = 0);
            else if (_ > e) return a.never();
          }
          function it(t) {
            var e,
              n = c(y);
            if ((B += t) === n)
              (e = I.next()), (p = e.done), (y = e.value), (B = 0);
            else if (B > n) return a.never();
          }
          function ot(t) {
            var e,
              n = c(A);
            if ((R += t) === n)
              (e = z.next()), (g = e.done), (A = e.value), (R = 0);
            else if (R > n) return a.never();
          }
          for (; m; )
            if (m[0] === r.DIFF_DELETE) {
              if (p) return a.never();
              J();
              var at = Math.min(m[1].length - _, c(y) - B),
                st = m[1].substring(_, _ + at);
              et(a.isText(y) ? v.createTextNode(st) : y.cloneNode(!1)),
                rt(at),
                it(at);
            } else if (m[0] === r.DIFF_INSERT) {
              if (g) return a.never();
              K();
              var lt = Math.min(m[1].length - _, c(A) - R);
              st = m[1].substring(_, _ + lt);
              nt(a.isText(A) ? v.createTextNode(st) : A.cloneNode(!1)),
                rt(lt),
                ot(lt);
            } else {
              if (p || g) return a.never();
              J(), K();
              var ct = Math.min(m[1].length - _, c(y) - B, c(A) - R);
              st = m[1].substring(_, _ + ct);
              Y === U &&
              ((a.isText(y) && a.isText(A)) ||
                (s(y.nodeName) === s(A.nodeName) && !C(y) && !C(A)) ||
                a.areNodesEqual(y, A))
                ? tt(a.isText(A) ? v.createTextNode(st) : A.cloneNode(!1))
                : (et(a.isText(y) ? v.createTextNode(st) : y.cloneNode(!1)),
                  nt(a.isText(A) ? v.createTextNode(st) : A.cloneNode(!1))),
                rt(ct),
                it(ct),
                ot(ct);
            }
          return (
            W.forEach(function (t) {
              for (var e = t.parentNode, n = t.previousSibling; n && H.has(n); )
                e.insertBefore(t, n), (n = t.previousSibling);
            }),
            V.forEach(function (e) {
              var n = e.newTable,
                r = e.oldTable,
                i = e.outputTable;
              if (
                !a.isTableValid(r, !0) ||
                !a.isTableValid(n, !0) ||
                !a.isTableValid(i, !1)
              ) {
                new o.DomIterator(i).forEach(function (t) {
                  H.delete(t), W.delete(t), Z.delete(t), q.delete(t);
                });
                var s = i.parentNode,
                  l = r.cloneNode(!0),
                  c = n.cloneNode(!0);
                return (
                  s.insertBefore(l, i),
                  s.insertBefore(c, i),
                  s.removeChild(i),
                  W.add(l),
                  void H.add(c)
                );
              }
              var d = [];
              new o.DomIterator(i, f).some(function (t) {
                var e = X.get(t);
                if (!e) return !1;
                var n = e.oldRow,
                  r = e.newRow,
                  i = n.childNodes.length,
                  o = r.childNodes.length,
                  a = Math.max(i, o),
                  s = Math.min(i, o);
                if (t.childNodes.length === a)
                  for (var l = t.childNodes, c = 0, u = l.length; c < u; ++c)
                    d.push(D(l[c]));
                else {
                  c = 0;
                  for (var f = 0; c < s; ) d[c++] = f;
                  for (f = i < o ? 1 : -1; c < a; ) d[c++] = f;
                }
                return !0;
              });
              var h = d.length;
              if (0 === h) return a.never();
              new o.DomIterator(i, f).forEach(function (e) {
                var n = e.childNodes;
                if (H.has(e) || H.has(e.parentNode)) {
                  if (n.length < h)
                    for (var r = 0; r < h; ++r)
                      if (-1 === d[r]) {
                        var i = v.createElement("TD");
                        e.insertBefore(i, n[r]), W.add(i);
                      }
                } else if (W.has(e) || W.has(e.parentNode)) {
                  if (n.length < h)
                    for (r = 0; r < h; ++r)
                      if (1 === d[r]) {
                        i = v.createElement("TD");
                        e.insertBefore(i, n[r]);
                      }
                } else {
                  for (var a = !0, s = ((r = 0), n.length); r < s; ++r)
                    if (D(n[r]) !== d[r]) {
                      a = !1;
                      break;
                    }
                  if (!a) {
                    var l = new o.DomIterator(e);
                    for (
                      l.next(),
                        l.forEach(function (t) {
                          H.delete(t), W.delete(t), Z.delete(t), q.delete(t);
                        });
                      e.firstChild;

                    )
                      e.removeChild(e.firstChild);
                    var c = X.get(e),
                      f = c.newRow,
                      p = c.oldRow,
                      g = f.childNodes,
                      m = p.childNodes,
                      y = 0,
                      A = 0;
                    for (r = 0; r < h; ++r)
                      if (1 === d[r]) {
                        var M = g[A++].cloneNode(!0);
                        e.appendChild(M), H.add(M);
                      } else if (-1 === d[r]) {
                        var L = m[y++].cloneNode(!0);
                        e.appendChild(L), W.add(L);
                      } else e.appendChild(t(m[y++], g[A++], u));
                  }
                }
              });
            }),
            W.forEach(function (t) {
              a.markUpNode(t, "DEL", w);
            }),
            H.forEach(function (t) {
              a.markUpNode(t, "INS", L);
            }),
            M.skipModified ||
              Z.forEach(function (t) {
                a.markUpNode(t, "INS", E);
              }),
            q.forEach(function (t, e) {
              t.forEach(function (t) {
                var n = e.parentNode,
                  r = e.previousSibling;
                if (r && a.areNodesEqual(r, t)) r.appendChild(e);
                else {
                  var i = t.cloneNode(!1);
                  n.insertBefore(i, e), i.appendChild(e);
                }
              });
            }),
            P
          );
        };
      },
      844: (t, e) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = (function () {
          function t(t, e) {
            (this.rootNode = t),
              (this.config = e),
              (this.descend = !0),
              (this.nextNode = this.rootNode),
              this.skipSelf(this.nextNode) && this.next();
          }
          return (
            (t.prototype.toArray = function () {
              for (
                var t, e = [], n = this.next(), r = n.done, i = n.value;
                !r;

              )
                e.push(i), (r = (t = this.next()).done), (i = t.value);
              return e;
            }),
            (t.prototype.forEach = function (t) {
              for (var e, n = this.next(), r = n.done, i = n.value; !r; )
                t(i), (r = (e = this.next()).done), (i = e.value);
            }),
            (t.prototype.reduce = function (t, e) {
              for (var n, r = e, i = this.next(), o = i.done, a = i.value; !o; )
                (r = t(r, a)), (o = (n = this.next()).done), (a = n.value);
              return r;
            }),
            (t.prototype.some = function (t) {
              for (var e, n = this.next(), r = n.done, i = n.value; !r; ) {
                if (t(i)) return !0;
                (r = (e = this.next()).done), (i = e.value);
              }
              return !1;
            }),
            (t.prototype.next = function () {
              if (!this.nextNode) return { done: !0, value: this.rootNode };
              var t = this.nextNode;
              return (
                this.descend &&
                this.nextNode.firstChild &&
                !this.skipChildren(this.nextNode)
                  ? (this.nextNode = this.nextNode.firstChild)
                  : this.nextNode === this.rootNode
                  ? (this.nextNode = null)
                  : this.nextNode.nextSibling
                  ? ((this.nextNode = this.nextNode.nextSibling),
                    (this.descend = !0))
                  : ((this.nextNode = this.nextNode.parentNode),
                    (this.descend = !1),
                    this.next()),
                this.nextNode && this.skipSelf(this.nextNode) && this.next(),
                { done: !1, value: t }
              );
            }),
            (t.prototype.skipSelf = function (t) {
              return (
                !(!this.config || !this.config.skipSelf) &&
                this.config.skipSelf(t)
              );
            }),
            (t.prototype.skipChildren = function (t) {
              return (
                !(!this.config || !this.config.skipChildren) &&
                this.config.skipChildren(t)
              );
            }),
            t
          );
        })();
        e.DomIterator = n;
      },
      224: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 }),
          n(582).__exportStar(n(145), e);
      },
      402: (t, e, n) => {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = n(27);
        function i(t) {
          return t.nodeType === t.ELEMENT_NODE;
        }
        function o(t) {
          return t.nodeType === t.TEXT_NODE;
        }
        function a(t) {
          return t.nodeType === t.COMMENT_NODE;
        }
        function s(t, e) {
          return t === e;
        }
        function l(t, e, n) {
          if ((void 0 === n && (n = s), t.length !== e.length)) return !1;
          for (var r = 0, i = t.length; r < i; ++r)
            if (!n(t[r], e[r])) return !1;
          return !0;
        }
        function c(t) {
          if (t.getAttributeNames) return t.getAttributeNames();
          for (
            var e = t.attributes, n = e.length, r = new Array(n), i = 0;
            i < n;
            i++
          )
            r[i] = e[i].name;
          return r;
        }
        function u(t) {
          for (var e = 0, n = 0; n < t.length; n++)
            e = ((e << 5) - e + t.charCodeAt(n)) | 0;
          return e;
        }
        function f(t) {
          for (var e = 0; e < t.length - 2; ) {
            var n = t[e],
              i = t[e + 1],
              o = t[e + 2];
            if (
              n[0] === r.DIFF_EQUAL &&
              i[0] !== r.DIFF_EQUAL &&
              o[0] === r.DIFF_EQUAL
            ) {
              var a = n[1],
                s = i[1],
                l = o[1],
                c = a[a.length - 1];
              c !== s[s.length - 1] || c < "" || c >= "豈"
                ? e++
                : ((n[1] = a.substring(0, a.length - 1)),
                  (i[1] = c + s.substring(0, s.length - 1)),
                  (o[1] = c + l),
                  0 === n[1].length && t.splice(e, 1));
            } else e++;
          }
        }
        (e.isElement = i),
          (e.isText = o),
          (e.isDocument = function (t) {
            return t.nodeType === t.DOCUMENT_NODE;
          }),
          (e.isDocumentFragment = function (t) {
            return t.nodeType === t.DOCUMENT_FRAGMENT_NODE;
          }),
          (e.isComment = a),
          (e.strictEqual = s),
          (e.areArraysEqual = l),
          (e.areNodesEqual = function t(e, n, r) {
            if ((void 0 === r && (r = !1), e === n)) return !0;
            if (e.nodeType !== n.nodeType || e.nodeName !== n.nodeName)
              return !1;
            if (o(e) || a(e)) {
              if (e.data !== n.data) return !1;
            } else if (i(e)) {
              var s = c(e).sort();
              if (!l(s, c(n).sort())) return !1;
              for (var u = 0, f = s.length; u < f; ++u) {
                var d = s[u];
                if (e.getAttribute(d) !== n.getAttribute(d)) return !1;
              }
            }
            if (r) {
              var h = e.childNodes,
                p = n.childNodes;
              if (h.length !== p.length) return !1;
              for (u = 0, f = h.length; u < f; ++u)
                if (!t(h[u], p[u], r)) return !1;
            }
            return !0;
          }),
          (e.getAncestors = function (t, e) {
            if ((void 0 === e && (e = null), !t || t === e)) return [];
            for (var n = [], r = t.parentNode; r && (n.push(r), r !== e); )
              r = r.parentNode;
            return n;
          }),
          (e.never = function (t) {
            throw (
              (void 0 === t && (t = "visual-dom-diff: Should never happen"),
              new Error(t))
            );
          }),
          (e.hashCode = u),
          (e.charForNodeName = function (t) {
            return String.fromCharCode(57344 + (u(t) % 6400));
          }),
          (e.cleanUpNodeMarkers = f);
        var d = new r.diff_match_patch();
        function h(t, e) {
          for (var n = t.length, r = 0, i = e.length; r < i; ) t[n++] = e[r++];
        }
        (e.diffText = function (t, e) {
          var n = d.diff_main(t, e),
            i = [],
            o = [];
          f(n);
          for (var a = 0, s = n.length; a < s; ++a) {
            var l = n[a];
            if (l[0] === r.DIFF_EQUAL) {
              var c = l[1],
                u = c.length,
                p = /^[^\uE000-\uF8FF]*/.exec(c)[0].length;
              if (p < u) {
                var g = /[^\uE000-\uF8FF]*$/.exec(c)[0].length;
                p > 0 && o.push([r.DIFF_EQUAL, c.substring(0, p)]),
                  d.diff_cleanupSemantic(o),
                  h(i, o),
                  (o.length = 0),
                  i.push([r.DIFF_EQUAL, c.substring(p, u - g)]),
                  g > 0 && o.push([r.DIFF_EQUAL, c.substring(u - g)]);
              } else o.push(l);
            } else o.push(l);
          }
          return (
            d.diff_cleanupSemantic(o),
            h(i, o),
            (o.length = 0),
            d.diff_cleanupMerge(i),
            f(i),
            i
          );
        }),
          (e.markUpNode = function (t, e, n) {
            var r = t.ownerDocument,
              o = t.parentNode,
              a = t.previousSibling;
            if (i(t)) t.classList.add(n);
            else if (a && a.nodeName === e && a.classList.contains(n))
              a.appendChild(t);
            else {
              var s = r.createElement(e);
              s.classList.add(n), o.insertBefore(s, t), s.appendChild(t);
            }
          }),
          (e.isTableValid = function (t, e) {
            var n;
            return (function (t) {
              var e = t.childNodes,
                n = e.length,
                i = 0;
              i < n && "CAPTION" === e[i].nodeName && i++;
              if (i < n && "THEAD" === e[i].nodeName) {
                if (!r(e[i])) return !1;
                i++;
              }
              if (!(i < n && "TBODY" === e[i].nodeName)) return !1;
              if (!r(e[i])) return !1;
              i++;
              if (i < n && "TFOOT" === e[i].nodeName) {
                if (!r(e[i])) return !1;
                i++;
              }
              return i === n;
            })(t);
            function r(t) {
              var e = t.childNodes;
              if ("TBODY" === t.nodeName && 0 === e.length) return !1;
              for (var n = 0, r = e.length; n < r; ++n) if (!i(e[n])) return !1;
              return !0;
            }
            function i(t) {
              var r = t.childNodes;
              if ("TR" !== t.nodeName || 0 === r.length) return !1;
              if (e)
                if (void 0 === n) n = r.length;
                else if (n !== r.length) return !1;
              for (var i = 0, a = r.length; i < a; ++i) if (!o(r[i])) return !1;
              return !0;
            }
            function o(t) {
              var e = t.nodeName;
              if ("TD" !== e && "TH" !== e) return !1;
              var n = t,
                r = n.getAttribute("colspan"),
                i = n.getAttribute("rowspan");
              return !((null !== r && "1" !== r) || (null !== i && "1" !== i));
            }
          });
      },
      582: (t, e, n) => {
        "use strict";
        n.r(e),
          n.d(e, {
            __addDisposableResource: () => I,
            __assign: () => o,
            __asyncDelegator: () => j,
            __asyncGenerator: () => w,
            __asyncValues: () => C,
            __await: () => E,
            __awaiter: () => p,
            __classPrivateFieldGet: () => D,
            __classPrivateFieldIn: () => O,
            __classPrivateFieldSet: () => k,
            __createBinding: () => m,
            __decorate: () => s,
            __disposeResources: () => _,
            __esDecorate: () => c,
            __exportStar: () => y,
            __extends: () => i,
            __generator: () => g,
            __importDefault: () => S,
            __importStar: () => T,
            __makeTemplateObject: () => N,
            __metadata: () => h,
            __param: () => l,
            __propKey: () => f,
            __read: () => v,
            __rest: () => a,
            __runInitializers: () => u,
            __setFunctionName: () => d,
            __spread: () => M,
            __spreadArray: () => b,
            __spreadArrays: () => L,
            __values: () => A,
            default: () => B,
          });
        var r = function (t, e) {
          return (
            (r =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }),
            r(t, e)
          );
        };
        function i(t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Class extends value " +
                String(e) +
                " is not a constructor or null"
            );
          function n() {
            this.constructor = t;
          }
          r(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((n.prototype = e.prototype), new n()));
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (t) {
                for (var e, n = 1, r = arguments.length; n < r; n++)
                  for (var i in (e = arguments[n]))
                    Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                return t;
              }),
            o.apply(this, arguments)
          );
        };
        function a(t, e) {
          var n = {};
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
              e.indexOf(r) < 0 &&
              (n[r] = t[r]);
          if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
              e.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                (n[r[i]] = t[r[i]]);
          }
          return n;
        }
        function s(t, e, n, r) {
          var i,
            o = arguments.length,
            a =
              o < 3
                ? e
                : null === r
                ? (r = Object.getOwnPropertyDescriptor(e, n))
                : r;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            a = Reflect.decorate(t, e, n, r);
          else
            for (var s = t.length - 1; s >= 0; s--)
              (i = t[s]) &&
                (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
          return o > 3 && a && Object.defineProperty(e, n, a), a;
        }
        function l(t, e) {
          return function (n, r) {
            e(n, r, t);
          };
        }
        function c(t, e, n, r, i, o) {
          function a(t) {
            if (void 0 !== t && "function" != typeof t)
              throw new TypeError("Function expected");
            return t;
          }
          for (
            var s,
              l = r.kind,
              c = "getter" === l ? "get" : "setter" === l ? "set" : "value",
              u = !e && t ? (r.static ? t : t.prototype) : null,
              f = e || (u ? Object.getOwnPropertyDescriptor(u, r.name) : {}),
              d = !1,
              h = n.length - 1;
            h >= 0;
            h--
          ) {
            var p = {};
            for (var g in r) p[g] = "access" === g ? {} : r[g];
            for (var g in r.access) p.access[g] = r.access[g];
            p.addInitializer = function (t) {
              if (d)
                throw new TypeError(
                  "Cannot add initializers after decoration has completed"
                );
              o.push(a(t || null));
            };
            var m = (0, n[h])(
              "accessor" === l ? { get: f.get, set: f.set } : f[c],
              p
            );
            if ("accessor" === l) {
              if (void 0 === m) continue;
              if (null === m || "object" != typeof m)
                throw new TypeError("Object expected");
              (s = a(m.get)) && (f.get = s),
                (s = a(m.set)) && (f.set = s),
                (s = a(m.init)) && i.unshift(s);
            } else (s = a(m)) && ("field" === l ? i.unshift(s) : (f[c] = s));
          }
          u && Object.defineProperty(u, r.name, f), (d = !0);
        }
        function u(t, e, n) {
          for (var r = arguments.length > 2, i = 0; i < e.length; i++)
            n = r ? e[i].call(t, n) : e[i].call(t);
          return r ? n : void 0;
        }
        function f(t) {
          return "symbol" == typeof t ? t : "".concat(t);
        }
        function d(t, e, n) {
          return (
            "symbol" == typeof e &&
              (e = e.description ? "[".concat(e.description, "]") : ""),
            Object.defineProperty(t, "name", {
              configurable: !0,
              value: n ? "".concat(n, " ", e) : e,
            })
          );
        }
        function h(t, e) {
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.metadata
          )
            return Reflect.metadata(t, e);
        }
        function p(t, e, n, r) {
          return new (n || (n = Promise))(function (i, o) {
            function a(t) {
              try {
                l(r.next(t));
              } catch (t) {
                o(t);
              }
            }
            function s(t) {
              try {
                l(r.throw(t));
              } catch (t) {
                o(t);
              }
            }
            function l(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof n
                    ? e
                    : new n(function (t) {
                        t(e);
                      })).then(a, s);
            }
            l((r = r.apply(t, e || [])).next());
          });
        }
        function g(t, e) {
          var n,
            r,
            i,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & i[0]) throw i[1];
                return i[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: s(0), throw: s(1), return: s(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function s(s) {
            return function (l) {
              return (function (s) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; o && ((o = 0), s[0] && (a = 0)), a; )
                  try {
                    if (
                      ((n = 1),
                      r &&
                        (i =
                          2 & s[0]
                            ? r.return
                            : s[0]
                            ? r.throw || ((i = r.return) && i.call(r), 0)
                            : r.next) &&
                        !(i = i.call(r, s[1])).done)
                    )
                      return i;
                    switch (((r = 0), i && (s = [2 & s[0], i.value]), s[0])) {
                      case 0:
                      case 1:
                        i = s;
                        break;
                      case 4:
                        return a.label++, { value: s[1], done: !1 };
                      case 5:
                        a.label++, (r = s[1]), (s = [0]);
                        continue;
                      case 7:
                        (s = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !((i = a.trys),
                          (i = i.length > 0 && i[i.length - 1]) ||
                            (6 !== s[0] && 2 !== s[0]))
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === s[0] &&
                          (!i || (s[1] > i[0] && s[1] < i[3]))
                        ) {
                          a.label = s[1];
                          break;
                        }
                        if (6 === s[0] && a.label < i[1]) {
                          (a.label = i[1]), (i = s);
                          break;
                        }
                        if (i && a.label < i[2]) {
                          (a.label = i[2]), a.ops.push(s);
                          break;
                        }
                        i[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    s = e.call(t, a);
                  } catch (t) {
                    (s = [6, t]), (r = 0);
                  } finally {
                    n = i = 0;
                  }
                if (5 & s[0]) throw s[1];
                return { value: s[0] ? s[1] : void 0, done: !0 };
              })([s, l]);
            };
          }
        }
        var m = Object.create
          ? function (t, e, n, r) {
              void 0 === r && (r = n);
              var i = Object.getOwnPropertyDescriptor(e, n);
              (i &&
                !("get" in i ? !e.__esModule : i.writable || i.configurable)) ||
                (i = {
                  enumerable: !0,
                  get: function () {
                    return e[n];
                  },
                }),
                Object.defineProperty(t, r, i);
            }
          : function (t, e, n, r) {
              void 0 === r && (r = n), (t[r] = e[n]);
            };
        function y(t, e) {
          for (var n in t)
            "default" === n ||
              Object.prototype.hasOwnProperty.call(e, n) ||
              m(e, t, n);
        }
        function A(t) {
          var e = "function" == typeof Symbol && Symbol.iterator,
            n = e && t[e],
            r = 0;
          if (n) return n.call(t);
          if (t && "number" == typeof t.length)
            return {
              next: function () {
                return (
                  t && r >= t.length && (t = void 0),
                  { value: t && t[r++], done: !t }
                );
              },
            };
          throw new TypeError(
            e ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        }
        function v(t, e) {
          var n = "function" == typeof Symbol && t[Symbol.iterator];
          if (!n) return t;
          var r,
            i,
            o = n.call(t),
            a = [];
          try {
            for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
              a.push(r.value);
          } catch (t) {
            i = { error: t };
          } finally {
            try {
              r && !r.done && (n = o.return) && n.call(o);
            } finally {
              if (i) throw i.error;
            }
          }
          return a;
        }
        function M() {
          for (var t = [], e = 0; e < arguments.length; e++)
            t = t.concat(v(arguments[e]));
          return t;
        }
        function L() {
          for (var t = 0, e = 0, n = arguments.length; e < n; e++)
            t += arguments[e].length;
          var r = Array(t),
            i = 0;
          for (e = 0; e < n; e++)
            for (var o = arguments[e], a = 0, s = o.length; a < s; a++, i++)
              r[i] = o[a];
          return r;
        }
        function b(t, e, n) {
          if (n || 2 === arguments.length)
            for (var r, i = 0, o = e.length; i < o; i++)
              (!r && i in e) ||
                (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
          return t.concat(r || Array.prototype.slice.call(e));
        }
        function E(t) {
          return this instanceof E ? ((this.v = t), this) : new E(t);
        }
        function w(t, e, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var r,
            i = n.apply(t, e || []),
            o = [];
          return (
            (r = {}),
            a("next"),
            a("throw"),
            a("return"),
            (r[Symbol.asyncIterator] = function () {
              return this;
            }),
            r
          );
          function a(t) {
            i[t] &&
              (r[t] = function (e) {
                return new Promise(function (n, r) {
                  o.push([t, e, n, r]) > 1 || s(t, e);
                });
              });
          }
          function s(t, e) {
            try {
              (n = i[t](e)).value instanceof E
                ? Promise.resolve(n.value.v).then(l, c)
                : u(o[0][2], n);
            } catch (t) {
              u(o[0][3], t);
            }
            var n;
          }
          function l(t) {
            s("next", t);
          }
          function c(t) {
            s("throw", t);
          }
          function u(t, e) {
            t(e), o.shift(), o.length && s(o[0][0], o[0][1]);
          }
        }
        function j(t) {
          var e, n;
          return (
            (e = {}),
            r("next"),
            r("throw", function (t) {
              throw t;
            }),
            r("return"),
            (e[Symbol.iterator] = function () {
              return this;
            }),
            e
          );
          function r(r, i) {
            e[r] = t[r]
              ? function (e) {
                  return (n = !n)
                    ? { value: E(t[r](e)), done: !1 }
                    : i
                    ? i(e)
                    : e;
                }
              : i;
          }
        }
        function C(t) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var e,
            n = t[Symbol.asyncIterator];
          return n
            ? n.call(t)
            : ((t = A(t)),
              (e = {}),
              r("next"),
              r("throw"),
              r("return"),
              (e[Symbol.asyncIterator] = function () {
                return this;
              }),
              e);
          function r(n) {
            e[n] =
              t[n] &&
              function (e) {
                return new Promise(function (r, i) {
                  (function (t, e, n, r) {
                    Promise.resolve(r).then(function (e) {
                      t({ value: e, done: n });
                    }, e);
                  })(r, i, (e = t[n](e)).done, e.value);
                });
              };
          }
        }
        function N(t, e) {
          return (
            Object.defineProperty
              ? Object.defineProperty(t, "raw", { value: e })
              : (t.raw = e),
            t
          );
        }
        var x = Object.create
          ? function (t, e) {
              Object.defineProperty(t, "default", { enumerable: !0, value: e });
            }
          : function (t, e) {
              t.default = e;
            };
        function T(t) {
          if (t && t.__esModule) return t;
          var e = {};
          if (null != t)
            for (var n in t)
              "default" !== n &&
                Object.prototype.hasOwnProperty.call(t, n) &&
                m(e, t, n);
          return x(e, t), e;
        }
        function S(t) {
          return t && t.__esModule ? t : { default: t };
        }
        function D(t, e, n, r) {
          if ("a" === n && !r)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" == typeof e ? t !== e || !r : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        }
        function k(t, e, n, r, i) {
          if ("m" === r) throw new TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" == typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        }
        function O(t, e) {
          if (null === e || ("object" != typeof e && "function" != typeof e))
            throw new TypeError("Cannot use 'in' operator on non-object");
          return "function" == typeof t ? e === t : t.has(e);
        }
        function I(t, e, n) {
          if (null != e) {
            if ("object" != typeof e && "function" != typeof e)
              throw new TypeError("Object expected.");
            var r;
            if (n) {
              if (!Symbol.asyncDispose)
                throw new TypeError("Symbol.asyncDispose is not defined.");
              r = e[Symbol.asyncDispose];
            }
            if (void 0 === r) {
              if (!Symbol.dispose)
                throw new TypeError("Symbol.dispose is not defined.");
              r = e[Symbol.dispose];
            }
            if ("function" != typeof r)
              throw new TypeError("Object not disposable.");
            t.stack.push({ value: e, dispose: r, async: n });
          } else n && t.stack.push({ async: !0 });
          return e;
        }
        var z =
          "function" == typeof SuppressedError
            ? SuppressedError
            : function (t, e, n) {
                var r = new Error(n);
                return (
                  (r.name = "SuppressedError"),
                  (r.error = t),
                  (r.suppressed = e),
                  r
                );
              };
        function _(t) {
          function e(e) {
            (t.error = t.hasError
              ? new z(e, t.error, "An error was suppressed during disposal.")
              : e),
              (t.hasError = !0);
          }
          return (function n() {
            for (; t.stack.length; ) {
              var r = t.stack.pop();
              try {
                var i = r.dispose && r.dispose.call(r.value);
                if (r.async)
                  return Promise.resolve(i).then(n, function (t) {
                    return e(t), n();
                  });
              } catch (t) {
                e(t);
              }
            }
            if (t.hasError) throw t.error;
          })();
        }
        const B = {
          __extends: i,
          __assign: o,
          __rest: a,
          __decorate: s,
          __param: l,
          __metadata: h,
          __awaiter: p,
          __generator: g,
          __createBinding: m,
          __exportStar: y,
          __values: A,
          __read: v,
          __spread: M,
          __spreadArrays: L,
          __spreadArray: b,
          __await: E,
          __asyncGenerator: w,
          __asyncDelegator: j,
          __asyncValues: C,
          __makeTemplateObject: N,
          __importStar: T,
          __importDefault: S,
          __classPrivateFieldGet: D,
          __classPrivateFieldSet: k,
          __classPrivateFieldIn: O,
          __addDisposableResource: I,
          __disposeResources: _,
        };
      },
    },
    e = {};
  function n(r) {
    var i = e[r];
    if (void 0 !== i) return i.exports;
    var o = (e[r] = { id: r, exports: {} });
    return t[r](o, o.exports, n), o.exports;
  }
  (n.n = (t) => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, { a: e }), e;
  }),
    (n.d = (t, e) => {
      for (var r in e)
        n.o(e, r) &&
          !n.o(t, r) &&
          Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
    }),
    (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (n.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      function t(e) {
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          t(e)
        );
      }
      function e(e, n) {
        for (var r = 0; r < n.length; r++) {
          var i = n[r];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(
              e,
              ((o = i.key),
              (a = void 0),
              (a = (function (e, n) {
                if ("object" !== t(e) || null === e) return e;
                var r = e[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var i = r.call(e, n || "default");
                  if ("object" !== t(i)) return i;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === n ? String : Number)(e);
              })(o, "string")),
              "symbol" === t(a) ? a : String(a)),
              i
            );
        }
        var o, a;
      }
      var r = "0.1.0",
        i = new Promise(function (t) {
          if (
            "interactive" === document.readyState ||
            "complete" === document.readyState
          )
            return t();
          var e = !1;
          document.addEventListener(
            "DOMContentLoaded",
            function () {
              e || t(), (e = !0);
            },
            { capture: !0, once: !0, passive: !0 }
          );
        }),
        o = (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t);
          }
          var n, r, i;
          return (
            (n = t),
            (i = [
              {
                key: "isEnabled",
                value: function (t) {
                  return !1;
                },
              },
            ]),
            (r = null) && e(n.prototype, r),
            i && e(n, i),
            Object.defineProperty(n, "prototype", { writable: !1 }),
            t
          );
        })();
      function a(t, e) {
        var n,
          r = function () {
            var r = this,
              i = arguments;
            clearTimeout(n),
              (n = setTimeout(function () {
                return t.apply(r, i);
              }, e));
          };
        return (
          (r.cancel = function () {
            clearTimeout(n), (n = null);
          }),
          r
        );
      }
      var s = n(775),
        l = n.n(s),
        c = n(38),
        u = n.n(c);
      function f(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function d(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? f(Object(n), !0).forEach(function (e) {
                g(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : f(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function h(t) {
        return (
          (h =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          h(t)
        );
      }
      function p(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, r.key, r);
        }
      }
      function g(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function m(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n =
              null == t
                ? null
                : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
            if (null == n) return;
            var r,
              i,
              o = [],
              a = !0,
              s = !1;
            try {
              for (
                n = n.call(t);
                !(a = (r = n.next()).done) &&
                (o.push(r.value), !e || o.length !== e);
                a = !0
              );
            } catch (t) {
              (s = !0), (i = t);
            } finally {
              try {
                a || null == n.return || n.return();
              } finally {
                if (s) throw i;
              }
            }
            return o;
          })(t, e) ||
          A(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function y(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return v(t);
          })(t) ||
          (function (t) {
            if (
              ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
              null != t["@@iterator"]
            )
              return Array.from(t);
          })(t) ||
          A(t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function A(t, e) {
        if (t) {
          if ("string" == typeof t) return v(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return (
            "Object" === n && t.constructor && (n = t.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(t)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? v(t, e)
              : void 0
          );
        }
      }
      function v(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      var M = function () {},
        L = {},
        b = {},
        E = null,
        w = { mark: M, measure: M };
      try {
        "undefined" != typeof window && (L = window),
          "undefined" != typeof document && (b = document),
          "undefined" != typeof MutationObserver && (E = MutationObserver),
          "undefined" != typeof performance && (w = performance);
      } catch (In) {}
      var j,
        C,
        N,
        x,
        T,
        S = (L.navigator || {}).userAgent,
        D = void 0 === S ? "" : S,
        k = L,
        O = b,
        I = E,
        z = w,
        _ =
          (k.document,
          !!O.documentElement &&
            !!O.head &&
            "function" == typeof O.addEventListener &&
            "function" == typeof O.createElement),
        B = ~D.indexOf("MSIE") || ~D.indexOf("Trident/"),
        R = "___FONT_AWESOME___",
        P = 16,
        Y = "fa",
        $ = "svg-inline--fa",
        U = "data-fa-i2svg",
        Q = "data-fa-pseudo-element",
        G = "data-fa-pseudo-element-pending",
        F = "data-prefix",
        W = "data-icon",
        H = "fontawesome-i2svg",
        Z = "async",
        q = ["HTML", "HEAD", "STYLE", "SCRIPT"],
        V = (function () {
          try {
            return !0;
          } catch (t) {
            return !1;
          }
        })(),
        X = "classic",
        J = "sharp",
        K = [X, J];
      function tt(t) {
        return new Proxy(t, {
          get: function (t, e) {
            return e in t ? t[e] : t[X];
          },
        });
      }
      var et = tt(
          (g((j = {}), X, {
            fa: "solid",
            fas: "solid",
            "fa-solid": "solid",
            far: "regular",
            "fa-regular": "regular",
            fal: "light",
            "fa-light": "light",
            fat: "thin",
            "fa-thin": "thin",
            fad: "duotone",
            "fa-duotone": "duotone",
            fab: "brands",
            "fa-brands": "brands",
            fak: "kit",
            "fa-kit": "kit",
          }),
          g(j, J, {
            fa: "solid",
            fass: "solid",
            "fa-solid": "solid",
            fasr: "regular",
            "fa-regular": "regular",
            fasl: "light",
            "fa-light": "light",
          }),
          j)
        ),
        nt = tt(
          (g((C = {}), X, {
            solid: "fas",
            regular: "far",
            light: "fal",
            thin: "fat",
            duotone: "fad",
            brands: "fab",
            kit: "fak",
          }),
          g(C, J, { solid: "fass", regular: "fasr", light: "fasl" }),
          C)
        ),
        rt = tt(
          (g((N = {}), X, {
            fab: "fa-brands",
            fad: "fa-duotone",
            fak: "fa-kit",
            fal: "fa-light",
            far: "fa-regular",
            fas: "fa-solid",
            fat: "fa-thin",
          }),
          g(N, J, { fass: "fa-solid", fasr: "fa-regular", fasl: "fa-light" }),
          N)
        ),
        it = tt(
          (g((x = {}), X, {
            "fa-brands": "fab",
            "fa-duotone": "fad",
            "fa-kit": "fak",
            "fa-light": "fal",
            "fa-regular": "far",
            "fa-solid": "fas",
            "fa-thin": "fat",
          }),
          g(x, J, {
            "fa-solid": "fass",
            "fa-regular": "fasr",
            "fa-light": "fasl",
          }),
          x)
        ),
        ot = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,
        at = "fa-layers-text",
        st =
          /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
        lt = tt(
          (g((T = {}), X, {
            900: "fas",
            400: "far",
            normal: "far",
            300: "fal",
            100: "fat",
          }),
          g(T, J, { 900: "fass", 400: "fasr", 300: "fasl" }),
          T)
        ),
        ct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ut = ct.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
        ft = [
          "class",
          "data-prefix",
          "data-icon",
          "data-fa-transform",
          "data-fa-mask",
        ],
        dt = {
          GROUP: "duotone-group",
          SWAP_OPACITY: "swap-opacity",
          PRIMARY: "primary",
          SECONDARY: "secondary",
        },
        ht = new Set();
      Object.keys(nt[X]).map(ht.add.bind(ht)),
        Object.keys(nt[J]).map(ht.add.bind(ht));
      var pt = []
          .concat(K, y(ht), [
            "2xs",
            "xs",
            "sm",
            "lg",
            "xl",
            "2xl",
            "beat",
            "border",
            "fade",
            "beat-fade",
            "bounce",
            "flip-both",
            "flip-horizontal",
            "flip-vertical",
            "flip",
            "fw",
            "inverse",
            "layers-counter",
            "layers-text",
            "layers",
            "li",
            "pull-left",
            "pull-right",
            "pulse",
            "rotate-180",
            "rotate-270",
            "rotate-90",
            "rotate-by",
            "shake",
            "spin-pulse",
            "spin-reverse",
            "spin",
            "stack-1x",
            "stack-2x",
            "stack",
            "ul",
            dt.GROUP,
            dt.SWAP_OPACITY,
            dt.PRIMARY,
            dt.SECONDARY,
          ])
          .concat(
            ct.map(function (t) {
              return "".concat(t, "x");
            })
          )
          .concat(
            ut.map(function (t) {
              return "w-".concat(t);
            })
          ),
        gt = k.FontAwesomeConfig || {};
      if (O && "function" == typeof O.querySelector) {
        [
          ["data-family-prefix", "familyPrefix"],
          ["data-css-prefix", "cssPrefix"],
          ["data-family-default", "familyDefault"],
          ["data-style-default", "styleDefault"],
          ["data-replacement-class", "replacementClass"],
          ["data-auto-replace-svg", "autoReplaceSvg"],
          ["data-auto-add-css", "autoAddCss"],
          ["data-auto-a11y", "autoA11y"],
          ["data-search-pseudo-elements", "searchPseudoElements"],
          ["data-observe-mutations", "observeMutations"],
          ["data-mutate-approach", "mutateApproach"],
          ["data-keep-original-source", "keepOriginalSource"],
          ["data-measure-performance", "measurePerformance"],
          ["data-show-missing-icons", "showMissingIcons"],
        ].forEach(function (t) {
          var e = m(t, 2),
            n = e[0],
            r = e[1],
            i = (function (t) {
              return "" === t || ("false" !== t && ("true" === t || t));
            })(
              (function (t) {
                var e = O.querySelector("script[" + t + "]");
                if (e) return e.getAttribute(t);
              })(n)
            );
          null != i && (gt[r] = i);
        });
      }
      var mt = {
        styleDefault: "solid",
        familyDefault: "classic",
        cssPrefix: Y,
        replacementClass: $,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0,
      };
      gt.familyPrefix && (gt.cssPrefix = gt.familyPrefix);
      var yt = d(d({}, mt), gt);
      yt.autoReplaceSvg || (yt.observeMutations = !1);
      var At = {};
      Object.keys(mt).forEach(function (t) {
        Object.defineProperty(At, t, {
          enumerable: !0,
          set: function (e) {
            (yt[t] = e),
              vt.forEach(function (t) {
                return t(At);
              });
          },
          get: function () {
            return yt[t];
          },
        });
      }),
        Object.defineProperty(At, "familyPrefix", {
          enumerable: !0,
          set: function (t) {
            (yt.cssPrefix = t),
              vt.forEach(function (t) {
                return t(At);
              });
          },
          get: function () {
            return yt.cssPrefix;
          },
        }),
        (k.FontAwesomeConfig = At);
      var vt = [];
      var Mt = P,
        Lt = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
      var bt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      function Et() {
        for (var t = 12, e = ""; t-- > 0; ) e += bt[(62 * Math.random()) | 0];
        return e;
      }
      function wt(t) {
        for (var e = [], n = (t || []).length >>> 0; n--; ) e[n] = t[n];
        return e;
      }
      function jt(t) {
        return t.classList
          ? wt(t.classList)
          : (t.getAttribute("class") || "").split(" ").filter(function (t) {
              return t;
            });
      }
      function Ct(t) {
        return ""
          .concat(t)
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      function Nt(t) {
        return Object.keys(t || {}).reduce(function (e, n) {
          return e + "".concat(n, ": ").concat(t[n].trim(), ";");
        }, "");
      }
      function xt(t) {
        return (
          t.size !== Lt.size ||
          t.x !== Lt.x ||
          t.y !== Lt.y ||
          t.rotate !== Lt.rotate ||
          t.flipX ||
          t.flipY
        );
      }
      var Tt =
        ':root, :host {\n  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";\n  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";\n  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";\n  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";\n  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";\n  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";\n  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";\n}\n\nsvg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {\n  overflow: visible;\n  box-sizing: content-box;\n}\n\n.svg-inline--fa {\n  display: var(--fa-display, inline-block);\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-2xs {\n  vertical-align: 0.1em;\n}\n.svg-inline--fa.fa-xs {\n  vertical-align: 0em;\n}\n.svg-inline--fa.fa-sm {\n  vertical-align: -0.0714285705em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.2em;\n}\n.svg-inline--fa.fa-xl {\n  vertical-align: -0.25em;\n}\n.svg-inline--fa.fa-2xl {\n  vertical-align: -0.3125em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: var(--fa-pull-margin, 0.3em);\n  width: auto;\n}\n.svg-inline--fa.fa-li {\n  width: var(--fa-li-width, 2em);\n  top: 0.25em;\n}\n.svg-inline--fa.fa-fw {\n  width: var(--fa-fw-width, 1.25em);\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: var(--fa-counter-background-color, #ff253a);\n  border-radius: var(--fa-counter-border-radius, 1em);\n  box-sizing: border-box;\n  color: var(--fa-inverse, #fff);\n  line-height: var(--fa-counter-line-height, 1);\n  max-width: var(--fa-counter-max-width, 5em);\n  min-width: var(--fa-counter-min-width, 1.5em);\n  overflow: hidden;\n  padding: var(--fa-counter-padding, 0.25em 0.5em);\n  right: var(--fa-right, 0);\n  text-overflow: ellipsis;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-counter-scale, 0.25));\n          transform: scale(var(--fa-counter-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: var(--fa-bottom, 0);\n  right: var(--fa-right, 0);\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: var(--fa-bottom, 0);\n  left: var(--fa-left, 0);\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  top: var(--fa-top, 0);\n  right: var(--fa-right, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: var(--fa-left, 0);\n  right: auto;\n  top: var(--fa-top, 0);\n  -webkit-transform: scale(var(--fa-layers-scale, 0.25));\n          transform: scale(var(--fa-layers-scale, 0.25));\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-2xs {\n  font-size: 0.625em;\n  line-height: 0.1em;\n  vertical-align: 0.225em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n  line-height: 0.0833333337em;\n  vertical-align: 0.125em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n  line-height: 0.0714285718em;\n  vertical-align: 0.0535714295em;\n}\n\n.fa-lg {\n  font-size: 1.25em;\n  line-height: 0.05em;\n  vertical-align: -0.075em;\n}\n\n.fa-xl {\n  font-size: 1.5em;\n  line-height: 0.0416666682em;\n  vertical-align: -0.125em;\n}\n\n.fa-2xl {\n  font-size: 2em;\n  line-height: 0.03125em;\n  vertical-align: -0.1875em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: var(--fa-li-margin, 2.5em);\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: calc(var(--fa-li-width, 2em) * -1);\n  position: absolute;\n  text-align: center;\n  width: var(--fa-li-width, 2em);\n  line-height: inherit;\n}\n\n.fa-border {\n  border-color: var(--fa-border-color, #eee);\n  border-radius: var(--fa-border-radius, 0.1em);\n  border-style: var(--fa-border-style, solid);\n  border-width: var(--fa-border-width, 0.08em);\n  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);\n}\n\n.fa-pull-left {\n  float: left;\n  margin-right: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-pull-right {\n  float: right;\n  margin-left: var(--fa-pull-margin, 0.3em);\n}\n\n.fa-beat {\n  -webkit-animation-name: fa-beat;\n          animation-name: fa-beat;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-bounce {\n  -webkit-animation-name: fa-bounce;\n          animation-name: fa-bounce;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));\n}\n\n.fa-fade {\n  -webkit-animation-name: fa-fade;\n          animation-name: fa-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-beat-fade {\n  -webkit-animation-name: fa-beat-fade;\n          animation-name: fa-beat-fade;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));\n}\n\n.fa-flip {\n  -webkit-animation-name: fa-flip;\n          animation-name: fa-flip;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);\n          animation-timing-function: var(--fa-animation-timing, ease-in-out);\n}\n\n.fa-shake {\n  -webkit-animation-name: fa-shake;\n          animation-name: fa-shake;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-delay: var(--fa-animation-delay, 0s);\n          animation-delay: var(--fa-animation-delay, 0s);\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 2s);\n          animation-duration: var(--fa-animation-duration, 2s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, linear);\n          animation-timing-function: var(--fa-animation-timing, linear);\n}\n\n.fa-spin-reverse {\n  --fa-animation-direction: reverse;\n}\n\n.fa-pulse,\n.fa-spin-pulse {\n  -webkit-animation-name: fa-spin;\n          animation-name: fa-spin;\n  -webkit-animation-direction: var(--fa-animation-direction, normal);\n          animation-direction: var(--fa-animation-direction, normal);\n  -webkit-animation-duration: var(--fa-animation-duration, 1s);\n          animation-duration: var(--fa-animation-duration, 1s);\n  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n          animation-iteration-count: var(--fa-animation-iteration-count, infinite);\n  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));\n          animation-timing-function: var(--fa-animation-timing, steps(8));\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .fa-beat,\n.fa-bounce,\n.fa-fade,\n.fa-beat-fade,\n.fa-flip,\n.fa-pulse,\n.fa-shake,\n.fa-spin,\n.fa-spin-pulse {\n    -webkit-animation-delay: -1ms;\n            animation-delay: -1ms;\n    -webkit-animation-duration: 1ms;\n            animation-duration: 1ms;\n    -webkit-animation-iteration-count: 1;\n            animation-iteration-count: 1;\n    -webkit-transition-delay: 0s;\n            transition-delay: 0s;\n    -webkit-transition-duration: 0s;\n            transition-duration: 0s;\n  }\n}\n@-webkit-keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@keyframes fa-beat {\n  0%, 90% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  45% {\n    -webkit-transform: scale(var(--fa-beat-scale, 1.25));\n            transform: scale(var(--fa-beat-scale, 1.25));\n  }\n}\n@-webkit-keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@keyframes fa-bounce {\n  0% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  10% {\n    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);\n  }\n  30% {\n    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));\n  }\n  50% {\n    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);\n  }\n  57% {\n    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));\n  }\n  64% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n  100% {\n    -webkit-transform: scale(1, 1) translateY(0);\n            transform: scale(1, 1) translateY(0);\n  }\n}\n@-webkit-keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@keyframes fa-fade {\n  50% {\n    opacity: var(--fa-fade-opacity, 0.4);\n  }\n}\n@-webkit-keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@keyframes fa-beat-fade {\n  0%, 100% {\n    opacity: var(--fa-beat-fade-opacity, 0.4);\n    -webkit-transform: scale(1);\n            transform: scale(1);\n  }\n  50% {\n    opacity: 1;\n    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));\n            transform: scale(var(--fa-beat-fade-scale, 1.125));\n  }\n}\n@-webkit-keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@keyframes fa-flip {\n  50% {\n    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));\n  }\n}\n@-webkit-keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@keyframes fa-shake {\n  0% {\n    -webkit-transform: rotate(-15deg);\n            transform: rotate(-15deg);\n  }\n  4% {\n    -webkit-transform: rotate(15deg);\n            transform: rotate(15deg);\n  }\n  8%, 24% {\n    -webkit-transform: rotate(-18deg);\n            transform: rotate(-18deg);\n  }\n  12%, 28% {\n    -webkit-transform: rotate(18deg);\n            transform: rotate(18deg);\n  }\n  16% {\n    -webkit-transform: rotate(-22deg);\n            transform: rotate(-22deg);\n  }\n  20% {\n    -webkit-transform: rotate(22deg);\n            transform: rotate(22deg);\n  }\n  32% {\n    -webkit-transform: rotate(-12deg);\n            transform: rotate(-12deg);\n  }\n  36% {\n    -webkit-transform: rotate(12deg);\n            transform: rotate(12deg);\n  }\n  40%, 100% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n}\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both,\n.fa-flip-horizontal.fa-flip-vertical {\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n.fa-rotate-by {\n  -webkit-transform: rotate(var(--fa-rotate-angle, none));\n          transform: rotate(var(--fa-rotate-angle, none));\n}\n\n.fa-stack {\n  display: inline-block;\n  vertical-align: middle;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: var(--fa-stack-z-index, auto);\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}\n\n.sr-only,\n.fa-sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.sr-only-focusable:not(:focus),\n.fa-sr-only-focusable:not(:focus) {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse,\n.fa-duotone.fa-inverse {\n  color: var(--fa-inverse, #fff);\n}';
      function St() {
        var t = Y,
          e = $,
          n = At.cssPrefix,
          r = At.replacementClass,
          i = Tt;
        if (n !== t || r !== e) {
          var o = new RegExp("\\.".concat(t, "\\-"), "g"),
            a = new RegExp("\\--".concat(t, "\\-"), "g"),
            s = new RegExp("\\.".concat(e), "g");
          i = i
            .replace(o, ".".concat(n, "-"))
            .replace(a, "--".concat(n, "-"))
            .replace(s, ".".concat(r));
        }
        return i;
      }
      var Dt = !1;
      function kt() {
        At.autoAddCss &&
          !Dt &&
          (!(function (t) {
            if (t && _) {
              var e = O.createElement("style");
              e.setAttribute("type", "text/css"), (e.innerHTML = t);
              for (
                var n = O.head.childNodes, r = null, i = n.length - 1;
                i > -1;
                i--
              ) {
                var o = n[i],
                  a = (o.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(a) > -1 && (r = o);
              }
              O.head.insertBefore(e, r);
            }
          })(St()),
          (Dt = !0));
      }
      var Ot = {
          mixout: function () {
            return { dom: { css: St, insertCss: kt } };
          },
          hooks: function () {
            return {
              beforeDOMElementCreation: function () {
                kt();
              },
              beforeI2svg: function () {
                kt();
              },
            };
          },
        },
        It = k || {};
      It[R] || (It[R] = {}),
        It[R].styles || (It[R].styles = {}),
        It[R].hooks || (It[R].hooks = {}),
        It[R].shims || (It[R].shims = []);
      var zt = It[R],
        _t = [],
        Bt = !1;
      function Rt(t) {
        var e = t.tag,
          n = t.attributes,
          r = void 0 === n ? {} : n,
          i = t.children,
          o = void 0 === i ? [] : i;
        return "string" == typeof t
          ? Ct(t)
          : "<"
              .concat(e, " ")
              .concat(
                (function (t) {
                  return Object.keys(t || {})
                    .reduce(function (e, n) {
                      return e + "".concat(n, '="').concat(Ct(t[n]), '" ');
                    }, "")
                    .trim();
                })(r),
                ">"
              )
              .concat(o.map(Rt).join(""), "</")
              .concat(e, ">");
      }
      function Pt(t, e, n) {
        if (t && t[e] && t[e][n])
          return { prefix: e, iconName: n, icon: t[e][n] };
      }
      _ &&
        ((Bt = (
          O.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/
        ).test(O.readyState)) ||
          O.addEventListener("DOMContentLoaded", function t() {
            O.removeEventListener("DOMContentLoaded", t),
              (Bt = 1),
              _t.map(function (t) {
                return t();
              });
          }));
      var Yt = function (t, e, n, r) {
        var i,
          o,
          a,
          s = Object.keys(t),
          l = s.length,
          c =
            void 0 !== r
              ? (function (t, e) {
                  return function (n, r, i, o) {
                    return t.call(e, n, r, i, o);
                  };
                })(e, r)
              : e;
        for (
          void 0 === n ? ((i = 1), (a = t[s[0]])) : ((i = 0), (a = n));
          i < l;
          i++
        )
          a = c(a, t[(o = s[i])], o, t);
        return a;
      };
      function $t(t) {
        var e = (function (t) {
          for (var e = [], n = 0, r = t.length; n < r; ) {
            var i = t.charCodeAt(n++);
            if (i >= 55296 && i <= 56319 && n < r) {
              var o = t.charCodeAt(n++);
              56320 == (64512 & o)
                ? e.push(((1023 & i) << 10) + (1023 & o) + 65536)
                : (e.push(i), n--);
            } else e.push(i);
          }
          return e;
        })(t);
        return 1 === e.length ? e[0].toString(16) : null;
      }
      function Ut(t) {
        return Object.keys(t).reduce(function (e, n) {
          var r = t[n];
          return !!r.icon ? (e[r.iconName] = r.icon) : (e[n] = r), e;
        }, {});
      }
      function Qt(t, e) {
        var n = (
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          ).skipHooks,
          r = void 0 !== n && n,
          i = Ut(e);
        "function" != typeof zt.hooks.addPack || r
          ? (zt.styles[t] = d(d({}, zt.styles[t] || {}), i))
          : zt.hooks.addPack(t, Ut(e)),
          "fas" === t && Qt("fa", e);
      }
      var Gt,
        Ft,
        Wt,
        Ht = zt.styles,
        Zt = zt.shims,
        qt =
          (g((Gt = {}), X, Object.values(rt[X])),
          g(Gt, J, Object.values(rt[J])),
          Gt),
        Vt = null,
        Xt = {},
        Jt = {},
        Kt = {},
        te = {},
        ee = {},
        ne =
          (g((Ft = {}), X, Object.keys(et[X])),
          g(Ft, J, Object.keys(et[J])),
          Ft);
      function re(t, e) {
        var n,
          r = e.split("-"),
          i = r[0],
          o = r.slice(1).join("-");
        return i !== t || "" === o || ((n = o), ~pt.indexOf(n)) ? null : o;
      }
      var ie,
        oe = function () {
          var t = function (t) {
            return Yt(
              Ht,
              function (e, n, r) {
                return (e[r] = Yt(n, t, {})), e;
              },
              {}
            );
          };
          (Xt = t(function (t, e, n) {
            if ((e[3] && (t[e[3]] = n), e[2])) {
              var r = e[2].filter(function (t) {
                return "number" == typeof t;
              });
              r.forEach(function (e) {
                t[e.toString(16)] = n;
              });
            }
            return t;
          })),
            (Jt = t(function (t, e, n) {
              if (((t[n] = n), e[2])) {
                var r = e[2].filter(function (t) {
                  return "string" == typeof t;
                });
                r.forEach(function (e) {
                  t[e] = n;
                });
              }
              return t;
            })),
            (ee = t(function (t, e, n) {
              var r = e[2];
              return (
                (t[n] = n),
                r.forEach(function (e) {
                  t[e] = n;
                }),
                t
              );
            }));
          var e = "far" in Ht || At.autoFetchSvg,
            n = Yt(
              Zt,
              function (t, n) {
                var r = n[0],
                  i = n[1],
                  o = n[2];
                return (
                  "far" !== i || e || (i = "fas"),
                  "string" == typeof r &&
                    (t.names[r] = { prefix: i, iconName: o }),
                  "number" == typeof r &&
                    (t.unicodes[r.toString(16)] = { prefix: i, iconName: o }),
                  t
                );
              },
              { names: {}, unicodes: {} }
            );
          (Kt = n.names),
            (te = n.unicodes),
            (Vt = fe(At.styleDefault, { family: At.familyDefault }));
        };
      function ae(t, e) {
        return (Xt[t] || {})[e];
      }
      function se(t, e) {
        return (ee[t] || {})[e];
      }
      function le(t) {
        return Kt[t] || { prefix: null, iconName: null };
      }
      function ce() {
        return Vt;
      }
      (ie = function (t) {
        Vt = fe(t.styleDefault, { family: At.familyDefault });
      }),
        vt.push(ie),
        oe();
      var ue = function () {
        return { prefix: null, iconName: null, rest: [] };
      };
      function fe(t) {
        var e = (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          ).family,
          n = void 0 === e ? X : e,
          r = et[n][t],
          i = nt[n][t] || nt[n][r],
          o = t in zt.styles ? t : null;
        return i || o || null;
      }
      var de =
        (g((Wt = {}), X, Object.keys(rt[X])), g(Wt, J, Object.keys(rt[J])), Wt);
      function he(t) {
        var e,
          n = (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          ).skipLookups,
          r = void 0 !== n && n,
          i =
            (g((e = {}), X, "".concat(At.cssPrefix, "-").concat(X)),
            g(e, J, "".concat(At.cssPrefix, "-").concat(J)),
            e),
          o = null,
          a = X;
        (t.includes(i[X]) ||
          t.some(function (t) {
            return de[X].includes(t);
          })) &&
          (a = X),
          (t.includes(i[J]) ||
            t.some(function (t) {
              return de[J].includes(t);
            })) &&
            (a = J);
        var s = t.reduce(function (t, e) {
          var n = re(At.cssPrefix, e);
          if (
            (Ht[e]
              ? ((e = qt[a].includes(e) ? it[a][e] : e),
                (o = e),
                (t.prefix = e))
              : ne[a].indexOf(e) > -1
              ? ((o = e), (t.prefix = fe(e, { family: a })))
              : n
              ? (t.iconName = n)
              : e !== At.replacementClass &&
                e !== i[X] &&
                e !== i[J] &&
                t.rest.push(e),
            !r && t.prefix && t.iconName)
          ) {
            var s = "fa" === o ? le(t.iconName) : {},
              l = se(t.prefix, t.iconName);
            s.prefix && (o = null),
              (t.iconName = s.iconName || l || t.iconName),
              (t.prefix = s.prefix || t.prefix),
              "far" !== t.prefix ||
                Ht.far ||
                !Ht.fas ||
                At.autoFetchSvg ||
                (t.prefix = "fas");
          }
          return t;
        }, ue());
        return (
          (t.includes("fa-brands") || t.includes("fab")) && (s.prefix = "fab"),
          (t.includes("fa-duotone") || t.includes("fad")) && (s.prefix = "fad"),
          s.prefix ||
            a !== J ||
            (!Ht.fass && !At.autoFetchSvg) ||
            ((s.prefix = "fass"),
            (s.iconName = se(s.prefix, s.iconName) || s.iconName)),
          ("fa" !== s.prefix && "fa" !== o) || (s.prefix = ce() || "fas"),
          s
        );
      }
      var pe = (function () {
          function t() {
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, t),
              (this.definitions = {});
          }
          var e, n, r;
          return (
            (e = t),
            (n = [
              {
                key: "add",
                value: function () {
                  for (
                    var t = this, e = arguments.length, n = new Array(e), r = 0;
                    r < e;
                    r++
                  )
                    n[r] = arguments[r];
                  var i = n.reduce(this._pullDefinitions, {});
                  Object.keys(i).forEach(function (e) {
                    (t.definitions[e] = d(d({}, t.definitions[e] || {}), i[e])),
                      Qt(e, i[e]);
                    var n = rt[X][e];
                    n && Qt(n, i[e]), oe();
                  });
                },
              },
              {
                key: "reset",
                value: function () {
                  this.definitions = {};
                },
              },
              {
                key: "_pullDefinitions",
                value: function (t, e) {
                  var n = e.prefix && e.iconName && e.icon ? { 0: e } : e;
                  return (
                    Object.keys(n).map(function (e) {
                      var r = n[e],
                        i = r.prefix,
                        o = r.iconName,
                        a = r.icon,
                        s = a[2];
                      t[i] || (t[i] = {}),
                        s.length > 0 &&
                          s.forEach(function (e) {
                            "string" == typeof e && (t[i][e] = a);
                          }),
                        (t[i][o] = a);
                    }),
                    t
                  );
                },
              },
            ]),
            n && p(e.prototype, n),
            r && p(e, r),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t
          );
        })(),
        ge = [],
        me = {},
        ye = {},
        Ae = Object.keys(ye);
      function ve(t, e) {
        for (
          var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2;
          i < n;
          i++
        )
          r[i - 2] = arguments[i];
        return (
          (me[t] || []).forEach(function (t) {
            e = t.apply(null, [e].concat(r));
          }),
          e
        );
      }
      function Me(t) {
        for (
          var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
          r < e;
          r++
        )
          n[r - 1] = arguments[r];
        (me[t] || []).forEach(function (t) {
          t.apply(null, n);
        });
      }
      function Le() {
        var t = arguments[0],
          e = Array.prototype.slice.call(arguments, 1);
        return ye[t] ? ye[t].apply(null, e) : void 0;
      }
      function be(t) {
        "fa" === t.prefix && (t.prefix = "fas");
        var e = t.iconName,
          n = t.prefix || ce();
        if (e)
          return (
            (e = se(n, e) || e), Pt(Ee.definitions, n, e) || Pt(zt.styles, n, e)
          );
      }
      var Ee = new pe(),
        we = {
          i2svg: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            return _
              ? (Me("beforeI2svg", t),
                Le("pseudoElements2svg", t),
                Le("i2svg", t))
              : Promise.reject("Operation requires a DOM of some kind.");
          },
          watch: function () {
            var t,
              e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              n = e.autoReplaceSvgRoot;
            !1 === At.autoReplaceSvg && (At.autoReplaceSvg = !0),
              (At.observeMutations = !0),
              (t = function () {
                Ne({ autoReplaceSvgRoot: n }), Me("watch", e);
              }),
              _ && (Bt ? setTimeout(t, 0) : _t.push(t));
          },
        },
        je = {
          icon: function (t) {
            if (null === t) return null;
            if ("object" === h(t) && t.prefix && t.iconName)
              return {
                prefix: t.prefix,
                iconName: se(t.prefix, t.iconName) || t.iconName,
              };
            if (Array.isArray(t) && 2 === t.length) {
              var e = 0 === t[1].indexOf("fa-") ? t[1].slice(3) : t[1],
                n = fe(t[0]);
              return { prefix: n, iconName: se(n, e) || e };
            }
            if (
              "string" == typeof t &&
              (t.indexOf("".concat(At.cssPrefix, "-")) > -1 || t.match(ot))
            ) {
              var r = he(t.split(" "), { skipLookups: !0 });
              return {
                prefix: r.prefix || ce(),
                iconName: se(r.prefix, r.iconName) || r.iconName,
              };
            }
            if ("string" == typeof t) {
              var i = ce();
              return { prefix: i, iconName: se(i, t) || t };
            }
          },
        },
        Ce = {
          noAuto: function () {
            (At.autoReplaceSvg = !1), (At.observeMutations = !1), Me("noAuto");
          },
          config: At,
          dom: we,
          parse: je,
          library: Ee,
          findIconDefinition: be,
          toHtml: Rt,
        },
        Ne = function () {
          var t = (
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
            ).autoReplaceSvgRoot,
            e = void 0 === t ? O : t;
          (Object.keys(zt.styles).length > 0 || At.autoFetchSvg) &&
            _ &&
            At.autoReplaceSvg &&
            Ce.dom.i2svg({ node: e });
        };
      function xe(t, e) {
        return (
          Object.defineProperty(t, "abstract", { get: e }),
          Object.defineProperty(t, "html", {
            get: function () {
              return t.abstract.map(function (t) {
                return Rt(t);
              });
            },
          }),
          Object.defineProperty(t, "node", {
            get: function () {
              if (_) {
                var e = O.createElement("div");
                return (e.innerHTML = t.html), e.children;
              }
            },
          }),
          t
        );
      }
      function Te(t) {
        var e = t.icons,
          n = e.main,
          r = e.mask,
          i = t.prefix,
          o = t.iconName,
          a = t.transform,
          s = t.symbol,
          l = t.title,
          c = t.maskId,
          u = t.titleId,
          f = t.extra,
          h = t.watchable,
          p = void 0 !== h && h,
          g = r.found ? r : n,
          m = g.width,
          y = g.height,
          A = "fak" === i,
          v = [
            At.replacementClass,
            o ? "".concat(At.cssPrefix, "-").concat(o) : "",
          ]
            .filter(function (t) {
              return -1 === f.classes.indexOf(t);
            })
            .filter(function (t) {
              return "" !== t || !!t;
            })
            .concat(f.classes)
            .join(" "),
          M = {
            children: [],
            attributes: d(
              d({}, f.attributes),
              {},
              {
                "data-prefix": i,
                "data-icon": o,
                class: v,
                role: f.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(m, " ").concat(y),
              }
            ),
          },
          L =
            A && !~f.classes.indexOf("fa-fw")
              ? { width: "".concat((m / y) * 16 * 0.0625, "em") }
              : {};
        p && (M.attributes[U] = ""),
          l &&
            (M.children.push({
              tag: "title",
              attributes: {
                id:
                  M.attributes["aria-labelledby"] || "title-".concat(u || Et()),
              },
              children: [l],
            }),
            delete M.attributes.title);
        var b = d(
            d({}, M),
            {},
            {
              prefix: i,
              iconName: o,
              main: n,
              mask: r,
              maskId: c,
              transform: a,
              symbol: s,
              styles: d(d({}, L), f.styles),
            }
          ),
          E =
            r.found && n.found
              ? Le("generateAbstractMask", b) || {
                  children: [],
                  attributes: {},
                }
              : Le("generateAbstractIcon", b) || {
                  children: [],
                  attributes: {},
                },
          w = E.children,
          j = E.attributes;
        return (
          (b.children = w),
          (b.attributes = j),
          s
            ? (function (t) {
                var e = t.prefix,
                  n = t.iconName,
                  r = t.children,
                  i = t.attributes,
                  o = t.symbol,
                  a =
                    !0 === o
                      ? "".concat(e, "-").concat(At.cssPrefix, "-").concat(n)
                      : o;
                return [
                  {
                    tag: "svg",
                    attributes: { style: "display: none;" },
                    children: [
                      {
                        tag: "symbol",
                        attributes: d(d({}, i), {}, { id: a }),
                        children: r,
                      },
                    ],
                  },
                ];
              })(b)
            : (function (t) {
                var e = t.children,
                  n = t.main,
                  r = t.mask,
                  i = t.attributes,
                  o = t.styles,
                  a = t.transform;
                if (xt(a) && n.found && !r.found) {
                  var s = { x: n.width / n.height / 2, y: 0.5 };
                  i.style = Nt(
                    d(
                      d({}, o),
                      {},
                      {
                        "transform-origin": ""
                          .concat(s.x + a.x / 16, "em ")
                          .concat(s.y + a.y / 16, "em"),
                      }
                    )
                  );
                }
                return [{ tag: "svg", attributes: i, children: e }];
              })(b)
        );
      }
      function Se(t) {
        var e = t.content,
          n = t.width,
          r = t.height,
          i = t.transform,
          o = t.title,
          a = t.extra,
          s = t.watchable,
          l = void 0 !== s && s,
          c = d(
            d(d({}, a.attributes), o ? { title: o } : {}),
            {},
            { class: a.classes.join(" ") }
          );
        l && (c[U] = "");
        var u = d({}, a.styles);
        xt(i) &&
          ((u.transform = (function (t) {
            var e = t.transform,
              n = t.width,
              r = void 0 === n ? P : n,
              i = t.height,
              o = void 0 === i ? P : i,
              a = t.startCentered,
              s = void 0 !== a && a,
              l = "";
            return (
              (l +=
                s && B
                  ? "translate("
                      .concat(e.x / Mt - r / 2, "em, ")
                      .concat(e.y / Mt - o / 2, "em) ")
                  : s
                  ? "translate(calc(-50% + "
                      .concat(e.x / Mt, "em), calc(-50% + ")
                      .concat(e.y / Mt, "em)) ")
                  : "translate("
                      .concat(e.x / Mt, "em, ")
                      .concat(e.y / Mt, "em) ")),
              (l += "scale("
                .concat((e.size / Mt) * (e.flipX ? -1 : 1), ", ")
                .concat((e.size / Mt) * (e.flipY ? -1 : 1), ") ")),
              l + "rotate(".concat(e.rotate, "deg) ")
            );
          })({ transform: i, startCentered: !0, width: n, height: r })),
          (u["-webkit-transform"] = u.transform));
        var f = Nt(u);
        f.length > 0 && (c.style = f);
        var h = [];
        return (
          h.push({ tag: "span", attributes: c, children: [e] }),
          o &&
            h.push({
              tag: "span",
              attributes: { class: "sr-only" },
              children: [o],
            }),
          h
        );
      }
      var De = zt.styles;
      function ke(t) {
        var e = t[0],
          n = t[1],
          r = m(t.slice(4), 1)[0];
        return {
          found: !0,
          width: e,
          height: n,
          icon: Array.isArray(r)
            ? {
                tag: "g",
                attributes: {
                  class: "".concat(At.cssPrefix, "-").concat(dt.GROUP),
                },
                children: [
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(At.cssPrefix, "-").concat(dt.SECONDARY),
                      fill: "currentColor",
                      d: r[0],
                    },
                  },
                  {
                    tag: "path",
                    attributes: {
                      class: "".concat(At.cssPrefix, "-").concat(dt.PRIMARY),
                      fill: "currentColor",
                      d: r[1],
                    },
                  },
                ],
              }
            : { tag: "path", attributes: { fill: "currentColor", d: r } },
        };
      }
      var Oe = { found: !1, width: 512, height: 512 };
      function Ie(t, e) {
        var n = e;
        return (
          "fa" === e && null !== At.styleDefault && (e = ce()),
          new Promise(function (r, i) {
            Le("missingIconAbstract");
            if ("fa" === n) {
              var o = le(t) || {};
              (t = o.iconName || t), (e = o.prefix || e);
            }
            if (t && e && De[e] && De[e][t]) return r(ke(De[e][t]));
            !(function (t, e) {
              V ||
                At.showMissingIcons ||
                !t ||
                console.error(
                  'Icon with name "'
                    .concat(t, '" and prefix "')
                    .concat(e, '" is missing.')
                );
            })(t, e),
              r(
                d(
                  d({}, Oe),
                  {},
                  {
                    icon:
                      (At.showMissingIcons && t && Le("missingIconAbstract")) ||
                      {},
                  }
                )
              );
          })
        );
      }
      var ze = function () {},
        _e =
          At.measurePerformance && z && z.mark && z.measure
            ? z
            : { mark: ze, measure: ze },
        Be = 'FA "6.4.2"',
        Re = function (t) {
          _e.mark("".concat(Be, " ").concat(t, " ends")),
            _e.measure(
              "".concat(Be, " ").concat(t),
              "".concat(Be, " ").concat(t, " begins"),
              "".concat(Be, " ").concat(t, " ends")
            );
        },
        Pe = {
          begin: function (t) {
            return (
              _e.mark("".concat(Be, " ").concat(t, " begins")),
              function () {
                return Re(t);
              }
            );
          },
          end: Re,
        },
        Ye = function () {};
      function $e(t) {
        return "string" == typeof (t.getAttribute ? t.getAttribute(U) : null);
      }
      function Ue(t) {
        return O.createElementNS("http://www.w3.org/2000/svg", t);
      }
      function Qe(t) {
        return O.createElement(t);
      }
      function Ge(t) {
        var e = (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          ).ceFn,
          n = void 0 === e ? ("svg" === t.tag ? Ue : Qe) : e;
        if ("string" == typeof t) return O.createTextNode(t);
        var r = n(t.tag);
        return (
          Object.keys(t.attributes || []).forEach(function (e) {
            r.setAttribute(e, t.attributes[e]);
          }),
          (t.children || []).forEach(function (t) {
            r.appendChild(Ge(t, { ceFn: n }));
          }),
          r
        );
      }
      var Fe = {
        replace: function (t) {
          var e = t[0];
          if (e.parentNode)
            if (
              (t[1].forEach(function (t) {
                e.parentNode.insertBefore(Ge(t), e);
              }),
              null === e.getAttribute(U) && At.keepOriginalSource)
            ) {
              var n = O.createComment(
                (function (t) {
                  var e = " ".concat(t.outerHTML, " ");
                  return "".concat(e, "Font Awesome fontawesome.com ");
                })(e)
              );
              e.parentNode.replaceChild(n, e);
            } else e.remove();
        },
        nest: function (t) {
          var e = t[0],
            n = t[1];
          if (~jt(e).indexOf(At.replacementClass)) return Fe.replace(t);
          var r = new RegExp("".concat(At.cssPrefix, "-.*"));
          if ((delete n[0].attributes.id, n[0].attributes.class)) {
            var i = n[0].attributes.class.split(" ").reduce(
              function (t, e) {
                return (
                  e === At.replacementClass || e.match(r)
                    ? t.toSvg.push(e)
                    : t.toNode.push(e),
                  t
                );
              },
              { toNode: [], toSvg: [] }
            );
            (n[0].attributes.class = i.toSvg.join(" ")),
              0 === i.toNode.length
                ? e.removeAttribute("class")
                : e.setAttribute("class", i.toNode.join(" "));
          }
          var o = n
            .map(function (t) {
              return Rt(t);
            })
            .join("\n");
          e.setAttribute(U, ""), (e.innerHTML = o);
        },
      };
      function We(t) {
        t();
      }
      function He(t, e) {
        var n = "function" == typeof e ? e : Ye;
        if (0 === t.length) n();
        else {
          var r = We;
          At.mutateApproach === Z && (r = k.requestAnimationFrame || We),
            r(function () {
              var e =
                  !0 === At.autoReplaceSvg
                    ? Fe.replace
                    : Fe[At.autoReplaceSvg] || Fe.replace,
                r = Pe.begin("mutate");
              t.map(e), r(), n();
            });
        }
      }
      var Ze = !1;
      function qe() {
        Ze = !0;
      }
      function Ve() {
        Ze = !1;
      }
      var Xe = null;
      function Je(t) {
        if (I && At.observeMutations) {
          var e = t.treeCallback,
            n = void 0 === e ? Ye : e,
            r = t.nodeCallback,
            i = void 0 === r ? Ye : r,
            o = t.pseudoElementsCallback,
            a = void 0 === o ? Ye : o,
            s = t.observeMutationsRoot,
            l = void 0 === s ? O : s;
          (Xe = new I(function (t) {
            if (!Ze) {
              var e = ce();
              wt(t).forEach(function (t) {
                if (
                  ("childList" === t.type &&
                    t.addedNodes.length > 0 &&
                    !$e(t.addedNodes[0]) &&
                    (At.searchPseudoElements && a(t.target), n(t.target)),
                  "attributes" === t.type &&
                    t.target.parentNode &&
                    At.searchPseudoElements &&
                    a(t.target.parentNode),
                  "attributes" === t.type &&
                    $e(t.target) &&
                    ~ft.indexOf(t.attributeName))
                )
                  if (
                    "class" === t.attributeName &&
                    (function (t) {
                      var e = t.getAttribute ? t.getAttribute(F) : null,
                        n = t.getAttribute ? t.getAttribute(W) : null;
                      return e && n;
                    })(t.target)
                  ) {
                    var r = he(jt(t.target)),
                      o = r.prefix,
                      s = r.iconName;
                    t.target.setAttribute(F, o || e),
                      s && t.target.setAttribute(W, s);
                  } else
                    (l = t.target) &&
                      l.classList &&
                      l.classList.contains &&
                      l.classList.contains(At.replacementClass) &&
                      i(t.target);
                var l;
              });
            }
          })),
            _ &&
              Xe.observe(l, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0,
              });
        }
      }
      function Ke(t) {
        var e = t.getAttribute("data-prefix"),
          n = t.getAttribute("data-icon"),
          r = void 0 !== t.innerText ? t.innerText.trim() : "",
          i = he(jt(t));
        return (
          i.prefix || (i.prefix = ce()),
          e && n && ((i.prefix = e), (i.iconName = n)),
          (i.iconName && i.prefix) ||
            (i.prefix &&
              r.length > 0 &&
              (i.iconName =
                (function (t, e) {
                  return (Jt[t] || {})[e];
                })(i.prefix, t.innerText) || ae(i.prefix, $t(t.innerText))),
            !i.iconName &&
              At.autoFetchSvg &&
              t.firstChild &&
              t.firstChild.nodeType === Node.TEXT_NODE &&
              (i.iconName = t.firstChild.data)),
          i
        );
      }
      function tn(t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { styleParser: !0 },
          n = Ke(t),
          r = n.iconName,
          i = n.prefix,
          o = n.rest,
          a = (function (t) {
            var e = wt(t.attributes).reduce(function (t, e) {
                return (
                  "class" !== t.name &&
                    "style" !== t.name &&
                    (t[e.name] = e.value),
                  t
                );
              }, {}),
              n = t.getAttribute("title"),
              r = t.getAttribute("data-fa-title-id");
            return (
              At.autoA11y &&
                (n
                  ? (e["aria-labelledby"] = ""
                      .concat(At.replacementClass, "-title-")
                      .concat(r || Et()))
                  : ((e["aria-hidden"] = "true"), (e.focusable = "false"))),
              e
            );
          })(t),
          s = ve("parseNodeAttributes", {}, t),
          l = e.styleParser
            ? (function (t) {
                var e = t.getAttribute("style"),
                  n = [];
                return (
                  e &&
                    (n = e.split(";").reduce(function (t, e) {
                      var n = e.split(":"),
                        r = n[0],
                        i = n.slice(1);
                      return (
                        r && i.length > 0 && (t[r] = i.join(":").trim()), t
                      );
                    }, {})),
                  n
                );
              })(t)
            : [];
        return d(
          {
            iconName: r,
            title: t.getAttribute("title"),
            titleId: t.getAttribute("data-fa-title-id"),
            prefix: i,
            transform: Lt,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: o, styles: l, attributes: a },
          },
          s
        );
      }
      var en = zt.styles;
      function nn(t) {
        var e =
          "nest" === At.autoReplaceSvg ? tn(t, { styleParser: !1 }) : tn(t);
        return ~e.extra.classes.indexOf(at)
          ? Le("generateLayersText", t, e)
          : Le("generateSvgReplacementMutation", t, e);
      }
      var rn = new Set();
      function on(t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (!_) return Promise.resolve();
        var n = O.documentElement.classList,
          r = function (t) {
            return n.add("".concat(H, "-").concat(t));
          },
          i = function (t) {
            return n.remove("".concat(H, "-").concat(t));
          },
          o = At.autoFetchSvg
            ? rn
            : K.map(function (t) {
                return "fa-".concat(t);
              }).concat(Object.keys(en));
        o.includes("fa") || o.push("fa");
        var a = [".".concat(at, ":not([").concat(U, "])")]
          .concat(
            o.map(function (t) {
              return ".".concat(t, ":not([").concat(U, "])");
            })
          )
          .join(", ");
        if (0 === a.length) return Promise.resolve();
        var s = [];
        try {
          s = wt(t.querySelectorAll(a));
        } catch (t) {}
        if (!(s.length > 0)) return Promise.resolve();
        r("pending"), i("complete");
        var l = Pe.begin("onTree"),
          c = s.reduce(function (t, e) {
            try {
              var n = nn(e);
              n && t.push(n);
            } catch (t) {
              V || ("MissingIcon" === t.name && console.error(t));
            }
            return t;
          }, []);
        return new Promise(function (t, n) {
          Promise.all(c)
            .then(function (n) {
              He(n, function () {
                r("active"),
                  r("complete"),
                  i("pending"),
                  "function" == typeof e && e(),
                  l(),
                  t();
              });
            })
            .catch(function (t) {
              l(), n(t);
            });
        });
      }
      function an(t) {
        var e =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        nn(t).then(function (t) {
          t && He([t], e);
        });
      }
      K.map(function (t) {
        rn.add("fa-".concat(t));
      }),
        Object.keys(et[X]).map(rn.add.bind(rn)),
        Object.keys(et[J]).map(rn.add.bind(rn)),
        (rn = y(rn));
      var sn = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n = e.transform,
            r = void 0 === n ? Lt : n,
            i = e.symbol,
            o = void 0 !== i && i,
            a = e.mask,
            s = void 0 === a ? null : a,
            l = e.maskId,
            c = void 0 === l ? null : l,
            u = e.title,
            f = void 0 === u ? null : u,
            h = e.titleId,
            p = void 0 === h ? null : h,
            g = e.classes,
            m = void 0 === g ? [] : g,
            y = e.attributes,
            A = void 0 === y ? {} : y,
            v = e.styles,
            M = void 0 === v ? {} : v;
          if (t) {
            var L = t.prefix,
              b = t.iconName,
              E = t.icon;
            return xe(d({ type: "icon" }, t), function () {
              return (
                Me("beforeDOMElementCreation", {
                  iconDefinition: t,
                  params: e,
                }),
                At.autoA11y &&
                  (f
                    ? (A["aria-labelledby"] = ""
                        .concat(At.replacementClass, "-title-")
                        .concat(p || Et()))
                    : ((A["aria-hidden"] = "true"), (A.focusable = "false"))),
                Te({
                  icons: {
                    main: ke(E),
                    mask: s
                      ? ke(s.icon)
                      : { found: !1, width: null, height: null, icon: {} },
                  },
                  prefix: L,
                  iconName: b,
                  transform: d(d({}, Lt), r),
                  symbol: o,
                  title: f,
                  maskId: c,
                  titleId: p,
                  extra: { attributes: A, styles: M, classes: m },
                })
              );
            });
          }
        },
        ln = {
          mixout: function () {
            return {
              icon:
                ((t = sn),
                function (e) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = (e || {}).icon ? e : be(e || {}),
                    i = n.mask;
                  return (
                    i && (i = (i || {}).icon ? i : be(i || {})),
                    t(r, d(d({}, n), {}, { mask: i }))
                  );
                }),
            };
            var t;
          },
          hooks: function () {
            return {
              mutationObserverCallbacks: function (t) {
                return (t.treeCallback = on), (t.nodeCallback = an), t;
              },
            };
          },
          provides: function (t) {
            (t.i2svg = function (t) {
              var e = t.node,
                n = void 0 === e ? O : e,
                r = t.callback;
              return on(n, void 0 === r ? function () {} : r);
            }),
              (t.generateSvgReplacementMutation = function (t, e) {
                var n = e.iconName,
                  r = e.title,
                  i = e.titleId,
                  o = e.prefix,
                  a = e.transform,
                  s = e.symbol,
                  l = e.mask,
                  c = e.maskId,
                  u = e.extra;
                return new Promise(function (e, f) {
                  Promise.all([
                    Ie(n, o),
                    l.iconName
                      ? Ie(l.iconName, l.prefix)
                      : Promise.resolve({
                          found: !1,
                          width: 512,
                          height: 512,
                          icon: {},
                        }),
                  ])
                    .then(function (l) {
                      var f = m(l, 2),
                        d = f[0],
                        h = f[1];
                      e([
                        t,
                        Te({
                          icons: { main: d, mask: h },
                          prefix: o,
                          iconName: n,
                          transform: a,
                          symbol: s,
                          maskId: c,
                          title: r,
                          titleId: i,
                          extra: u,
                          watchable: !0,
                        }),
                      ]);
                    })
                    .catch(f);
                });
              }),
              (t.generateAbstractIcon = function (t) {
                var e,
                  n = t.children,
                  r = t.attributes,
                  i = t.main,
                  o = t.transform,
                  a = Nt(t.styles);
                return (
                  a.length > 0 && (r.style = a),
                  xt(o) &&
                    (e = Le("generateAbstractTransformGrouping", {
                      main: i,
                      transform: o,
                      containerWidth: i.width,
                      iconWidth: i.width,
                    })),
                  n.push(e || i.icon),
                  { children: n, attributes: r }
                );
              });
          },
        },
        cn = {
          mixout: function () {
            return {
              layer: function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = e.classes,
                  r = void 0 === n ? [] : n;
                return xe({ type: "layer" }, function () {
                  Me("beforeDOMElementCreation", { assembler: t, params: e });
                  var n = [];
                  return (
                    t(function (t) {
                      Array.isArray(t)
                        ? t.map(function (t) {
                            n = n.concat(t.abstract);
                          })
                        : (n = n.concat(t.abstract));
                    }),
                    [
                      {
                        tag: "span",
                        attributes: {
                          class: ["".concat(At.cssPrefix, "-layers")]
                            .concat(y(r))
                            .join(" "),
                        },
                        children: n,
                      },
                    ]
                  );
                });
              },
            };
          },
        },
        un = {
          mixout: function () {
            return {
              counter: function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = e.title,
                  r = void 0 === n ? null : n,
                  i = e.classes,
                  o = void 0 === i ? [] : i,
                  a = e.attributes,
                  s = void 0 === a ? {} : a,
                  l = e.styles,
                  c = void 0 === l ? {} : l;
                return xe({ type: "counter", content: t }, function () {
                  return (
                    Me("beforeDOMElementCreation", { content: t, params: e }),
                    (function (t) {
                      var e = t.content,
                        n = t.title,
                        r = t.extra,
                        i = d(
                          d(d({}, r.attributes), n ? { title: n } : {}),
                          {},
                          { class: r.classes.join(" ") }
                        ),
                        o = Nt(r.styles);
                      o.length > 0 && (i.style = o);
                      var a = [];
                      return (
                        a.push({ tag: "span", attributes: i, children: [e] }),
                        n &&
                          a.push({
                            tag: "span",
                            attributes: { class: "sr-only" },
                            children: [n],
                          }),
                        a
                      );
                    })({
                      content: t.toString(),
                      title: r,
                      extra: {
                        attributes: s,
                        styles: c,
                        classes: [
                          "".concat(At.cssPrefix, "-layers-counter"),
                        ].concat(y(o)),
                      },
                    })
                  );
                });
              },
            };
          },
        },
        fn = {
          mixout: function () {
            return {
              text: function (t) {
                var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n = e.transform,
                  r = void 0 === n ? Lt : n,
                  i = e.title,
                  o = void 0 === i ? null : i,
                  a = e.classes,
                  s = void 0 === a ? [] : a,
                  l = e.attributes,
                  c = void 0 === l ? {} : l,
                  u = e.styles,
                  f = void 0 === u ? {} : u;
                return xe({ type: "text", content: t }, function () {
                  return (
                    Me("beforeDOMElementCreation", { content: t, params: e }),
                    Se({
                      content: t,
                      transform: d(d({}, Lt), r),
                      title: o,
                      extra: {
                        attributes: c,
                        styles: f,
                        classes: [
                          "".concat(At.cssPrefix, "-layers-text"),
                        ].concat(y(s)),
                      },
                    })
                  );
                });
              },
            };
          },
          provides: function (t) {
            t.generateLayersText = function (t, e) {
              var n = e.title,
                r = e.transform,
                i = e.extra,
                o = null,
                a = null;
              if (B) {
                var s = parseInt(getComputedStyle(t).fontSize, 10),
                  l = t.getBoundingClientRect();
                (o = l.width / s), (a = l.height / s);
              }
              return (
                At.autoA11y && !n && (i.attributes["aria-hidden"] = "true"),
                Promise.resolve([
                  t,
                  Se({
                    content: t.innerHTML,
                    width: o,
                    height: a,
                    transform: r,
                    title: n,
                    extra: i,
                    watchable: !0,
                  }),
                ])
              );
            };
          },
        },
        dn = new RegExp('"', "ug"),
        hn = [1105920, 1112319];
      function pn(t, e) {
        var n = "".concat(G).concat(e.replace(":", "-"));
        return new Promise(function (r, i) {
          if (null !== t.getAttribute(n)) return r();
          var o,
            a,
            s,
            l = wt(t.children).filter(function (t) {
              return t.getAttribute(Q) === e;
            })[0],
            c = k.getComputedStyle(t, e),
            u = c.getPropertyValue("font-family").match(st),
            f = c.getPropertyValue("font-weight"),
            h = c.getPropertyValue("content");
          if (l && !u) return t.removeChild(l), r();
          if (u && "none" !== h && "" !== h) {
            var p = c.getPropertyValue("content"),
              g = ~["Sharp"].indexOf(u[2]) ? J : X,
              m = ~[
                "Solid",
                "Regular",
                "Light",
                "Thin",
                "Duotone",
                "Brands",
                "Kit",
              ].indexOf(u[2])
                ? nt[g][u[2].toLowerCase()]
                : lt[g][f],
              y = (function (t) {
                var e,
                  n,
                  r,
                  i,
                  o,
                  a = t.replace(dn, ""),
                  s =
                    ((n = 0),
                    (i = (e = a).length),
                    (o = e.charCodeAt(n)) >= 55296 &&
                    o <= 56319 &&
                    i > n + 1 &&
                    (r = e.charCodeAt(n + 1)) >= 56320 &&
                    r <= 57343
                      ? 1024 * (o - 55296) + r - 56320 + 65536
                      : o),
                  l = s >= hn[0] && s <= hn[1],
                  c = 2 === a.length && a[0] === a[1];
                return { value: $t(c ? a[0] : a), isSecondary: l || c };
              })(p),
              A = y.value,
              v = y.isSecondary,
              M = u[0].startsWith("FontAwesome"),
              L = ae(m, A),
              b = L;
            if (M) {
              var E =
                ((a = te[(o = A)]),
                (s = ae("fas", o)),
                a ||
                  (s ? { prefix: "fas", iconName: s } : null) || {
                    prefix: null,
                    iconName: null,
                  });
              E.iconName && E.prefix && ((L = E.iconName), (m = E.prefix));
            }
            if (
              !L ||
              v ||
              (l && l.getAttribute(F) === m && l.getAttribute(W) === b)
            )
              r();
            else {
              t.setAttribute(n, b), l && t.removeChild(l);
              var w = {
                  iconName: null,
                  title: null,
                  titleId: null,
                  prefix: null,
                  transform: Lt,
                  symbol: !1,
                  mask: { iconName: null, prefix: null, rest: [] },
                  maskId: null,
                  extra: { classes: [], styles: {}, attributes: {} },
                },
                j = w.extra;
              (j.attributes[Q] = e),
                Ie(L, m)
                  .then(function (i) {
                    var o = Te(
                        d(
                          d({}, w),
                          {},
                          {
                            icons: { main: i, mask: ue() },
                            prefix: m,
                            iconName: b,
                            extra: j,
                            watchable: !0,
                          }
                        )
                      ),
                      a = O.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                      );
                    "::before" === e
                      ? t.insertBefore(a, t.firstChild)
                      : t.appendChild(a),
                      (a.outerHTML = o
                        .map(function (t) {
                          return Rt(t);
                        })
                        .join("\n")),
                      t.removeAttribute(n),
                      r();
                  })
                  .catch(i);
            }
          } else r();
        });
      }
      function gn(t) {
        return Promise.all([pn(t, "::before"), pn(t, "::after")]);
      }
      function mn(t) {
        return !(
          t.parentNode === document.head ||
          ~q.indexOf(t.tagName.toUpperCase()) ||
          t.getAttribute(Q) ||
          (t.parentNode && "svg" === t.parentNode.tagName)
        );
      }
      function yn(t) {
        if (_)
          return new Promise(function (e, n) {
            var r = wt(t.querySelectorAll("*")).filter(mn).map(gn),
              i = Pe.begin("searchPseudoElements");
            qe(),
              Promise.all(r)
                .then(function () {
                  i(), Ve(), e();
                })
                .catch(function () {
                  i(), Ve(), n();
                });
          });
      }
      var An = !1,
        vn = function (t) {
          return t
            .toLowerCase()
            .split(" ")
            .reduce(
              function (t, e) {
                var n = e.toLowerCase().split("-"),
                  r = n[0],
                  i = n.slice(1).join("-");
                if (r && "h" === i) return (t.flipX = !0), t;
                if (r && "v" === i) return (t.flipY = !0), t;
                if (((i = parseFloat(i)), isNaN(i))) return t;
                switch (r) {
                  case "grow":
                    t.size = t.size + i;
                    break;
                  case "shrink":
                    t.size = t.size - i;
                    break;
                  case "left":
                    t.x = t.x - i;
                    break;
                  case "right":
                    t.x = t.x + i;
                    break;
                  case "up":
                    t.y = t.y - i;
                    break;
                  case "down":
                    t.y = t.y + i;
                    break;
                  case "rotate":
                    t.rotate = t.rotate + i;
                }
                return t;
              },
              { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 }
            );
        },
        Mn = {
          mixout: function () {
            return {
              parse: {
                transform: function (t) {
                  return vn(t);
                },
              },
            };
          },
          hooks: function () {
            return {
              parseNodeAttributes: function (t, e) {
                var n = e.getAttribute("data-fa-transform");
                return n && (t.transform = vn(n)), t;
              },
            };
          },
          provides: function (t) {
            t.generateAbstractTransformGrouping = function (t) {
              var e = t.main,
                n = t.transform,
                r = t.containerWidth,
                i = t.iconWidth,
                o = { transform: "translate(".concat(r / 2, " 256)") },
                a = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "),
                s = "scale("
                  .concat((n.size / 16) * (n.flipX ? -1 : 1), ", ")
                  .concat((n.size / 16) * (n.flipY ? -1 : 1), ") "),
                l = "rotate(".concat(n.rotate, " 0 0)"),
                c = {
                  outer: o,
                  inner: {
                    transform: "".concat(a, " ").concat(s, " ").concat(l),
                  },
                  path: {
                    transform: "translate(".concat((i / 2) * -1, " -256)"),
                  },
                };
              return {
                tag: "g",
                attributes: d({}, c.outer),
                children: [
                  {
                    tag: "g",
                    attributes: d({}, c.inner),
                    children: [
                      {
                        tag: e.icon.tag,
                        children: e.icon.children,
                        attributes: d(d({}, e.icon.attributes), c.path),
                      },
                    ],
                  },
                ],
              };
            };
          },
        },
        Ln = { x: 0, y: 0, width: "100%", height: "100%" };
      function bn(t) {
        var e =
          !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return (
          t.attributes &&
            (t.attributes.fill || e) &&
            (t.attributes.fill = "black"),
          t
        );
      }
      var En = {
          hooks: function () {
            return {
              parseNodeAttributes: function (t, e) {
                var n = e.getAttribute("data-fa-mask"),
                  r = n
                    ? he(
                        n.split(" ").map(function (t) {
                          return t.trim();
                        })
                      )
                    : ue();
                return (
                  r.prefix || (r.prefix = ce()),
                  (t.mask = r),
                  (t.maskId = e.getAttribute("data-fa-mask-id")),
                  t
                );
              },
            };
          },
          provides: function (t) {
            t.generateAbstractMask = function (t) {
              var e,
                n = t.children,
                r = t.attributes,
                i = t.main,
                o = t.mask,
                a = t.maskId,
                s = t.transform,
                l = i.width,
                c = i.icon,
                u = o.width,
                f = o.icon,
                h = (function (t) {
                  var e = t.transform,
                    n = t.containerWidth,
                    r = t.iconWidth,
                    i = { transform: "translate(".concat(n / 2, " 256)") },
                    o = "translate("
                      .concat(32 * e.x, ", ")
                      .concat(32 * e.y, ") "),
                    a = "scale("
                      .concat((e.size / 16) * (e.flipX ? -1 : 1), ", ")
                      .concat((e.size / 16) * (e.flipY ? -1 : 1), ") "),
                    s = "rotate(".concat(e.rotate, " 0 0)");
                  return {
                    outer: i,
                    inner: {
                      transform: "".concat(o, " ").concat(a, " ").concat(s),
                    },
                    path: {
                      transform: "translate(".concat((r / 2) * -1, " -256)"),
                    },
                  };
                })({ transform: s, containerWidth: u, iconWidth: l }),
                p = {
                  tag: "rect",
                  attributes: d(d({}, Ln), {}, { fill: "white" }),
                },
                g = c.children ? { children: c.children.map(bn) } : {},
                m = {
                  tag: "g",
                  attributes: d({}, h.inner),
                  children: [
                    bn(
                      d(
                        {
                          tag: c.tag,
                          attributes: d(d({}, c.attributes), h.path),
                        },
                        g
                      )
                    ),
                  ],
                },
                y = { tag: "g", attributes: d({}, h.outer), children: [m] },
                A = "mask-".concat(a || Et()),
                v = "clip-".concat(a || Et()),
                M = {
                  tag: "mask",
                  attributes: d(
                    d({}, Ln),
                    {},
                    {
                      id: A,
                      maskUnits: "userSpaceOnUse",
                      maskContentUnits: "userSpaceOnUse",
                    }
                  ),
                  children: [p, y],
                },
                L = {
                  tag: "defs",
                  children: [
                    {
                      tag: "clipPath",
                      attributes: { id: v },
                      children: ((e = f), "g" === e.tag ? e.children : [e]),
                    },
                    M,
                  ],
                };
              return (
                n.push(L, {
                  tag: "rect",
                  attributes: d(
                    {
                      fill: "currentColor",
                      "clip-path": "url(#".concat(v, ")"),
                      mask: "url(#".concat(A, ")"),
                    },
                    Ln
                  ),
                }),
                { children: n, attributes: r }
              );
            };
          },
        },
        wn = {
          provides: function (t) {
            var e = !1;
            k.matchMedia &&
              (e = k.matchMedia("(prefers-reduced-motion: reduce)").matches),
              (t.missingIconAbstract = function () {
                var t = [],
                  n = { fill: "currentColor" },
                  r = {
                    attributeType: "XML",
                    repeatCount: "indefinite",
                    dur: "2s",
                  };
                t.push({
                  tag: "path",
                  attributes: d(
                    d({}, n),
                    {},
                    {
                      d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
                    }
                  ),
                });
                var i = d(d({}, r), {}, { attributeName: "opacity" }),
                  o = {
                    tag: "circle",
                    attributes: d(
                      d({}, n),
                      {},
                      { cx: "256", cy: "364", r: "28" }
                    ),
                    children: [],
                  };
                return (
                  e ||
                    o.children.push(
                      {
                        tag: "animate",
                        attributes: d(
                          d({}, r),
                          {},
                          { attributeName: "r", values: "28;14;28;28;14;28;" }
                        ),
                      },
                      {
                        tag: "animate",
                        attributes: d(d({}, i), {}, { values: "1;0;1;1;0;1;" }),
                      }
                    ),
                  t.push(o),
                  t.push({
                    tag: "path",
                    attributes: d(
                      d({}, n),
                      {},
                      {
                        opacity: "1",
                        d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                      }
                    ),
                    children: e
                      ? []
                      : [
                          {
                            tag: "animate",
                            attributes: d(
                              d({}, i),
                              {},
                              { values: "1;0;0;0;0;1;" }
                            ),
                          },
                        ],
                  }),
                  e ||
                    t.push({
                      tag: "path",
                      attributes: d(
                        d({}, n),
                        {},
                        {
                          opacity: "0",
                          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                        }
                      ),
                      children: [
                        {
                          tag: "animate",
                          attributes: d(
                            d({}, i),
                            {},
                            { values: "0;0;1;1;0;0;" }
                          ),
                        },
                      ],
                    }),
                  { tag: "g", attributes: { class: "missing" }, children: t }
                );
              });
          },
        };
      !(function (t, e) {
        var n = e.mixoutsTo;
        (ge = t),
          (me = {}),
          Object.keys(ye).forEach(function (t) {
            -1 === Ae.indexOf(t) && delete ye[t];
          }),
          ge.forEach(function (t) {
            var e = t.mixout ? t.mixout() : {};
            if (
              (Object.keys(e).forEach(function (t) {
                "function" == typeof e[t] && (n[t] = e[t]),
                  "object" === h(e[t]) &&
                    Object.keys(e[t]).forEach(function (r) {
                      n[t] || (n[t] = {}), (n[t][r] = e[t][r]);
                    });
              }),
              t.hooks)
            ) {
              var r = t.hooks();
              Object.keys(r).forEach(function (t) {
                me[t] || (me[t] = []), me[t].push(r[t]);
              });
            }
            t.provides && t.provides(ye);
          });
      })(
        [
          Ot,
          ln,
          cn,
          un,
          fn,
          {
            hooks: function () {
              return {
                mutationObserverCallbacks: function (t) {
                  return (t.pseudoElementsCallback = yn), t;
                },
              };
            },
            provides: function (t) {
              t.pseudoElements2svg = function (t) {
                var e = t.node,
                  n = void 0 === e ? O : e;
                At.searchPseudoElements && yn(n);
              };
            },
          },
          {
            mixout: function () {
              return {
                dom: {
                  unwatch: function () {
                    qe(), (An = !0);
                  },
                },
              };
            },
            hooks: function () {
              return {
                bootstrap: function () {
                  Je(ve("mutationObserverCallbacks", {}));
                },
                noAuto: function () {
                  Xe && Xe.disconnect();
                },
                watch: function (t) {
                  var e = t.observeMutationsRoot;
                  An
                    ? Ve()
                    : Je(
                        ve("mutationObserverCallbacks", {
                          observeMutationsRoot: e,
                        })
                      );
                },
              };
            },
          },
          Mn,
          En,
          wn,
          {
            hooks: function () {
              return {
                parseNodeAttributes: function (t, e) {
                  var n = e.getAttribute("data-fa-symbol"),
                    r = null !== n && ("" === n || n);
                  return (t.symbol = r), t;
                },
              };
            },
          },
        ],
        { mixoutsTo: Ce }
      );
      var jn = Ce.library,
        Cn = Ce.icon,
        Nn = {
          prefix: "fas",
          iconName: "code-pull-request",
          icon: [
            512,
            512,
            [],
            "e13c",
            "M305.8 2.1C314.4 5.9 320 14.5 320 24V64h16c70.7 0 128 57.3 128 128V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-35.3-28.7-64-64-64H320v40c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1zM104 80A24 24 0 1 0 56 80a24 24 0 1 0 48 0zm8 73.3V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80c0 32.8-19.7 61-48 73.3zM104 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm328 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48z",
          ],
        },
        xn = {
          prefix: "fas",
          iconName: "circle-notch",
          icon: [
            512,
            512,
            [],
            "f1ce",
            "M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z",
          ],
        },
        Tn = {
          prefix: "fas",
          iconName: "binoculars",
          icon: [
            512,
            512,
            [],
            "f1e5",
            "M128 32h32c17.7 0 32 14.3 32 32V96H96V64c0-17.7 14.3-32 32-32zm64 96V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V388.9c0-34.6 9.4-68.6 27.2-98.3C40.9 267.8 49.7 242.4 53 216L60.5 156c2-16 15.6-28 31.8-28H192zm227.8 0c16.1 0 29.8 12 31.8 28L459 216c3.3 26.4 12.1 51.8 25.8 74.6c17.8 29.7 27.2 63.7 27.2 98.3V448c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V128h99.8zM320 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V96H320V64zm-32 64V288H224V128h64z",
          ],
        },
        Sn = {
          prefix: "fas",
          iconName: "layer-group",
          icon: [
            576,
            512,
            [],
            "f5fd",
            "M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z",
          ],
        },
        Dn = {
          prefix: "fas",
          iconName: "magnifying-glass",
          icon: [
            512,
            512,
            [128269, "search"],
            "f002",
            "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z",
          ],
        },
        kn = {
          prefix: "fas",
          iconName: "circle-xmark",
          icon: [
            512,
            512,
            [61532, "times-circle", "xmark-circle"],
            "f057",
            "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z",
          ],
        };
      /**
       * @license
       * Copyright 2019 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      const On = window,
        In =
          On.ShadowRoot &&
          (void 0 === On.ShadyCSS || On.ShadyCSS.nativeShadow) &&
          "adoptedStyleSheets" in Document.prototype &&
          "replace" in CSSStyleSheet.prototype,
        zn = Symbol(),
        _n = new WeakMap();
      class Bn {
        constructor(t, e, n) {
          if (((this._$cssResult$ = !0), n !== zn))
            throw Error(
              "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
            );
          (this.cssText = t), (this.t = e);
        }
        get styleSheet() {
          let t = this.o;
          const e = this.t;
          if (In && void 0 === t) {
            const n = void 0 !== e && 1 === e.length;
            n && (t = _n.get(e)),
              void 0 === t &&
                ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
                n && _n.set(e, t));
          }
          return t;
        }
        toString() {
          return this.cssText;
        }
      }
      const Rn = In
        ? (t) => t
        : (t) =>
            t instanceof CSSStyleSheet
              ? ((t) => {
                  let e = "";
                  for (const n of t.cssRules) e += n.cssText;
                  return ((t) =>
                    new Bn("string" == typeof t ? t : t + "", void 0, zn))(e);
                })(t)
              : t;
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      var Pn;
      const Yn = window,
        $n = Yn.trustedTypes,
        Un = $n ? $n.emptyScript : "",
        Qn = Yn.reactiveElementPolyfillSupport,
        Gn = {
          toAttribute(t, e) {
            switch (e) {
              case Boolean:
                t = t ? Un : null;
                break;
              case Object:
              case Array:
                t = null == t ? t : JSON.stringify(t);
            }
            return t;
          },
          fromAttribute(t, e) {
            let n = t;
            switch (e) {
              case Boolean:
                n = null !== t;
                break;
              case Number:
                n = null === t ? null : Number(t);
                break;
              case Object:
              case Array:
                try {
                  n = JSON.parse(t);
                } catch (t) {
                  n = null;
                }
            }
            return n;
          },
        },
        Fn = (t, e) => e !== t && (e == e || t == t),
        Wn = {
          attribute: !0,
          type: String,
          converter: Gn,
          reflect: !1,
          hasChanged: Fn,
        },
        Hn = "finalized";
      class Zn extends HTMLElement {
        constructor() {
          super(),
            (this._$Ei = new Map()),
            (this.isUpdatePending = !1),
            (this.hasUpdated = !1),
            (this._$El = null),
            this._$Eu();
        }
        static addInitializer(t) {
          var e;
          this.finalize(),
            (null !== (e = this.h) && void 0 !== e ? e : (this.h = [])).push(t);
        }
        static get observedAttributes() {
          this.finalize();
          const t = [];
          return (
            this.elementProperties.forEach((e, n) => {
              const r = this._$Ep(n, e);
              void 0 !== r && (this._$Ev.set(r, n), t.push(r));
            }),
            t
          );
        }
        static createProperty(t, e = Wn) {
          if (
            (e.state && (e.attribute = !1),
            this.finalize(),
            this.elementProperties.set(t, e),
            !e.noAccessor && !this.prototype.hasOwnProperty(t))
          ) {
            const n = "symbol" == typeof t ? Symbol() : "__" + t,
              r = this.getPropertyDescriptor(t, n, e);
            void 0 !== r && Object.defineProperty(this.prototype, t, r);
          }
        }
        static getPropertyDescriptor(t, e, n) {
          return {
            get() {
              return this[e];
            },
            set(r) {
              const i = this[t];
              (this[e] = r), this.requestUpdate(t, i, n);
            },
            configurable: !0,
            enumerable: !0,
          };
        }
        static getPropertyOptions(t) {
          return this.elementProperties.get(t) || Wn;
        }
        static finalize() {
          if (this.hasOwnProperty(Hn)) return !1;
          this[Hn] = !0;
          const t = Object.getPrototypeOf(this);
          if (
            (t.finalize(),
            void 0 !== t.h && (this.h = [...t.h]),
            (this.elementProperties = new Map(t.elementProperties)),
            (this._$Ev = new Map()),
            this.hasOwnProperty("properties"))
          ) {
            const t = this.properties,
              e = [
                ...Object.getOwnPropertyNames(t),
                ...Object.getOwnPropertySymbols(t),
              ];
            for (const n of e) this.createProperty(n, t[n]);
          }
          return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
        }
        static finalizeStyles(t) {
          const e = [];
          if (Array.isArray(t)) {
            const n = new Set(t.flat(1 / 0).reverse());
            for (const t of n) e.unshift(Rn(t));
          } else void 0 !== t && e.push(Rn(t));
          return e;
        }
        static _$Ep(t, e) {
          const n = e.attribute;
          return !1 === n
            ? void 0
            : "string" == typeof n
            ? n
            : "string" == typeof t
            ? t.toLowerCase()
            : void 0;
        }
        _$Eu() {
          var t;
          (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
            (this._$AL = new Map()),
            this._$Eg(),
            this.requestUpdate(),
            null === (t = this.constructor.h) ||
              void 0 === t ||
              t.forEach((t) => t(this));
        }
        addController(t) {
          var e, n;
          (null !== (e = this._$ES) && void 0 !== e
            ? e
            : (this._$ES = [])
          ).push(t),
            void 0 !== this.renderRoot &&
              this.isConnected &&
              (null === (n = t.hostConnected) || void 0 === n || n.call(t));
        }
        removeController(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.splice(this._$ES.indexOf(t) >>> 0, 1);
        }
        _$Eg() {
          this.constructor.elementProperties.forEach((t, e) => {
            this.hasOwnProperty(e) &&
              (this._$Ei.set(e, this[e]), delete this[e]);
          });
        }
        createRenderRoot() {
          var t;
          const e =
            null !== (t = this.shadowRoot) && void 0 !== t
              ? t
              : this.attachShadow(this.constructor.shadowRootOptions);
          return (
            ((t, e) => {
              In
                ? (t.adoptedStyleSheets = e.map((t) =>
                    t instanceof CSSStyleSheet ? t : t.styleSheet
                  ))
                : e.forEach((e) => {
                    const n = document.createElement("style"),
                      r = On.litNonce;
                    void 0 !== r && n.setAttribute("nonce", r),
                      (n.textContent = e.cssText),
                      t.appendChild(n);
                  });
            })(e, this.constructor.elementStyles),
            e
          );
        }
        connectedCallback() {
          var t;
          void 0 === this.renderRoot &&
            (this.renderRoot = this.createRenderRoot()),
            this.enableUpdating(!0),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostConnected) || void 0 === e
                  ? void 0
                  : e.call(t);
              });
        }
        enableUpdating(t) {}
        disconnectedCallback() {
          var t;
          null === (t = this._$ES) ||
            void 0 === t ||
            t.forEach((t) => {
              var e;
              return null === (e = t.hostDisconnected) || void 0 === e
                ? void 0
                : e.call(t);
            });
        }
        attributeChangedCallback(t, e, n) {
          this._$AK(t, n);
        }
        _$EO(t, e, n = Wn) {
          var r;
          const i = this.constructor._$Ep(t, n);
          if (void 0 !== i && !0 === n.reflect) {
            const o = (
              void 0 !==
              (null === (r = n.converter) || void 0 === r
                ? void 0
                : r.toAttribute)
                ? n.converter
                : Gn
            ).toAttribute(e, n.type);
            (this._$El = t),
              null == o ? this.removeAttribute(i) : this.setAttribute(i, o),
              (this._$El = null);
          }
        }
        _$AK(t, e) {
          var n;
          const r = this.constructor,
            i = r._$Ev.get(t);
          if (void 0 !== i && this._$El !== i) {
            const t = r.getPropertyOptions(i),
              o =
                "function" == typeof t.converter
                  ? { fromAttribute: t.converter }
                  : void 0 !==
                    (null === (n = t.converter) || void 0 === n
                      ? void 0
                      : n.fromAttribute)
                  ? t.converter
                  : Gn;
            (this._$El = i),
              (this[i] = o.fromAttribute(e, t.type)),
              (this._$El = null);
          }
        }
        requestUpdate(t, e, n) {
          let r = !0;
          void 0 !== t &&
            ((
              (n = n || this.constructor.getPropertyOptions(t)).hasChanged || Fn
            )(this[t], e)
              ? (this._$AL.has(t) || this._$AL.set(t, e),
                !0 === n.reflect &&
                  this._$El !== t &&
                  (void 0 === this._$EC && (this._$EC = new Map()),
                  this._$EC.set(t, n)))
              : (r = !1)),
            !this.isUpdatePending && r && (this._$E_ = this._$Ej());
        }
        async _$Ej() {
          this.isUpdatePending = !0;
          try {
            await this._$E_;
          } catch (t) {
            Promise.reject(t);
          }
          const t = this.scheduleUpdate();
          return null != t && (await t), !this.isUpdatePending;
        }
        scheduleUpdate() {
          return this.performUpdate();
        }
        performUpdate() {
          var t;
          if (!this.isUpdatePending) return;
          this.hasUpdated,
            this._$Ei &&
              (this._$Ei.forEach((t, e) => (this[e] = t)),
              (this._$Ei = void 0));
          let e = !1;
          const n = this._$AL;
          try {
            (e = this.shouldUpdate(n)),
              e
                ? (this.willUpdate(n),
                  null === (t = this._$ES) ||
                    void 0 === t ||
                    t.forEach((t) => {
                      var e;
                      return null === (e = t.hostUpdate) || void 0 === e
                        ? void 0
                        : e.call(t);
                    }),
                  this.update(n))
                : this._$Ek();
          } catch (t) {
            throw ((e = !1), this._$Ek(), t);
          }
          e && this._$AE(n);
        }
        willUpdate(t) {}
        _$AE(t) {
          var e;
          null === (e = this._$ES) ||
            void 0 === e ||
            e.forEach((t) => {
              var e;
              return null === (e = t.hostUpdated) || void 0 === e
                ? void 0
                : e.call(t);
            }),
            this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
            this.updated(t);
        }
        _$Ek() {
          (this._$AL = new Map()), (this.isUpdatePending = !1);
        }
        get updateComplete() {
          return this.getUpdateComplete();
        }
        getUpdateComplete() {
          return this._$E_;
        }
        shouldUpdate(t) {
          return !0;
        }
        update(t) {
          void 0 !== this._$EC &&
            (this._$EC.forEach((t, e) => this._$EO(e, this[e], t)),
            (this._$EC = void 0)),
            this._$Ek();
        }
        updated(t) {}
        firstUpdated(t) {}
      }
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      var qn;
      (Zn[Hn] = !0),
        (Zn.elementProperties = new Map()),
        (Zn.elementStyles = []),
        (Zn.shadowRootOptions = { mode: "open" }),
        null == Qn || Qn({ ReactiveElement: Zn }),
        (null !== (Pn = Yn.reactiveElementVersions) && void 0 !== Pn
          ? Pn
          : (Yn.reactiveElementVersions = [])
        ).push("1.6.3");
      const Vn = window,
        Xn = Vn.trustedTypes,
        Jn = Xn
          ? Xn.createPolicy("lit-html", { createHTML: (t) => t })
          : void 0,
        Kn = "$lit$",
        tr = `lit$${(Math.random() + "").slice(9)}$`,
        er = "?" + tr,
        nr = `<${er}>`,
        rr = document,
        ir = () => rr.createComment(""),
        or = (t) =>
          null === t || ("object" != typeof t && "function" != typeof t),
        ar = Array.isArray,
        sr = (t) =>
          ar(t) ||
          "function" == typeof (null == t ? void 0 : t[Symbol.iterator]),
        lr = "[ \t\n\f\r]",
        cr = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
        ur = /-->/g,
        fr = />/g,
        dr = RegExp(
          `>|${lr}(?:([^\\s"'>=/]+)(${lr}*=${lr}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
          "g"
        ),
        hr = /'/g,
        pr = /"/g,
        gr = /^(?:script|style|textarea|title)$/i,
        mr =
          (t) =>
          (e, ...n) => ({ _$litType$: t, strings: e, values: n }),
        yr = mr(1),
        Ar = (mr(2), Symbol.for("lit-noChange")),
        vr = Symbol.for("lit-nothing"),
        Mr = new WeakMap(),
        Lr = rr.createTreeWalker(rr, 129, null, !1);
      function br(t, e) {
        if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
          throw Error("invalid template strings array");
        return void 0 !== Jn ? Jn.createHTML(e) : e;
      }
      const Er = (t, e) => {
        const n = t.length - 1,
          r = [];
        let i,
          o = 2 === e ? "<svg>" : "",
          a = cr;
        for (let e = 0; e < n; e++) {
          const n = t[e];
          let s,
            l,
            c = -1,
            u = 0;
          for (
            ;
            u < n.length && ((a.lastIndex = u), (l = a.exec(n)), null !== l);

          )
            (u = a.lastIndex),
              a === cr
                ? "!--" === l[1]
                  ? (a = ur)
                  : void 0 !== l[1]
                  ? (a = fr)
                  : void 0 !== l[2]
                  ? (gr.test(l[2]) && (i = RegExp("</" + l[2], "g")), (a = dr))
                  : void 0 !== l[3] && (a = dr)
                : a === dr
                ? ">" === l[0]
                  ? ((a = null != i ? i : cr), (c = -1))
                  : void 0 === l[1]
                  ? (c = -2)
                  : ((c = a.lastIndex - l[2].length),
                    (s = l[1]),
                    (a = void 0 === l[3] ? dr : '"' === l[3] ? pr : hr))
                : a === pr || a === hr
                ? (a = dr)
                : a === ur || a === fr
                ? (a = cr)
                : ((a = dr), (i = void 0));
          const f = a === dr && t[e + 1].startsWith("/>") ? " " : "";
          o +=
            a === cr
              ? n + nr
              : c >= 0
              ? (r.push(s), n.slice(0, c) + Kn + n.slice(c) + tr + f)
              : n + tr + (-2 === c ? (r.push(void 0), e) : f);
        }
        return [br(t, o + (t[n] || "<?>") + (2 === e ? "</svg>" : "")), r];
      };
      class wr {
        constructor({ strings: t, _$litType$: e }, n) {
          let r;
          this.parts = [];
          let i = 0,
            o = 0;
          const a = t.length - 1,
            s = this.parts,
            [l, c] = Er(t, e);
          if (
            ((this.el = wr.createElement(l, n)),
            (Lr.currentNode = this.el.content),
            2 === e)
          ) {
            const t = this.el.content,
              e = t.firstChild;
            e.remove(), t.append(...e.childNodes);
          }
          for (; null !== (r = Lr.nextNode()) && s.length < a; ) {
            if (1 === r.nodeType) {
              if (r.hasAttributes()) {
                const t = [];
                for (const e of r.getAttributeNames())
                  if (e.endsWith(Kn) || e.startsWith(tr)) {
                    const n = c[o++];
                    if ((t.push(e), void 0 !== n)) {
                      const t = r.getAttribute(n.toLowerCase() + Kn).split(tr),
                        e = /([.?@])?(.*)/.exec(n);
                      s.push({
                        type: 1,
                        index: i,
                        name: e[2],
                        strings: t,
                        ctor:
                          "." === e[1]
                            ? Tr
                            : "?" === e[1]
                            ? Dr
                            : "@" === e[1]
                            ? kr
                            : xr,
                      });
                    } else s.push({ type: 6, index: i });
                  }
                for (const e of t) r.removeAttribute(e);
              }
              if (gr.test(r.tagName)) {
                const t = r.textContent.split(tr),
                  e = t.length - 1;
                if (e > 0) {
                  r.textContent = Xn ? Xn.emptyScript : "";
                  for (let n = 0; n < e; n++)
                    r.append(t[n], ir()),
                      Lr.nextNode(),
                      s.push({ type: 2, index: ++i });
                  r.append(t[e], ir());
                }
              }
            } else if (8 === r.nodeType)
              if (r.data === er) s.push({ type: 2, index: i });
              else {
                let t = -1;
                for (; -1 !== (t = r.data.indexOf(tr, t + 1)); )
                  s.push({ type: 7, index: i }), (t += tr.length - 1);
              }
            i++;
          }
        }
        static createElement(t, e) {
          const n = rr.createElement("template");
          return (n.innerHTML = t), n;
        }
      }
      function jr(t, e, n = t, r) {
        var i, o, a, s;
        if (e === Ar) return e;
        let l =
          void 0 !== r
            ? null === (i = n._$Co) || void 0 === i
              ? void 0
              : i[r]
            : n._$Cl;
        const c = or(e) ? void 0 : e._$litDirective$;
        return (
          (null == l ? void 0 : l.constructor) !== c &&
            (null === (o = null == l ? void 0 : l._$AO) ||
              void 0 === o ||
              o.call(l, !1),
            void 0 === c ? (l = void 0) : ((l = new c(t)), l._$AT(t, n, r)),
            void 0 !== r
              ? ((null !== (a = (s = n)._$Co) && void 0 !== a
                  ? a
                  : (s._$Co = []))[r] = l)
              : (n._$Cl = l)),
          void 0 !== l && (e = jr(t, l._$AS(t, e.values), l, r)),
          e
        );
      }
      class Cr {
        constructor(t, e) {
          (this._$AV = []),
            (this._$AN = void 0),
            (this._$AD = t),
            (this._$AM = e);
        }
        get parentNode() {
          return this._$AM.parentNode;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        u(t) {
          var e;
          const {
              el: { content: n },
              parts: r,
            } = this._$AD,
            i = (
              null !== (e = null == t ? void 0 : t.creationScope) &&
              void 0 !== e
                ? e
                : rr
            ).importNode(n, !0);
          Lr.currentNode = i;
          let o = Lr.nextNode(),
            a = 0,
            s = 0,
            l = r[0];
          for (; void 0 !== l; ) {
            if (a === l.index) {
              let e;
              2 === l.type
                ? (e = new Nr(o, o.nextSibling, this, t))
                : 1 === l.type
                ? (e = new l.ctor(o, l.name, l.strings, this, t))
                : 6 === l.type && (e = new Or(o, this, t)),
                this._$AV.push(e),
                (l = r[++s]);
            }
            a !== (null == l ? void 0 : l.index) && ((o = Lr.nextNode()), a++);
          }
          return (Lr.currentNode = rr), i;
        }
        v(t) {
          let e = 0;
          for (const n of this._$AV)
            void 0 !== n &&
              (void 0 !== n.strings
                ? (n._$AI(t, n, e), (e += n.strings.length - 2))
                : n._$AI(t[e])),
              e++;
        }
      }
      class Nr {
        constructor(t, e, n, r) {
          var i;
          (this.type = 2),
            (this._$AH = vr),
            (this._$AN = void 0),
            (this._$AA = t),
            (this._$AB = e),
            (this._$AM = n),
            (this.options = r),
            (this._$Cp =
              null === (i = null == r ? void 0 : r.isConnected) ||
              void 0 === i ||
              i);
        }
        get _$AU() {
          var t, e;
          return null !==
            (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
            void 0 !== e
            ? e
            : this._$Cp;
        }
        get parentNode() {
          let t = this._$AA.parentNode;
          const e = this._$AM;
          return (
            void 0 !== e &&
              11 === (null == t ? void 0 : t.nodeType) &&
              (t = e.parentNode),
            t
          );
        }
        get startNode() {
          return this._$AA;
        }
        get endNode() {
          return this._$AB;
        }
        _$AI(t, e = this) {
          (t = jr(this, t, e)),
            or(t)
              ? t === vr || null == t || "" === t
                ? (this._$AH !== vr && this._$AR(), (this._$AH = vr))
                : t !== this._$AH && t !== Ar && this._(t)
              : void 0 !== t._$litType$
              ? this.g(t)
              : void 0 !== t.nodeType
              ? this.$(t)
              : sr(t)
              ? this.T(t)
              : this._(t);
        }
        k(t) {
          return this._$AA.parentNode.insertBefore(t, this._$AB);
        }
        $(t) {
          this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
        }
        _(t) {
          this._$AH !== vr && or(this._$AH)
            ? (this._$AA.nextSibling.data = t)
            : this.$(rr.createTextNode(t)),
            (this._$AH = t);
        }
        g(t) {
          var e;
          const { values: n, _$litType$: r } = t,
            i =
              "number" == typeof r
                ? this._$AC(t)
                : (void 0 === r.el &&
                    (r.el = wr.createElement(br(r.h, r.h[0]), this.options)),
                  r);
          if (
            (null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === i
          )
            this._$AH.v(n);
          else {
            const t = new Cr(i, this),
              e = t.u(this.options);
            t.v(n), this.$(e), (this._$AH = t);
          }
        }
        _$AC(t) {
          let e = Mr.get(t.strings);
          return void 0 === e && Mr.set(t.strings, (e = new wr(t))), e;
        }
        T(t) {
          ar(this._$AH) || ((this._$AH = []), this._$AR());
          const e = this._$AH;
          let n,
            r = 0;
          for (const i of t)
            r === e.length
              ? e.push(
                  (n = new Nr(this.k(ir()), this.k(ir()), this, this.options))
                )
              : (n = e[r]),
              n._$AI(i),
              r++;
          r < e.length &&
            (this._$AR(n && n._$AB.nextSibling, r), (e.length = r));
        }
        _$AR(t = this._$AA.nextSibling, e) {
          var n;
          for (
            null === (n = this._$AP) || void 0 === n || n.call(this, !1, !0, e);
            t && t !== this._$AB;

          ) {
            const e = t.nextSibling;
            t.remove(), (t = e);
          }
        }
        setConnected(t) {
          var e;
          void 0 === this._$AM &&
            ((this._$Cp = t),
            null === (e = this._$AP) || void 0 === e || e.call(this, t));
        }
      }
      class xr {
        constructor(t, e, n, r, i) {
          (this.type = 1),
            (this._$AH = vr),
            (this._$AN = void 0),
            (this.element = t),
            (this.name = e),
            (this._$AM = r),
            (this.options = i),
            n.length > 2 || "" !== n[0] || "" !== n[1]
              ? ((this._$AH = Array(n.length - 1).fill(new String())),
                (this.strings = n))
              : (this._$AH = vr);
        }
        get tagName() {
          return this.element.tagName;
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t, e = this, n, r) {
          const i = this.strings;
          let o = !1;
          if (void 0 === i)
            (t = jr(this, t, e, 0)),
              (o = !or(t) || (t !== this._$AH && t !== Ar)),
              o && (this._$AH = t);
          else {
            const r = t;
            let a, s;
            for (t = i[0], a = 0; a < i.length - 1; a++)
              (s = jr(this, r[n + a], e, a)),
                s === Ar && (s = this._$AH[a]),
                o || (o = !or(s) || s !== this._$AH[a]),
                s === vr
                  ? (t = vr)
                  : t !== vr && (t += (null != s ? s : "") + i[a + 1]),
                (this._$AH[a] = s);
          }
          o && !r && this.j(t);
        }
        j(t) {
          t === vr
            ? this.element.removeAttribute(this.name)
            : this.element.setAttribute(this.name, null != t ? t : "");
        }
      }
      class Tr extends xr {
        constructor() {
          super(...arguments), (this.type = 3);
        }
        j(t) {
          this.element[this.name] = t === vr ? void 0 : t;
        }
      }
      const Sr = Xn ? Xn.emptyScript : "";
      class Dr extends xr {
        constructor() {
          super(...arguments), (this.type = 4);
        }
        j(t) {
          t && t !== vr
            ? this.element.setAttribute(this.name, Sr)
            : this.element.removeAttribute(this.name);
        }
      }
      class kr extends xr {
        constructor(t, e, n, r, i) {
          super(t, e, n, r, i), (this.type = 5);
        }
        _$AI(t, e = this) {
          var n;
          if (
            (t = null !== (n = jr(this, t, e, 0)) && void 0 !== n ? n : vr) ===
            Ar
          )
            return;
          const r = this._$AH,
            i =
              (t === vr && r !== vr) ||
              t.capture !== r.capture ||
              t.once !== r.once ||
              t.passive !== r.passive,
            o = t !== vr && (r === vr || i);
          i && this.element.removeEventListener(this.name, this, r),
            o && this.element.addEventListener(this.name, this, t),
            (this._$AH = t);
        }
        handleEvent(t) {
          var e, n;
          "function" == typeof this._$AH
            ? this._$AH.call(
                null !==
                  (n =
                    null === (e = this.options) || void 0 === e
                      ? void 0
                      : e.host) && void 0 !== n
                  ? n
                  : this.element,
                t
              )
            : this._$AH.handleEvent(t);
        }
      }
      class Or {
        constructor(t, e, n) {
          (this.element = t),
            (this.type = 6),
            (this._$AN = void 0),
            (this._$AM = e),
            (this.options = n);
        }
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AI(t) {
          jr(this, t);
        }
      }
      const Ir = Vn.litHtmlPolyfillSupport;
      null == Ir || Ir(wr, Nr),
        (null !== (qn = Vn.litHtmlVersions) && void 0 !== qn
          ? qn
          : (Vn.litHtmlVersions = [])
        ).push("2.8.0");
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      var zr, _r;
      class Br extends Zn {
        constructor() {
          super(...arguments),
            (this.renderOptions = { host: this }),
            (this._$Do = void 0);
        }
        createRenderRoot() {
          var t, e;
          const n = super.createRenderRoot();
          return (
            (null !== (t = (e = this.renderOptions).renderBefore) &&
              void 0 !== t) ||
              (e.renderBefore = n.firstChild),
            n
          );
        }
        update(t) {
          const e = this.render();
          this.hasUpdated ||
            (this.renderOptions.isConnected = this.isConnected),
            super.update(t),
            (this._$Do = ((t, e, n) => {
              var r, i;
              const o =
                null !== (r = null == n ? void 0 : n.renderBefore) &&
                void 0 !== r
                  ? r
                  : e;
              let a = o._$litPart$;
              if (void 0 === a) {
                const t =
                  null !== (i = null == n ? void 0 : n.renderBefore) &&
                  void 0 !== i
                    ? i
                    : null;
                o._$litPart$ = a = new Nr(
                  e.insertBefore(ir(), t),
                  t,
                  void 0,
                  null != n ? n : {}
                );
              }
              return a._$AI(t), a;
            })(e, this.renderRoot, this.renderOptions));
        }
        connectedCallback() {
          var t;
          super.connectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
        }
        disconnectedCallback() {
          var t;
          super.disconnectedCallback(),
            null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
        }
        render() {
          return Ar;
        }
      }
      (Br.finalized = !0),
        (Br._$litElement$ = !0),
        null === (zr = globalThis.litElementHydrateSupport) ||
          void 0 === zr ||
          zr.call(globalThis, { LitElement: Br });
      const Rr = globalThis.litElementPolyfillSupport;
      null == Rr || Rr({ LitElement: Br });
      (null !== (_r = globalThis.litElementVersions) && void 0 !== _r
        ? _r
        : (globalThis.litElementVersions = [])
      ).push("3.3.3");
      var Pr,
        Yr,
        $r = n(661);
      function Ur(t) {
        return (
          (Ur =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          Ur(t)
        );
      }
      function Qr(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return Gr(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return Gr(t, e);
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          s = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (s = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (s) throw o;
            }
          },
        };
      }
      function Gr(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function Fr(t, e) {
        return (
          e || (e = t.slice(0)),
          Object.freeze(
            Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
          )
        );
      }
      function Wr(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function Hr(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, ti(r.key), r);
        }
      }
      function Zr(t, e, n) {
        return (
          e && Hr(t.prototype, e),
          n && Hr(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function qr(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && Vr(t, e);
      }
      function Vr(t, e) {
        return (
          (Vr = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          Vr(t, e)
        );
      }
      function Xr(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Jr(t);
          if (e) {
            var i = Jr(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === Ur(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t);
          })(this, n);
        };
      }
      function Jr(t) {
        return (
          (Jr = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          Jr(t)
        );
      }
      function Kr(t, e, n) {
        return (
          (e = ti(e)) in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function ti(t) {
        var e = (function (t, e) {
          if ("object" !== Ur(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" !== Ur(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" === Ur(e) ? e : String(e);
      }
      var ei = (function (t) {
        qr(n, t);
        var e = Xr(n);
        function n() {
          var t;
          return (
            Wr(this, n),
            ((t = e.call(this)).className = t.className || "raised floating"),
            (t.config = {}),
            (t.urls = { build: null, external: null }),
            (t.highest_version = null),
            t
          );
        }
        return (
          Zr(n, [
            {
              key: "loadConfig",
              value: function (t) {
                if (
                  ((this.config = t),
                  t.addons.external_version_warning.enabled &&
                    "external" === t.versions.current.type)
                ) {
                  var e = t.projects.current.repository.url
                    .replace(".git", "")
                    .replace("git@github.com:", "https://github.com/");
                  this.urls = {
                    build: ""
                      .concat(window.location.protocol, "//")
                      .concat(t.domains.dashboard, "/projects/")
                      .concat(t.projects.current.slug, "/builds/")
                      .concat(t.builds.current.id, "/"),
                    external: ""
                      .concat(e, "/pull/")
                      .concat(t.versions.current.slug),
                  };
                }
              },
            },
            {
              key: "render",
              value: function () {
                if (!this.config) return vr;
                if ("external" === this.config.versions.current.type) {
                  if (this.config.addons.external_version_warning.enabled)
                    return this.renderExternalVersionWarning();
                } else 0;
                return vr;
              },
            },
            {
              key: "calculateHighestVersion",
              value: function () {
                var t = this.config.addons.non_latest_version_warning.versions,
                  e = t.map(function (t) {
                    return u()(t);
                  }),
                  n = l()(e, ">=0.0.0"),
                  r = t[e.indexOf(n)];
                r &&
                  r !== this.config.versions.current.slug &&
                  (this.highest_version = {
                    name: r,
                    url: ""
                      .concat(window.location.protocol, "//")
                      .concat(window.location.hostname, "/")
                      .concat(this.config.projects.current.language, "/")
                      .concat(r, "/"),
                  });
              },
            },
            {
              key: "renderNonLatestVersionWarning",
              value: function () {
                jn.add(kn), jn.add(Sn);
                var t = Cn(kn, { title: "Close notification" }),
                  e = Cn(Sn, {
                    title: "This version is not the latest one",
                    classes: ["header", "icon"],
                  });
                return yr(
                  Pr ||
                    (Pr = Fr([
                      "\n      <div>\n        ",
                      '\n        <div class="title">\n          This is an <span>old version</span>\n          <a href="#" class="right" @click=',
                      ">\n            ",
                      '\n          </a>\n        </div>\n        <div class="content">\n          You are reading an old version of this documentation. The latest\n          stable version is\n          <a href="',
                      '">',
                      "</a\n          >.\n        </div>\n      </div>\n    ",
                    ])),
                  e.node[0],
                  this.closeNotification,
                  t.node[0],
                  this.highest_version.url,
                  this.highest_version.name
                );
              },
            },
            {
              key: "renderExternalVersionWarning",
              value: function () {
                jn.add(kn), jn.add(Nn);
                var t = Cn(kn, { title: "Close notification" }),
                  e = Cn(Nn, {
                    title: "This version is a pull request version",
                    classes: ["header", "icon"],
                  });
                return yr(
                  Yr ||
                    (Yr = Fr([
                      "\n      <div>\n        ",
                      '\n        <div class="title">\n          This page was created from a pull request build\n          <a href="#" class="right" @click=',
                      ">\n            ",
                      '\n          </a>\n        </div>\n        <div class="content">\n          See the\n          <a href="',
                      '">build\'s detail page</a>\n          or\n          <a href="',
                      '"\n            >pull request #',
                      "</a\n          >\n          for more information.\n        </div>\n      </div>\n    ",
                    ])),
                  e.node[0],
                  this.closeNotification,
                  t.node[0],
                  this.urls.build,
                  this.urls.external,
                  this.config.versions.current.slug
                );
              },
            },
            {
              key: "closeNotification",
              value: function (t) {
                return this.remove(), !1;
              },
            },
          ]),
          n
        );
      })(Br);
      Kr(ei, "elementName", "readthedocs-notification"),
        Kr(ei, "properties", {
          config: { state: !0 },
          urls: { state: !0 },
          highest_version: { state: !0 },
        }),
        Kr(ei, "styles", $r.Z);
      var ni = (function (t) {
        qr(n, t);
        var e = Xr(n);
        function n(t) {
          var r;
          Wr(this, n),
            (r = e.call(this)),
            customElements.define("readthedocs-notification", ei);
          var i = document.querySelectorAll("readthedocs-notification");
          i.length ||
            ((i = [new ei()]),
            document.body.append(i[0]),
            i[0].requestUpdate());
          var o,
            a = Qr(i);
          try {
            for (a.s(); !(o = a.n()).done; ) {
              o.value.loadConfig(t);
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          return r;
        }
        return (
          Zr(n, null, [
            {
              key: "isEnabled",
              value: function (t) {
                return (
                  (t.addons &&
                    t.addons.external_version_warning.enabled &&
                    "external" === t.versions.current.type) ||
                  (t.addons.non_latest_version_warning.enabled &&
                    "external" !== t.versions.current.type)
                );
              },
            },
          ]),
          n
        );
      })(o);
      function ri(t) {
        return (
          (ri =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          ri(t)
        );
      }
      function ii(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(
              t,
              ((i = r.key),
              (o = void 0),
              (o = (function (t, e) {
                if ("object" !== ri(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" !== ri(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(i, "string")),
              "symbol" === ri(o) ? o : String(o)),
              r
            );
        }
        var i, o;
      }
      function oi(t, e) {
        return (
          (oi = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          oi(t, e)
        );
      }
      function ai(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = si(t);
          if (e) {
            var i = si(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === ri(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t);
          })(this, n);
        };
      }
      function si(t) {
        return (
          (si = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          si(t)
        );
      }
      var li = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            e && oi(t, e);
        })(a, t);
        var e,
          n,
          i,
          o = ai(a);
        function a(t) {
          var e;
          return (
            (function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, a),
            ((e = o.call(this)).config = t),
            e.registerPageView(),
            e.injectGlobalAnalytics(),
            e
          );
        }
        return (
          (e = a),
          (n = [
            {
              key: "registerPageView",
              value: function () {
                var t = {
                    project: this.config.projects.current.slug,
                    version: this.config.versions.current.slug,
                    absolute_uri: window.location.href,
                  },
                  e =
                    "/_/api/v2/analytics/?" + new URLSearchParams(t).toString();
                fetch(e, {
                  method: "GET",
                  cache: "no-store",
                  headers: { "X-RTD-Hosting-Integrations-Version": r },
                })
                  .then(function (t) {
                    if (!t.ok) throw new Error();
                  })
                  .catch(function (t) {
                    console.error("Error registering page view");
                  });
              },
            },
            {
              key: "injectGlobalAnalytics",
              value: function () {
                if ("1" === navigator.doNotTrack)
                  console.debug("Respecting DNT with respect to analytics...");
                else if (this.config.readthedocs.analytics.code) {
                  var t = function () {
                    dataLayer.push(arguments);
                  };
                  !(function () {
                    var t = document.createElement("script");
                    (t.src =
                      "https://www.googletagmanager.com/gtag/js?id=" +
                      this.config.readthedocs.analytics.code),
                      (t.type = "text/javascript"),
                      (t.async = !0),
                      document.getElementsByTagName("head")[0].appendChild(t);
                  })(),
                    (window.dataLayer = window.dataLayer || []),
                    t("js", new Date()),
                    t("config", this.config.readthedocs.analytics.code, {
                      anonymize_ip: !0,
                      cookie_expires: 0,
                      dimension1: this.config.projects.current.slug,
                      dimension2: this.config.versions.current.slug,
                      dimension3: this.config.projects.current.language,
                      dimension5:
                        this.config.projects.current.programming_language,
                      groups: "rtfd",
                    });
                }
              },
            },
          ]),
          (i = [
            {
              key: "isEnabled",
              value: function (t) {
                return t.addons && t.addons.analytics.enabled;
              },
            },
          ]),
          n && ii(e.prototype, n),
          i && ii(e, i),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          a
        );
      })(o);
      var ci = n(272),
        ui = "readthedocs-search-show",
        fi = "readthedocs-docdiff-added-removed-show",
        di = "readthedocs-docdiff-hide";
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      const hi = 1,
        pi = 2,
        gi =
          (t) =>
          (...e) => ({ _$litDirective$: t, values: e });
      class mi {
        constructor(t) {}
        get _$AU() {
          return this._$AM._$AU;
        }
        _$AT(t, e, n) {
          (this._$Ct = t), (this._$AM = e), (this._$Ci = n);
        }
        _$AS(t, e) {
          return this.update(t, e);
        }
        update(t, e) {
          return this.render(...e);
        }
      }
      /**
       * @license
       * Copyright 2017 Google LLC
       * SPDX-License-Identifier: BSD-3-Clause
       */
      class yi extends mi {
        constructor(t) {
          if ((super(t), (this.et = vr), t.type !== pi))
            throw Error(
              this.constructor.directiveName +
                "() can only be used in child bindings"
            );
        }
        render(t) {
          if (t === vr || null == t) return (this.ft = void 0), (this.et = t);
          if (t === Ar) return t;
          if ("string" != typeof t)
            throw Error(
              this.constructor.directiveName +
                "() called with a non-string value"
            );
          if (t === this.et) return this.ft;
          this.et = t;
          const e = [t];
          return (
            (e.raw = e),
            (this.ft = {
              _$litType$: this.constructor.resultType,
              strings: e,
              values: [],
            })
          );
        }
      }
      (yi.directiveName = "unsafeHTML"), (yi.resultType = 1);
      const Ai = gi(yi),
        vi = gi(
          class extends mi {
            constructor(t) {
              var e;
              if (
                (super(t),
                t.type !== hi ||
                  "class" !== t.name ||
                  (null === (e = t.strings) || void 0 === e
                    ? void 0
                    : e.length) > 2)
              )
                throw Error(
                  "`classMap()` can only be used in the `class` attribute and must be the only part in the attribute."
                );
            }
            render(t) {
              return (
                " " +
                Object.keys(t)
                  .filter((e) => t[e])
                  .join(" ") +
                " "
              );
            }
            update(t, [e]) {
              var n, r;
              if (void 0 === this.it) {
                (this.it = new Set()),
                  void 0 !== t.strings &&
                    (this.nt = new Set(
                      t.strings
                        .join(" ")
                        .split(/\s/)
                        .filter((t) => "" !== t)
                    ));
                for (const t in e)
                  e[t] &&
                    !(null === (n = this.nt) || void 0 === n
                      ? void 0
                      : n.has(t)) &&
                    this.it.add(t);
                return this.render(e);
              }
              const i = t.element.classList;
              this.it.forEach((t) => {
                t in e || (i.remove(t), this.it.delete(t));
              });
              for (const t in e) {
                const n = !!e[t];
                n === this.it.has(t) ||
                  (null === (r = this.nt) || void 0 === r
                    ? void 0
                    : r.has(t)) ||
                  (n
                    ? (i.add(t), this.it.add(t))
                    : (i.remove(t), this.it.delete(t)));
              }
              return Ar;
            }
          }
        );
      var Mi, Li, bi, Ei, wi, ji, Ci, Ni, xi;
      function Ti(t) {
        return (
          (Ti =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          Ti(t)
        );
      }
      function Si(t, e) {
        return (
          e || (e = t.slice(0)),
          Object.freeze(
            Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
          )
        );
      }
      function Di(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return ki(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return ki(t, e);
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          s = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (s = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (s) throw o;
            }
          },
        };
      }
      function ki(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function Oi(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function Ii(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, Qi(r.key), r);
        }
      }
      function zi(t, e, n) {
        return (
          e && Ii(t.prototype, e),
          n && Ii(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function _i() {
        return (
          (_i =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get.bind()
              : function (t, e, n) {
                  var r = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = $i(t));

                    );
                    return t;
                  })(t, e);
                  if (r) {
                    var i = Object.getOwnPropertyDescriptor(r, e);
                    return i.get
                      ? i.get.call(arguments.length < 3 ? t : n)
                      : i.value;
                  }
                }),
          _i.apply(this, arguments)
        );
      }
      function Bi(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && Ri(t, e);
      }
      function Ri(t, e) {
        return (
          (Ri = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          Ri(t, e)
        );
      }
      function Pi(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = $i(t);
          if (e) {
            var i = $i(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === Ti(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return Yi(t);
          })(this, n);
        };
      }
      function Yi(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function $i(t) {
        return (
          ($i = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          $i(t)
        );
      }
      function Ui(t, e, n) {
        return (
          (e = Qi(e)) in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function Qi(t) {
        var e = (function (t, e) {
          if ("object" !== Ti(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" !== Ti(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" === Ti(e) ? e : String(e);
      }
      var Gi = (function (t) {
        Bi(n, t);
        var e = Pi(n);
        function n() {
          var t;
          return (
            Oi(this, n),
            Ui(Yi((t = e.call(this))), "_handleShowModal", function (e) {
              27 === e.keyCode
                ? t.closeModal()
                : e.keyCode !== t.triggerKeycode ||
                  t.show ||
                  (e.preventDefault(), t.showModal());
            }),
            Ui(Yi(t), "_handleShowModalUser", function (e) {
              e.preventDefault(), t.showModal();
            }),
            jn.add(Dn),
            jn.add(xn),
            jn.add(Tn),
            (t.className = t.className || "raised floating"),
            (t.config = {}),
            (t.show = !1),
            (t.cssFormFocusClasses = {}),
            (t.results = null),
            (t.inputIcon = Cn(Dn, { title: "Search docs" })),
            (t.currentQueryRequest = null),
            (t.defaultFilter = null),
            (t.filters = []),
            (t.triggerKeycode = 191),
            (t.triggerSelector = null),
            (t.triggerEvent = "focusin"),
            t
          );
        }
        return (
          zi(n, [
            {
              key: "loadConfig",
              value: function (t) {
                if (((this.config = t), t.addons.search)) {
                  this.defaultFilter = {
                    name: "Default filter",
                    value: t.addons.search.default_filter,
                  };
                  var e,
                    n = [],
                    r = Di(t.addons.search.filters);
                  try {
                    for (r.s(); !(e = r.n()).done; ) {
                      var i = e.value;
                      n.push({ name: i[0], value: i[1] });
                    }
                  } catch (t) {
                    r.e(t);
                  } finally {
                    r.f();
                  }
                  this.filters = n;
                }
              },
            },
            {
              key: "render",
              value: function () {
                if (this.config)
                  return this.config.addons &&
                    this.config.addons.search &&
                    this.config.addons.search.enabled
                    ? this.renderSearchModal()
                    : void 0;
              },
            },
            {
              key: "renderSearchModal",
              value: function () {
                return yr(
                  Mi ||
                    (Mi = Si([
                      "\n      <div ?hidden=",
                      ' role="search">\n        <div @click=',
                      ' class="background"></div>\n        <div class="content">\n          <form class=',
                      ">\n            <label>",
                      "</label>\n            <input\n              @input=",
                      "\n              @keydown=",
                      "\n              @focusin=",
                      "\n              @focusout=",
                      '\n              placeholder="Search docs"\n              type="search"\n              autocomplete="off"\n            />\n          </form>\n          <div class="filters">',
                      '</div>\n          <div class="results">',
                      '</div>\n          <div class="footer">\n            <ul class="help">\n              <li><code>Enter</code> to select</li>\n              <li><code>Up</code>/<code>Down</code> to navigate</li>\n              <li><code>Esc</code> to close</li>\n            </ul>\n            <div class="credits">\n              Search powered by\n              <a href="https://about.readthedocs.com/">\n                <img src="',
                      '" alt="Read the Docs" />\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    ',
                    ])),
                  !this.show,
                  this.closeModal,
                  vi(this.cssFormFocusClasses),
                  this.inputIcon.node[0],
                  this.queryInput,
                  this.selectResultKeyboard,
                  this.queryInputFocus,
                  this.queryInputFocus,
                  this.renderFilters(),
                  this.results,
                  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJzdmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSI2OTQgMTk3IDIwMDAgNDAwIj4KPGcgaWQ9ImxvZ28iIHRyYW5zZm9ybT0ibWF0cml4KDAuNTU3NTM2NDQsMCwwLDAuNTU3NTM2NDQsNjguMzA4MTM1LDEwNTAuMTI2MikiPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTE0MDguMS0xMTgxLjdjLTcuNSwxLTEyLjcsNy44LTExLjcsMTUuMyAgIGMwLjcsNS40LDQuNiw5LjksOS45LDExLjNjMCwwLDMzLjIsMTEsODkuNywxNS42YzQ1LjQsMy43LDk2LjktMy4yLDk2LjktMy4yYzcuNS0wLjIsMTMuNS02LjUsMTMuMi0xNHMtNi41LTEzLjUtMTQtMTMuMiAgIGMtMC45LDAtMS44LDAuMS0yLjYsMC4zYzAsMC01MC40LDYuMi05MS4zLDIuOWMtNTQtNC40LTgzLjQtMTQuMy04My40LTE0LjNDMTQxMi42LTExODEuNywxNDEwLjMtMTE4MiwxNDA4LjEtMTE4MS43eiAgICBNMTQwOC4xLTEyNDkuM2MtNy41LDEtMTIuNyw3LjgtMTEuNywxNS4zYzAuNyw1LjQsNC42LDkuOSw5LjksMTEuM2MwLDAsMzMuMiwxMSw4OS43LDE1LjZjNDUuNCwzLjcsOTYuOS0zLjIsOTYuOS0zLjIgICBjNy41LTAuMiwxMy41LTYuNSwxMy4yLTE0cy02LjUtMTMuNS0xNC0xMy4yYy0wLjksMC0xLjgsMC4xLTIuNiwwLjNjMCwwLTUwLjQsNi4yLTkxLjMsMi45Yy01NC00LjQtODMuNC0xNC4zLTgzLjQtMTQuMyAgIEMxNDEyLjYtMTI0OS4zLDE0MTAuMy0xMjQ5LjYsMTQwOC4xLTEyNDkuM3ogTTE0MDguMS0xMzE2LjljLTcuNSwxLTEyLjcsNy44LTExLjcsMTUuM2MwLjcsNS40LDQuNiw5LjksOS45LDExLjMgICBjMCwwLDMzLjIsMTEsODkuNywxNS42YzQ1LjQsMy43LDk2LjktMy4yLDk2LjktMy4yYzcuNS0wLjIsMTMuNS02LjUsMTMuMi0xNHMtNi41LTEzLjUtMTQtMTMuMmMtMC45LDAtMS44LDAuMS0yLjYsMC4zICAgYzAsMC01MC40LDYuMi05MS4zLDIuOWMtNTQtNC40LTgzLjQtMTQuMy04My40LTE0LjNDMTQxMi42LTEzMTYuOSwxNDEwLjMtMTMxNy4yLDE0MDguMS0xMzE2Ljl6IE0xNDA4LjEtMTM4NC40ICAgYy03LjUsMS0xMi43LDcuOC0xMS43LDE1LjNjMC43LDUuNCw0LjYsOS45LDkuOSwxMS4zYzAsMCwzMy4yLDExLDg5LjcsMTUuNmM0NS40LDMuNyw5Ni45LTMuMiw5Ni45LTMuMmM3LjUtMC4yLDEzLjUtNi41LDEzLjItMTQgICBzLTYuNS0xMy41LTE0LTEzLjJjLTAuOSwwLTEuOCwwLjEtMi42LDAuM2MwLDAtNTAuNCw2LjItOTEuMywyLjljLTU0LTQuNC04My40LTE0LjMtODMuNC0xNC4zICAgQzE0MTIuNi0xMzg0LjUsMTQxMC4zLTEzODQuNywxNDA4LjEtMTM4NC40eiBNMTMxMy40LTE0NTUuN2MtNzEsMC41LTk3LjUsMjIuMy05Ny41LDIyLjN2NTMwLjNjMCwwLDI1LjgtMjIuMywxMDktMTguOSAgIGM4My4yLDMuNCwxMDAuMywzMi42LDIwMi41LDM0LjZjMTAyLjIsMi4xLDEyNy45LTE1LjcsMTI3LjktMTUuN2wxLjUtNTQwLjZjMCwwLTQ2LDEzLTEzNS41LDEzLjdzLTExMS0yMi44LTE5My4yLTI1LjUgICBDMTMyMy0xNDU1LjYsMTMxOC4xLTE0NTUuNywxMzEzLjQtMTQ1NS43eiBNMTM3Mi44LTE0MjEuMWMwLDAsNDMsMTQuMiwxMjIuNSwxOC4yYzY3LjIsMy4zLDEzNC41LTYuNiwxMzQuNS02LjZ2NDgwLjUgICBjMCwwLTM0LjEsMTcuOS0xMTkuMywxMS44Yy02Ni00LjctMTM4LjctMjkuNy0xMzguNy0yOS43TDEzNzIuOC0xNDIxLjF6IE0xMzMxLjMtMTQwOC42YzcuNiwwLDEzLjcsNi4yLDEzLjcsMTMuNyAgIHMtNi4yLDEzLjctMTMuNywxMy43YzAsMC0yMi4zLDAuMS0zNS44LDEuNWMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNmMtNi43LDMuNS0xNSwxLTE4LjUtNS43cy0xLTE1LDUuNy0xOC41YzAsMCwwLDAsMCwwICAgYzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDkuMS0xNDA4LjUsMTMzMS4zLTE0MDguNiwxMzMxLjMtMTQwOC42eiBNMTMxOC4xLTEzNDAuOGM3LjYtMC4yLDEzLjMsMCwxMy4zLDAgICBjNy41LDAuOSwxMi45LDcuOCwxMiwxNS4zYy0wLjgsNi4zLTUuNywxMS4yLTEyLDEyYzAsMC0yMi4zLDAuMS0zNS44LDEuNWMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNmMtNi43LDMuNS0xNSwwLjktMTguNS01LjggICBjLTMuNS02LjctMC45LTE1LDUuOC0xOC41YzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDAuOS0xMzQwLjEsMTMxMC41LTEzNDAuNiwxMzE4LjEtMTM0MC44eiBNMTMzMS4zLTEyNzMuMyAgIGM3LjYsMCwxMy43LDYuMiwxMy43LDEzLjdjMCw3LjYtNi4yLDEzLjctMTMuNywxMy43YzAsMC0yMi4zLTAuMS0zNS44LDEuMmMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNiAgIGMtNi43LDMuNS0xNSwwLjktMTguNS01LjhjLTMuNS02LjctMC45LTE1LDUuOC0xOC41YzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDkuMS0xMjczLjQsMTMzMS4zLTEyNzMuMywxMzMxLjMtMTI3My4zeiIvPgo8L2c+CjxnIGlkPSJ0ZXh0Ij4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjMyMkEiIGQ9Ik0xMTI4LjYsNDkxLjlWNDcwbDguOS0wLjhjNS4yLTAuNSw3LjgtMy4xLDcuOC03LjZWMzM2bC0xNS40LTAuOHYtMjNoNzMuOCAgIGMyMC45LDAsMzYuOSwzLjksNDguMSwxMS42YzExLjIsNy43LDE2LjgsMjAuNSwxNi44LDM4LjFjMCwxMi4zLTMuMiwyMi4zLTkuNywzMC4zYy02LjMsNy45LTEzLjksMTMuNy0yMi43LDE3LjMgICBjNi41LDIuMywxMS42LDcuOCwxNS40LDE2LjVsMTkuNSw0Mi40bDE1LjQsMC41djIzaC02Ni44VjQ3MGw3LjgtMC44YzQuMS0wLjUsNi4yLTIuMiw2LjItNC45YzAtMS4xLTAuNC0yLjMtMS4xLTMuOGwtMTIuNy0yNyAgIGMtMi00LjUtNC4yLTcuNy02LjgtOS41Yy0yLjMtMi01LjgtMy0xMC4zLTNoLTI0LjZ2NDdsMTcuNiwwLjh2MjNMMTEyOC42LDQ5MS45IE0xMTc4LjMsMzk1LjRoMjMuNWMyMi4yLDAsMzMuMi05LjksMzMuMi0yOS43ICAgYzAtMTEuNC0zLTE4LjctOC45LTIyLjJjLTUuOC0zLjQtMTUuMS01LjEtMjguMS01LjFoLTE5LjdWMzk1LjQiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjMyMkEiIGQ9Ik0xMzU2LDM1MS45YzEzLjUsMCwyNC4yLDMuMywzMi4yLDEwYzcuOSw2LjUsMTEuOSwxNS43LDExLjksMjcuNmMwLDcuOS0xLjcsMTUtNS4xLDIxLjEgICBjLTMuNCw1LjktNy43LDEwLjYtMTIuNywxNC4xYy01LDMuNC0xMS4yLDYuMi0xOC40LDguNGMtMTIuMSwzLjYtMjUuNyw1LjQtNDAuOCw1LjRjMC41LDkuNSwzLjUsMTcuMyw4LjksMjMuMiAgIGM1LjQsNS44LDEzLjcsOC42LDI0LjksOC42YzExLjIsMCwyMi4zLTQsMzMuNS0xMS45bDEwLjMsMjEuOWMtMy42LDMuMi05LjcsNi42LTE4LjQsMTBjLTguNSwzLjQtMTguMiw1LjEtMjkuMiw1LjEgICBjLTIyLDAtMzguMS02LTQ4LjQtMTguMWMtMTAuMy0xMi4zLTE1LjQtMjktMTUuNC01MC4zYzAtMjEuMyw1LjktMzkuMSwxNy42LTUzLjVDMTMxOC41LDM1OS4xLDEzMzQuOSwzNTEuOSwxMzU2LDM1MS45ICAgIE0xMzQzLjYsNDEzLjhjNi43LTEuMywxMi44LTMuOSwxOC40LTcuOGM1LjYtNC4xLDguNC05LDguNC0xNC42YzAtMTEtNS40LTE2LjUtMTYuMi0xNi41Yy0xMC4xLDAtMTcuOCw0LjEtMjMuMiwxMi4yICAgYy01LjQsNy45LTguNCwxNy41LTguOSwyOC42QzEzMjkuOSw0MTUuNSwxMzM3LjEsNDE0LjksMTM0My42LDQxMy44Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMzIzMjJBIiBkPSJNMTUyOS42LDM2MS40djEwMC41YzAsMi45LDAuNSw0LjksMS40LDUuOWMxLjEsMS4xLDIuOSwxLjcsNS40LDEuOWw4LjYsMC41djIxLjZoLTQzdi0xNS43ICAgbC0wLjgtMC4zYy05LDEzLTIxLjQsMTkuNS0zNywxOS41Yy0xOC40LDAtMzItNS45LTQwLjgtMTcuNmMtOC44LTExLjctMTMuMi0yNy43LTEzLjItNDguMWMwLTI0LjUsNS45LTQzLjYsMTcuOC01Ny4zICAgYzExLjktMTMuNywyOS43LTIwLjUsNTMuNS0yMC41QzE0OTYuOCwzNTEuOSwxNTEyLjksMzU1LjEsMTUyOS42LDM2MS40IE0xNDk4LjMsNDQ4Ljl2LTcwYy01LTIuMy0xMi0zLjUtMjAuOC0zLjUgICBjLTEyLjEsMC0yMC44LDQuOS0yNi4yLDE0LjZjLTUuNCw5LjctOC4xLDIyLjYtOC4xLDM4LjdjMCwyOS4yLDkuNCw0My44LDI4LjEsNDMuOGM3LjksMCwxNC40LTIuMywxOS41LTcgICBDMTQ5NS43LDQ2MC42LDE0OTguMyw0NTUuMSwxNDk4LjMsNDQ4LjkiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjMyMkEiIGQ9Ik0xNjE2LjMsMzUxLjljNy43LDAsMTUuMSwxLjEsMjIuMiwzLjJ2LTI3LjNjMC00LTIuMy02LjEtNy02LjVsLTExLjYtMC44di0yMS40aDUwLjN2MTY0LjMgICBjMC4yLDQuMSwyLjQsNi4yLDYuOCw2LjJsOS41LDAuNXYyMS42aC00My44VjQ3NmwtMC44LTAuM2MtOC4xLDEzLjItMjAuNCwxOS43LTM2LjgsMTkuN2MtMjAuNSwwLTM1LTYuOC00My4yLTIwLjUgICBjLTcuNi0xMi40LTExLjQtMjcuNy0xMS40LTQ1LjdjMC0yMy40LDUuOC00Mi4yLDE3LjMtNTYuMkMxNTc5LjMsMzU4LjksMTU5NS41LDM1MS45LDE2MTYuMywzNTEuOSBNMTYzOC40LDQ0OS44di03MCAgIGMtNi41LTIuOS0xMy4zLTQuMy0yMC41LTQuM2MtMTEuOSwwLTIwLjYsNC44LTI2LjIsMTQuM2MtNS40LDkuNi04LjEsMjEuNy04LjEsMzYuNWMwLDMwLjMsOS43LDQ1LjQsMjkuMiw0NS40ICAgYzcuNCwwLDEzLjUtMi4xLDE4LjQtNi4yQzE2MzYsNDYxLjEsMTYzOC40LDQ1NS45LDE2MzguNCw0NDkuOCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTE3OTEuNyw0NzAuNmMwLDAtMTIuNSw0LjctMTkuMiw0LjdzLTkuMi0zLjMtOS4yLTExLjhjMC0zLjgsMC41LTguOCwxLjQtMTQuOWwxMC4yLTYzLjFoMzIuNiAgIGwyLjgtMTcuN2gtMzIuNmw1LjctMzQuNUwxNzYwLDMzOGwtNC43LDI5LjhsLTIzLjYsMi40bC0yLjYsMTUuNGgyMy40TDE3NDIsNDUxYy0wLjksNS40LTEuNCwxMC42LTEuNCwxNS4xICAgYzAsMTguNyw3LjgsMjguMSwyMy45LDI4LjFjMTMuMiwwLDMxLTEwLjksMzEtMTAuOUwxNzkxLjcsNDcwLjYiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjMyMkEiIGQ9Ik0xODY1LDMwOS44bC00My4zLDEuMmwtMi4xLDEzbDE5LjksNC43bC0yNiwxNjMuMmgyMi41bDcuOC00Mi42YzAsMCwxOC43LTY1LDQ5LjQtNjUgICBjOS41LDAsMTIuMyw2LjksMTIuMywxNS42YzAsMy4zLTAuNSw2LjktMC45LDEwLjRsLTEzLjUsODEuNmw0My4zLTIuNGwyLjEtMTNsLTE5LjktMy41bDEwLjYtNjYuMmMwLjctNSwxLjItOS43LDEuMi0xNCAgIGMwLTE3LTYuOS0yOC42LTI1LjgtMjguNmMtMzUuOSwwLTU0LjksNDUuNi01NS44LDQ4LjJMMTg2NSwzMDkuOCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTIwMzUsNDY0LjdjMCwwLTIxLjUsMTAuNi0zOC44LDEwLjZjLTE3LjcsMC0yNi03LjgtMjYtMjQuNmMwLTMuMSwwLjItNi42LDAuNy0xMC4yICAgYzQ5LDAsODMtMTguNCw4My00NS42YzAtMTguNy0xNS4xLTMwLjctMzktMzAuN2MtMzcuNiwwLTY4LjMsMzguNS02OC4zLDg3LjVjMCwyNiwxNi42LDQyLjYsNDIuNiw0Mi42YzI3LjksMCw1My0xNy41LDUzLTE3LjUgICBMMjAzNSw0NjQuNyBNMTk3Myw0MjRjNi4xLTI0LjgsMjMuNC00Mi4xLDQwLjctNDIuMWMxMi4xLDAsMTcuNyw1LDE3LjcsMTUuNEMyMDMxLjUsNDEyLjksMjAwNi42LDQyNCwxOTczLDQyNCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTIwOTMuNyw0OTEuOVY0NzBsOC45LTAuOGM1LjItMC41LDcuOC0zLjEsNy44LTcuNlYzMzZsLTE1LjQtMC44di0yM2g3NC4xICAgYzI2LjUsMCw0Ny4xLDcsNjEuOSwyMS4xYzE1LDE0LjEsMjIuNCwzNC45LDIyLjQsNjIuNGMwLDE3LjEtMi4zLDMyLjEtNi44LDQ0LjljLTQuNSwxMi42LTEwLjYsMjIuNS0xOC40LDI5LjcgICBjLTE1LjUsMTQuNC0zNC44LDIxLjYtNTcuOCwyMS42TDIwOTMuNyw0OTEuOSBNMjE0My40LDMzOC40VjQ2NmgyNy42YzE1LjUsMCwyNy42LTUuNiwzNi4yLTE2LjhjOC42LTExLjIsMTMtMjcuNCwxMy00OC43ICAgYzAtNDEuNC0xNy42LTYyLjItNTIuNy02Mi4ySDIxNDMuNCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTIzMzAsNDcyLjJjMTkuNiwwLDI5LjUtMTUuOSwyOS41LTQ3LjZjMC0xNi0yLjMtMjguMi02LjgtMzYuNWMtNC4zLTguMy0xMS43LTEyLjQtMjIuMi0xMi40ICAgYy0xMC4zLDAtMTcuOCw0LTIyLjcsMTEuOWMtNC45LDcuOS03LjMsMTguNy03LjMsMzIuNGMwLDI1LjQsNC43LDQxLjQsMTQuMSw0Ny44QzIzMTguOCw0NzAuNywyMzIzLjksNDcyLjIsMjMzMCw0NzIuMiAgICBNMjI2Ny45LDQyMy44YzAtMTMuMywyLTI0LjksNS45LTM0LjZjNC05LjksOS4zLTE3LjUsMTUuOS0yMi43YzEyLjgtOS43LDI2LjktMTQuNiw0Mi40LTE0LjZjMTAuOCwwLDE5LjksMS44LDI3LjMsNS40ICAgYzcuNiwzLjQsMTMuNCw3LjUsMTcuNiwxMi4yYzQuMyw0LjUsNy45LDExLjIsMTAuOCwyMGMzLjEsOC42LDQuNiwxOC45LDQuNiwzMC44YzAsMjQuOS02LDQzLjctMTguMSw1Ni41ICAgYy0xMi4xLDEyLjgtMjcuNiwxOS4yLTQ2LjUsMTkuMmMtMTguNywwLTMzLjQtNi00NC4xLTE4LjFDMjI3My4yLDQ2NS42LDIyNjcuOSw0NDcuNiwyMjY3LjksNDIzLjgiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiMzMjMyMkEiIGQ9Ik0yNDM4LjIsNDIyLjVjMCwxNS4zLDIuOSwyNy4yLDguNiwzNS43YzUuOCw4LjUsMTQuMSwxMi43LDI0LjksMTIuN2MxMSwwLDIxLjgtMy45LDMyLjQtMTEuNiAgIGwxMS42LDIwLjhjLTEyLjgsMTAuNS0yOC44LDE1LjctNDguMSwxNS43Yy0xOS4zLDAtMzQuNS02LTQ1LjctMTguMWMtMTEtMTIuMy0xNi41LTMwLjMtMTYuNS01NC4xczYuMy00MS42LDE4LjktNTMuNSAgIGMxMi44LTEyLjEsMjcuMS0xOC4xLDQzLTE4LjFjMTYsMCwzMC45LDMuNyw0NC42LDExLjF2MzUuMWwtMjQuOSwxLjl2LTEzYzAtNC45LTEuOC03LjgtNS40LTguOWMtMy40LTEuMy03LTEuOS0xMC44LTEuOSAgIEMyNDQ5LjEsMzc2LjIsMjQzOC4yLDM5MS42LDI0MzguMiw0MjIuNSIvPgoJPHBhdGggc3R5bGU9ImZpbGw6IzMyMzIyQSIgZD0iTTI1OTIuOSwzNzYuNWMtNC4zLTEuNi05LjYtMi40LTE1LjctMi40Yy02LjEsMC0xMS4xLDEuNC0xNC45LDQuM2MtMy42LDIuNy01LjQsNi4xLTUuNCwxMC4zICAgYzAsNCwwLjYsNy4xLDEuOSw5LjVjMS40LDIuMiwzLjYsNC4xLDYuNSw1LjdjNC41LDIuMyw5LjksNC40LDE2LjIsNi4yYzYuMywxLjYsMTEsMywxNC4xLDQuMWMzLjEsMC45LDYuOCwyLjUsMTEuNCw0LjkgICBjNC43LDIuMyw4LjIsNC45LDEwLjUsNy42YzYuMyw2LjcsOS41LDE1LjIsOS41LDI1LjdjMCwxMy41LTUsMjQuMS0xNC45LDMxLjljLTkuNyw3LjYtMjIuMiwxMS40LTM3LjMsMTEuNCAgIGMtMjIsMC0zOC42LTIuOC00OS43LTguNHYtMzcuNmwyNC4zLTEuOXYxM2MwLDcuOSw3LjYsMTEuOSwyMi43LDExLjlzMjIuNy01LjUsMjIuNy0xNi41YzAtNC0xLjQtNy4yLTQuMS05LjcgICBjLTIuNS0yLjUtNS00LjItNy42LTUuMWMtMi41LTAuOS01LjYtMS44LTkuMi0yLjdjLTMuNC0wLjktNi44LTEuOC0xMC4zLTIuN2MtMy4yLTAuOS02LjgtMi4xLTEwLjgtMy41Yy0zLjgtMS42LTgtMy45LTEyLjctNi44ICAgYy05LjItNS45LTEzLjgtMTUuOS0xMy44LTI5LjdjMC0xNC4xLDUtMjQuOSwxNC45LTMyLjRjOS45LTcuNiwyMi4zLTExLjQsMzcuMy0xMS40YzE1LjEsMCwzMC4xLDMuNiw0NC45LDEwLjh2MzIuNGwtMjQuMywxLjkgICB2LTExLjRDMjU5OS4xLDM4MS4yLDI1OTcsMzc4LjEsMjU5Mi45LDM3Ni41Ii8+CjwvZz4KPGRpdiB4bWxucz0iIiBpZD0ic2FrYS1ndWktcm9vdCI+PGRpdj48ZGl2PjxzdHlsZS8+PC9kaXY+PC9kaXY+PC9kaXY+PC9zdmc+"
                );
              },
            },
            {
              key: "renderNoResultsFound",
              value: function () {
                var t = Cn(Tn, { title: "Not found" }),
                  e = this.getUserQuery();
                this.results = yr(
                  Li ||
                    (Li = Si([
                      '\n      <div class="no-results">\n        ',
                      '\n        <p class="title">No results for <strong>"',
                      '"</strong></p>\n        <div class="tips">\n          <p>Try using the following special queries:</p>\n          <ul>\n            <li>\n              <strong>Exact phrase</strong>: use double quotes to match a whole\n              pharse: <code>"adding a subproject"</code>.\n            </li>\n            <li>\n              <strong>Prefix</strong>: use an asterisk at the end of any term to\n              prefix a result: <code>environ*</code>.\n            </li>\n            <li>\n              <strong>Fuzziness</strong>: add a tilde and a number to indicate\n              the fuzziness of the word: <code>getter~2</code>.\n            </li>\n          </ul>\n        </div>\n\n        <div class="footer">\n          <p>\n            Learn more about the query syntax supported in our\n            <a\n              target="_blank"\n              href="https://docs.readthedocs.io/page/server-side-search/syntax.html"\n              >documentation</a\n            >.\n          </p>\n        </div>\n      </div>\n    ',
                    ])),
                  t.node[0],
                  e
                );
              },
            },
            {
              key: "renderFilters",
              value: function () {
                var t = this;
                return yr(
                  bi ||
                    (bi = Si([
                      '\n      <li class="title">Filters</li>\n      ',
                      "\n    ",
                    ])),
                  this.filters.map(function (e, n) {
                    return yr(
                      Ei ||
                        (Ei = Si([
                          "\n          <li>\n            <input\n              @click=",
                          '\n              id="filter-',
                          '"\n              type="checkbox"\n              value="',
                          '"\n            />\n            <label for="filter-',
                          '"> ',
                          " </label>\n          </li>\n        ",
                        ])),
                      t.filterClicked,
                      n,
                      e.value,
                      n,
                      e.name
                    );
                  })
                );
              },
            },
            {
              key: "renderResults",
              value: function (t) {
                var e = this;
                this.results = yr(
                  wi ||
                    (wi = Si([
                      '\n      <div class="hit">\n        ',
                      "\n      </div>\n    ",
                    ])),
                  t.results.map(function (t, n) {
                    return yr(
                      ji ||
                        (ji = Si([
                          ' <a href="',
                          '">\n                <h2>',
                          " ",
                          "</h2>\n              </a>\n\n              ",
                          "",
                        ])),
                      t.path,
                      t.title,
                      e.renderExternalProject(t),
                      t.blocks.map(function (r, i) {
                        return yr(
                          Ci || (Ci = Si(["", ""])),
                          e.renderBlockResult(r, n + i + 1, t)
                        );
                      })
                    );
                  })
                );
              },
            },
            {
              key: "renderBlockResult",
              value: function (t, e, n) {
                var r = t.title;
                t.highlights.title.length && (r = t.highlights.title[0]);
                var i = t.content.substring(0, 80) + " ...";
                return (
                  t.highlights.content.length &&
                    (i = t.highlights.content[0]).length > 80 &&
                    (i =
                      "... " +
                      t.highlights.content[0].substring(0, 80) +
                      " ..."),
                  yr(
                    Ni ||
                      (Ni = Si([
                        "\n      <a\n        @mouseenter=",
                        '\n        class="hit"\n        href="',
                        "#",
                        '"\n      >\n        <div id="hit-',
                        '">\n          <p class="hit subheading">',
                        '</p>\n          <p class="hit content">',
                        "</p>\n        </div>\n      </a>\n    ",
                      ])),
                    this.mouseenterResultHit,
                    n.path,
                    t.id,
                    e,
                    Ai(r),
                    Ai(i)
                  )
                );
              },
            },
            {
              key: "renderExternalProject",
              value: function (t) {
                return t.project.slug !== this.config.projects.current.slug
                  ? yr(
                      xi ||
                        (xi = Si([
                          '\n        <small class="subtitle"> (from project ',
                          ") </small>\n      ",
                        ])),
                      t.project.slug
                    )
                  : vr;
              },
            },
            {
              key: "closeModal",
              value: function (t) {
                this.show = !1;
              },
            },
            {
              key: "showModal",
              value: function (t) {
                (this.show = !0),
                  this.renderRoot.querySelector("input[type=search]").focus();
              },
            },
            {
              key: "queryInputFocus",
              value: function (t) {
                "focusin" === t.type
                  ? (this.cssFormFocusClasses = { focus: !0 })
                  : "focusout" === t.type &&
                    (this.cssFormFocusClasses = { focus: !1 });
              },
            },
            {
              key: "selectNextResult",
              value: function (t) {
                var e = this.renderRoot.querySelectorAll("a.hit"),
                  n = this.renderRoot.querySelector("a.hit.active");
                null !== n && (n = n.firstElementChild);
                var r = 1,
                  i = 1;
                if (e.length > 0) {
                  var o = e[e.length - 1].firstElementChild;
                  if (null !== o.id) {
                    var a = o.id.match(/\d+/);
                    null !== a && (i = Number(a[0]));
                  }
                }
                if (null !== n && null !== n.id) {
                  var s = n.id.match(/\d+/);
                  null !== s && ((r = Number(s[0])), (r += t ? 1 : -1));
                }
                r <= 0 ? (r = i) : r > i && (r = 1);
                var l,
                  c = Di(this.renderRoot.querySelectorAll("a.hit.active"));
                try {
                  for (c.s(); !(l = c.n()).done; ) {
                    l.value.classList.remove("active");
                  }
                } catch (t) {
                  c.e(t);
                } finally {
                  c.f();
                }
                var u = this.renderRoot.querySelector(
                  "#hit-".concat(r)
                ).parentNode;
                u.classList.add("active"),
                  u.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "start",
                  });
              },
            },
            {
              key: "selectResultKeyboard",
              value: function (t) {
                if (
                  (40 === t.keyCode &&
                    (t.preventDefault(), this.selectNextResult(!0)),
                  38 === t.keyCode &&
                    (t.preventDefault(), this.selectNextResult(!1)),
                  13 === t.keyCode)
                ) {
                  t.preventDefault();
                  var e = this.renderRoot.querySelector("a.hit.active");
                  null !== e && (window.location.href = e.href);
                }
              },
            },
            {
              key: "getUserQuery",
              value: function () {
                return this.renderRoot.querySelector("input[type=search]")
                  .value;
              },
            },
            {
              key: "showSpinIcon",
              value: function () {
                "circle-notch" !== this.inputIcon.iconName &&
                  (this.inputIcon = Cn(xn, {
                    title: "Spinner",
                    classes: ["spinner", "fa-spin"],
                  }));
              },
            },
            {
              key: "showMagnifierIcon",
              value: function () {
                this.inputIcon = Cn(Dn, { title: "Search" });
              },
            },
            {
              key: "removeAllResults",
              value: function () {
                this.results = null;
              },
            },
            {
              key: "fetchResults",
              value: function (t) {
                var e = this;
                this.removeAllResults(), this.showSpinIcon();
                return a(function () {
                  var n =
                    "/_/api/v3/search/?" +
                    new URLSearchParams({ q: t }).toString();
                  fetch(n, {
                    method: "GET",
                    headers: { "X-RTD-Hosting-Integrations-Version": r },
                  })
                    .then(function (t) {
                      if (!t.ok) throw new Error();
                      return t.json();
                    })
                    .then(function (t) {
                      t.results.length > 0
                        ? e.renderResults(t)
                        : e.renderNoResultsFound(),
                        e.showMagnifierIcon();
                    })
                    .catch(function (t) {
                      console.error(t), e.removeAllResults();
                    });
                }, 250);
              },
            },
            {
              key: "getCurrentFilter",
              value: function () {
                var t,
                  e = [],
                  n = Di(
                    this.renderRoot.querySelectorAll(
                      ".filters input[type=checkbox]:checked"
                    )
                  );
                try {
                  for (n.s(); !(t = n.n()).done; ) {
                    var r = t.value;
                    e.push(r.value);
                  }
                } catch (t) {
                  n.e(t);
                } finally {
                  n.f();
                }
                return e.join(" ") || this.defaultFilter.value;
              },
            },
            {
              key: "queryInput",
              value: function (t) {
                var e = this,
                  n = this.getUserQuery();
                if (n.length >= 3) {
                  null !== this.currentQueryRequest &&
                    this.currentQueryRequest.cancel(),
                    (n = this.getCurrentFilter() + " " + n),
                    (this.currentQueryRequest = this.fetchResults(n)),
                    this.currentQueryRequest();
                } else {
                  a(function () {
                    e.removeAllResults();
                  }, 300)();
                }
              },
            },
            {
              key: "filterClicked",
              value: function (t) {
                this.queryInput();
              },
            },
            {
              key: "mouseenterResultHit",
              value: function (t) {
                var e,
                  n = Di(this.renderRoot.querySelectorAll("a.hit.active"));
                try {
                  for (n.s(); !(e = n.n()).done; ) {
                    e.value.classList.remove("active");
                  }
                } catch (t) {
                  n.e(t);
                } finally {
                  n.f();
                }
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                if (
                  (_i($i(n.prototype), "connectedCallback", this).call(this),
                  document.addEventListener("keydown", this._handleShowModal),
                  this.triggerSelector)
                ) {
                  var t = document.querySelector(this.triggerSelector);
                  null != t &&
                    t.addEventListener(
                      this.triggerEvent,
                      this._handleShowModalUser
                    );
                }
                document.addEventListener(ui, this._handleShowModalUser);
              },
            },
            {
              key: "disconnectedCallback",
              value: function () {
                if (
                  (document.removeEventListener(
                    "keydown",
                    this._handleShowModal
                  ),
                  this.triggerSelector)
                ) {
                  var t = document.querySelector(this.triggerSelector);
                  null != t &&
                    t.removeEventListener(
                      this.triggerEvent,
                      this._handleShowModalUser
                    );
                }
                document.removeEventListener(ui, this._handleShowModalUser),
                  _i($i(n.prototype), "disconnectedCallback", this).call(this);
              },
            },
          ]),
          n
        );
      })(Br);
      Ui(Gi, "elementName", "readthedocs-search"),
        Ui(Gi, "properties", {
          config: { state: !0 },
          filters: { state: !0 },
          show: { state: !0 },
          inputIcon: { state: !0 },
          results: { state: !0 },
          cssFormFocusClasses: { state: !0 },
          triggerKeycode: { type: Number, attribute: "trigger-keycode" },
          triggerSelector: { type: String, attribute: "trigger-selector" },
          triggerEvent: { type: String, attribute: "trigger-event" },
        }),
        Ui(Gi, "styles", ci.Z);
      var Fi = (function (t) {
          Bi(n, t);
          var e = Pi(n);
          function n(t) {
            var r;
            Oi(this, n),
              (r = e.call(this)),
              customElements.define("readthedocs-search", Gi);
            var i = document.querySelectorAll("readthedocs-search");
            i.length ||
              ((i = [new Gi()]),
              document.body.append(i[0]),
              i[0].requestUpdate());
            var o,
              a = Di(i);
            try {
              for (a.s(); !(o = a.n()).done; ) {
                o.value.loadConfig(t);
              }
            } catch (t) {
              a.e(t);
            } finally {
              a.f();
            }
            return r;
          }
          return (
            zi(n, null, [
              {
                key: "isEnabled",
                value: function (t) {
                  return t.addons && t.addons.search.enabled;
                },
              },
            ]),
            n
          );
        })(o),
        Wi = n(794),
        Hi = n(111),
        Zi = n(224);
      function qi(t) {
        return (
          (qi =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          qi(t)
        );
      }
      function Vi(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return Xi(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return Xi(t, e);
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          s = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (s = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (s) throw o;
            }
          },
        };
      }
      function Xi(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function Ji(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function Ki(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, lo(r.key), r);
        }
      }
      function to(t, e, n) {
        return (
          e && Ki(t.prototype, e),
          n && Ki(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function eo() {
        return (
          (eo =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get.bind()
              : function (t, e, n) {
                  var r = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = ao(t));

                    );
                    return t;
                  })(t, e);
                  if (r) {
                    var i = Object.getOwnPropertyDescriptor(r, e);
                    return i.get
                      ? i.get.call(arguments.length < 3 ? t : n)
                      : i.value;
                  }
                }),
          eo.apply(this, arguments)
        );
      }
      function no(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && ro(t, e);
      }
      function ro(t, e) {
        return (
          (ro = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          ro(t, e)
        );
      }
      function io(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = ao(t);
          if (e) {
            var i = ao(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === qi(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return oo(t);
          })(this, n);
        };
      }
      function oo(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function ao(t) {
        return (
          (ao = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          ao(t)
        );
      }
      function so(t, e, n) {
        return (
          (e = lo(e)) in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function lo(t) {
        var e = (function (t, e) {
          if ("object" !== qi(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" !== qi(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" === qi(e) ? e : String(e);
      }
      var co = {
          addedClass: "doc-diff-added",
          modifiedClass: "doc-diff-modified",
          removedClass: "doc-diff-removed",
          skipModified: !0,
        },
        uo = (function (t) {
          no(n, t);
          var e = io(n);
          function n() {
            var t;
            return (
              Ji(this, n),
              so(oo((t = e.call(this))), "_handleShowDocDiff", function (e) {
                e.preventDefault(), t.enableDocDiff();
              }),
              so(oo(t), "_handleHideDocDiff", function (e) {
                e.preventDefault(), t.disableDocDiff();
              }),
              (t.baseUrl = null),
              (t.rootSelector = "[role=main]"),
              (t.injectStyles = !0),
              (t.originalBody = null),
              t
            );
          }
          return (
            to(n, [
              {
                key: "loadConfig",
                value: function (t) {
                  (this.config = t),
                    t.addons.doc_diff &&
                      (this.baseUrl ||
                        (this.baseUrl = t.addons.doc_diff.base_url)),
                    this.injectStyles && document.adoptedStyleSheets.push(Hi.Z);
                },
              },
              {
                key: "render",
                value: function () {
                  return vr;
                },
              },
              {
                key: "handleClick",
                value: function (t) {
                  t.target.checked
                    ? this.enableDocDiff()
                    : this.disableDocDiff();
                },
              },
              {
                key: "compare",
                value: function () {
                  var t = this;
                  fetch(this.baseUrl)
                    .then(function (t) {
                      if (!t.ok)
                        throw new Error(
                          "Error downloading requested base URL."
                        );
                      return t.text();
                    })
                    .then(function (e) {
                      var n = new DOMParser()
                          .parseFromString(e, "text/html")
                          .documentElement.querySelector(t.rootSelector),
                        r = document.querySelector(t.rootSelector);
                      if (null == n || null == r)
                        throw new Error("Element not found in both documents.");
                      var i = (0, Zi.visualDomDiff)(n, r, co);
                      r.replaceWith(i.firstElementChild);
                    })
                    .catch(function (t) {
                      console.error(t);
                    });
                },
              },
              {
                key: "enableDocDiff",
                value: function () {
                  return (
                    (this.enabled = !0),
                    (this.originalBody = document.querySelector(
                      this.rootSelector
                    )),
                    this.compare()
                  );
                },
              },
              {
                key: "disableDocDiff",
                value: function () {
                  (this.enabled = !1),
                    document
                      .querySelector(this.rootSelector)
                      .replaceWith(this.originalBody);
                },
              },
              {
                key: "connectedCallback",
                value: function () {
                  eo(ao(n.prototype), "connectedCallback", this).call(this),
                    document.addEventListener(fi, this._handleShowDocDiff),
                    document.addEventListener(di, this._handleHideDocDiff);
                },
              },
              {
                key: "disconnectedCallback",
                value: function () {
                  document.removeEventListener(
                    "keydown",
                    this._handleShowDocDiff
                  ),
                    eo(ao(n.prototype), "disconnectedCallback", this).call(
                      this
                    );
                },
              },
            ]),
            n
          );
        })(Br);
      so(uo, "elementName", "readthedocs-docdiff"),
        so(uo, "properties", {
          config: { state: !0 },
          enabled: { type: Boolean },
          baseUrl: { type: String, attribute: "base-url" },
          rootSelector: { type: String, attribute: "root-selector" },
          injectStyles: {
            type: Boolean,
            attribute: "inject-styles",
            converter: {
              fromAttribute: function (t, e) {
                return "true" === t;
              },
              toAttribute: function (t, e) {
                return !0 === t ? "true" : "false";
              },
            },
          },
        }),
        so(uo, "styles", Wi.Z);
      var fo = (function (t) {
        no(n, t);
        var e = io(n);
        function n(t) {
          var r;
          Ji(this, n),
            (r = e.call(this)),
            customElements.define("readthedocs-docdiff", uo);
          var i = document.querySelectorAll("readthedocs-docdiff");
          i.length ||
            ((i = [new uo()]),
            document.body.append(i[0]),
            i[0].requestUpdate());
          var o,
            a = Vi(i);
          try {
            for (a.s(); !(o = a.n()).done; ) {
              o.value.loadConfig(t);
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          return r;
        }
        return (
          to(n, null, [
            {
              key: "isEnabled",
              value: function (t) {
                return t.addons && t.addons.doc_diff.enabled;
              },
            },
          ]),
          n
        );
      })(o);
      var ho,
        po,
        go,
        mo,
        yo,
        Ao,
        vo,
        Mo,
        Lo,
        bo,
        Eo,
        wo,
        jo,
        Co,
        No = n(432);
      function xo(t) {
        return (
          (xo =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          xo(t)
        );
      }
      function To(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return So(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return So(t, e);
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          s = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (s = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (s) throw o;
            }
          },
        };
      }
      function So(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function Do(t, e) {
        return (
          e || (e = t.slice(0)),
          Object.freeze(
            Object.defineProperties(t, { raw: { value: Object.freeze(e) } })
          )
        );
      }
      function ko(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function Oo(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, Yo(r.key), r);
        }
      }
      function Io(t, e, n) {
        return (
          e && Oo(t.prototype, e),
          n && Oo(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function zo(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && _o(t, e);
      }
      function _o(t, e) {
        return (
          (_o = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          _o(t, e)
        );
      }
      function Bo(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Ro(t);
          if (e) {
            var i = Ro(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === xo(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t);
          })(this, n);
        };
      }
      function Ro(t) {
        return (
          (Ro = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          Ro(t)
        );
      }
      function Po(t, e, n) {
        return (
          (e = Yo(e)) in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function Yo(t) {
        var e = (function (t, e) {
          if ("object" !== xo(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" !== xo(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" === xo(e) ? e : String(e);
      }
      var $o = (function (t) {
        zo(n, t);
        var e = Bo(n);
        function n() {
          var t;
          return (
            ko(this, n),
            ((t = e.call(this)).config = {}),
            (t.opened = !1),
            (t.floating = !0),
            (t.position = "bottom-right"),
            t
          );
        }
        return (
          Io(n, [
            {
              key: "loadConfig",
              value: function (t) {
                this.config = t;
              },
            },
            {
              key: "getProjectUrl",
              value: function () {
                return "//"
                  .concat(this.config.domains.dashboard, "/projects/")
                  .concat(this.config.projects.current.slug, "/");
              },
            },
            {
              key: "_toggleOpen",
              value: function (t) {
                this.opened = !this.opened;
              },
            },
            {
              key: "renderHeader",
              value: function () {
                return yr(
                  ho ||
                    (ho = Do([
                      '\n      <header @click="',
                      '">\n        <img class="logo" src="',
                      '" alt="Read the Docs" />\n        <span>v: ',
                      "</span>\n      </header>\n    ",
                    ])),
                  this._toggleOpen,
                  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJzdmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSI2OTQgMTk3IDIwMDAgNDAwIj4KPGcgaWQ9ImxvZ28iIHRyYW5zZm9ybT0ibWF0cml4KDAuNTU3NTM2NDQsMCwwLDAuNTU3NTM2NDQsNjguMzA4MTM1LDEwNTAuMTI2MikiPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTE0MDguMS0xMTgxLjdjLTcuNSwxLTEyLjcsNy44LTExLjcsMTUuMyAgIGMwLjcsNS40LDQuNiw5LjksOS45LDExLjNjMCwwLDMzLjIsMTEsODkuNywxNS42YzQ1LjQsMy43LDk2LjktMy4yLDk2LjktMy4yYzcuNS0wLjIsMTMuNS02LjUsMTMuMi0xNHMtNi41LTEzLjUtMTQtMTMuMiAgIGMtMC45LDAtMS44LDAuMS0yLjYsMC4zYzAsMC01MC40LDYuMi05MS4zLDIuOWMtNTQtNC40LTgzLjQtMTQuMy04My40LTE0LjNDMTQxMi42LTExODEuNywxNDEwLjMtMTE4MiwxNDA4LjEtMTE4MS43eiAgICBNMTQwOC4xLTEyNDkuM2MtNy41LDEtMTIuNyw3LjgtMTEuNywxNS4zYzAuNyw1LjQsNC42LDkuOSw5LjksMTEuM2MwLDAsMzMuMiwxMSw4OS43LDE1LjZjNDUuNCwzLjcsOTYuOS0zLjIsOTYuOS0zLjIgICBjNy41LTAuMiwxMy41LTYuNSwxMy4yLTE0cy02LjUtMTMuNS0xNC0xMy4yYy0wLjksMC0xLjgsMC4xLTIuNiwwLjNjMCwwLTUwLjQsNi4yLTkxLjMsMi45Yy01NC00LjQtODMuNC0xNC4zLTgzLjQtMTQuMyAgIEMxNDEyLjYtMTI0OS4zLDE0MTAuMy0xMjQ5LjYsMTQwOC4xLTEyNDkuM3ogTTE0MDguMS0xMzE2LjljLTcuNSwxLTEyLjcsNy44LTExLjcsMTUuM2MwLjcsNS40LDQuNiw5LjksOS45LDExLjMgICBjMCwwLDMzLjIsMTEsODkuNywxNS42YzQ1LjQsMy43LDk2LjktMy4yLDk2LjktMy4yYzcuNS0wLjIsMTMuNS02LjUsMTMuMi0xNHMtNi41LTEzLjUtMTQtMTMuMmMtMC45LDAtMS44LDAuMS0yLjYsMC4zICAgYzAsMC01MC40LDYuMi05MS4zLDIuOWMtNTQtNC40LTgzLjQtMTQuMy04My40LTE0LjNDMTQxMi42LTEzMTYuOSwxNDEwLjMtMTMxNy4yLDE0MDguMS0xMzE2Ljl6IE0xNDA4LjEtMTM4NC40ICAgYy03LjUsMS0xMi43LDcuOC0xMS43LDE1LjNjMC43LDUuNCw0LjYsOS45LDkuOSwxMS4zYzAsMCwzMy4yLDExLDg5LjcsMTUuNmM0NS40LDMuNyw5Ni45LTMuMiw5Ni45LTMuMmM3LjUtMC4yLDEzLjUtNi41LDEzLjItMTQgICBzLTYuNS0xMy41LTE0LTEzLjJjLTAuOSwwLTEuOCwwLjEtMi42LDAuM2MwLDAtNTAuNCw2LjItOTEuMywyLjljLTU0LTQuNC04My40LTE0LjMtODMuNC0xNC4zICAgQzE0MTIuNi0xMzg0LjUsMTQxMC4zLTEzODQuNywxNDA4LjEtMTM4NC40eiBNMTMxMy40LTE0NTUuN2MtNzEsMC41LTk3LjUsMjIuMy05Ny41LDIyLjN2NTMwLjNjMCwwLDI1LjgtMjIuMywxMDktMTguOSAgIGM4My4yLDMuNCwxMDAuMywzMi42LDIwMi41LDM0LjZjMTAyLjIsMi4xLDEyNy45LTE1LjcsMTI3LjktMTUuN2wxLjUtNTQwLjZjMCwwLTQ2LDEzLTEzNS41LDEzLjdzLTExMS0yMi44LTE5My4yLTI1LjUgICBDMTMyMy0xNDU1LjYsMTMxOC4xLTE0NTUuNywxMzEzLjQtMTQ1NS43eiBNMTM3Mi44LTE0MjEuMWMwLDAsNDMsMTQuMiwxMjIuNSwxOC4yYzY3LjIsMy4zLDEzNC41LTYuNiwxMzQuNS02LjZ2NDgwLjUgICBjMCwwLTM0LjEsMTcuOS0xMTkuMywxMS44Yy02Ni00LjctMTM4LjctMjkuNy0xMzguNy0yOS43TDEzNzIuOC0xNDIxLjF6IE0xMzMxLjMtMTQwOC42YzcuNiwwLDEzLjcsNi4yLDEzLjcsMTMuNyAgIHMtNi4yLDEzLjctMTMuNywxMy43YzAsMC0yMi4zLDAuMS0zNS44LDEuNWMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNmMtNi43LDMuNS0xNSwxLTE4LjUtNS43cy0xLTE1LDUuNy0xOC41YzAsMCwwLDAsMCwwICAgYzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDkuMS0xNDA4LjUsMTMzMS4zLTE0MDguNiwxMzMxLjMtMTQwOC42eiBNMTMxOC4xLTEzNDAuOGM3LjYtMC4yLDEzLjMsMCwxMy4zLDAgICBjNy41LDAuOSwxMi45LDcuOCwxMiwxNS4zYy0wLjgsNi4zLTUuNywxMS4yLTEyLDEyYzAsMC0yMi4zLDAuMS0zNS44LDEuNWMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNmMtNi43LDMuNS0xNSwwLjktMTguNS01LjggICBjLTMuNS02LjctMC45LTE1LDUuOC0xOC41YzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDAuOS0xMzQwLjEsMTMxMC41LTEzNDAuNiwxMzE4LjEtMTM0MC44eiBNMTMzMS4zLTEyNzMuMyAgIGM3LjYsMCwxMy43LDYuMiwxMy43LDEzLjdjMCw3LjYtNi4yLDEzLjctMTMuNywxMy43YzAsMC0yMi4zLTAuMS0zNS44LDEuMmMtMjIuOCwyLjMtMzguMywxMC42LTM4LjMsMTAuNiAgIGMtNi43LDMuNS0xNSwwLjktMTguNS01LjhjLTMuNS02LjctMC45LTE1LDUuOC0xOC41YzAsMCwyMC4yLTEwLjcsNDguNC0xMy41QzEzMDkuMS0xMjczLjQsMTMzMS4zLTEyNzMuMywxMzMxLjMtMTI3My4zeiIvPgo8L2c+CjxnIGlkPSJ0ZXh0Ij4KCTxwYXRoIHN0eWxlPSJmaWxsOiNmY2ZjZmMiIGQ9Ik0xMTI4LjYsNDkxLjlWNDcwbDguOS0wLjhjNS4yLTAuNSw3LjgtMy4xLDcuOC03LjZWMzM2bC0xNS40LTAuOHYtMjNoNzMuOCAgIGMyMC45LDAsMzYuOSwzLjksNDguMSwxMS42YzExLjIsNy43LDE2LjgsMjAuNSwxNi44LDM4LjFjMCwxMi4zLTMuMiwyMi4zLTkuNywzMC4zYy02LjMsNy45LTEzLjksMTMuNy0yMi43LDE3LjMgICBjNi41LDIuMywxMS42LDcuOCwxNS40LDE2LjVsMTkuNSw0Mi40bDE1LjQsMC41djIzaC02Ni44VjQ3MGw3LjgtMC44YzQuMS0wLjUsNi4yLTIuMiw2LjItNC45YzAtMS4xLTAuNC0yLjMtMS4xLTMuOGwtMTIuNy0yNyAgIGMtMi00LjUtNC4yLTcuNy02LjgtOS41Yy0yLjMtMi01LjgtMy0xMC4zLTNoLTI0LjZ2NDdsMTcuNiwwLjh2MjNMMTEyOC42LDQ5MS45IE0xMTc4LjMsMzk1LjRoMjMuNWMyMi4yLDAsMzMuMi05LjksMzMuMi0yOS43ICAgYzAtMTEuNC0zLTE4LjctOC45LTIyLjJjLTUuOC0zLjQtMTUuMS01LjEtMjguMS01LjFoLTE5LjdWMzk1LjQiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNmY2ZjZmMiIGQ9Ik0xMzU2LDM1MS45YzEzLjUsMCwyNC4yLDMuMywzMi4yLDEwYzcuOSw2LjUsMTEuOSwxNS43LDExLjksMjcuNmMwLDcuOS0xLjcsMTUtNS4xLDIxLjEgICBjLTMuNCw1LjktNy43LDEwLjYtMTIuNywxNC4xYy01LDMuNC0xMS4yLDYuMi0xOC40LDguNGMtMTIuMSwzLjYtMjUuNyw1LjQtNDAuOCw1LjRjMC41LDkuNSwzLjUsMTcuMyw4LjksMjMuMiAgIGM1LjQsNS44LDEzLjcsOC42LDI0LjksOC42YzExLjIsMCwyMi4zLTQsMzMuNS0xMS45bDEwLjMsMjEuOWMtMy42LDMuMi05LjcsNi42LTE4LjQsMTBjLTguNSwzLjQtMTguMiw1LjEtMjkuMiw1LjEgICBjLTIyLDAtMzguMS02LTQ4LjQtMTguMWMtMTAuMy0xMi4zLTE1LjQtMjktMTUuNC01MC4zYzAtMjEuMyw1LjktMzkuMSwxNy42LTUzLjVDMTMxOC41LDM1OS4xLDEzMzQuOSwzNTEuOSwxMzU2LDM1MS45ICAgIE0xMzQzLjYsNDEzLjhjNi43LTEuMywxMi44LTMuOSwxOC40LTcuOGM1LjYtNC4xLDguNC05LDguNC0xNC42YzAtMTEtNS40LTE2LjUtMTYuMi0xNi41Yy0xMC4xLDAtMTcuOCw0LjEtMjMuMiwxMi4yICAgYy01LjQsNy45LTguNCwxNy41LTguOSwyOC42QzEzMjkuOSw0MTUuNSwxMzM3LjEsNDE0LjksMTM0My42LDQxMy44Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojZmNmY2ZjIiBkPSJNMTUyOS42LDM2MS40djEwMC41YzAsMi45LDAuNSw0LjksMS40LDUuOWMxLjEsMS4xLDIuOSwxLjcsNS40LDEuOWw4LjYsMC41djIxLjZoLTQzdi0xNS43ICAgbC0wLjgtMC4zYy05LDEzLTIxLjQsMTkuNS0zNywxOS41Yy0xOC40LDAtMzItNS45LTQwLjgtMTcuNmMtOC44LTExLjctMTMuMi0yNy43LTEzLjItNDguMWMwLTI0LjUsNS45LTQzLjYsMTcuOC01Ny4zICAgYzExLjktMTMuNywyOS43LTIwLjUsNTMuNS0yMC41QzE0OTYuOCwzNTEuOSwxNTEyLjksMzU1LjEsMTUyOS42LDM2MS40IE0xNDk4LjMsNDQ4Ljl2LTcwYy01LTIuMy0xMi0zLjUtMjAuOC0zLjUgICBjLTEyLjEsMC0yMC44LDQuOS0yNi4yLDE0LjZjLTUuNCw5LjctOC4xLDIyLjYtOC4xLDM4LjdjMCwyOS4yLDkuNCw0My44LDI4LjEsNDMuOGM3LjksMCwxNC40LTIuMywxOS41LTcgICBDMTQ5NS43LDQ2MC42LDE0OTguMyw0NTUuMSwxNDk4LjMsNDQ4LjkiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNmY2ZjZmMiIGQ9Ik0xNjE2LjMsMzUxLjljNy43LDAsMTUuMSwxLjEsMjIuMiwzLjJ2LTI3LjNjMC00LTIuMy02LjEtNy02LjVsLTExLjYtMC44di0yMS40aDUwLjN2MTY0LjMgICBjMC4yLDQuMSwyLjQsNi4yLDYuOCw2LjJsOS41LDAuNXYyMS42aC00My44VjQ3NmwtMC44LTAuM2MtOC4xLDEzLjItMjAuNCwxOS43LTM2LjgsMTkuN2MtMjAuNSwwLTM1LTYuOC00My4yLTIwLjUgICBjLTcuNi0xMi40LTExLjQtMjcuNy0xMS40LTQ1LjdjMC0yMy40LDUuOC00Mi4yLDE3LjMtNTYuMkMxNTc5LjMsMzU4LjksMTU5NS41LDM1MS45LDE2MTYuMywzNTEuOSBNMTYzOC40LDQ0OS44di03MCAgIGMtNi41LTIuOS0xMy4zLTQuMy0yMC41LTQuM2MtMTEuOSwwLTIwLjYsNC44LTI2LjIsMTQuM2MtNS40LDkuNi04LjEsMjEuNy04LjEsMzYuNWMwLDMwLjMsOS43LDQ1LjQsMjkuMiw0NS40ICAgYzcuNCwwLDEzLjUtMi4xLDE4LjQtNi4yQzE2MzYsNDYxLjEsMTYzOC40LDQ1NS45LDE2MzguNCw0NDkuOCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTE3OTEuNyw0NzAuNmMwLDAtMTIuNSw0LjctMTkuMiw0LjdzLTkuMi0zLjMtOS4yLTExLjhjMC0zLjgsMC41LTguOCwxLjQtMTQuOWwxMC4yLTYzLjFoMzIuNiAgIGwyLjgtMTcuN2gtMzIuNmw1LjctMzQuNUwxNzYwLDMzOGwtNC43LDI5LjhsLTIzLjYsMi40bC0yLjYsMTUuNGgyMy40TDE3NDIsNDUxYy0wLjksNS40LTEuNCwxMC42LTEuNCwxNS4xICAgYzAsMTguNyw3LjgsMjguMSwyMy45LDI4LjFjMTMuMiwwLDMxLTEwLjksMzEtMTAuOUwxNzkxLjcsNDcwLjYiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNmY2ZjZmMiIGQ9Ik0xODY1LDMwOS44bC00My4zLDEuMmwtMi4xLDEzbDE5LjksNC43bC0yNiwxNjMuMmgyMi41bDcuOC00Mi42YzAsMCwxOC43LTY1LDQ5LjQtNjUgICBjOS41LDAsMTIuMyw2LjksMTIuMywxNS42YzAsMy4zLTAuNSw2LjktMC45LDEwLjRsLTEzLjUsODEuNmw0My4zLTIuNGwyLjEtMTNsLTE5LjktMy41bDEwLjYtNjYuMmMwLjctNSwxLjItOS43LDEuMi0xNCAgIGMwLTE3LTYuOS0yOC42LTI1LjgtMjguNmMtMzUuOSwwLTU0LjksNDUuNi01NS44LDQ4LjJMMTg2NSwzMDkuOCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTIwMzUsNDY0LjdjMCwwLTIxLjUsMTAuNi0zOC44LDEwLjZjLTE3LjcsMC0yNi03LjgtMjYtMjQuNmMwLTMuMSwwLjItNi42LDAuNy0xMC4yICAgYzQ5LDAsODMtMTguNCw4My00NS42YzAtMTguNy0xNS4xLTMwLjctMzktMzAuN2MtMzcuNiwwLTY4LjMsMzguNS02OC4zLDg3LjVjMCwyNiwxNi42LDQyLjYsNDIuNiw0Mi42YzI3LjksMCw1My0xNy41LDUzLTE3LjUgICBMMjAzNSw0NjQuNyBNMTk3Myw0MjRjNi4xLTI0LjgsMjMuNC00Mi4xLDQwLjctNDIuMWMxMi4xLDAsMTcuNyw1LDE3LjcsMTUuNEMyMDMxLjUsNDEyLjksMjAwNi42LDQyNCwxOTczLDQyNCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTIwOTMuNyw0OTEuOVY0NzBsOC45LTAuOGM1LjItMC41LDcuOC0zLjEsNy44LTcuNlYzMzZsLTE1LjQtMC44di0yM2g3NC4xICAgYzI2LjUsMCw0Ny4xLDcsNjEuOSwyMS4xYzE1LDE0LjEsMjIuNCwzNC45LDIyLjQsNjIuNGMwLDE3LjEtMi4zLDMyLjEtNi44LDQ0LjljLTQuNSwxMi42LTEwLjYsMjIuNS0xOC40LDI5LjcgICBjLTE1LjUsMTQuNC0zNC44LDIxLjYtNTcuOCwyMS42TDIwOTMuNyw0OTEuOSBNMjE0My40LDMzOC40VjQ2NmgyNy42YzE1LjUsMCwyNy42LTUuNiwzNi4yLTE2LjhjOC42LTExLjIsMTMtMjcuNCwxMy00OC43ICAgYzAtNDEuNC0xNy42LTYyLjItNTIuNy02Mi4ySDIxNDMuNCIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTIzMzAsNDcyLjJjMTkuNiwwLDI5LjUtMTUuOSwyOS41LTQ3LjZjMC0xNi0yLjMtMjguMi02LjgtMzYuNWMtNC4zLTguMy0xMS43LTEyLjQtMjIuMi0xMi40ICAgYy0xMC4zLDAtMTcuOCw0LTIyLjcsMTEuOWMtNC45LDcuOS03LjMsMTguNy03LjMsMzIuNGMwLDI1LjQsNC43LDQxLjQsMTQuMSw0Ny44QzIzMTguOCw0NzAuNywyMzIzLjksNDcyLjIsMjMzMCw0NzIuMiAgICBNMjI2Ny45LDQyMy44YzAtMTMuMywyLTI0LjksNS45LTM0LjZjNC05LjksOS4zLTE3LjUsMTUuOS0yMi43YzEyLjgtOS43LDI2LjktMTQuNiw0Mi40LTE0LjZjMTAuOCwwLDE5LjksMS44LDI3LjMsNS40ICAgYzcuNiwzLjQsMTMuNCw3LjUsMTcuNiwxMi4yYzQuMyw0LjUsNy45LDExLjIsMTAuOCwyMGMzLjEsOC42LDQuNiwxOC45LDQuNiwzMC44YzAsMjQuOS02LDQzLjctMTguMSw1Ni41ICAgYy0xMi4xLDEyLjgtMjcuNiwxOS4yLTQ2LjUsMTkuMmMtMTguNywwLTMzLjQtNi00NC4xLTE4LjFDMjI3My4yLDQ2NS42LDIyNjcuOSw0NDcuNiwyMjY3LjksNDIzLjgiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNmY2ZjZmMiIGQ9Ik0yNDM4LjIsNDIyLjVjMCwxNS4zLDIuOSwyNy4yLDguNiwzNS43YzUuOCw4LjUsMTQuMSwxMi43LDI0LjksMTIuN2MxMSwwLDIxLjgtMy45LDMyLjQtMTEuNiAgIGwxMS42LDIwLjhjLTEyLjgsMTAuNS0yOC44LDE1LjctNDguMSwxNS43Yy0xOS4zLDAtMzQuNS02LTQ1LjctMTguMWMtMTEtMTIuMy0xNi41LTMwLjMtMTYuNS01NC4xczYuMy00MS42LDE4LjktNTMuNSAgIGMxMi44LTEyLjEsMjcuMS0xOC4xLDQzLTE4LjFjMTYsMCwzMC45LDMuNyw0NC42LDExLjF2MzUuMWwtMjQuOSwxLjl2LTEzYzAtNC45LTEuOC03LjgtNS40LTguOWMtMy40LTEuMy03LTEuOS0xMC44LTEuOSAgIEMyNDQ5LjEsMzc2LjIsMjQzOC4yLDM5MS42LDI0MzguMiw0MjIuNSIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I2ZjZmNmYyIgZD0iTTI1OTIuOSwzNzYuNWMtNC4zLTEuNi05LjYtMi40LTE1LjctMi40Yy02LjEsMC0xMS4xLDEuNC0xNC45LDQuM2MtMy42LDIuNy01LjQsNi4xLTUuNCwxMC4zICAgYzAsNCwwLjYsNy4xLDEuOSw5LjVjMS40LDIuMiwzLjYsNC4xLDYuNSw1LjdjNC41LDIuMyw5LjksNC40LDE2LjIsNi4yYzYuMywxLjYsMTEsMywxNC4xLDQuMWMzLjEsMC45LDYuOCwyLjUsMTEuNCw0LjkgICBjNC43LDIuMyw4LjIsNC45LDEwLjUsNy42YzYuMyw2LjcsOS41LDE1LjIsOS41LDI1LjdjMCwxMy41LTUsMjQuMS0xNC45LDMxLjljLTkuNyw3LjYtMjIuMiwxMS40LTM3LjMsMTEuNCAgIGMtMjIsMC0zOC42LTIuOC00OS43LTguNHYtMzcuNmwyNC4zLTEuOXYxM2MwLDcuOSw3LjYsMTEuOSwyMi43LDExLjlzMjIuNy01LjUsMjIuNy0xNi41YzAtNC0xLjQtNy4yLTQuMS05LjcgICBjLTIuNS0yLjUtNS00LjItNy42LTUuMWMtMi41LTAuOS01LjYtMS44LTkuMi0yLjdjLTMuNC0wLjktNi44LTEuOC0xMC4zLTIuN2MtMy4yLTAuOS02LjgtMi4xLTEwLjgtMy41Yy0zLjgtMS42LTgtMy45LTEyLjctNi44ICAgYy05LjItNS45LTEzLjgtMTUuOS0xMy44LTI5LjdjMC0xNC4xLDUtMjQuOSwxNC45LTMyLjRjOS45LTcuNiwyMi4zLTExLjQsMzcuMy0xMS40YzE1LjEsMCwzMC4xLDMuNiw0NC45LDEwLjh2MzIuNGwtMjQuMywxLjkgICB2LTExLjRDMjU5OS4xLDM4MS4yLDI1OTcsMzc4LjEsMjU5Mi45LDM3Ni41Ii8+CjwvZz4KPGRpdiB4bWxucz0iIiBpZD0ic2FrYS1ndWktcm9vdCI+PGRpdj48ZGl2PjxzdHlsZS8+PC9kaXY+PC9kaXY+PC9kaXY+PC9zdmc+Cg==",
                  this.config.versions.current.slug
                );
              },
            },
            {
              key: "renderFooter",
              value: function () {
                return yr(
                  po ||
                    (po = Do([
                      '\n      <small>\n        <span\n          >Hosted by <a href="https://readthedocs.org">Read the Docs</a></span\n        >\n        <span> &middot; </span>\n        <a href="https://docs.readthedocs.io/page/privacy-policy.html"\n          >Privacy Policy</a\n        >\n      </small>\n    ',
                    ]))
                );
              },
            },
            {
              key: "showSearch",
              value: function () {
                var t = new CustomEvent(ui);
                document.dispatchEvent(t);
              },
            },
            {
              key: "renderSearch",
              value: function () {
                return yr(
                  go ||
                    (go = Do([
                      '\n      <dl>\n        <dt>Search</dt>\n        <dd>\n          <form @focusin="',
                      '" id="flyout-search-form">\n            <input\n              type="text"\n              name="q"\n              aria-label="Search docs"\n              placeholder="Search docs"\n            />\n          </form>\n        </dd>\n      </dl>\n    ',
                    ])),
                  this.showSearch
                );
              },
            },
            {
              key: "renderVCS",
              value: function () {
                if (
                  !this.config.addons.flyout.vcs ||
                  !this.config.addons.flyout.vcs.view_url
                )
                  return vr;
                var t = this.config.addons.flyout.vcs;
                return yr(
                  mo ||
                    (mo = Do([
                      "\n      <dl>\n        <dt>On ",
                      '</dt>\n        <dd>\n          <a href="',
                      '">View</a>\n        </dd>\n      </dl>\n    ',
                    ])),
                  t.name,
                  t.view_url
                );
              },
            },
            {
              key: "renderReadTheDocs",
              value: function () {
                return yr(
                  yo ||
                    (yo = Do([
                      '\n      <dl>\n        <dt>On Read the Docs</dt>\n        <dd>\n          <a href="',
                      '">Project Home</a>\n        </dd>\n        <dd>\n          <a href="',
                      'builds/">Builds</a>\n        </dd>\n        <dd>\n          <a href="',
                      'downloads/">Downloads</a>\n        </dd>\n      </dl>\n    ',
                    ])),
                  this.getProjectUrl(),
                  this.getProjectUrl(),
                  this.getProjectUrl()
                );
              },
            },
            {
              key: "renderDownloads",
              value: function () {
                return this.config.addons.flyout.downloads &&
                  this.config.addons.flyout.downloads.length
                  ? yr(
                      Ao ||
                        (Ao = Do([
                          '\n      <dl class="downloads">\n        <dt>Downloads</dt>\n        ',
                          "\n      </dl>\n    ",
                        ])),
                      this.config.addons.flyout.downloads.map(function (t) {
                        return yr(
                          vo ||
                            (vo = Do([
                              '\n            <dd><a href="',
                              '">',
                              "</a></dd>\n          ",
                            ])),
                          t.url,
                          t.name
                        );
                      })
                    )
                  : vr;
              },
            },
            {
              key: "renderVersions",
              value: function () {
                if (
                  !this.config.addons.flyout.versions ||
                  !this.config.addons.flyout.versions.length
                )
                  return vr;
                var t =
                  this.config.versions.current &&
                  this.config.versions.current.slug;
                return yr(
                  bo ||
                    (bo = Do([
                      '\n      <dl class="versions">\n        <dt>Versions</dt>\n        ',
                      "\n      </dl>\n    ",
                    ])),
                  this.config.addons.flyout.versions.map(function (e) {
                    return yr(
                      Eo || (Eo = Do(["<dd>", "</dd> "])),
                      (function (e) {
                        var n = yr(
                          Mo || (Mo = Do(['<a href="', '">', "</a>"])),
                          e.url,
                          e.slug
                        );
                        return t && e.slug === t
                          ? yr(Lo || (Lo = Do(["<strong>", "</strong>"])), n)
                          : n;
                      })(e)
                    );
                  })
                );
              },
            },
            {
              key: "renderLanguages",
              value: function () {
                return this.config.addons.flyout.translations &&
                  this.config.addons.flyout.translations.length
                  ? yr(
                      wo ||
                        (wo = Do([
                          '\n      <dl class="languages">\n        <dt>Languages</dt>\n        ',
                          "\n      </dl>\n    ",
                        ])),
                      this.config.addons.flyout.translations.map(function (t) {
                        return yr(
                          jo ||
                            (jo = Do([
                              '\n            <dd><a href="',
                              '">',
                              "</a></dd>\n          ",
                            ])),
                          t.url,
                          t.slug
                        );
                      })
                    )
                  : vr;
              },
            },
            {
              key: "render",
              value: function () {
                if (!this.config) return vr;
                var t = { floating: this.floating, container: !0 };
                return (
                  (t[this.position] = !0),
                  yr(
                    Co ||
                      (Co = Do([
                        "\n      <div class=",
                        ">\n        ",
                        "\n        <main class=",
                        ">\n          ",
                        " ",
                        "\n          ",
                        " ",
                        "\n          ",
                        " ",
                        "\n          <hr />\n          ",
                        "\n        </main>\n      </div>\n    ",
                      ])),
                    vi(t),
                    this.renderHeader(),
                    vi({ closed: !this.opened }),
                    this.renderLanguages(),
                    this.renderVersions(),
                    this.renderDownloads(),
                    this.renderReadTheDocs(),
                    this.renderVCS(),
                    this.renderSearch(),
                    this.renderFooter()
                  )
                );
              },
            },
          ]),
          n
        );
      })(Br);
      Po($o, "elementName", "readthedocs-flyout"),
        Po($o, "properties", {
          config: { state: !0 },
          opened: { type: Boolean },
          floating: { type: Boolean },
          position: { type: String },
        }),
        Po($o, "styles", No.Z);
      var Uo = (function (t) {
        zo(n, t);
        var e = Bo(n);
        function n(t) {
          var r;
          ko(this, n),
            (r = e.call(this)),
            customElements.define("readthedocs-flyout", $o);
          var i = document.querySelectorAll("readthedocs-flyout");
          i.length ||
            ((i = [new $o()]),
            document.body.append(i[0]),
            i[0].requestUpdate());
          var o,
            a = To(i);
          try {
            for (a.s(); !(o = a.n()).done; ) {
              o.value.loadConfig(t);
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          return r;
        }
        return (
          Io(n, null, [
            {
              key: "isEnabled",
              value: function (t) {
                return t.addons && t.addons.flyout.enabled;
              },
            },
          ]),
          n
        );
      })(o);
      function Qo(t) {
        return (
          (Qo =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          Qo(t)
        );
      }
      function Go(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(
              t,
              ((i = r.key),
              (o = void 0),
              (o = (function (t, e) {
                if ("object" !== Qo(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" !== Qo(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(i, "string")),
              "symbol" === Qo(o) ? o : String(o)),
              r
            );
        }
        var i, o;
      }
      function Fo(t, e) {
        return (
          (Fo = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          Fo(t, e)
        );
      }
      function Wo(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = Ho(t);
          if (e) {
            var i = Ho(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === Qo(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return (function (t) {
              if (void 0 === t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return t;
            })(t);
          })(this, n);
        };
      }
      function Ho(t) {
        return (
          (Ho = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          Ho(t)
        );
      }
      var Zo = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            e && Fo(t, e);
        })(o, t);
        var e,
          n,
          r,
          i = Wo(o);
        function o(t) {
          var e;
          return (
            (function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, o),
            ((e = i.call(this)).config = t),
            e.injectEthicalAds(),
            e
          );
        }
        return (
          (e = o),
          (n = [
            {
              key: "createAdPlacement",
              value: function () {
                var t,
                  e = this.config.addons.ethicalads;
                if ((t = document.querySelector("[data-ea-publisher]")))
                  t.setAttribute("data-ea-publisher", e.publisher),
                    t.setAttribute("data-ea-manual", "true"),
                    "image" !== t.getAttribute("data-ea-type") &&
                      "text" !== t.getAttribute("data-ea-type") &&
                      t.setAttribute("data-ea-type", "readthedocs-sidebar");
                else {
                  (t = document.createElement("div")).setAttribute(
                    "data-ea-publisher",
                    e.publisher
                  ),
                    t.setAttribute("data-ea-type", "text"),
                    t.setAttribute("data-ea-style", "fixedfooter"),
                    e.keywords &&
                      t.setAttribute("data-ea-keywords", e.keywords.join("|")),
                    e.campaign_types &&
                      t.setAttribute(
                        "data-ea-campaign-types",
                        e.campaign_types.join("|")
                      ),
                    t.classList.add("raised");
                  var n =
                    document.querySelector("[role=main]") || document.body;
                  n.insertBefore(t, n.lastChild),
                    console.log("EthicalAd placement injected.");
                }
                return t;
              },
            },
            {
              key: "loadEthicalAdLibrary",
              value: function () {
                var t = document.createElement("script");
                t.setAttribute("type", "text/javascript"),
                  t.setAttribute(
                    "src",
                    "https://media.ethicalads.io/media/client/ethicalads.min.js"
                  ),
                  document.head.appendChild(t);
              },
            },
            {
              key: "injectEthicalAds",
              value: function () {
                this.createAdPlacement(), this.loadEthicalAdLibrary();
              },
            },
          ]),
          (r = [
            {
              key: "isEnabled",
              value: function (t) {
                return (
                  t.addons &&
                  t.addons.ethicalads.enabled &&
                  !t.addons.ethicalads.ad_free
                );
              },
            },
          ]),
          n && Go(e.prototype, n),
          r && Go(e, r),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          o
        );
      })(o);
      const qo = {
        alt: "Alt",
        cmd: "Cmd",
        ctrl: "Ctrl",
        shift: "Shift",
        joinWith: " + ",
        hideKey: "never",
      };
      let Vo = qo;
      const Xo = () =>
        ({
          alphanumeric: /^Key([A-Z01-9])$/,
          alpha: /^Key([A-Z])$/,
          always: /^Key(.*)$/,
          never: /^(.*)$/,
        }[Vo.hideKey]);
      function Jo(t) {
        return {
          character:
            -1 !== [16, 17, 18, 91, 93, 224].indexOf(t.keyCode)
              ? null
              : t.code.replace(Xo(), "$1"),
          modifiers: {
            cmd: t.metaKey,
            ctrl: t.ctrlKey,
            alt: t.altKey,
            shift: t.shiftKey,
          },
        };
      }
      const Ko = (t) =>
        (function (t) {
          const e = Jo(t),
            n = Object.entries(e.modifiers).reduce(
              (t, [e, n]) => (n && t.push(Vo[e]), t),
              []
            );
          return e.character && n.push(e.character), n;
        })(t).join(Vo.joinWith);
      function ta(t) {
        return (
          (ta =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          ta(t)
        );
      }
      function ea(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" == typeof t) return na(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return na(t, e);
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          s = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (s = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (s) throw o;
            }
          },
        };
      }
      function na(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function ra(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      function ia(t, e) {
        for (var n = 0; n < e.length; n++) {
          var r = e[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(t, ha(r.key), r);
        }
      }
      function oa(t, e, n) {
        return (
          e && ia(t.prototype, e),
          n && ia(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }
      function aa() {
        return (
          (aa =
            "undefined" != typeof Reflect && Reflect.get
              ? Reflect.get.bind()
              : function (t, e, n) {
                  var r = (function (t, e) {
                    for (
                      ;
                      !Object.prototype.hasOwnProperty.call(t, e) &&
                      null !== (t = fa(t));

                    );
                    return t;
                  })(t, e);
                  if (r) {
                    var i = Object.getOwnPropertyDescriptor(r, e);
                    return i.get
                      ? i.get.call(arguments.length < 3 ? t : n)
                      : i.value;
                  }
                }),
          aa.apply(this, arguments)
        );
      }
      function sa(t, e) {
        if ("function" != typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && la(t, e);
      }
      function la(t, e) {
        return (
          (la = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          la(t, e)
        );
      }
      function ca(t) {
        var e = (function () {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = fa(t);
          if (e) {
            var i = fa(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (function (t, e) {
            if (e && ("object" === ta(e) || "function" == typeof e)) return e;
            if (void 0 !== e)
              throw new TypeError(
                "Derived constructors may only return object or undefined"
              );
            return ua(t);
          })(this, n);
        };
      }
      function ua(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function fa(t) {
        return (
          (fa = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          fa(t)
        );
      }
      function da(t, e, n) {
        return (
          (e = ha(e)) in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function ha(t) {
        var e = (function (t, e) {
          if ("object" !== ta(t) || null === t) return t;
          var n = t[Symbol.toPrimitive];
          if (void 0 !== n) {
            var r = n.call(t, e || "default");
            if ("object" !== ta(r)) return r;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === e ? String : Number)(t);
        })(t, "string");
        return "symbol" === ta(e) ? e : String(e);
      }
      var pa = (function (t) {
        sa(n, t);
        var e = ca(n);
        function n() {
          var t;
          return (
            ra(this, n),
            da(ua((t = e.call(this))), "_handleKeydown", function (e) {
              var n;
              t.docDiffHotKeyEnabled &&
                Ko(e) === t.config.addons.hotkeys.doc_diff.trigger &&
                "BODY" == document.activeElement.tagName &&
                (t.docDiffShowed
                  ? ((n = new CustomEvent(di)), (t.docDiffShowed = !1))
                  : ((n = new CustomEvent(fi)), (t.docDiffShowed = !0)),
                console.log(n));
            }),
            (t.docDiffShow = !1),
            t
          );
        }
        return (
          oa(n, [
            {
              key: "loadConfig",
              value: function (t) {
                (this.config = t),
                  (this.docDiffHotKeyEnabled =
                    this.config.addons.hotkeys.doc_diff.enabled),
                  (this.docDiffShowed = !1);
              },
            },
            {
              key: "connectedCallback",
              value: function () {
                aa(fa(n.prototype), "connectedCallback", this).call(this),
                  document.addEventListener("keydown", this._handleKeydown);
              },
            },
            {
              key: "disconnectedCallback",
              value: function () {
                document.removeEventListener("keydown", this._handleKeydown),
                  aa(fa(n.prototype), "disconnectedCallback", this).call(this);
              },
            },
          ]),
          n
        );
      })(Br);
      da(pa, "elementName", "readthedocs-hotkeys"),
        da(pa, "properties", {
          config: { state: !0 },
          enabled: { type: Boolean },
        });
      var ga = (function (t) {
        sa(n, t);
        var e = ca(n);
        function n(t) {
          var r;
          ra(this, n),
            (r = e.call(this)),
            customElements.define("readthedocs-hotkeys", pa);
          var i = document.querySelectorAll("readthedocs-hotkeys");
          i.length ||
            ((i = [new pa()]),
            document.body.append(i[0]),
            i[0].requestUpdate());
          var o,
            a = ea(i);
          try {
            for (a.s(); !(o = a.n()).done; ) {
              o.value.loadConfig(t);
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          return r;
        }
        return (
          oa(n, null, [
            {
              key: "isEnabled",
              value: function (t) {
                return t.addons && t.addons.hotkeys.enabled;
              },
            },
          ]),
          n
        );
      })(o);
      !(function () {
        for (
          var t = 0,
            e = [
              "/_/static/javascript/readthedocs-doc-embed.js",
              "https://assets.readthedocs.org/static/javascript/readthedocs-doc-embed.js",
            ];
          t < e.length;
          t++
        ) {
          var n = e[t];
          return (
            document.querySelectorAll('script[src="'.concat(n, '"]')).length > 0
          );
        }
      })()
        ? new Promise(function (t) {
            i.then(function () {
              return (
                (t =
                  "/_/addons/?" +
                  new URLSearchParams({ url: window.location.href })),
                window.location.href.startsWith("http://localhost") &&
                  (t = "/_/readthedocs-addons.json"),
                fetch(t, {
                  method: "GET",
                  headers: { "X-RTD-Hosting-Integrations-Version": r },
                }).then(function (t) {
                  if (t.ok) return t.json();
                  console.debug("Error parsing configuration data");
                })
              );
              var t;
            })
              .then(function (t) {
                for (
                  var e = [],
                    n = function () {
                      var n = i[r];
                      n.isEnabled(t) &&
                        e.push(
                          new Promise(function (e) {
                            e(new n(t));
                          })
                        );
                    },
                    r = 0,
                    i = [Uo, ni, li, Zo, Fi, fo, ga];
                  r < i.length;
                  r++
                )
                  n();
                return Promise.all(e);
              })
              .then(function () {
                t();
              })
              .catch(function (t) {
                console.error(t);
              });
          })
        : console.debug("Read the Docs Embed is present. Skipping...");
    })();
})();
//# sourceMappingURL=readthedocs-addons.js.map?cdeda9844490294994c0
