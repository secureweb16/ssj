import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";

const useSEO = (manualSlug) => {
  const location = useLocation();
  const [seo, setSeo] = useState(null);
  
  // Use manualSlug if provided, otherwise use current pathname
  const slug = manualSlug !== undefined ? manualSlug : location.pathname;

  useEffect(() => {
    if (!slug) return;

    const fetchSEO = async () => {
      try {
        // If it's the root, use 'home', otherwise strip the leading slash
        const normalizedSlug = (slug === "/" || slug === "") ? "home" : (slug.startsWith("/") ? slug.substring(1) : slug);
        
        const res = await fetch(
          `${config.api.baseURL}${config.api.metaDataEndpoint}/slug/${normalizedSlug}`
        );


        const data = await res.json();


        if (data.metaData) {
          setSeo(data.metaData);
        } else {
          setSeo(null); // Clear if not found
        }
      } catch (err) {
        console.error("SEO error", err);
        setSeo(null);
      }
    };

    fetchSEO();
  }, [slug]);

  return seo;
};

export default useSEO;
