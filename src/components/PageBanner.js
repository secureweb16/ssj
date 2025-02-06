import React from "react";


function PageBanner(props) {
    return (
        <div className="page-banner inner-page-banner position-relative overflow-hidden">
            <img src={props.bannerimage} alt="Page Top Banner" className="position-absolute top-0 start-0 h-100 w-100 object-fit-cover" />            
            <div className="position-relative plr-100"> 
                <h1 className="text-white m-0 text-center">
                    {props.title}
                </h1>               
            </div>
        </div>
    );
}

export default PageBanner;
