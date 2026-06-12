// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// To switch to Cloudflare Pages: remove `base` and add `adapter: cloudflare()` from @astrojs/cloudflare.

export default defineConfig({
  site: 'https://aliparchekan.github.io',
  base: '/personal_web',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
