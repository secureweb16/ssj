import React, { useState } from 'react';
import {Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputTextarea  } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from "primereact/floatlabel";

import Location1 from '../assets/images/signaturebox-location-1.png';
import Closeicon from '../assets/images/close.svg';
import Editicon from '../assets/images/edit-icon.png';
import LocationMap from '../assets/images/location-map.jpg';
import WhatsappIcon from '../assets/images/whatsapp-icon.svg';



import CarThumb from '../assets/images/mercedes-v-class.jpg';

import UserIcon from '../assets/images/user.svg';
import SuitcaseIcon from '../assets/images/suitcase.svg';



function CarInfoPopup(props) {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [innerActiveIndex, innerSetActiveIndex] = useState(0);
    const [pickupValue, pickupSetValue] = useState('');
    const [destinationValue, destinationSetValue] = useState('');
    const [daytimeValue, daytimeSetValue] = useState('');

    const [value2, setValue2] = useState();
    


    return (
        <>
        <span className='border-button gray-border' onClick={() => setVisible(true)}>Book Now</span>
        <Dialog visible={visible} onHide={() => {if (!visible) return; setVisible(false); }} className='booking-popup-outer'>
                <div className='booking-popup'>
                    <div className='booking-popup-head d-flex align-items-center'>
                        <div className='booking-popup-head-left'>
                            <h3 className='m-0'>your <strong>trip</strong></h3>
                        </div>
                        <div className='booking-popup-head-right'>
                            <Link to='#' class="btn largebtn">Book Now</Link>
                        </div>
                    </div>
                    <div className="booking-popup-maintab d-flex">
                        
                        <div className="booking-popup-maintab-left">
                            <div className="booking-popup-maintab-left-wrap">
                                <div className="booking-popup-tableft-inner">
                                    <div className="bookingpop-left-tab">    
                                        <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label="Vehicle" />
                                        <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                            <li>
                                                Mercedes S-Class
                                                <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>
                                            </li>
                                            <li>
                                                Rolls Royce Phantom
                                                <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>                                        
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bookingpop-left-tab">    
                                        <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label="Route + Schedule" />
                                        <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                            <li>
                                                <strong>Pick-up:</strong> The Peninsula London
                                                <span className='result-icon'><img src={Editicon} alt="Edit Icon" className="" /></span>
                                            </li>
                                            <li>
                                                <strong>Destination: London Heathrow Airport</strong>
                                                <span className='result-icon'><img src={Editicon} alt="Edit Icon" className="" /></span>                                        
                                            </li>
                                        </ul>
                                        <ul className='popup-filter-results font-12 fw-400 nostyle'>                   
                                            <li>
                                                <strong>Time:</strong> Feb. 7th, 2025 9:30am
                                                <span className='result-icon'><img src={Editicon} alt="Edit Icon" className="" /></span>                                        
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bookingpop-left-tab">    
                                        <Button onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 2} label="Details" />
                                        <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                            <li>
                                                <strong>Passengers: 2</strong>
                                                <span className='result-icon'><img src={Editicon} alt="Edit Icon" className="" /></span>
                                            </li>
                                            <li>
                                                <strong>Additional requests: None</strong>
                                                <span className='result-icon'><img src={Editicon} alt="Edit Icon" className="" /></span>                                        
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='mobile-tab-results show-mobile'>
                                    <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                        <li>
                                            Mercedes S-Class
                                            <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>
                                        </li>
                                        <li>
                                            Rolls Royce Phantom
                                            <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>                                        
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='booking-popup-maintab-right'>
                            <div className='booking-popup-mainform'>
                                <div className='vehicle-booking-content'>
                                    <div className='vehicle-booking-category'>
                                        <Button onClick={() => innerSetActiveIndex(0)} className="border-button gray-border" outlined={innerActiveIndex !== 0} label="Cars" /> 
                                        <Button onClick={() => innerSetActiveIndex(1)} className="border-button gray-border" outlined={innerActiveIndex !== 1} label="Suvs" /> 
                                        <Button onClick={() => innerSetActiveIndex(2)} className="border-button gray-border" outlined={innerActiveIndex !== 2} label="Vans" />                                 
                                    </div>
                                    <div className='booking-car-list'>
                                        <div className='common-booking-car-info d-flex align-items-center'>
                                            <div className='carpop-bottom-detail d-flex align-items-center'>
                                                <div className='carpop-bottom-image'>
                                                    <img src={CarThumb} alt="Car Thumb" className="" />
                                                </div>
                                                <div className='carpop-bottom-info'>
                                                    <h6>Mercedes <strong>S Class</strong></h6>
                                                    <div className='car-spec show-mobile'>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={UserIcon} alt="User Icon" className="" />
                                                            4
                                                        </div>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                            light
                                                        </div>
                                                    </div>
                                                    <Link to='#' className='font-12 viewmorebtn'>view more</Link>
                                                </div>
                                            </div>
                                            <div className='car-spec show-desktop'>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={UserIcon} alt="User Icon" className="" />
                                                    <span className='hideforsmall'>up to</span> 4 <span className='hideforsmall'>passengers</span>
                                                </div>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                    light <span className='hideforsmall'>luggage</span>
                                                </div>
                                            </div>
                                            <span class="border-button gray-border select-button selected">selected</span>
                                        </div>
                                        <div className='common-booking-car-info d-flex align-items-center'>
                                            <div className='carpop-bottom-detail d-flex align-items-center'>
                                                <div className='carpop-bottom-image'>
                                                    <img src={CarThumb} alt="Car Thumb" className="" />
                                                </div>
                                                <div className='carpop-bottom-info'>
                                                    <h6>Mercedes <strong>S Class</strong></h6>
                                                    <div className='car-spec show-mobile'>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={UserIcon} alt="User Icon" className="" />
                                                            4
                                                        </div>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                            light
                                                        </div>
                                                    </div>
                                                    <Link to='#' className='font-12 viewmorebtn'>view more</Link>
                                                </div>
                                            </div>
                                            <div className='car-spec show-desktop'>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={UserIcon} alt="User Icon" className="" />
                                                    <span className='hideforsmall'>up to</span> 4 <span className='hideforsmall'>passengers</span>
                                                </div>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                    light <span className='hideforsmall'>luggage</span>
                                                </div>
                                            </div>
                                            <span class="border-button gray-border select-button">Select</span>
                                        </div>
                                        <div className='common-booking-car-info d-flex align-items-center'>
                                            <div className='carpop-bottom-detail d-flex align-items-center'>
                                                <div className='carpop-bottom-image'>
                                                    <img src={CarThumb} alt="Car Thumb" className="" />
                                                </div>
                                                <div className='carpop-bottom-info'>
                                                    <h6>Mercedes <strong>S Class</strong></h6>
                                                    <div className='car-spec show-mobile'>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={UserIcon} alt="User Icon" className="" />
                                                            4
                                                        </div>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                            light
                                                        </div>
                                                    </div>
                                                    <Link to='#' className='font-12 viewmorebtn'>view more</Link>
                                                </div>
                                            </div>
                                            <div className='car-spec show-desktop'>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={UserIcon} alt="User Icon" className="" />
                                                    <span className='hideforsmall'>up to</span> 4 <span className='hideforsmall'>passengers</span>
                                                </div>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                    light <span className='hideforsmall'>luggage</span>
                                                </div>
                                            </div>
                                            <span class="border-button gray-border select-button">Select</span>
                                        </div>
                                        <div className='common-booking-car-info d-flex align-items-center'>
                                            <div className='carpop-bottom-detail d-flex align-items-center'>
                                                <div className='carpop-bottom-image'>
                                                    <img src={CarThumb} alt="Car Thumb" className="" />
                                                </div>
                                                <div className='carpop-bottom-info'>
                                                    <h6>Mercedes <strong>S Class</strong></h6>
                                                    <div className='car-spec show-mobile'>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={UserIcon} alt="User Icon" className="" />
                                                            4
                                                        </div>
                                                        <div className='common-car-spec d-flex align-items-center'>
                                                            <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                            light
                                                        </div>
                                                    </div>
                                                    <Link to='#' className='font-12 viewmorebtn'>view more</Link>
                                                </div>
                                            </div>
                                            <div className='car-spec show-desktop'>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={UserIcon} alt="User Icon" className="" />
                                                    <span className='hideforsmall'>up to</span> 4 <span className='hideforsmall'>passengers</span>
                                                </div>
                                                <div className='common-car-spec d-flex align-items-center'>
                                                    <img src={SuitcaseIcon} alt="User Icon" className="" />
                                                    light <span className='hideforsmall'>luggage</span>
                                                </div>
                                            </div>
                                            <span class="border-button gray-border select-button">Select</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='vehicle-routeschedule-content'>
                                    <h6>Select your <strong>pick-up location and destination</strong></h6>
                                    <div className='vehicle-routeschedule-signaturebox mb-30'>
                                        <div className='routeschedule-signaturebox-top d-flex align-items-center'>
                                            <p className='text-uppercase m-0 fw-400 font-12'>Singature Routes</p>
                                            <Link to="#" className='viewmorebtn'>view more</Link>
                                        </div>
                                        <div className='routeschedule-signaturebox-bottom'>
                                            <div className='routeschedule-signaturebox-locations d-grid'>
                                                <div className='routeschedule-signaturebox-location d-flex align-items-center'>
                                                    <img src={Location1} alt="Location Image" className="" />
                                                    <p className='m-0'>London Central - Heathrow </p>
                                                </div>
                                                <div className='routeschedule-signaturebox-location d-flex align-items-center'>
                                                    <img src={Location1} alt="Location Image" className="" />
                                                    <p className='m-0'>London Central - Cotswolds </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group position-relative'>
                                        <FloatLabel>
                                            <InputText id="pickupaddress" value={pickupValue} onChange={(e) => pickupSetValue(e.target.pickupValue)} className='w-100' />
                                            <label htmlFor="username">type a <strong>pick up</strong> address or location</label>
                                        </FloatLabel>
                                    </div>
                                    <div className='form-group position-relative'>
                                        <FloatLabel>
                                            <InputText id="destinationadress" value={destinationValue} onChange={(e) => destinationSetValue(e.target.destinationValue)} className='w-100' />
                                            <label htmlFor="username">type a <strong>destination</strong> address or location</label>
                                        </FloatLabel>
                                    </div>
                                    <div className='popup-location-map mb-20 mt-20'>
                                        <img src={LocationMap} alt="Location Image" className="" />
                                    </div>                                
                                    <h6 className='mb-10'>Select a <strong>pick-up time</strong></h6>
                                    <div className='form-group position-relative m-0'>
                                        <FloatLabel>
                                            <InputText id="destinationadress" value={daytimeValue} onChange={(e) => daytimeSetValue(e.target.daytimeValue)} className='w-100' />
                                            <label htmlFor="username">type a day and time here</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='vehicle-details-content'>
                                    <h6 className='mb-10 label'>Add details about your trip here</h6>
                                    <div className='form-group'>
                                        <InputNumber placeholder='type the number of passengers' useGrouping={false} className='w-100' />
                                    </div>
                                    <div className='form-group'>
                                        <InputTextarea placeholder="any additional notes?" className='w-100'></InputTextarea>
                                    </div>
                                    <h6 className='mb-10 pt-20 label'>Your contact details</h6>
                                    <div className='form-group'>
                                        <InputText type="text" placeholder="your name" className='w-100'/>
                                    </div>
                                    <div className='form-group'>
                                        <InputText type="email" placeholder="your email" className='w-100'/>
                                    </div>
                                    <div className='form-group'>
                                        <InputNumber type="text" placeholder="phone number" className='w-100'/>
                                    </div>
                                </div>
                                <div className='done-button pt-40 text-right'>
                                    <Button className="btn formbtn">Done</Button>
                                </div>
                            </div>
                            <div className='popup-how-continue'>
                                <h6>Choose how to continue with our team</h6>
                                <p>We will email you details of your request and respond there or you can get in touch with us immediately via WhatsApp.</p>
                                <ul className='nostyle p-0 d-flex align-items-center gap-10 mt-30'>
                                    <li>
                                        <Button className="btn">Send Now</Button>
                                    </li>
                                    <li>
                                        <Button className="btn d-flex align-items-center connect-whatsappbtn">Connect Via Whatsapp
                                            <img src={WhatsappIcon} alt='Icon' />
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>                        
                    </div>
                </div>
            
        </Dialog>
        </>
    );
}

export default CarInfoPopup;
