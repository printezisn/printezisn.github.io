---
title: Automating Astro website deployments with GitHub actions
description: Automate Astro website deployments with GitHub Actions. Learn how to build, test, and deploy to GitHub Pages or Azure Static Web Apps with optimized workflows.
excerpt: This post walks through a simple and efficient GitHub Actions workflow for deploying Astro websites. It covers build automation, testing, and deployment to GitHub Pages or Azure Static Web Apps, with caching optimizations to speed up the process.
categories:
  - devops
date: 2025-03-17
image:
  href: ../../assets/posts/automating-astro-website-deployments-with-github-actions/pipelines.png
  alt: A set of pipelines running calculations
---

It’s been a while since my last post, so I wanted to share something small yet powerful that I use in all my <a href="https://astro.build/" target="_blank" rel="noreferrer nofollow">Astro</a> projects: **GitHub Actions**.

Automating builds and deployments is crucial for maintaining efficiency, and GitHub Actions provides a seamless way to manage CI/CD workflows. In this post, I’ll walk you through a simple yet effective workflow that powers my Astro websites, helping you build, test, and deploy effortlessly to <a href="https://pages.github.com/" target="_blank" rel="noreferrer nofollow">GitHub Pages</a> or <a href="https://azure.microsoft.com/en-us/products/app-service/static" target="_blank" rel="noreferrer nofollow">Azure Static Web Apps</a>.

### The Workflow: Build & Deploy

My workflow consists of a single GitHub Actions workflow with two jobs:

- **Build Job**: Installs dependencies, lints, tests, and builds the website.
- **Deploy Job**: Installs only production dependencies, rebuilds the site for production, and pushes it live.

**Key Performance Optimizations**

To ensure fast and efficient builds, I focus on:

- **Using pnpm for dependency caching** – speeds up installs.
- **Caching generated images** – significantly reduces build times as Astro is able to use cached entries in future builds.
- **Running linters and tests** – ensures code quality before deployment.

### GitHub Pages Workflow Example

This is a simple workflow to build and deploy an Astro website to **GitHub Pages**.

```yaml
name: Build and Deploy

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    name: Build

    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - name: Cache Assets
        id: cache-assets
        uses: actions/cache@v4
        with:
          path: .cached-assets
          key: ${{ runner.os }}-cached-assets
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false
      - name: Use Node.js 22x
        uses: actions/setup-node@v3
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm i
      - name: Build
        run: pnpm build
      - name: Run linter
        run: pnpm lint
      - name: Run unit tests
        run: pnpm test:unit

  deploy:
    if: github.event_name == 'push'
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - name: Cache Assets
        id: cache-assets
        uses: actions/cache@v4
        with:
          path: .cached-assets
          key: ${{ runner.os }}-cached-assets
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false
      - name: Use Node.js 22x
        uses: actions/setup-node@v3
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm i
        env:
          NODE_ENV: 'production'
      - name: Build
        run: pnpm build
        env:
          NODE_ENV: 'production'
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Azure Static Web Apps Workflow Example

For those deploying to **Azure Static Web Apps**, here’s an alternative workflow.

```yaml
name: Build and Deploy

on:
  push:
    branches: ['main']
  pull_request:
    branches: ['main']

jobs:
  build:
    runs-on: ubuntu-latest
    name: Build

    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - name: Cache Assets
        id: cache-assets
        uses: actions/cache@v4
        with:
          path: .cached-assets
          key: ${{ runner.os }}-cached-assets
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false
      - name: Use Node.js 22x
        uses: actions/setup-node@v3
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm i
      - name: Build
        run: pnpm build
      - name: Run linter
        run: pnpm lint
      - name: Run unit tests
        run: pnpm test:unit

  deploy:
    if: github.event_name == 'push'
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      - name: Cache Assets
        id: cache-assets
        uses: actions/cache@v4
        with:
          path: .cached-assets
          key: ${{ runner.os }}-cached-assets
      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10
          run_install: false
      - name: Use Node.js 22x
        uses: actions/setup-node@v3
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm i
        env:
          NODE_ENV: 'production'
      - name: Build
        run: pnpm build
        env:
          NODE_ENV: 'production'
      - name: Deploy
        id: deploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          skip_app_build: true
          app_location: 'dist'
          api_location: ''
```

### Wrapping Up

By setting up these GitHub Actions workflows, you can fully automate the build and deployment process for your Astro websites.

- GitHub Pages is great for simple, free static site hosting.
- Azure Static Web Apps is a better choice if you need additional cloud features and the ability to run server-side code.

I hope these examples help you streamline your deployment process!
