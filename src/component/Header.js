import React from "react";
import logo from "../img/Pokédex_logo.png";
import pokeball from "../img/pokeball.png"
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header(props){

    const navigate = useNavigate();
    
    const handleCaptureBtn = () => {  
        navigate('/captured');
    }    

    const goToHome = () => {
        navigate("/");
    }

    return(
        <div className="pokemon-logo-container">

        <div className="pokemon-logo-container-wrapper">
            <div className="logo-wrapper" onClick={goToHome}>
                <div className="pokemon-logo" style={{ backgroundImage: `url(${logo})` }}></div>
            </div>

            <div className="capture-btn-wrapper" style={{display : props.none}}>

                <button onClick={handleCaptureBtn}>
                    <div className="pokeball" style={{ backgroundImage: `url(${pokeball})` }}></div> 
                    <p>Captured Pokemon</p>
                </button>

            </div>
        </div>

    </div>
    )
}

Header.defaultProps = {
    display : "flex"
}

export default Header;