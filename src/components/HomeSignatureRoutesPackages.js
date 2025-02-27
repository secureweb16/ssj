import React, { useState, useEffect } from 'react';
import Slide1Top from '../assets/images/route-location1-top.jpg';
import Slide1Bottom from '../assets/images/route-location1-bottom.jpg';
import Slide2Top from '../assets/images/route-location2-top.jpg';
import Slide2Bottom from '../assets/images/route-location2-bottom.jpg';
import Slide3Top from '../assets/images/route-location3-top.jpg';
import Slide3Bottom from '../assets/images/route-location3-bottom.jpg';
import Slide4Top from '../assets/images/route-location4-top.jpg';
import Slide4Bottom from '../assets/images/route-location4-bottom.jpg';
import Slide5Top from '../assets/images/route-location5-top.jpg';
import Slide5Bottom from '../assets/images/route-location5-bottom.jpg';
import Slide6Top from '../assets/images/route-location6-top.jpg';
import Slide6Bottom from '../assets/images/route-location6-bottom.jpg';
// import LeftArrow from '../assets/images/left-arrow.svg';
// import RightArrow from '../assets/images/right-arrow.svg';
import {Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import BookingPopup from '../components/BookingPopup';

function HomeSignatureRoutesPackages({cars}){    
    return(
    <div className="signature-routes-slider ptb-90">  
        <p className='text-uppercase font-12 plr-100 fw-400 text-center section-title'>Signature routes & packages</p>
        <div className="slider_wrapper position-relative pt-50">
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y, Scrollbar]}
                freeMode={true}
                centeredSlides={true}
                spaceBetween={2}
                slidesPerView={3.5}
                navigation={false}
                loop={true}
                breakpoints={{
                    320: {
                    slidesPerView: 1.2,
                    spaceBetween: 2,
                    },
                    769: {
                        slidesPerView: 2.5,
                        spaceBetween: 2,
                    },
                    992: {
                        slidesPerView: 3.6,
                        spaceBetween: 2,
                    }
                    
                }}
            >                
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'> 
                        <div className='common-routepack-slide-wrap position-relative'>
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide1Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide1Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Babington</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Babington House']} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'>
                        <div className='common-routepack-slide-wrap position-relative'>                  
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide2Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide2Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Estelle Manor</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Estelle Manor']} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'>
                        <div className='common-routepack-slide-wrap position-relative'>
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide3Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide3Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Manchester</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Manchester']} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'>
                        <div className='common-routepack-slide-wrap position-relative'>                
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide4Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide4Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Cowarth Park</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Cowarth Park']} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'>
                        <div className='common-routepack-slide-wrap position-relative'>                 
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide5Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide5Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Cheltenham</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Cheltenham']} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='common-routepack-slide position-relative'> 
                        <div className='common-routepack-slide-wrap position-relative'>                    
                            <div className='routepack-slide-bg position-relative'>
                                <div className='routepack-slide-top'>
                                    <img src={Slide6Top} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>
                                <div className='routepack-slide-bottom'>
                                    <img src={Slide6Bottom} alt="Routes Package Bottom" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />
                                </div>                            
                            </div>
                            <div className='routepack-slide-content position-absolute text-white d-flex flex-column'>  
                                <Link to='#' className='text-white'>Central London</Link>
                                <Link to='#' className='text-white'>Bicester Village</Link>
                                <span className='circle-button d-flex align-items-center justify-content-center position-absolute'><svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.926552 1.21275L0.896245 1.18238V1.13947V1.11768V1.09586V1.05072L0.929277 1.01995L1.05094 0.906611L1.17262 0.793247L1.1725 0.79312L1.17713 0.789286L1.2355 0.740899L1.29387 0.692512L1.32267 0.668634H1.36008H1.38865H1.41724H1.46021L1.4906 0.69902L4.28264 3.49082L7.00135 6.20928L9.72147 3.4908L12.515 0.699L12.5454 0.668634H12.5883H12.6274H12.6664H12.7083L12.7384 0.697668L12.9052 0.858368L12.9052 0.858374L13.072 1.01907L13.1038 1.04968V1.09379V1.1395V1.18523V1.22823L13.0733 1.25862L10.0979 4.23191L7.12247 7.20523L7.09209 7.23559H7.04913L7.00384 7.23559L7.00378 7.23559L6.95846 7.23556L6.91523 7.23554L6.88481 7.20482L5.51614 5.82288L4.14775 4.44119L4.14748 4.44092L2.53715 2.82697L0.926552 1.21275Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                                </span>
                            </div>
                        </div>
                        <div className='text-center mt-30 signature'>
                            <BookingPopup cars={cars}  location={['Central London','Bicester Village']} />
                        </div>
                    </div>
                </SwiperSlide>                
            </Swiper>             
            {/* <div className="slider_nav d-flex align-items-center justify-content-center nowrap">                
                <button className="arrow-left arrow common_slider_arrow d-flex align-items-center justify-content-center"><img src={LeftArrow} alt="Image" /></button>
                
                <button className="arrow-right arrow common_slider_arrow d-flex align-items-center justify-content-center"><img src={RightArrow} alt="Image" /></button>
            </div> */}
        </div>        
    </div>
  );
}
export default HomeSignatureRoutesPackages; 