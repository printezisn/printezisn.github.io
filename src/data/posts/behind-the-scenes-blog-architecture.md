---
title: 'Behind the Scenes: The architecture of this site'
description: Explore the architecture behind this site and its games, from design to technical framework, and discover how key elements enhance functionality and user experience.
excerpt: Take a behind-the-scenes look at the architecture of this site. In this post, we explore the design, structure, and technical framework that powers both the site and the games, revealing the key elements that contribute to its functionality and user experience.
categories:
  - architecture
date: 2024-12-21
---

Welcome to a behind-the-scenes tour of the architecture that powers this site! In this post, we’ll dive deep into the design, structure, and technical framework that bring everything to life, from the content you read to the interactive games you enjoy.

This site is made up of several distinct parts:

- **The Blog**
- **The Game Engine** that powers 2D games.
- **Individual Games** like <a href="/sudoku/" target="_blank">Decisive Sudoku</a> and <a href="/games/couples-run/" target="_blank">Couples Run</a>.

Each part resides in its own GitHub repository, and they are seamlessly integrated to form the site you’re experiencing right now. Let’s take a closer look at each of these components.

### The Game Engine

This is the core **Game Engine** that drives the 2D games provided on the site. It offers essential components and game lifecycle functionality, enabling everything from graphics rendering to sound management. The engine uses the following key libraries and tools:

- <a href="https://pixijs.com/" target="_blank" rel="nofollow noreferrer">PixiJS</a> for 2D graphics rendering.
- <a href="https://brm.io/matter-js/" target="_blank" rel="nofollow noreferrer">MatterJS</a> for physics functionality.
- <a href="https://gsap.com/" target="_blank" rel="nofollow noreferrer">GSAP</a> for handling animations.
- <a href="https://pixijs.io/sound/examples/" target="_blank" rel="nofollow noreferrer">PixiJS Sound</a> for playing sounds.
- <a href="https://pixijs.io/assetpack/" target="_blank" rel="nofollow noreferrer">PixiJS Assetpack</a> for optimizing assets like images, audio, etc.
- <a href="https://github.com/tonistiigi/audiosprite" target="_blank" rel="nofollow noreferrer">Audiosprite</a> for combining audio files into sprites.

Here’s how it’s set up and integrated into the game projects:

1\. **Project setup with Vite:**
\
The engine is built using <a href="https://vite.dev/" target="_blank" rel="nofollow noreferrer">Vite</a> in _lib_ mode, with the following configuration:

`vite.config.ts`

```ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      name: 'game-engine',
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
```

This setup builds the engine into a library format, which is then available for use in other projects. It additionally uses <a href="https://github.com/qmhc/vite-plugin-dts" target="_blank" rel="nofollow noreferrer">vite-plugin-dts</a> to provide the underlying entity types.

2\. **Artifact exports in package.json:**
\
The built artifacts are exposed as exports like so:

`package.json`

```json
{
  "module": "./dist/index.js",
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```

3\. **Automated builds and versioning:**
\
Before pushing any changes to the repository, the project is automatically built using hooks with <a href="https://typicode.github.io/husky/" target="_blank" rel="nofollow noreferrer">Husky</a> to ensure the latest `dist` folder is checked into the repository. When a new version is ready, a new tag (e.g., `v0.7.0`) is created to mark the release.

4\. **Game projects as dependencies:**
\
Game projects that use the engine import it as a dependency, specifying the appropriate version tag (e.g. `v0.7.0`):

`package.json`

```json
{
  "devDependencies": {
    "@printezisn/game-engine": "git://github.com/printezisn/game-engine#v0.7.0"
  }
}
```

This setup ensures the game engine is seamlessly integrated and easily updated across all game projects hosted on the site.

<a href="https://github.com/printezisn/game-engine/" target="_blank" rel="noreferrer">GitHub Repository</a>

### Individual Games

The individual games, like the game engine itself, are structured to be easily integrated into other projects, such as this site application. Below is an overview of how the structure is set up, with _Couples Run_ used as an example.

1\. **Project setup with Vite:**
\
Just like the engine, the game is also built with **Vite** into library format, using the following configuration:

`vite.config.ts`

```ts
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import dts from 'vite-plugin-dts';
import { createHtmlPlugin } from 'vite-plugin-html';

const mainBody = fs
  .readFileSync(path.join(import.meta.dirname, 'templates', 'main-body.html'))
  .toString();

const credits = fs
  .readFileSync(path.join(import.meta.dirname, 'templates', 'credits.html'))
  .toString();

const privacyPolicy = fs
  .readFileSync(
    path.join(import.meta.dirname, 'templates', 'privacy-policy.html'),
  )
  .toString();

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', 'src/templates.ts'],
      name: 'couples-run',
    },
    copyPublicDir: true,
  },
  plugins: [
    dts({ rollupTypes: true }),
    createHtmlPlugin({
      inject: {
        data: {
          mainBody,
          credits,
          privacyPolicy,
        },
      },
    }),
  ],
});
```

This configuration uses <a href="https://github.com/qmhc/vite-plugin-dts" target="_blank" rel="nofollow noreferrer">vite-plugin-dts</a> to provide the underlying entity types and <a href="https://github.com/vbenjs/vite-plugin-html" target="_blank" rel="nofollow noreferrer">vite-plugin-html</a> to inject variables into the page templates.

2\. **Module for rendering the game**
\
The core game rendering functionality and page styles are encapsulated in a dedicated module:

`src/index.ts`

```ts
import './styles.css';

const renderGame = (options: RenderOptions) => {
  // Game rendering logic
};
```

3\. **Main page for local testing**
\
A basic HTML page is included for testing the game locally:

