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
        const tradePages = [
          'website-fuer-elektriker',
          'website-fuer-sanitaer',
          'website-fuer-schreiner',
          'website-fuer-maler',
          'website-fuer-kfz-betrieb',
          'website-fuer-dachdecker',
        ];
        const isTradePage = tradePages.some(slug => item.url.includes(slug));

        if (item.url === 'https://www.digitalhandwerk-mensch.de/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (isTradePage) {
          item.priority = 0.8;
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
