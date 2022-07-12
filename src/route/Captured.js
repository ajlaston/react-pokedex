import React from "react";
import { PokemonContext } from "../PokeContext";
import "./Captured.css";
import CaptureCard from "../component/CapturedCard";


function Captured() {

    const ctx = React.useContext(PokemonContext);
    const { myPokemon } = ctx.captured;
    //context my pokemon array

    const generateCards = myPokemon.map((pokemon, index) => {
        return <CaptureCard
            key={index}
            name={pokemon.name}
            nickname={pokemon.nickname}
            date={pokemon.date}
            sprite={pokemon.sprite}
            level={pokemon.level}
            color={pokemon.color}
        />
    })

    React.useEffect(() => {
        console.log("myMon", myPokemon,)
    }, [])

    return (
        <div className="my-pokemon">
            <div className="cap-title-container">
                <h1>Captured Pokemon</h1>
            </div>

            <div className="my-pokemon-container">
                <div className="my-pokemon-wrapper">
                    {generateCards}
                </div>
            </div>
        </div>
    )
}

export default Captured;