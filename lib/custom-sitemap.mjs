import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';

const customSitemap = (site, distFolder, minDate) => {
  return sitemap({
    filter: (page) =>
      !page.match(/\/posts\/1\/$/) && !page.match(/\/category\/(.+)\/1\/$/),
    serialize: (item) => {
      const filePathSequence = item.url
        .replace(site, '')
        .split('/')
        .filter(Boolean);
      const filePath = path.join(
        import.meta.dirname,
        '..',
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
