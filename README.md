# My personal website

This is my personal website containing my blog, portfolio and games.

## Prerequisites

1. Install **NodeJS** >= 20.0.0. If you already have **nvm**, you can just do the following steps:
   1. `nvm install`
   1. `nvm use`
1. Install **pnpm** (e.g. with `npm i -g pnpm`).
1. Download the node packages with `pnpm i`.
1. Install **ffmpeg** to convert audio files.

## Stack

1. [Astro](https://astro.build/) for static site generation (used for the portfolio and blog).
1. Typescript
1. [PixiJS](https://pixijs.com/) for 2D graphics.
1. [GSAP](https://gsap.com/) for animations.
1. [PixiJS Assetpack](https://pixijs.io/assetpack/) for packing and optimizing assets.
1. [PixiJS Sound](https://pixijs.io/sound/examples/index.html) for playing sounds.
1. [Audiosprite](https://github.com/tonistiigi/audiosprite) to combine audio files.

## Commands

1. `pnpm start:dev`: starts the application in development mode.
1. `pnpm start:prod`: starts the application in production mode. It's required to run `pnpm run build` first to get the latest changes.
1. `pnpm build`: builds the application and creates the assets required to run the application in production mode.
1. `pnpm lint`: uses eslint to find linting issues.
1. `pnpm lint:fix`: uses eslint to find linting issues and fix them if possible.
1. `pnpm prettier:format`: uses prettier to find formatting issues and fix them if possible.
1. `pnpm test:unit`: runs the unit tests.
1. `GAME_NAME=<game_name> pnpm build:assets`: builds the assets for the game <game_name>
