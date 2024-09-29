import fs from 'fs';

fs.unlinkSync('./dist/sitemap-index.xml');
fs.renameSync('./dist/sitemap-0.xml', './dist/sitemap.xml');
