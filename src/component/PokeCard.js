import React from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../PokeContext";
import "./PokeCard.css";
import DexApi from "../DexAPI";

function PokeCard(props) {

    const navigate = useNavigate();
    const ctx = React.useContext(PokemonContext);
    const {setHomeDetails} = ctx.home;
    const {setQuery} = ctx.home;


    /*when card is clicked  if on home screen detail component pops up 
    else navigates to details route and the pokemon as the endpoint in mobile */
    const handleCardClick = () => {
        if(window.innerWidth >= 1031){
            setQuery(props.name);
            setHomeDetails(true);
        } else {
            navigate(`/details/${props.name}`);
        }
        
    }

    //props changed to proper format to be viewed in card
    const color = DexApi.card.setBackgroundColor(props.type);
    const type = DexApi.card.formatType(props.type);
    const order = DexApi.card.formatOrder(props.order);
    const name = DexApi.card.formatName(props.name);

    return (
        <div className="pokemon-card" style={{ backgroundColor: color }}>
            <button className="card-btn" onClick={handleCardClick}>
                <div className="card-wrapper">

                    <div className="card-img" style={{ backgroundImage: `url(${props.sprite})` }}></div>

                    <div className="card-details">
                        <p className="card-name"> {order} {name}</p>
                        <p className="card-type">{type}</p>
                    </div>

                </div>
            </button>
        </div>

    )
}

export default PokeCard;