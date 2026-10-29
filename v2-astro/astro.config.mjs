import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages: https://abhishekeb211.github.io/Profie-website.github.io/
  site: 'https://abhishekeb211.github.io',
  base: '/Profie-website.github.io',
  output: 'static',
  build: {
    assets: 'assets',
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
