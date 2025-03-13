import React, { useState } from 'react';
import CarInfoPopup from '../components/CarInfoPopup';
import config from '../config'; 
import { TabView, TabPanel } from 'primereact/tabview';
import {Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import BookingPopup from '../components/BookingPopup';
function VehicleList({ cars }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const vehicleTypes = Array.isArray(cars) && cars.length > 0 ? [...new Set(cars.map(car => car.type))] : [];
    return (
        <div className='vehicle-options vehicle-list-outer pb-90'>
            <div className='vehicle-options-inner plr-100'>
                <p className='text-uppercase font-12 fw-400 text-center section-title'>Explore Our Vehicle Options</p>
                <div className='tabs-style pt-40'>
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        {vehicleTypes.map((vehicleType, index) => (
                            <TabPanel header={vehicleType} key={index}>
                                <div className='vhicle-list-wrap position-relative pt-50'>
                                    {cars.filter(car => car.type === vehicleType).map((car, carIndex, carArray) => {
                                        let nextCar;
                                        if (vehicleType === 'CARS') {
                                            const suvs = cars.filter((nextCarItem) => nextCarItem.type === 'SUVS');
                                            const nextSuv = suvs[0]; 
                                            nextCar = nextSuv || carArray[0];
                                        } else if (vehicleType === 'SUVS') {
                                            const vans = cars.filter((nextCarItem) => nextCarItem.type === 'VANS');
                                            const nextVan = vans[0];
                                            nextCar = nextVan || carArray[0];
                                        } else if (vehicleType === 'VANS') { 
                                            nextCar = carArray[carIndex + 1]; 
                                        } else {
                                            nextCar = carArray[carIndex + 1] || carArray[0];
                                        }  
                                            return (
                                                <div className='common-vehicle-option position-relative' key={carIndex}>
                                                    <div className='common-vehicle-image position-relative'>
                                                        <img
                                                            src={`${config.api.baseURL}${car.image.replace(/\\/g, '/')}`}  // Ensure API base URL is correct
                                                            alt={car.car_name}
                                                            className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover"
                                                        />
                                                    </div>
                                                    <div className='common-vehicle-content'>
                                                        <h6>{car.company_name} <strong>{car.car_name}</strong></h6>
                                                        {/* <p className='font-12 text-uppercase letter-spacing-15'>({car.modal} model + above)</p> */}
                                                        {/* <Link to='/signature-routes' className='font-12'>view more</Link> */}
                                                        <CarInfoPopup car={car} nextCar={nextCar} allCars={cars}  is_view="true"/>
                                                    </div>
                                                    <div className='vehicle-option-bookbtn'>
                                                        <BookingPopup cars={cars} is_home="true" />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </TabPanel>
                        ))}
                    </TabView>
                </div>
            </div>
        </div>
    );
}

export default VehicleList;