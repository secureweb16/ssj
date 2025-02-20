import React, { useEffect, useRef, useState } from 'react'; // Added useState import
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Logo1 from "../assets/images/logo.png";
import WhatsappIcon from "../assets/images/whatsapp-white-icon.svg";
import EmailIcon from "../assets/images/email-send.svg";



function Header() {
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <>
            <header className={`position-absolute w-100 ${scroll ? "main-header sticky" : "main-header"}`} >
                <div className='header-inner w-100 d-flex justify-content-between'>
                    <div className='header-left d-flex align-items-center'> 
                        <Link to='/' className='header_logo'>
                            <img src={Logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className='header-right'>
                        <ul className='d-flex gap-10 nostyle'>
                            <li className='show-mobile'>
                                <Link to='/' className='btn transparent-btn'><img src={EmailIcon} alt="Icon"/></Link>
                            </li>
                            <li>
                                <Link to='/' className='btn transparent-btn'><span className='show-desktop'>Whatsapp</span><img src={WhatsappIcon} alt="Icon" className='show-mobile'/></Link>
                            </li>
                            <li>
                                <span className='btn transparent-btn'>Book <span className='show-desktop'>a car</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </header>            
        </>
    );
}

export default Header;
