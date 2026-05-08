import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ seo }) => {

  if (!seo) return null;

  return (
    <Helmet>

      <title>{`${seo.title} | SSJ`}</title>

      <meta name="description" content={seo.description} />

      <meta property="og:title" content={seo.title} />

      <meta property="og:description" content={seo.description} />

      <meta property="og:image" content={seo.image} />

      <meta property="og:url" content={seo.page_url} />

      <link rel="canonical" href={seo.page_url} />

    </Helmet>
  );
};

export default SEO;