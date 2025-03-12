import React, { useEffect, useState } from "react";
import BannerImage from '../assets/images/vehicle-index-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import VehicleList from '../components/VehicleList';
import CustomerReviews from '../components/CustomerReviews';
import config from '../config'; 

function App() {
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
        description="Explore options below and get in touch with our team to finalise details."
      />
      {loading ? (
        <div className="car-loading">
            <p>Loading cars...</p>
        </div>
        
      ) : (
        <VehicleList cars={cars} /> 
      )}
      <CustomerReviews />
    </>
  );
}

export default App;
