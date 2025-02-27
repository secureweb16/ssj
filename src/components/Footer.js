import React, { useState } from 'react'; // Added useState import
import { Link } from "react-router-dom";
import Logo from "../assets/images/ssj-logo.svg";
import FooterBackground from "../assets/images/footer-bg.jpg";
import FooterBackgroundMobile from "../assets/images/footer-bg-mobile.jpg";
import milkbarImage from "../assets/images/milkbar-crop.png";
import BookingPopup from '../components/BookingPopup';


function Footer({cars}) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const showPopup = () => {
        setPopupVisible(true);
    };
    
    const closePopup = () => {
        setPopupVisible(false);
    };
    return (
        <>
        <footer className="main-footer position-relative ptb-90 overflow-hidden" style={{ backgroundImage: `url(${window.innerWidth > 768 ? FooterBackground : FooterBackgroundMobile})`, }}>
                <div className='plr-100'>
                    <div className='main-footer-wrap '> 
                        <Link to='/' className='footer-logo'>
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <span className='border-button' onClick={showPopup}>Book Now</span>
                        {isPopupVisible &&  
                            <BookingPopup
                                cars={cars}
                                isHomeBanner={true}
                                closePopup={closePopup}
                            />
                        }
                        <ul className='nostyle text-white footer-menu-list'>
                            <li>
                                <Link to='/about' className='text-white'>Booking Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link to='/about' className='text-white'>Privacy Policy</Link>
                            </li>                            
                            <li>
                                <Link to='/about' className='text-white'>About Us</Link>
                            </li>
                            <li>
                                <Link to='/signature-routes' className='text-white'>Signature Routes</Link>
                            </li>
                            <li>
                                <Link to='/vehicle' className='text-white'>Vehicles</Link>
                            </li>    
                            <li>
                                <Link to='/for-corporate' className='text-white'>For Corporate</Link>
                            </li>
                        </ul>
                    </div>
                </div> 
                <div className="build-by"><Link to="https://themilkbar.co/"><span className='small-text'>bulit by</span><img src={milkbarImage} /></Link></div>               
            </footer>            
        </>
    );
}

export default Footer;
