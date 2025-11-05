const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const axios = require('axios');

const router = express.Router();

router.get('/sitemap.xml', async (req, res) => {
  try {
    const domain = 'https://blackstoneconcierge.com';

    const { data: services } = await axios.get(`${domain}/api/services`);

    const staticRoutes = [
      { url: '/', changefreq: 'daily', priority: 1.0 },
      { url: '/about', changefreq: 'monthly', priority: 0.8 },
    ];

    const dynamicRoutes = services.map(service => ({
      url: `/service/${service._id}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));

    const sitemap = new SitemapStream({ hostname: domain });
    res.header('Content-Type', 'application/xml');
    dynamicRoutes.concat(staticRoutes).forEach(link => sitemap.write(link));
    sitemap.end();

    const xml = await streamToPromise(sitemap);
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation failed:', error.message);
    res.status(500).end();
  }
});

module.exports = router;
