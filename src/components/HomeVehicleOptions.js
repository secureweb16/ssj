import React, { useState } from 'react';
import MercedesSClass from '../assets/images/mercedes-s-class.jpg';
import RollsRoycePhantom from '../assets/images/rolls-royce-phantom.jpg';
import MercedesMaybach from '../assets/images/mercedes-maybach.jpg';
import BentleyFlyingSpur from '../assets/images/bentley-flying-spur.jpg';
import BentleyBentayga from '../assets/images/bentley-bentayga.jpg';
import { TabView, TabPanel } from 'primereact/tabview';
import CarInfoPopup from '../components/CarInfoPopup';

// import LeftArrow from '../assets/images/left-arrow.svg';
// import RightArrow from '../assets/images/right-arrow.svg';
import {Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

function HomeVehicleOptions(){    
    const [activeIndex, setActiveIndex] = useState(0);

    return(
    <div className='vehicle-options pb-90'> 
        <div className='vehicle-options-inner'> 
            <p className='text-uppercase font-12 plr-100 fw-400 text-center section-title'>Explore Our Vehicle Options</p>
            <div className='tabs-style pt-40'>        
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header="Cars">
                        <div className="slider_wrapper position-relative pt-50">
                        <Swiper
                            modules={[Navigation, A11y, Scrollbar]}
                            freeMode={true}
                            centeredSlides={false}
                            spaceBetween={5}
                            slidesPerView={3.5}
                            navigation={false}
                            loop={false}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                320: { slidesPerView: 1.2, spaceBetween: 5 },
                                769: { slidesPerView: 3.5, spaceBetween: 5 },
                                1025: { slidesPerView: 4.3, spaceBetween: 5 },
                            }}
                        >                
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'> 
                                            <CarInfoPopup />                                           
                                            {/* <span className='border-button gray-border'>Book Now</span> */}
                                        </div>
                                    </div>
                                    
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                 <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper> 
                        </div> 
                    </TabPanel>
                    <TabPanel header="Suvs">
                    <div className="slider_wrapper position-relative pt-50">
                        <Swiper
                            modules={[Navigation, A11y, Scrollbar]}
                            freeMode={true}
                            centeredSlides={false}
                            spaceBetween={5}
                            slidesPerView={3.5}
                            navigation={false}
                            loop={false}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                320: { slidesPerView: 1.2, spaceBetween: 5 },
                                769: { slidesPerView: 3.5, spaceBetween: 5 },
                                1025: { slidesPerView: 4.3, spaceBetween: 5 },
                            }}
                        >                
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                 <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                            </Swiper> 
                        </div>
                    </TabPanel>
                    <TabPanel header="Vans">
                    <div className="slider_wrapper position-relative pt-50">
                        <Swiper
                            modules={[Navigation, A11y, Scrollbar]}
                            freeMode={true}
                            centeredSlides={false}
                            spaceBetween={5}
                            slidesPerView={3.5}
                            navigation={false}
                            loop={false}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                320: { slidesPerView: 1.2, spaceBetween: 5 },
                                769: { slidesPerView: 3.5, spaceBetween: 5 },
                                1025: { slidesPerView: 4.3, spaceBetween: 5 },
                            }}
                        >                
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                 <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesSClass} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>S Class</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={RollsRoycePhantom} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Rolls Royce <strong>Phantom</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={MercedesMaybach} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Mercedes <strong>Maybach</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyFlyingSpur} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Flying Spur</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                                <SwiperSlide>
                                    <div className='common-vehicle-option position-relative'>                    
                                        <div className='common-vehicle-image position-relative'>
                                            <img src={BentleyBentayga} alt="Routes Package Top" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />                                                                       
                                        </div>
                                        <div className='common-vehicle-content'>  
                                            <h6>Bentley <strong>Bentayga</strong></h6>  
                                            <p className='font-12 text-uppercase letter-spacing-15'>(2022 model + above)</p>                                            
                                            <Link to='#' className='font-12'>view more</Link>
                                        </div>
                                        <div className='vehicle-option-bookbtn'>  
                                            <span className='border-button gray-border'>Book Now</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper> 
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>          
    </div>     
    
  );
}
export default HomeVehicleOptions; 