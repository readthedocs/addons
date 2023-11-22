import { importMapsPlugin } from "@web/dev-server-import-maps";
import { fromRollup, rollupAdapter } from "@web/dev-server-rollup";
import rollupReplace from "@rollup/plugin-replace";
import rollupCommonjs from "@rollup/plugin-commonjs";
import rollupImage from "@rollup/plugin-image";
import rollupJson from "@rollup/plugin-json";
import rollupLitCss from "rollup-plugin-lit-css";

const replace = fromRollup(rollupReplace);
const pluginCommonjs = fromRollup(rollupCommonjs);

export default {
  rootDir: ".",
  files: ["./tests/**/*.test.{js,html}"],
  preserveSymlinks: true,
  nodeResolve: {},
  mimeTypes: {
    "**/*.css": "js",
    "**/*.svg": "js",
    "**/*.json": "js",
  },
  plugins: [
    rollupAdapter(rollupJson()),
    rollupAdapter(rollupImage()),
    rollupAdapter(rollupLitCss()),
    pluginCommonjs({
      include: "node_modules/**",
      esmExternals: true,
      defaultIsModuleExports: true,
      requireReturnsDefault: true,
    }),
    // https://modern-web.dev/docs/dev-server/writing-plugins/examples/#environment-variables
    replace({
      preventAssignment: true,
      include: ["src/**/*.js"],
      IS_TESTING: JSON.stringify(true),
      IS_PRODUCTION: JSON.stringify(false),
    }),
  ],
};
