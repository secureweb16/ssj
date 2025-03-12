import React, { useEffect, useState } from "react";
import BannerImage from '../assets/images/for-corporate-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import CustomerReviews from '../components/CustomerReviews';
import ForCorporateIpadImage from '../components/ForCorporateIpadImage';
import config from '../config'; 

function ForCorporate() {
  const[cars,setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCars = async () => {
    try {
      const response = await fetch(`${config.api.baseURL}${config.api.carsEndpoint}`);
      const data = await response.json();
      if (Array.isArray(data.cars)) {
        setCars(data.cars);
      } else {
        console.error("Cars data is not an array", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);
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
          description="SSJ Luxury Transport has an exclusive, discreet fleet of updated luxury vehicles for a level of service and reliability beyond what apps provide. Our customer service team is available to make private transport an enjoyable and seamless experience for your business. Get in touch with us for rates and personalised organisation for your needs."
          buttonurl="/about"
          buttontext="Contact us"
        />
      </div>     
      <ForCorporateIpadImage />
      <CustomerReviews />
      <HomeSignatureRoutesPackages cars={cars} />    
      {loading ? (
        <div className="car-loading">
            <p>Loading cars...</p>
        </div>
        
      ) : (
        <HomeVehicleOptions cars={cars} /> 
      )}          
    </>
  );
}

export default ForCorporate;
