import React from "react";
import { PokemonContext } from "../PokeContext";
import "./Captured.css";
import CaptureCard from "../component/CapturedCard";
import Header from "../component/Header";


function Captured() {

    const ctx = React.useContext(PokemonContext);
    const { myPokemon } = ctx.captured;
    //context my pokemon array

    const generateCards = myPokemon.map((pokemon, index) => {
        return <li key={index}><CaptureCard
            
            name={pokemon.name}
            nickname={pokemon.nickname}
            date={pokemon.date}
            sprite={pokemon.sprite}
            level={pokemon.level}
            color={pokemon.color}
            order={pokemon.order}
            types={pokemon.types}
        /></li>
    })

    React.useEffect(() => {
        console.log("myMon", myPokemon,)
    }, [])

    return (
        <div className="my-pokemon">

            <div className="capture-container-mb">
                <div className="cap-title-container">
                    <h1>Captured Pokemon</h1>
                </div>

                <div className="my-pokemon-container">
                    <ul className="my-pokemon-wrapper">
                        {generateCards}
                    </ul>
                </div>
            </div>

            <div className="capture-container-web">
                <Header none="none" />

                <div className="capture-list-container-web">

                    <div className="capture-list-wrapper-web">
                        <div className="capture-list-title-container">
                            <div className="title-wrapper">
                                <h4>POKEMON</h4>
                                <h4>NICKNAME</h4>
                                <h4>CAPTURED AT</h4>
                                <h4>CAPTURED LEVEL</h4>
                            </div>
                        </div>

                        <div className="capture-list-container">
                            <ul className="capture-list-ul-web">
                                {generateCards}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Captured;