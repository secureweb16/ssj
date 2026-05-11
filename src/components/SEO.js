import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ssjluxurytransport.com";

/**
 * Normalise a URL so it never has a trailing slash (except the root "/").
 * This prevents the canonical conflict: /vehicle vs /vehicle/
 */
const normaliseUrl = (url) => {
  if (!url) return url;
  // Remove trailing slash unless it's just the domain root
  return url.replace(/\/+$/, "") || url;
};

const SEO = ({ seo }) => {
  const defaultTitle = "";
  const defaultDescription = "";

  const title = seo?.title ? `${seo.title} | SSJ` : defaultTitle;
  const description = seo?.description || defaultDescription;

  // Build canonical URL, preferring the DB-stored page_url.
  // Fall back to SITE_URL + current pathname (safe for SSR/prerender).
  const rawUrl =
    seo?.page_url ||
    (typeof window !== "undefined"
      ? `${SITE_URL}${window.location.pathname}`
      : SITE_URL);

  // Strip trailing slash to get a single canonical form
  const canonicalUrl = normaliseUrl(rawUrl);

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo?.title || defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {seo?.image && (
        <meta property="og:image" content={seo.image} />
      )}

      {/* Single, normalised canonical — fixes the /vehicle vs /vehicle/ conflict */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;