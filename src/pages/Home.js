import React from "react";
import HomeBanner from '../components/HomeBanner';
import TitleWithText from '../components/TitleWithText';
import CarServicesSlider from '../components/CarServicesSlider';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import CustomerReviews from '../components/CustomerReviews';
import BookingPopup from '../components/BookingPopup';





function App() {
  return (
    <>
      <HomeBanner />  
      <TitleWithText
        title={
          <>
            Welcome To
            <br />
            London’s Most Discretionary Private Car Service
          </>
        }
        description="Whether individually or corporate, work with our decades-experienced team in organizing your transport."
      />
      {/* <BookingPopup />   */}
      <CarServicesSlider />
      <HomeSignatureRoutesPackages />    
      <HomeVehicleOptions />
      <CustomerReviews />
      
            
    </>
  );
}

export default App;
