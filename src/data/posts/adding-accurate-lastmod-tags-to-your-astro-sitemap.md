---
title: Adding accurate lastmod tags to your Astro sitemap
description: This post explains how to include accurate lastmod tags in an Astro sitemap by reading page update times during build, using a simple custom integration
excerpt: This post explains how to include accurate lastmod tags in an Astro sitemap by reading last update times from your pages during the build process. It covers a simple custom integration and offers tips for keeping the build efficient, even on larger sites.
categories:
  - astro
date: 2025-04-19
lastUpdate: 2025-04-19
image:
  href: ../../assets/posts/adding-accurate-lastmod-tags-to-your-astro-sitemap/person-with-mask.png
  alt: A person wearing a futuristic mask and looking at multiple screens
---

The **lastmod** tag is a very important element in an <a href="https://yoast.com/what-is-an-xml-sitemap-and-why-should-you-have-one/" target="_blank" rel="noreferrer">XML sitemap</a>. It indicates the last time a page was updated and helps the search engines understand which pages have fresh content and prioritize crawling accordingly. So, it makes sense that we want to include the **lastmod** tag even on static websites like the ones built with Astro.

Indeed, Astro provides an <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/" target="_blank" rel="noreferrer">integration plugin</a> which generates a sitemap upon building of the website. However, Astro has no way to automatically determine when a page was last updated. Even the docs provide only an example which assigns a specific datetime to the **lastmod** tag of every page.

In this post, we’re going to go through a step-by-step process on how we can provide an accurate **lastmod** datetime to an Astro sitemap.

### 1. Determine when a page was last updated

This depends on the nature of the page. Let's take this post as an example. It makes sense that the publish date is considered the date it was last updated. But the [blog](/blog/) page contains a series of posts. For that page, it makes sense to select the publish date of the most recent post.

### 2. Store last update time in the page document

After you calculate the last update time, you can store it in any form inside the page. For example, as an attribute on the body element.

```astro title="src/pages/index.astro"
<html>
  <head> ... </head>
  <body data-last-update-time={lastUpdateTime.toISOString()}> ... </body>
</html>
```

### 3. Create a custom sitemap integration

This step involves creating a custom sitemap integration by extending the existing integration provided by Astro.

```js title="custom-sitemap.mjs"
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

const customSitemap = (site, distFolder, minDate) => {
  return sitemap({
    serialize: (item) => {
      const filePathSequence = item.url
        .replace(site, '')
        .split('/')
        .filter(Boolean);
      const filePath = path.join(
        import.meta.dirname,
        distFolder,
        ...filePathSequence,
        'index.html',
      );

      const fileContent = fs.readFileSync(filePath).toString();
      const lastUpdateTime = fileContent.match(
        /data-last-update-time="(.+?)"/,
      )?.[1];

      const lastmod = lastUpdateTime ? new Date(lastUpdateTime) : minDate;
      item.lastmod =
        lastmod > minDate ? lastmod.toISOString() : minDate.toISOString();

      return item;
    },
  });
};

export default customSitemap;
```

The way it works is by finding the generated page in the dist folder, reading its content, parsing the last update time and then assigning it to the sitemap item. It requires the following parameters in order to function properly:

- `site`: The base URL of your site (same as what's set in `astro.config.mjs`).
- `distFolder`: The name of the folder where the site is built into (e.g. `dist`).
- `minDate`: The minimum datetime that a page may have as a last update time.

**A caveat of this approach** is that it involves reading and parsing every HTML page during the build process, which can slow things down on large websites. To optimize performance, you can consider a few strategies:

- **Whitelist specific pages** and only read the last update time for those.
- **Cache the last update times** for other pages in a separate file and read from there instead of parsing HTML each time.

### 4. Use the custom sitemap integration in astro.config.mjs

The final step is to use the custom sitemap integration, we created in the previous step, in the configuration file.

```js title="astro.config.mjs"
import customSitemap from './custom-sitemap.mjs';

export default defineConfig({
  site: '<site URL>',
  integrations: [customSitemap('<site URL>', 'dist', new Date('2025-04-19'))],
});
```

### Conclusion

Even though there is no out of the box way to add accurate **lastmod** tags in an Astro sitemap, we are able to work things out and provide them with an easy custom solution.

I hope you find this useful and if you're an Astro enthusiast like me, please make sure to check out the rest of the [Astro-related posts](/blog/category/astro/) in this blog.
