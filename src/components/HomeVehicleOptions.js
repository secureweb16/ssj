import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import CarInfoPopup from '../components/CarInfoPopup';
import { Link } from 'react-router-dom';
import config from '../config'; 

function HomeVehicleOptions({ cars }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const vehicleTypes = Array.isArray(cars) && cars.length > 0 ? [...new Set(cars.map(car => car.type))] : [];
    return (
        <div className='vehicle-options pb-90'>
            <div className='vehicle-options-inner'>
                <p className='text-uppercase font-12 plr-100 fw-400 text-center section-title'>Explore Our Vehicle Options</p>
                <div className='tabs-style pt-40'>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        {vehicleTypes.map((type, index) => (
                            <TabPanel key={index} header={type+''}>
                                <div className="slider_wrapper position-relative pt-50">
                                    <Swiper
                                        modules={[Navigation, A11y, Scrollbar]}
                                        spaceBetween={5}
                                        slidesPerView={3.5}
                                        navigation={false}
                                        scrollbar={{ draggable: true }}
                                        breakpoints={{
                                            320: { slidesPerView: 1.2, spaceBetween: 5 },
                                            769: { slidesPerView: 3.5, spaceBetween: 5 },
                                            1025: { slidesPerView: 4.3, spaceBetween: 5 },
                                        }}
                                    >
                                        {/* {cars.filter(car => car.type === type).map((car, carIndex, carArray) => {
                                            console.log('type',type);
                                            console.log(' car.type', car.type);
                                            const nextCar = carArray[carIndex + 1] || carArray[0];
                                            return (
                                                <SwiperSlide key={car._id}>
                                                    <div className='common-vehicle-option position-relative'>
                                                        <div className='common-vehicle-image position-relative'> */}
                                                            {/* <img src={require(`../assets/images/${car.image}`)} alt={car.name} className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" /> */}
                                                            {/* <img src={`${config.api.baseURL}${car.image.replace(/\\/g, '/')}`}  alt={car.car_name} className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                                        </div>
                                                        <div className='common-vehicle-content'>
                                                            <h6>{car.company_name}&nbsp;<strong>{car.car_name}</strong></h6> */}
                                                            {/* <p className='font-12 text-uppercase letter-spacing-15'>({car.modal} model + above)</p> */}
                                                            {/* <Link to='/signature-routes' className='font-12'>view more</Link>
                                                        </div>
                                                        <div className='vehicle-option-bookbtn'>
                                                            <CarInfoPopup car={car} nextCar={nextCar} allCars={cars} />
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })} */}

                                        {cars.filter(car => car.type === type).map((car, carIndex, carArray) => {
                                            let nextCar;
                                            if (type === 'CARS') {
                                                const suvs = cars.filter((nextCarItem) => nextCarItem.type === 'SUVS');
                                                const nextSuv = suvs[0]; 
                                                nextCar = nextSuv || carArray[0];
                                            } else if (type === 'SUVS') {
                                                const vans = cars.filter((nextCarItem) => nextCarItem.type === 'VANS');
                                                const nextVan = vans[0];
                                                nextCar = nextVan || carArray[0];
                                            } else if (type === 'VANS') { 
                                               nextCar = carArray[carIndex + 1]; 
                                            } else {
                                               nextCar = carArray[carIndex + 1] || carArray[0];
                                            }
                                            return (
                                                <SwiperSlide key={car._id}>
                                                    <div className='common-vehicle-option position-relative'>
                                                        <div className='common-vehicle-image position-relative'>
                                                            <img src={`${config.api.baseURL}${car.image.replace(/\\/g, '/')}`} alt={car.car_name} className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                                        </div>
                                                        <div className='common-vehicle-content'>
                                                            <h6>{car.company_name}&nbsp;<strong>{car.car_name}</strong></h6>
                                                            <Link to='/signature-routes' className='font-12'>view more</Link>
                                                        </div>
                                                        <div className='vehicle-option-bookbtn'>
                                                           <CarInfoPopup car={car} nextCar={nextCar} allCars={cars} />
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>
                            </TabPanel>
                        ))}
                    </TabView>
                </div>
            </div>
        </div>
    );
}

export default HomeVehicleOptions;