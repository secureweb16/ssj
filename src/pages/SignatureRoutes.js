import React, { useEffect, useState } from 'react'; // Added useState import
import BannerImage from '../assets/images/signature-routes-banner.jpg';
import PageBanner from '../components/PageBanner';
import TitleWithText from '../components/TitleWithText';
import SignatureRoutesList from '../components/SignatureRoutesList';
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
        description="Explore options below and get in touch with our team to finalise details."
      />
      <SignatureRoutesList cars={cars}/> 
      <CustomerReviews />
    </>
  );
}

export default App;
