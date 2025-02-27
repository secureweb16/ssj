import React, { useState, useEffect } from "react";
import BannerVideo from "../assets/videos/banner-home-video.mp4";
import BookingPopup from "../components/BookingPopup";
import { motion } from "framer-motion";

function HomeBanner({ cars }) {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const showPopup = () => {
        setPopupVisible(true);
    };
    const closePopup = () => {
        setPopupVisible(false);
    };
    const [index, setIndex] = useState(0);
    const words = [
        { text: "convenience", bgColor: "#ffc703", color: "#000" },
        { text: "safety", bgColor: "#004e98", color: "#fff" },
        { text: "discretion", bgColor: "#8cb369", color: "#000" },
        { text: "simplicity", bgColor: "#8cb369", color: "#000" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <div className="home-banner page-banner position-relative overflow-hidden">
                <video width="100%" height="100%" autoPlay muted playsInline  loop preload="auto" className="position-absolute h-100 w-100">
                    <source src={BannerVideo} type="video/mp4" />
                </video>
                <div className="home-banner-content position-relative plr-100">
                    <h1 className="text-white m-0 text-center">
                        <span></span>
                        <span>the luxury of{" "}
                            <strong>
                                <span
                                className="relative inline-block px-4 py-2 rounded-md overflow-hidden"
                                style={{
                                    //backgroundColor: words[index].bgColor,
                                    //color: words[index].color,
                                    width: "auto",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                <motion.div
                                    key={index}
                                    initial={{ y: "100%" }} // Start below
                                    animate={{ y: "0%" }} // Move to center
                                    exit={{ y: "-100%" }} // Exit up
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                    className="absolute w-full text-center"
                                >
                                    {words[index].text}
                                </motion.div>
                                </span>
                            </strong>
                        </span>
                    </h1>
                    <ul className="home-banner-buttons justify-content-center d-flex nostyle">
                        <li>
                            <span className="btn transparent-btn" onClick={showPopup}>
                                Book a car
                                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81992 1.3765L4.89364 1.44951L4.81992 1.3765L3.7157 2.49145L3.71543 2.49172L2.41597 3.7941L1.11625 5.09675L1.08594 5.12712V5.17003V5.18761V5.20522V5.25036L1.11897 5.28113L1.21715 5.37259L1.21715 5.37259L1.31535 5.46408L1.31523 5.4642L1.31986 5.46804L1.36696 5.50708L1.43318 5.42721L1.36696 5.50708L1.41406 5.54613L1.44286 5.57001H1.48028H1.50333H1.5264H1.56937L1.59976 5.53962L3.85289 3.28669L6.03268 1.1071L8.21361 3.28671L10.4679 5.53964L10.4983 5.57001H10.5413H10.5728H10.6043H10.6461L10.6763 5.54098L10.8109 5.41129L10.8109 5.41129L10.9455 5.28161L10.9772 5.251V5.20689V5.17001V5.1331V5.0901L10.9468 5.05971L8.54572 2.66031L6.14458 0.260897L6.1142 0.230535H6.07124L6.0347 0.230535L6.03463 0.230535L5.99806 0.230557L5.95483 0.230584L5.92441 0.261301L4.81992 1.3765Z" fill="white" stroke="white" strokeWidth="0.20751"/>
                                </svg>
                            </span>
                            {isPopupVisible && (
                                <BookingPopup cars={cars} isHomeBanner={true} closePopup={closePopup} />
                            )}
                        </li>
                        <li>
                            <a href="/for-corporate" className="btn transparent-btn">
                                For Corporate
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
  );
}

export default HomeBanner;
