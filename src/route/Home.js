import React, { useCallback, useContext, useMemo, useRef } from "react";
import PokeCard from "../component/PokeCard.js";
import Loader from "../component/Loader.js";
import Header from "../component/Header.js";
import CaptureForm from "../component/CaptureForm.js";
import DexApi from "../DexAPI.js";
import "./Home.css";

import pokeball from "../img/pokeball.png";
import { PokemonContext } from "../PokeContext.js";
import { useNavigate } from "react-router-dom";
import Details from "./Details.js";

function Home() {

    const navigate = useNavigate();

    const ctx = useContext(PokemonContext);
    const { setFetchedData } = ctx.details;
    const { homeDetails } = ctx.home;
    const {setDisplay} = ctx.captureForm;
    const [page, setPage] = React.useState(1);

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
        setDisplay("none")
        setFetchedData(null);
        loadDexData()
    }

    const handleCapturedBtn = () => {
        navigate("/captured");
    }

    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop  === document.documentElement.offsetHeight){
            // DexApi.getPokemonList(setLoading).then(res=>{
            //     setDexData(prev=>{
            //         return [...prev, ...res]
            //     });
            //     setLoading(false);
            // })
            console.log("hii")
        }
    }

    window.onscroll = () => handleScroll();

    React.useEffect(() => {
        //resets the local storage for all pokemon
        //DexApi.storage.reset();
        
        onLoad();
    }, [])

    React.useEffect(() => {
        console.log("jjj")
    }, [homeDetails])

    return (
        <div className="home">

            <Header />

            <div className="grid-wrapper">

                <div className="card-grid-container">
                    <div className="card-grid">
                        {loading ? <Loader /> :
                            dexData.map((pokemon, index) => {
                                if(index === dexData.length -1){
                                    return <PokeCard
                                    sprite={pokemon.sprites.other["official-artwork"].front_default}
                                    name={pokemon.species.name}
                                    order={pokemon.order}
                                    type={pokemon.types}
                                    key={pokemon.order}
                                    page={page}
                                />
                                } else {
                                    return <PokeCard
                                    sprite={pokemon.sprites.other["official-artwork"].front_default}
                                    name={pokemon.species.name}
                                    order={pokemon.order}
                                    type={pokemon.types}
                                    key={pokemon.order}
                                />
                                }

                               
                            })
                        }

                    </div>

                    {
                        homeDetails &&

                        <div className="captured">
                            <Details />
                        </div>
                    }

                </div>


            </div>

            {
                !loading && <button className="pokeball-btn" onClick={handleCapturedBtn}><img src={pokeball} alt="pokeball-btn" /></button>
            }

            <CaptureForm />


        </div>
    )
}

export default Home;