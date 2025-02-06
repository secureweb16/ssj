import React from 'react'; // Added useState import
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import FooterBackground from "../assets/images/footer-background.jpg";


function Footer() {

    return (
        <>
            <footer className='main-footer position-relative ptb-90 overflow-hidden' style={{ backgroundImage: `url(${FooterBackground})` }}>
                <div className='plr-100'>
                    <div className='main-footer-wrap '> 
                        <Link to='/' className='footer-logo'>
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <span className='border-button'>Book Now</span>
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
                                <Link to='/vehicle' className='text-white'>Vehicle</Link>
                            </li>    
                            <li>
                                <Link to='/for-corporate' className='text-white'>For Corporate</Link>
                            </li>
                        </ul>
                    </div>
                </div>                
            </footer>            
        </>
    );
}

export default Footer;
