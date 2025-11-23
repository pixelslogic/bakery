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
        catalog: resolve(__dirname, 'source/catalog.html'),
        filter: resolve(__dirname, 'source/filter.html'),
        productCard: resolve(__dirname, 'source/productCard.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
