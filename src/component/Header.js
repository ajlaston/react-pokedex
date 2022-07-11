import React from "react";
import logo from "../img/Pokédex_logo.png";
import pokeball from "../img/pokeball.png"
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header(){

    const navigate = useNavigate();
    const handleCaptureBtn = () => {  
        navigate('/captured');
    }    

    return(
        <div className="pokemon-logo-container">

        <div className="pokemon-logo-container-wrapper">
            <div className="logo-wrapper">
                <div className="pokemon-logo" style={{ backgroundImage: `url(${logo})` }}></div>
            </div>

            <div className="capture-btn-wrapper">

                <button onClick={handleCaptureBtn}>
                    <div className="pokeball" style={{ backgroundImage: `url(${pokeball})` }}></div> 
                    <p>Captured Pokemon</p>
                </button>

            </div>
        </div>

    </div>
    )
}

export default Header;