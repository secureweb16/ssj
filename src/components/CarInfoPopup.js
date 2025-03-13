import React, { useState } from 'react';
import {Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Dialog } from 'primereact/dialog';
import BookingPopup from '../components/BookingPopup';
import UserIcon from '../assets/images/user.svg';
import SuitcaseIcon from '../assets/images/suitcase.svg';
import config from '../config';

function CarInfoPopup({ car, nextCar, allCars, is_view = null }) {
    const [visible, setVisible] = useState(false);
    let thirdCar;
    if (car && allCars) {
        if (nextCar?.type === 'SUVS') {
            const vans = allCars.filter(nextCarItem => nextCarItem.type === 'VANS');
            thirdCar = vans[0] || car;
        } else if (nextCar?.type === 'VANS') {
            const vans = allCars.filter(nextCarItem => nextCarItem.type === 'VANS');
            thirdCar = vans[1] || car;
        }
    }

    return (
        <>
            {is_view === null ? (
                <span className='border-button gray-border' onClick={() => setVisible(true)}>
                    Book Now
                </span>
            ) : (
                <span className='font-12 viewmorebtn view-details' onClick={() => setVisible(true)}>
                     View More
                </span>
            )}
            <Dialog visible={visible} onHide={() => {if (!visible) return; setVisible(false); }} className='car-info-popup-outer' draggable={false}>
                <div className='car-info-popup'>
                    <div className='car-info-banner'>
                        <img src={`${config.api.baseURL}${car?.image.replace(/\\/g, '/')}`} alt={car?.car_name} className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                        <div className='car-info-banner-content position-absolute text-white'>
                            <h6>{car?.company_name} <strong>{car?.car_name}</strong></h6>
                            {/* <p className="font-12 text-uppercase letter-spacing-20">({car?.modal} model + above)</p> */}
                        </div>
                    </div>
                    <div className='carinfo-popup-bottom d-flex'>
                        <div className='carinfo-popup-middle d-flex'>
                            <div className='carinfo-bottom-left'>
                                <div className='car-spec'>
                                    <div className='common-car-spec d-flex align-items-center'>
                                        <img src={UserIcon} alt="User Icon" className="" />
                                        up to {(car?.passengers) ? car?.passengers : 0 } passengers
                                    </div>
                                    <div className='common-car-spec d-flex align-items-center'>
                                        <img src={SuitcaseIcon} alt="User Icon" className="" />
                                        {(car?.luggage_type) ? car.luggage_type : 'light' } luggage
                                    </div>
                                </div>
                                <div className='vehicle-option-bookbtn'>
                                    <BookingPopup cars={allCars} />
                                </div>
                            </div>
                            <div className='carinfo-bottom-right'>
                                <p>{car?.description}</p>
                            </div>
                        </div>
                        { (nextCar && car.car_name != 'Sprinter Jet Class' ) &&
                        <div className='carinfo-popup-down pt-30'>
                            <p className='fw-400 font-18'>If you need more space...</p>
                            <div className='carinfo-popup-down-inner pt-20'>
                                <div className='carpop-bottom-detail d-flex align-items-center'>
                                    <div className='carpop-bottom-image'>
                                        <img src={`${config.api.baseURL}${nextCar?.image.replace(/\\/g, '/')}`} alt={nextCar.car_name} className="" />
                                    </div>
                                    <div className='carpop-bottom-info'>
                                        <h6>{nextCar?.company_name} <strong>{nextCar?.car_name}</strong></h6>
                                        <CarInfoPopup car={nextCar} nextCar={thirdCar} allCars={allCars} is_view="true"/>
                                        {/* <Link to='/signature-routes' className='font-12 viewmorebtn'>view more</Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default CarInfoPopup;
