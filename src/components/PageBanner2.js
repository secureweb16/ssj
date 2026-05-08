import React from "react";


function PageBanner2(props) {
    return (
        <div className="page-banner2 inner-page-banner position-relative overflow-hidden">
            <img src={props.bannerimage} alt={props.title || "Page Top Banner"} className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />            
            <div className="position-relative plr-100"> 
                <h1 className="text-white m-0 text-center london-events-text">
                    {props.title}
                </h1>     
                   <h1 className="text-white m-0 text-center london-events-text">
                    {props.title2}
                </h1>            
            </div>
        </div>
    );
}

export default PageBanner2;
