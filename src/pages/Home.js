import React, { useEffect, useState } from "react";
import HomeBanner from '../components/HomeBanner';
import TitleWithText from '../components/TitleWithText';
import CarServicesSlider from '../components/CarServicesSlider';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import CustomerReviews from '../components/CustomerReviews';
import BookingPopup from '../components/BookingPopup';





function App() {
  const[cars,setCars] = useState([])
console.log(cars,"cars")
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cars");
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    useEffect(() => {
      fetchCars();
    }, []);

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
      <HomeVehicleOptions cars = {cars} />
      <CustomerReviews />
      
            
    </>
  );
}

export default App;
