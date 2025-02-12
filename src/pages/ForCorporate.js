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
          description="Lorem ipsum odor amet, consectetuer adipiscing elit. Nec libero class ipsum eleifend netus lectus urna erat. Montes sed accumsan primis; malesuada ullamcorper suscipit dapibus. Lacinia quis vestibulum vivamus dignissim morbi; commodo at scelerisque. Vehicula dui cursus, vehicula tristique cras mauris turpis tempus. Facilisis accumsan pulvinar tortor, fames pharetra amet."
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
