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
import useSEO from '../hooks/useSEO';
import SEO from '../components/SEO';
function App() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
const seo = useSEO();

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
    <> <SEO seo={seo} />
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
            <div className="summary-block-2 text-end">
              <div className='w-100 text-end '>
              <div className='h2 fs-24 mb-35 fw-200 w-100 text-end '><span className='fw-300'>effortless booking,</span> the latest models, <br/>luxury service.</div>
            </div>
              <div className='text-block w-max-556'><p className='mb-0 font-16'>Experience the ultimate in comfort and sophistication with our luxury black car transport service for events and journeys beyond London. Our professional chauffeurs provide seamless, stress-free travel to destinations across the UK, delivering punctual, discreet, and high-end transportation tailored to your schedule. Whether you're attending a corporate event, a wedding, or a special occasion, our fleet of premium vehicles ensures a first-class travel experience. Book your luxury car service today and enjoy a smooth, stylish ride with a trusted provider that prioritizes reliability, comfort, and elegance wherever your plans take you.</p></div>
            
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
