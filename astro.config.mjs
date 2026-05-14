import { defineConfig } from 'astro/config';
import { statSync } from 'node:fs';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.digitalhandwerk.net',
  output: 'static',
  trailingSlash: 'always',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const importantPages = [
          'website-fuer-elektriker',
          'website-fuer-sanitaer',
          'website-fuer-schreiner',
          'website-fuer-maler',
          'website-fuer-kfz-betrieb',
          'website-fuer-dachdecker',
          'webdesign-karlsruhe-handwerker',
        ];
        const isImportantPage = importantPages.some(slug => item.url.includes(slug));

        if (item.url === 'https://www.digitalhandwerk.net/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (isImportantPage) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else {
          // Legal pages: low priority, rarely change
          item.priority = 0.1;
          item.changefreq = 'yearly';
        }

        // Set lastmod to the actual source file modification time
        try {
          const pathname = new URL(item.url).pathname;
          const slug = pathname === '/' ? 'index' : pathname.replace(/^\/|\/$/g, '');
          const filePath = `src/pages/${slug}.astro`;
          const mtime = statSync(filePath).mtime;
          item.lastmod = mtime.toISOString();
        } catch {
          item.lastmod = new Date().toISOString();
        }

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
