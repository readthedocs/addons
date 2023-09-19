import { importMapsPlugin } from '@web/dev-server-import-maps';
import { fromRollup, rollupAdapter } from '@web/dev-server-rollup';
import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupImage from '@rollup/plugin-image';
import rollupJson from '@rollup/plugin-json';
import rollupLitCss from 'rollup-plugin-lit-css';

const pluginCommonjs = fromRollup(rollupCommonjs);

export default {
  rootDir: '.',
  files: ['./tests/**/*.test.{js,html}'],
  preserveSymlinks: true,
  nodeResolve: {},
  mimeTypes: {
    '**/*.css': 'js',
    '**/*.svg': 'js',
    '**/*.json': 'js',
  },
  plugins: [
    rollupAdapter(rollupJson()),
    rollupAdapter(rollupImage()),
    rollupAdapter(rollupLitCss()),
    pluginCommonjs({
      include: 'node_modules/**',
      requireReturnsDefault: "preferred",
    }),
  ],
};
