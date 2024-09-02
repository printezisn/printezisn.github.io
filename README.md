# My personal website

This is my personal website containing my blog, portfolio and games.

## Prerequisites

1. Install **NodeJS** >= 20.0.0. If you already have **nvm**, you can just do the following steps:
   1. `nvm install`
   1. `nvm use`
1. Install **pnpm** (e.g. with `npm i -g pnpm`).
1. Download the node packages with `pnpm i`.

## Stack

1. [Astro](https://astro.build/) for static site generation (used for the portfolio and blog).

## Commands

1. `pnpm run start:dev`: starts the application in development mode.
1. `pnpm run start:prod`: starts the application in production mode. It's required to run `pnpm run build` first to get the latest changes.
1. `pnpm run build`: builds the application and creates the assets required to run the application in production mode.
1. `pnpm run lint`: uses eslint to find linting issues.
1. `pnpm run lint:fix`: uses eslint to find linting issues and fix them if possible.
1. `pnpm run prettier:format`: uses prettier to find formatting issues and fix them if possible.
1. `pnpm run test:unit`: runs the unit tests.
