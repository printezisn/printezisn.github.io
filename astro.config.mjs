import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const gamePackages = Object.keys(
  JSON.parse(fs.readFileSync('./package.json')).dependencies,
).filter((game) => game.startsWith('@printezisn/games-'));

const directoriesToCopy = [];
gamePackages.forEach((game) => {
  const name = game.substring('@printezisn/games-'.length);
  directoriesToCopy.push(
    {
      src: `node_modules/${game}/dist/images/*`,
      dest: `games/${name}`,
    },
    {
      src: `node_modules/${game}/dist/assets`,
      dest: `games/${name}`,
    },
  );
});

// https://astro.build/config
export default defineConfig({
  site: 'https://printezisn.github.io/',
  integrations: [
    sitemap({
      lastmod: new Date(),
    }),
  ],
  vite: {
    plugins: [
      viteStaticCopy({
        targets: directoriesToCopy,
      }),
    ],
  },
});
