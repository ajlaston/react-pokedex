import React from "react";
import PokeCard from "../component/PokeCard.js";
import Loader from "../component/Loader.js";
import Header from "../component/Header.js";
import { useNavigate } from "react-router-dom";
import DexApi from "../DexAPI.js";
import "./Home.css";

import pokeball from "../img/pokeball.png";

function Home() {

    const [dexData, setDexData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    

    const loadDexData = () => {
        //setLoading passed as arg in getPokemonList() sets it to true
        DexApi.getPokemonList(setLoading).then(res => {
            setDexData(res);
            setLoading(false);
        })
    }

    const handleCapturedBtn = () => {
        console.log("hello world");
    }

    React.useEffect(() => {
        loadDexData()
    }, [])

    React.useEffect(() => {
        console.log(dexData)
    }, [dexData])

    return (
        <div className="home">

            <Header />
            
            <div className="grid-wrapper">

                <div className="card-grid-container">
                    <div className="card-grid">
                        {loading ? <Loader /> :
                            dexData.map((pokemon, index) => {
                                return <PokeCard
                                    sprite={pokemon.sprites.other["official-artwork"].front_default}
                                    name={pokemon.species.name}
                                    order={pokemon.order}
                                    type={pokemon.types}
                                    key={pokemon.order}
                                />
                            })
                        }

                    </div>
                    <div className="captured"></div>
                </div>


            </div>

            {
                !loading && <button className="pokeball-btn" onClick={handleCapturedBtn}><img src={pokeball} alt="pokeball-btn" /></button>
            }


        </div>
    )
}

export default Home;