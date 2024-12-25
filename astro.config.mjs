import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const gamePackages = Object.keys(
  JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'package.json')))
    .dependencies,
).filter((game) => game.startsWith('@printezisn/games-'));

const directoriesToCopy = [];
gamePackages.forEach((game) => {
  const name = game.substring('@printezisn/games-'.length);

  if (
    fs.existsSync(
      path.join(import.meta.dirname, 'node_modules', game, 'dist', 'images'),
    )
  ) {
    directoriesToCopy.push({
      src: `node_modules/${game}/dist/images/*`,
      dest: `games/${name}`,
    });
  }

  if (
    fs.existsSync(
      path.join(import.meta.dirname, 'node_modules', game, 'dist', 'assets'),
    )
  ) {
    directoriesToCopy.push({
      src: `node_modules/${game}/dist/assets`,
      dest: `games/${name}`,
    });
  }

  if (
    fs.existsSync(
      path.join(
        import.meta.dirname,
        'node_modules',
        game,
        'dist',
        'module-assets',
      ),
    )
  ) {
    directoriesToCopy.push({
      src: `node_modules/${game}/dist/module-assets/*`,
      dest: 'module-assets',
    });
  }
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