`index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Couples Run</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" href="/images/favicon.png" />
    <script type="module">
      import renderGame from './src/index.ts';

      renderGame({
        // Game rendering properties
      });
    </script>
  </head>
  <body>
    <%- mainBody %>
  </body>
</html>
```

4\. **HTML templates for game content**
\
The game content, such as credits and privacy policy, is stored in HTML templates. These templates are exposed to consuming projects via a module:

`src/templates.ts`

```ts
import MainBodyHtml from '../templates/main-body.html?raw';
import CreditsHtml from '../templates/credits.html?raw';
import PrivacyPolicyHtml from '../templates/privacy-policy.html?raw';

export { MainBodyHtml, CreditsHtml, PrivacyPolicyHtml };
```

5\. **Assets**
\
Images and audio used in the game are stored in an assets folder.

6\. **Artifact Exports in package.json:**
\
The built artifacts are exposed as exports to facilitate easy consumption in other projects:

`package.json`

```json
{
  "module": "./dist/index.js",
  "main": "./dist/index.umd.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs",
      "types": "./dist/index.d.ts"
    },
    "./templates": {
      "import": "./dist/templates.js",
      "require": "./dist/templates.cjs"
    },
    "./style.css": {
      "import": "./dist/style.css",
      "require": "./dist/style.css"
    }
  }
}
```

3\. **Automated builds and versioning:**
\
Similar to the engine, the game is automatically built before changes are pushed to the repository to ensure the latest version of the `dist` folder is included. A new tag is created each time a new version is ready.

4\. **Other projects as dependencies:**
\
Other projects that depend on the game import it as a dependency, specifying the appropriate version tag (e.g. `v1.7.1`):

`package.json`

```json
{
  "devDependencies": {
    "@printezisn/games-couples-run": "git://github.com/printezisn/games-couples-run#v1.7.1"
  }
}
```

<a href="https://github.com/printezisn/games-couples-run/" target="_blank" rel="noreferrer">GitHub Repository</a>

### The blog

This is the main application. It includes the [portfolio](/) and all the [posts](/blog) you read. It's a blog built with <a href="https://astro.build/" target="_blank" rel="nofollow noreferrer">Astro</a> and Typescript.

It has the following setup in order to host the games.

1\. **Game projects as dependencies:**
\
The game projects are added as dependencies:

`package.json`

```json
{
  "dependencies": {
    "@printezisn/games-couples-run": "git://github.com/printezisn/games-couples-run#v1.7.1",
    "@printezisn/games-sudoku": "git://github.com/printezisn/games-sudoku#v1.0.2"
  }
}
```

2\. **Rendering the games**:
\
Scripts are included to render the games and apply their respective styles. For example:

`src/scripts/games/couples-run/main.ts`

```ts
import '@printezisn/games-couples-run/style.css';
import renderGame from '@printezisn/games-couples-run';

renderGame({
  // Game rendering properties
});
```

The game is then integrated into an Astro page:

`src/pages/games/couples-run/index.astro`

```astro
---
import BaseLayout from '../../../layouts/base-layout.astro';
import { MainBodyHtml } from '@printezisn/games-couples-run/templates';

const title = 'Game title';
const description = 'Game description';
---

<BaseLayout
  title={title}
  description={description}
  image="/games/couples-run/logo.png"
  path="/games/couples-run/"
  favicon="/games/couples-run/favicon.png"
  themeColor="#000000"
>
  <Fragment slot="scripts">
    <script src="../../../scripts/games/couples-run/main.ts"></script>
  </Fragment>
  <Fragment set:html={MainBodyHtml} />
</BaseLayout>
```

2\. **Game-specific pages:**
\
The application includes dedicated Astro pages for each game, rendering their HTML templates. For example:

`src/pages/games/couples-run/credits.astro`

```astro
---
import BlogLayout from '../../../layouts/blog-layout.astro';
import { CreditsHtml } from '@printezisn/games-couples-run/templates';

const title = 'Credits | Couples Run';
const description = 'Credits for the Couples Run game';
---

<BlogLayout
  title={title}
  description={description}
  path="/games/couples-run/credits/"
  pageTitle="Credits for Couples Run"
>
  <Fragment set:html={CreditsHtml} />
</BlogLayout>
```

3\. **Configuration to make game assets available:**
\
To ensure that game assets are accessible, the site uses a specific Astro configuration. This configuration copies game assets, such as images and other resources, into the site’s structure.

`astro.config.mjs`

```js
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
```

This setup uses the <a href="https://github.com/sapphi-red/vite-plugin-static-copy" target="_blank" rel="nofollow noreferrer">vite-plugin-static-copy</a> plugin to copy the game assets from the node modules into the site application, ensuring all necessary resources are available for the games to function properly.

<a href="https://github.com/printezisn/printezisn.github.io/" target="_blank" rel="noreferrer">GitHub Repository</a>

### Conclusion

In this post, we’ve explored the technical architecture behind this site, highlighting how each component, from the blog itself to the interactive games, is seamlessly integrated to deliver a smooth user experience. By breaking down the structure of the **Game Engine**, **Individual Games**, and the **Blog**, we’ve seen how the use of modern tools like Vite allows for flexibility, scalability, and ease of integration.

The key takeaway from this architecture is the modular design. Each game and the game engine are developed as reusable libraries, making them easily integrable into different projects.

By leveraging modern development tools and maintaining a clear, structured architecture, this site is designed to grow and scale, offering a solid foundation for both game development and content management. Whether you’re here to read a blog post or play a game, everything is optimized to work together, creating a cohesive and enjoyable experience.

This architecture not only powers the site today but also sets the stage for future updates, new games, and continued evolution.
