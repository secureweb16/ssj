import React from "react";
import {Link } from "react-router-dom";

function HomeWelcome(props) {
    return (
        <div className="title-text ptb-80">            
            <div className="plr-100 text-center"> 
                <div className="title-text-wrap">
                    <h6 className="text-uppercase font-14 d-flex flex-column align-items-center fw-400">{props.title}</h6>
                    <p className="font-16 fw-300">{props.description}</p>
                    {props.buttonurl && <Link to={{ pathname: props.buttonurl, search: '?tab=1' }} className="btn largebtn mt-40">{props.buttontext}</Link> }                   
                </div>
            </div>
        </div>
    );
}

export default HomeWelcome;
