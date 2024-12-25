import fs from 'fs';

fs.unlinkSync('./docs/sitemap-index.xml');
fs.renameSync('./docs/sitemap-0.xml', './docs/sitemap.xml');
