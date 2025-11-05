import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import HeroBanner from '../assets/images/AirportTransportBanner.jpg'
import airportMap from '../assets/images/airportMap.png'
import EffortlessBooking from '../assets/images/EffortlessBooking.jpg'
import MobileDevice from '../assets/images/MobileDevice.png'
import vehicleImage from '../assets/images/vehicleImage.jpg'
import { Link } from 'react-router-dom'
import CustomerReviews from '../components/CustomerReviews';
import HomeVehicleOptions from '../components/HomeVehicleOptions';
import config from '../config';

function AirportTransport() {
    const airports = [
        {
            name: 'HEATHROW',
            image: airportMap,
        },
        {
            name: 'LONDON CITY',
            image: airportMap,
        },
        {
            name: 'GATWICK',
            image: airportMap,
        },
        {
            name: 'BIGGIN HILL',
            image: airportMap,
        },
    ];

    const vehicles = [
        {
            name: 'Mercedes S Class',
            model: '(2022 model + above)',
            image: vehicleImage,
        },
        {
            name: 'BMW 7 Series',
            model: '(2021 model + above)',
            image: vehicleImage,
        },
        {
            name: 'Audi A8',
            model: '(2022 model + above)',
            image: vehicleImage,
        },
        {
            name: 'Range Rover',
            model: '(2023 model)',
            image: vehicleImage,
        },
        {
            name: 'Lexus LS',
            model: '(2021 model)',
            image: vehicleImage,
        },
        {
            name: 'Bentley Flying Spur',
            model: '(2023 model)',
            image: vehicleImage,
        },
        {
            name: 'Range Rover',
            model: '(2023 model)',
            image: vehicleImage,
        },
        {
            name: 'Lexus LS',
            model: '(2021 model)',
            image: vehicleImage,
        },
        {
            name: 'Bentley Flying Spur',
            model: '(2023 model)',
            image: vehicleImage,
        }
    ]


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
            <div className="airport-transport-banner hero-banner d-flex align-center top-overlay sm-bottom-overlay position-relative color-light">
                <img className="cover" src={HeroBanner} />
                <div className="wrapper-block position-absolute w-100 h-100">
                    <div className="plr-100 container h-100">
                        <div className="summary-block d-flex justify-center align-center h-100">
                            <h1 className='fs-24'>book luxury airport transfer in London with SSJ Luxury Transport</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="airport-transport-page airport-option-section sm-py-60 py-80">
                <div className="plr-100">
                    <div className='summary-block'>
                        <div className='h6 center text-uppercase font-14 d-flex flex-column align-items-center fw-400'>WE OFFER LUXURY AIRPORT BLACK CAR TRANSFER OPTIONS FOR HEATHROW AIRPORT, LONDON CITY AIRPORT, GATWICK AIRPORT, AND BIGGIN HILL AIRPORT</div>
                        <div className='divider'></div>
                        <div className='text-block center'>
                            <p className='mb-15 font-16'>Explore options below and get in touch with our team to finalize details.</p>
                            <p className='font-16'>Click on the airport options below to book:</p>
                        </div>
                    </div>
                    <div className='airport-list-blocks d-grid d-column-4'>
                        {airports.map((airport, index) => (
                            <div className='airport-list-block center'>
                                <img src={airport.image} alt={airport.name} className='airport-map-image' />
                                <div className='airport-name text-uppercase font-12 fw-400 text-center section-title'>{airport.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <div className="effortless-booking d-flex align-center overlay position-relative color-light">
                <img className="cover" src={EffortlessBooking} />
                <div className="wrapper-block position-absolute w-100 h-100">
                    <div className="plr-100 h-100 d-flex align-center">
                        <div className="summary-block">
                            <div className='h2 fs-24 mb-20 fw-200'><span className='fw-300'>effortless booking,</span> the latest models, luxury service.</div>
                            <div className='text-block'><p className='mb-0 font-16'>Experience the ultimate in comfort and sophistication with our luxury black car transport service to and from London’s major airports, including Heathrow, Gatwick, Stansted, Luton, and London City Airport. Our professional chauffeurs ensure a seamless and stress-free journey between the airport and central London, offering punctual, discreet, and high-end transportation tailored to your schedule. Whether you're a business traveler or arriving for a special occasion, our fleet of premium vehicles guarantees a first-class travel experience. Book your London airport transfer today and enjoy a smooth, stylish ride with a trusted luxury car service that prioritizes reliability, comfort, and elegance.</p></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="explore-our-vehicles sm-pt-60 pt-100">
                {/* <div className='plr-100'>
                    <div className='text-uppercase font-12 plr-100 fw-400 text-center section-title'>EXPLORE OUR VEHICLE OPTIONS</div>
                </div>
                <div className="our-vehicles-slider sm-pt-30 pt-60">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        loop={true}
                        slidesPerView={1.5}
                        // autoplay={{ delay: 3500, disableOnInteraction: false }}
                        // speed={800}
                        spaceBetween={5}
                        pagination={{
                            el: '.vehicle-slider-pagination .swiper-pagination',
                            clickable: true,
                        }}

                        breakpoints={{
                            576: {
                            slidesPerView: 2.4,
                            spaceBetween: 5,
                            },
                            769: {
                            slidesPerView: 3.6,
                            spaceBetween: 5,
                            },
                            1025: {
                            slidesPerView: 4.6,
                            spaceBetween: 5,
                            },
                            1441: {
                            slidesPerView: 4.4,
                            spaceBetween: 5,
                            },
                        }}
                        className="vehicles-swiper"
                    >
                        {vehicles.map((vehicle, index) => (
                            <SwiperSlide key={index}>
                                <div className="vehicle-block">
                                    <div className="vehicle-image">
                                        <img src={vehicle.image} alt={vehicle.name} />
                                    </div>
                                    <div className="vehicle-details">
                                        <div className="h2 vehicle-name mb-10">{vehicle.name}</div>
                                        <div className="h6 vehicle-model">{vehicle.model}</div>
                                        <Link to="/" className="readmore">
                                            view more
                                        </Link>
                                        <div className="button-block">
                                            <Link to="/" className="book-now">
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='vehicle-slider-pagination'>
                    <div class="swiper-pagination"></div>
                </div> */}
                {loading ? (
                    <div className="car-loading">
                        <p>Loading cars...</p>
                    </div>

                ) : (
                    <HomeVehicleOptions cars={cars} />
                )}
            </div>

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

export default AirportTransport;
