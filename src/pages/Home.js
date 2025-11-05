import React, { useEffect, useState } from "react";
import HomeBanner from '../components/HomeBanner';
import TitleWithText from '../components/TitleWithText';
import CarServicesSlider from '../components/CarServicesSlider';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
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
      <HomeBanner cars={cars} />
      <TitleWithText
        title={
          <>
            Welcome To Ssj Luxury Transport
            <br />
            London’s Most Discretionary Private Car Service
          </>
        }
        description="Whether individually or corporate, work with our decades-experienced team in organising your transport."
      />
      <CarServicesSlider cars={cars} />
      <HomeSignatureRoutesPackages cars={cars} />
      {/* Show loading indicator while fetching cars */}
      {loading ? (
        <div className="car-loading">
            <p>Loading cars...</p>
        </div>
        
      ) : (
        <HomeVehicleOptions cars={cars} /> 
      )}
      <CustomerReviews />
    </>
  );
}

export default App;
