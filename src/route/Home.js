import React from "react";
import PokeCard from "../component/PokeCard.js";
import Loader from "../component/Loader.js";
import DexApi from "../DexAPI.js";
import logo from "../img/Pokédex_logo.png";
import pokeball from "../img/pokeball.png"
import "./Home.css";



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

            <div className="pokemon-logo-container">

                <div className="pokemon-logo-container-wrapper">
                    <div className="logo-wrapper">
                        <div className="pokemon-logo" style={{ backgroundImage: `url(${logo})` }}></div>
                    </div>

                    <div className="capture-btn-wrapper">
                        <button><div className="pokeball" style={{ backgroundImage: `url(${pokeball})` }}></div> <p>Captured Pokemon</p></button>
                    </div>
                </div>

            </div>


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