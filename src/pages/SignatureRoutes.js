import React from "react";
import BannerImage from '../assets/images/signature-routes-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import SignatureRoutesList from '../components/SignatureRoutesList';
import CustomerReviews from '../components/CustomerReviews';

function App() {
  return (
    <>
      <PageBanner bannerimage={BannerImage} 
        title={(
          <>
            explore <strong>signature routes</strong>
          </>
        )} 
      />  
      <TitleWithText
        title={(
          <>
            Book Frequent London Transport Routes In Luxury At Competitive Prices
          </>
        )}
        description="Explore options below and get in touch with our team to finalize details."
      />
      <SignatureRoutesList /> 
      <CustomerReviews />
    </>
  );
}

export default App;
