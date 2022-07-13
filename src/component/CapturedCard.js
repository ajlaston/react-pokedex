import React from "react";
import "./CapturedCard.css";

function CaptureCard(props) {

    return (
        <div className="capture-card">
            <div className="capture-card-container" >
                <div className="capture-card-image" style={{ backgroundColor: props.color }}>
                    <div className="pokemon-sprite" style={{ backgroundImage: `url(${props.sprite})` }}></div>
                </div>

                <div className="captured-card-details">
                    <div className="capture-detail-wrapper">
                        <p>{props.nickname}</p>
                        <p>Captured on: {props.date}</p>
                        <p>Captured Level: {props.level}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptureCard;