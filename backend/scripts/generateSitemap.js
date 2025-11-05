// scripts/generateSitemap.js
const fs = require("fs");
const path = require("path");
const { SitemapStream, streamToPromise } = require("sitemap");
const axios = require("axios");

(async () => {
  try {
    // ✅ Use your local backend base URL
    const domain = "http://localhost:5173"; // Your React local URL

    // ✅ Static routes from your React Router
    const staticRoutes = [
      "/",
      "/signature-routes",
      "/vehicle",
      "/about",
      "/for-corporate",
      "/airport-transport"
    ];

    // ✅ Dynamic routes (optional)
    let dynamicRoutes = [];
    try {
      const { data } = await axios.get("http://localhost:5000/api/services");
      dynamicRoutes = data.map((s) => `/service/${s.slug || s._id}`);
    } catch (err) {
      console.warn("⚠️ Skipping dynamic routes:", err.message);
    }

    // ✅ Combine static + dynamic
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // ✅ Generate sitemap
    const sitemapStream = new SitemapStream({ hostname: domain });
    allRoutes.forEach((url) => sitemapStream.write({ url }));
    sitemapStream.end();

    const sitemap = await streamToPromise(sitemapStream).then((d) =>
      d.toString()
    );

    // ✅ Save to public folder
    const publicDir = path.join(__dirname, "../public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);

    console.log("✅ Sitemap generated successfully at:", path.join(publicDir, "sitemap.xml"));
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
})();
