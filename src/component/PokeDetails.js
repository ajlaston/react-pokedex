import React from "react";
import "./PokeDetails.css";
import { PokemonContext } from "../PokeContext";

function PokeDetails(props) {

    const [display, setDisplay] = React.useState("none");

    const { setBackgroundColor } = React.useContext(PokemonContext);

    console.log(props.sprite)

    const handlePopUp = () => {
        setDisplay(prev=> prev === "initial" ? "none" : "initial");
    }

    const exitPopUp = (e) => {
        if(e.target.className === "pop-up-wrapper"){
            handlePopUp();
        }
    }

    return (
        <div className="poke-details">
            <div className="img-box" style={{ backgroundColor: props.color }}>
                <div className="img-box-content">
                    <div className="pokemon-img-wrapper">
                        <div className="pokemon-img" style={{ backgroundImage: `url(${props.sprite})` }}></div>
                    </div>
                    <p className="pokemon-name">#{props.order} {props.name}</p>
                </div>
            </div>

            <div className="stat-container">
                <div className="stat-wrapper">
                    <div className="about">
                        <h3>About</h3>
                        <p>Type(s): {props.types}</p>
                        <p>Weight: {props.weight} kg</p>
                        <p>Height: {props.height} m</p>
                    </div>

                    <div className="base-stats">
                        <h3>Base Stats</h3>
                        <p>HP: {props.hp}</p>
                        <p>Attack: {props.attack} </p>
                        <p>Defence: {props.defense} </p>
                        <p>Special Attack: {props.specialAttack} </p>
                        <p>Special Defense: {props.specialDefense} </p>
                        <p>Speed: {props.speed} </p>
                    </div>


                </div>


            </div>

            <div className="capture-btn-container">
                <button className="capture-btn" onClick={handlePopUp}>Capture</button>
            </div>

            <div className="pop-up-container" style={{display : display}}>
                <div className="pop-up-wrapper" onClick={exitPopUp}>
                    <div className="pop-up">
                        <h2>Capturing {props.name}</h2>
                        <input placeholder="Nickname" required/>
                        <input type="date" placeholder="Captured Date" required/>
                        <input type="number" placeholder="Captured Level" required/>
                        <input className="pop-up-btn" type="button" value="Capture"/>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default PokeDetails;