import React, { useEffect, useState } from 'react'; // Added useState import
import BannerImage from '../assets/images/Rectangle_1.jpg';
import PageBanner2 from '../components/PageBanner2';
import TitleWithText from '../components/TitleWithText';
import SignatureRoutesList from '../components/SignatureRoutesList';
import CustomerReviews from '../components/CustomerReviews';
import config from '../config';
import HomeSignatureRoutesPackages from '../components/HomeSignatureRoutesPackages';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import EffortlessBooking from '../assets/images/about-banner.jpg'
import MobileDevice from '../assets/images/MobileDevice.png'
import TitleWithText2 from '../components/TitleWithText2';
function App() {

  const [cars, setCars] = useState([]);
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
      <PageBanner2 bannerimage={BannerImage}
        title={(
          <>

            book luxury transfer in London for

          </>
        )}
        title2={(<> upcoming events this Spring and Summer</>)}
      />
      <TitleWithText2
        title={(
          <>
            WE OFFER LUXURY AIRPORT BLACK CAR TRANSFER OPTIONS FOR HEATHROW AIRPORT, LONDON CITY AIRPORT, GATWICK AIRPORT, AND BIGGIN HILL AIRPORT  </>
        )}
        description="Explore options below and get in touch with our team to finalize details."
        description2="Click on the airport options below to book:"
      />
      <HomeSignatureRoutesPackages cars={cars} viewCta={false} viewCtaBooking={true} />


      <div className="effortless-booking d-flex align-center overlay position-relative color-light mb-90">
        <img className="cover" src={EffortlessBooking} />
        <div className="wrapper-block position-absolute w-100 h-100">
          <div className="plr-100 h-100 d-flex align-center justify-end">
            <div className="summary-block">
              <div className='h2 fs-24 mb-20 fw-200'><span className='fw-300'>effortless booking,</span> the latest models, luxury service.</div>
              <div className='text-block'><p className='mb-0 font-16'>Experience the ultimate in comfort and sophistication with our luxury black car transport service to and from London’s major airports, including Heathrow, Gatwick, Stansted, Luton, and London City Airport. Our professional chauffeurs ensure a seamless and stress-free journey between the airport and central London, offering punctual, discreet, and high-end transportation tailored to your schedule. Whether you're a business traveler or arriving for a special occasion, our fleet of premium vehicles guarantees a first-class travel experience. Book your London airport transfer today and enjoy a smooth, stylish ride with a trusted luxury car service that prioritizes reliability, comfort, and elegance.</p></div>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="car-loading">
          <p>Loading cars...</p>
        </div>

      ) : (
        <HomeVehicleOptions cars={cars} />
      )}
      {/* <SignatureRoutesList cars={cars}/>  */}
      <div className="booking-process text-with-image bg-gray sm-pt-60 pt-20">
        <div className="plr-100">
          <div className='grid-blocks d-grid d-column-2 gap-10'>
            <div className='grid-block left-block d-flex align-center'>
              <div className='summary-block'>
                <h2 className='mb-30'>a simple, non-app booking process, with discretion and security as our priority</h2>
                <div className="text-block">
                  <ul className='d-grid gap-10 font-18'>
                    <li><p className='mb-0 font-18'>Send through a request here.</p></li>
                    <li><p className='mb-0 font-18'>Connect with ou team via email or WhatsApp.</p></li>
                    <li><p className='mb-0 font-18'>Our team will fulfill the details of your request from your preferred contact method with the minimum personal data necessary. </p></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='grid-block right-block'>
              <div className='image-block'>
                <img src={MobileDevice} alt='' className='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerReviews />
    </>
  );
}

export default App;
