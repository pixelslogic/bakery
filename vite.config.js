import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'source',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'source/index.html'),
        // about: resolve(__dirname, 'source/about.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
