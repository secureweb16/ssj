import React from "react";
import BannerImage from '../assets/images/about-banner.jpg';
import PageBanner from '../components/PageBanner';
import About from '../components/About';
import CustomerReviews from '../components/CustomerReviews';
import { Helmet } from "react-helmet-async";
import useSEO from "../hooks/useSEO";
import SEO from "../components/SEO";

function App() {
  const seo = useSEO();


  return (

    <>
       <SEO seo={seo} />
      <PageBanner bannerimage={BannerImage}
        title={(
          <>
            about <strong>SSJ</strong>
          </>
        )}
      />
      <About />
    </>
  );
}

export default App;
