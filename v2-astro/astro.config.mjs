import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages: https://abhishekeb211.github.io/Profie-website.github.io/
  site: 'https://abhishekeb211.github.io',
  base: '/Profie-website.github.io',
  output: 'static',
  build: {
    assets: 'assets',
  },
});
