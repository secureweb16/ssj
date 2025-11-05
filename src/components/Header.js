import React, { useEffect, useState } from 'react'; // Added useState import
import { Link } from "react-router-dom";
import Logo from "../assets/images/ssj-logo.svg";
import WhatsappIcon from "../assets/images/whatsapp-white-icon.svg";
import EmailIcon from "../assets/images/email-send.svg";
import config from '../config'; 
import BookingPopup from '../components/BookingPopup';

function Header({cars}) {
    const [scroll, setScroll] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        const whatsappUrl = `${config.whatsapp.baseUrl}${config.whatsapp.recipientPhone}`;
        window.open(whatsappUrl, '_blank');
    };

    const showPopup = () => {
        setPopupVisible(true);
    };
    
    const closePopup = () => {
        setPopupVisible(false);
    };

    return (
        <>
            <header className={`position-absolute w-100 ${scroll ? "main-header sticky" : "main-header"}`} >
                <div className='header-inner w-100 d-flex align-items-center justify-content-between'>
                    <div className='header-left d-flex align-items-center'> 
                        <Link to='/' className='header_logo'>
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className='header-right'>
                        <ul className='d-flex gap-10 nostyle'>
                            <li className='show-desktop'>
                                <Link onClick={handleClick} to='/' className='btn transparent-btn'><span className='show-desktop'>Whatsapp</span><img src={WhatsappIcon} alt="Icon" className='show-mobile'/></Link>
                            </li>
                            <li>
                                {/* <Link to={`${config.telegram.baseUrl}`} className='btn transparent-btn'><span className='show-desktop'>Telegram</span><img src={EmailIcon} alt="Icon" className='show-mobile'/></Link> */}
                            </li>
                            <li className='show-mobile'>
                                <Link onClick={handleClick} to='/' className='btn transparent-btn'><span className='show-desktop'>Whatsapp</span><img src={WhatsappIcon} alt="Icon" className='show-mobile'/></Link>
                            </li>
                            <li>
                                <span className='btn transparent-btn' onClick={showPopup}>Book <span className='show-desktop'>a car</span></span>
                                {isPopupVisible &&  
                                    <BookingPopup cars={cars} isHomeBanner={true} closePopup={closePopup} />
                                }
                            </li>
                        </ul>
                    </div>
                </div>
                
            </header>            
        </>
    );
}

export default Header;
