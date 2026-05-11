const express = require("express");
const router = express.Router();

const { SitemapStream, streamToPromise } = require("sitemap");

router.get("/sitemap.xml", async (req, res) => {

    try {

        const sitemap = new SitemapStream({
            hostname: "ssjluxurytransport.com",
        });


        // ROUTES WITH SEO SETTINGS
        const routes = [
            {
                url: "/",
                changefreq: "daily",
                priority: 1.0,
            },
            {
                url: "/signature-routes",
                changefreq: "weekly",
                priority: 0.9,
            },
            {
                url: "/vehicle",
                changefreq: "weekly",
                priority: 0.9,
            },

            {
                url: "/about",
                changefreq: "monthly",
                priority: 0.7,
            },
            {
                url: "/for-corporate",
                changefreq: "monthly",
                priority: 0.8,
            },
            {
                url: "/airport-transport",
                changefreq: "weekly",
                priority: 0.9,
            },
            {
                url: "/events-around-london",
                changefreq: "weekly",
                priority: 0.8,
            },
        ];

        routes.forEach((route) => {
            sitemap.write(route);
        });

        // const Car = require("../models/Car");
        // const cars = await Car.find();

        // cars.forEach((car) => {
        //     sitemap.write({
        //         url: `/vehicle/${car._id}`,
        //         changefreq: "daily",
        //         priority: 0.9,
        //     });
        // });

        sitemap.end();

        const xmlData = await streamToPromise(sitemap);

        res.header("Content-Type", "application/xml");

        res.send(xmlData.toString());

    } catch (error) {

        console.error(error);

        res.status(500).end();
    }
});

module.exports = router;