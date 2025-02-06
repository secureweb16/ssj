import React from "react";
import BannerImage from '../assets/images/vehicle-index-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import VehicleList from '../components/VehicleList';
import CustomerReviews from '../components/CustomerReviews';

function App() {
  return (
    <>
      <PageBanner bannerimage={BannerImage} 
        title={(
          <>
            our <strong>vehicle fleet</strong>
          </>
        )} 
      />  
      <TitleWithText
        title={(
          <>
            Book Luxury Transport Across London For Any Occasion Or Group
          </>
        )}
        description="Explore options below and get in touch with our team to finalize details."
      />
      <VehicleList /> 
      <CustomerReviews />
    </>
  );
}

export default App;
