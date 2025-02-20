import React from "react";

import BannerImage from '../assets/images/for-corporate-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import CustomerReviews from '../components/CustomerReviews';
import ForCorporateIpadImage from '../components/ForCorporateIpadImage';

function ForCorporate() {
  return (
    <>
      <PageBanner bannerimage={BannerImage} 
        title={(
          <>
            for <strong>corporate</strong>
          </>
        )} 
      />
      <div className="forcorporate-titletext">
        <TitleWithText
          title={
            <>
              Work Closely With Our Team For Discretion And Flawless Logistics For Your Company
            </>
          }
          description="SSJ Luxury Transport has an exclusive, discreet fleet of updated luxury vehicles for a level of service and reliability beyond what apps provide. Our customer service team is available to make private transport an enjoyable and seamless experience for your business. Get in touch with us for rates and personalized organization for your needs."
          buttonurl="#"
          buttontext="Contact us"
        />
      </div>     
      <ForCorporateIpadImage />
      <CustomerReviews />
      <HomeSignatureRoutesPackages />    
      <HomeVehicleOptions />             
    </>
  );
}

export default ForCorporate;
