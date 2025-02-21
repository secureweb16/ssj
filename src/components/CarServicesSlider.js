import React, { useState, useEffect } from 'react';
import SliderItem1 from '../assets/images/chauffeur.jpg';
import SliderItem2 from '../assets/images/corporate-service.jpg';
import SliderItem3 from '../assets/images/black-car-hire.jpg';
import SliderItem4 from '../assets/images/airport-transport.jpg';
import LeftArrow from '../assets/images/left-arrow.svg';
import RightArrow from '../assets/images/right-arrow.svg';
import {Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookingPopup from '../components/BookingPopup';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function CarServiceSlider({cars}){    
    return(
    <div className="car-service-slider">  
        <div className="slider_wrapper position-relative">
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
                    1025: {
                        slidesPerView: 3.5,
                        spaceBetween: 2,
                    },
                    1281: {
                        slidesPerView: 3.5,
                        spaceBetween: 2,
                    }
                }}
            >                
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem1} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>chauffeur</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem2} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>corporate services</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem3} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>black car hire</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem4} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>airport transport</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem1} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>chauffeur</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem2} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>corporate services</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem3} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>black car hire</p>
                           <BookingPopup cars={cars} />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_service_slide  position-relative">
                        <img src={SliderItem4} alt="Image" className="w-100 object-fit-cover" />
                        <div className='position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-white font-16'>
                            <p>airport transport</p>
                            <BookingPopup cars={cars} />
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
export default CarServiceSlider; 