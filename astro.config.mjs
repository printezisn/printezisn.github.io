import { defineConfig } from 'astro/config';
import customSitemap from './lib/custom-sitemap.mjs';
import fs from 'fs';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';

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
      src: `node_modules/${game}/dist/images`,
      dest: `games/${name}`,
      rename: { stripBase: 5 },
    });
  }

  if (
    fs.existsSync(
      path.join(import.meta.dirname, 'node_modules', game, 'dist', 'assets'),
    )
  ) {
    directoriesToCopy.push({
      src: `node_modules/${game}/dist/assets`,
      dest: `games/${name}/assets`,
      rename: { stripBase: 5 },
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
      src: `node_modules/${game}/dist/module-assets`,
      dest: 'module-assets',
      rename: { stripBase: 5 },
    });
  }
});

// Solidboy Emulator
directoriesToCopy.push({
  src: 'node_modules/@printezisn/solidboy/dist/images',
  dest: 'solidboy',
  rename: { stripBase: 5 },
});
directoriesToCopy.push({
  src: `node_modules/@printezisn/solidboy/dist/assets`,
  dest: `assets`,
  rename: { stripBase: 5 },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://www.printezisn.com/',
  integrations: [
    customSitemap(
      'https://www.printezisn.com/',
      'dist',
      new Date('2025-04-17'),
    ),
    expressiveCode({
      themes: ['github-dark'],
    }),
    mdx(),
  ],
  cacheDir: '.cached-assets',
  vite: {
    plugins: [
      viteStaticCopy({
        targets: directoriesToCopy,
      }),
    ],
  },
});
