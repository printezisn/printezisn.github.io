import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://printezisn.github.io/',
  integrations: [
    sitemap({
      lastmod: new Date(),
      filter: (page) => {
        return !page.includes('couples-run');
      },
    }),
  ],
});
