// scripts/generateSitemap.js
const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");
const axios = require("axios");

const generateSitemap = async () => {
    try {
        // ✅ Site Domain
        const domain = "https://ssjluxurytransport.com";

        // ✅ Static routes from your React Router
        const staticRoutes = [
            "/",
            "/signature-routes",
            "/vehicle",
            "/about",
            "/for-corporate",
            "/airport-transport",
            "/events-around-london"
        ];

        // ✅ Dynamic routes
        // let dynamicRoutes = [];
        // try {
        //     // Using the production API URL
        //     const { data } = await axios.get("https://api.ssjluxurytransport.com/api/cars/frontend");
        //     const cars = data.cars || (Array.isArray(data) ? data : []);
        //     dynamicRoutes = cars.map((car) => `/vehicle/${car._id}`);
        // } catch (err) {
        //     console.warn("⚠️ Skipping dynamic routes:", err.message);
        // }

        // ✅ Combine static + dynamic
        const allRoutes = [...staticRoutes]; 

        // ✅ Generate sitemap
        const sitemapStream = new SitemapStream({ hostname: domain });
        allRoutes.forEach((url) => sitemapStream.write({ url, changefreq: 'weekly', priority: 0.8 }));
        sitemapStream.end();

        const sitemap = await streamToPromise(sitemapStream).then((d) =>
            d.toString()
        );

        // ✅ Save to THE ROOT public folder
        const rootPublicDir = path.join(__dirname, "../../public");
        if (fs.existsSync(rootPublicDir)) {
            fs.writeFileSync(path.join(rootPublicDir, "sitemap.xml"), sitemap);
            console.log("✅ Sitemap saved to public/");
        }

        // ✅ Also save to THE build folder
        const rootBuildDir = path.join(__dirname, "../../build");
        if (fs.existsSync(rootBuildDir)) {
            fs.writeFileSync(path.join(rootBuildDir, "sitemap.xml"), sitemap);
            console.log("✅ Sitemap saved to build/");
        }

        // ✅ Also save to THE LIVE HTML folder (for production)
        const liveHtmlDir = "/var/www/html";
        if (fs.existsSync(liveHtmlDir)) {
            fs.writeFileSync(path.join(liveHtmlDir, "sitemap.xml"), sitemap);
            console.log("✅ Sitemap saved to /var/www/html/");
        }

        console.log("✅ Sitemap generation complete.");
    } catch (err) {
        console.error("❌ Error generating sitemap:", err);
    }
};

// Export the function
module.exports = generateSitemap;

// Run it if this script is executed directly
if (require.main === module) {
    generateSitemap();
}


