import React from "react";
import "./Loader.css"

function Loader() {

    //ball pulses until response has returned for a fetched resource.
    return(
        <div className="loader">
            <div className="ball-wrapper">
                <div className="ball" ></div>
            </div>
           
        </div>
    )
}

export default Loader;