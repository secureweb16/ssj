import React, { useState } from 'react';
import {Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Dialog } from 'primereact/dialog';
import CarBanner from '../assets/images/mercedes-s-class-large.jpg';
import CarThumb from '../assets/images/mercedes-v-class.jpg';

import UserIcon from '../assets/images/user.svg';
import SuitcaseIcon from '../assets/images/suitcase.svg';



function CarInfoPopup(props) {
    const [visible, setVisible] = useState(false);
    return (
        <>
        <span className='border-button gray-border' onClick={() => setVisible(true)}>Book Now</span>
        <Dialog visible={visible} onHide={() => {if (!visible) return; setVisible(false); }} className='car-info-popup-outer'>
                <div className='car-info-popup'>
                    <div className='car-info-banner'>
                        <img src={CarBanner} alt="Car Info Banner" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                        <div className='car-info-banner-content position-absolute text-white'>
                            <h6>Mercedes <strong>S Class</strong></h6>
                            <p class="font-12 text-uppercase letter-spacing-20">(2022 model + above)</p>
                        </div>
                    </div>
                    <div className='carinfo-popup-bottom d-flex'>
                        <div className='carinfo-popup-middle d-flex'>
                            <div className='carinfo-bottom-left'>
                                <div className='car-spec'>
                                    <div className='common-car-spec d-flex align-items-center'>
                                        <img src={UserIcon} alt="User Icon" className="" />
                                        up to 4 passengers
                                    </div>
                                    <div className='common-car-spec d-flex align-items-center'>
                                        <img src={SuitcaseIcon} alt="User Icon" className="" />
                                        light luggage
                                    </div>
                                </div>
                                <Link to='#' class="btn largebtn">Book Now</Link>
                            </div>
                            <div className='carinfo-bottom-right'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <div className='carinfo-popup-down pt-30'>
                            <p className='fw-400 font-18'>In you need more space...</p>
                            <div className='carinfo-popup-down-inner pt-20'>
                                <div className='carpop-bottom-detail d-flex align-items-center'>
                                    <div className='carpop-bottom-image'>
                                        <img src={CarThumb} alt="Car Thumb" className="" />
                                    </div>
                                    <div className='carpop-bottom-info'>
                                        <h6>Mercedes <strong>S Class</strong></h6>
                                        <Link to='#' className='font-12 viewmorebtn'>view more</Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            
        </Dialog>
        </>
    );
}

export default CarInfoPopup;
