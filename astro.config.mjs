import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.digitalhandwerk-mensch.de',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        // Homepage gets highest priority and weekly crawl
        if (item.url === 'https://www.digitalhandwerk-mensch.de/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else {
          // Legal pages: low priority, rarely change
          item.priority = 0.1;
          item.changefreq = 'yearly';
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
