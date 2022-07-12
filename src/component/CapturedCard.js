import React from "react";
import "./CapturedCard.css";

function CaptureCard(props){

    return(
        <div className="capture-card-container" >
            <div className="capture-card-image" style={{backgroundColor : props.color}}>
                <div className="pokemon"></div>
            </div>

            <div className="captured-card-details">

            </div>
        </div>
    )
}

export default CaptureCard;