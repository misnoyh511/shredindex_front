/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://shredindex.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  outDir: './public', // Explicitly set output directory
  generateIndexSitemap: true
};
