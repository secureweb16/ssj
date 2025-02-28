import React, { useState, useEffect } from 'react';

import Stars from '../assets/images/stars.svg';
// import LeftArrow from '../assets/images/left-arrow.svg';
// import RightArrow from '../assets/images/right-arrow.svg';
import ReviewBackground from "../assets/images/review-background.jpg";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/scrollbar';

function CustomerReviews(){    
    return(
    <div className="customer-review-slider pl-100 ptb-150 bg-cover-center position-relative overlay-50" style={{ backgroundImage: `url(${ReviewBackground})` }}>  
        <div className="slider-wrapper position-relative">
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y, Scrollbar]}
                freeMode={true}
                centeredSlides={false}
                spaceBetween={80}
                slidesPerView={3.5}
                navigation={false}               
                loop={true}
                breakpoints={{
                    320: {
                    slidesPerView: 1.3,
                    spaceBetween: 60,
                    },
                    769: {
                        slidesPerView: 2.3,
                        spaceBetween: 80,
                    },
                    1025: {
                        slidesPerView: 2.7,
                        spaceBetween: 80,
                    }                    
                }}
            >                
                <SwiperSlide>
                    <div className="common_review_slide position-relative">
                        <img src={Stars} alt="Image" className="" />
                        <p className='text-white letter-spacing-20'>
                            “I have nothing but praises in regards to Suhel’s chauffeur service. They operate on a level that is world class. Always on time, very diligent and down to earth. I have never experienced a problem with them.
                            ”
                        </p>
                        <span className=' text-white font-11 text-uppercase letter-spacing-15'>Ethan K</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_review_slide position-relative">
                        <img src={Stars} alt="Image" className="" />
                        <p className='text-white letter-spacing-20'>
                            “I am delighted to recommend the services of SSJ Luxury Transport.<br />
                            We have been working with Sohail for more than five years and his team always deliver above expectation. The fleet are modern, clean, and well equipped. As an experienced hospitality industry professional, who has worked in many countries around the globe including Japan at the highest levels, I can say that Sohail and his team are among the best in the world. We look forward to working with his organisation for many years to come.
                            ”
                        </p>
                        <span className=' text-white font-11 text-uppercase letter-spacing-15'>J Templeton</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_review_slide position-relative">
                        <img src={Stars} alt="Image" className="" />
                        <p className='text-white letter-spacing-20'>
                            “I am delighted to recommend the services of SSJ Luxury Transport.<br />
                            We have been working with Sohail for more than five years and his team always deliver above expectation. The fleet are modern, clean, and well equipped. As an experienced hospitality industry professional, who has worked in many countries around the globe including Japan at the highest levels, I can say that Sohail and his team are among the best in the world. We look forward to working with his organisation for many years to come.
                            ”
                        </p>
                        <span className=' text-white font-11 text-uppercase letter-spacing-15'>J Templeton</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="common_review_slide position-relative">
                        <img src={Stars} alt="Image" className="" />
                        <p className='text-white letter-spacing-20'>
                            “I am delighted to recommend the services of SSJ Luxury Transport.<br />
                            We have been working with Sohail for more than five years and his team always deliver above expectation. The fleet are modern, clean, and well equipped. As an experienced hospitality industry professional, who has worked in many countries around the globe including Japan at the highest levels, I can say that Sohail and his team are among the best in the world. We look forward to working with his organisation for many years to come.
                            ”
                        </p>
                        <span className=' text-white font-11 text-uppercase letter-spacing-15'>J Templeton</span>
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
export default CustomerReviews; 