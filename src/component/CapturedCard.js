import React from "react";
import "./CapturedCard.css";

function CaptureCard(props) {

    return (
        <div className="capture-card">

            <div className="capture-card-container-mb" >
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

            <div className="capture-card-container-web">
                <div className="capture-image-container-web" style={{backgroundColor : props.color}}>
                    <div className="capture-sprite-web" style={{backgroundImage : `url(${props.sprite})`}}></div>
                </div>

                <div className="capture-detail-web">
                    <div className="capture-name-web">
                        <h3>#{props.order} {props.name}</h3>
                        <h3>{props.types}</h3>
                    </div>
                </div>

                <div className="nickname-container-web">
                    <h3>{props.nickname}</h3>
                </div>

                <div className="date-container-web">
                    <h3>{props.date}</h3>
                </div>

                <div className="level-container-web">
                    <h3>{props.level}</h3>
                </div>
            </div>
        </div>
    )
}

export default CaptureCard;