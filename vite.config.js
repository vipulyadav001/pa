import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',  // Set the root directory to src
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: '../',  // Build directly to root directory
    assetsDir: 'assets',
    minify: true,
    emptyOutDir: false  // Don't delete other files in root
  }
});
