import { defineConfig } from 'vite';

// Builds a single classic-script bundle (acul.js + acul.css) with stable file names, so the
// head_tags registered in Auth0 never change between deploys. The bundle decides which screen to
// render from window.universal_login_context.screen.name.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/main.js',
      name: 'AculPoc',
      formats: ['iife'],
      fileName: () => 'acul.js',
      cssFileName: 'acul',
    },
  },
});
