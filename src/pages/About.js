import React from "react";
import BannerImage from '../assets/images/about-banner.jpg';
import PageBanner from '../components/PageBanner';
import About from '../components/About';
import CustomerReviews from '../components/CustomerReviews';

function App() {
  return (
    <>
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
