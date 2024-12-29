import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',  // Set the root directory to src
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    minify: true
  }
});
