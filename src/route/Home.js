import React, { useCallback, useContext, useMemo } from "react";
import PokeCard from "../component/PokeCard.js";
import Loader from "../component/Loader.js";
import Header from "../component/Header.js";
import DexApi from "../DexAPI.js";
import "./Home.css";

import pokeball from "../img/pokeball.png";
import { PokemonContext } from "../PokeContext.js";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const ctx = useContext(PokemonContext);
    const {setFetchedData} = ctx.details;

    const [dexData, setDexData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    

    const loadDexData = () => {
        //setLoading passed as arg in getPokemonList() sets it to true
        DexApi.getPokemonList(setLoading).then(res => {
            setDexData(res);
            setLoading(false);
        })
    }

    const onLoad = () => {
        setFetchedData(null);
        loadDexData()
    }

    const handleCapturedBtn = () => {
        navigate("/captured")
    }

    React.useEffect(() => {
        //resets the local storage for all pokemon
        //DexApi.storage.reset();
      
       onLoad();
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