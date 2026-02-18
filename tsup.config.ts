import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    minify: true,
    sourcemap: true,
    treeshake: {
      preset: 'recommended',
    },
  },
  {
    entry: { 'teya-blocks-js': 'src/index.ts' },
    format: ['iife'],
    globalName: 'TeyaBlocksLoader',
    minify: true,
    sourcemap: true,
    treeshake: {
      preset: 'recommended',
    },
    outExtension: () => ({ js: '.js' }),
  },
]);
