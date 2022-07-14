import React from "react";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../PokeContext";
import "./PokeCard.css";
import DexApi from "../DexAPI";

function PokeCard(props) {

    const navigate = useNavigate();
    const ctx = React.useContext(PokemonContext);
    const {homeDetails ,setHomeDetails} = ctx.home;
    const {query,setQuery} = ctx.home;

    const colors = { "rock": "#bbaa66", "ghost": "#6666ba", "steel": "#aaaabb", "water": "#3399fe", "grass": "#76cc55", "psychic": "#ff5599", "ice": "#65ccff", "dark": "#775444", "fairy": "#ee99ee", "normal": "#aaaa9b", "fighting": "#ba5544", "flying": "#8799ff", "poison": "#aa5599", "ground": "#ddbb54", "bug": "#a9bb22", "fire": "#eb5435", "electric": "#ffcc33", "dragon": "#6666ba" }

    const setBackground = (type) => {
        const typeName = type[0].type.name;
        return colors[typeName];
    }

    const parseOrder = (num) => {
        const numArr = num.toString().split("");

        switch (numArr.length) {
            case 1:
                numArr.unshift('00');
                break;
            case 2:
                numArr.unshift('0');
                break;
            default:
                break;
        }

        const result = numArr.join("");
        return result;
    }

    const parseName = (name) => {
        const str = name.split("");

        let upper = true;

        const mappedString = str.map((char, index, array) => {
            if (upper) {
                upper = false;
                return char.toUpperCase();
            } else if (char === " ") {
                upper = true;
                return " ";
            } else {
                return char
            }
        })

        const result = mappedString.join("").trim();
        return result;
    }

    const parseType = (arr) => {
        const typeArr = [];

        arr.forEach((item, index, array) => {
            const typeName = parseName(item.type.name);
            typeArr.push(typeName);

            if (array[index + 1]) {
                typeArr.push('·')
            }
        })

        const result = typeArr.join(" ").trim();

        return result;
    }

    //click 
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