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

const pageNumber = 1;

function Home() {

    const navigate = useNavigate();

    const ctx = useContext(PokemonContext);
    const { setFetchedData } = ctx.details;
    const { homeDetails } = ctx.home;
    const { setDisplay } = ctx.captureForm;

    const [page, setPage] = React.useState(pageNumber);
    const [dexData, setDexData] = React.useState([]);

    const [loading, setLoading] = React.useState(false);

    const fetchDexData = () => {
        DexApi.getPokemonList(setLoading, false, page).then(res => {
            setDexData([...dexData, ...res]);
        })
    }

    const onLoad = () => {
        setDisplay("none")
        setFetchedData(null);
    }

    const handleCapturedBtn = () => {
        navigate("/captured");
    }

    const handleScroll = (e) => {
        if (window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight) {
            setPage(page + 20);
        }
    }

    window.onscroll = () => handleScroll();

    React.useEffect(() => {
        onLoad();
    }, [])


    React.useEffect(() => {
        //resets the local storage for all pokemon
        //DexApi.storage.reset();
        fetchDexData();
    }, [page])

    return (
        <div className="home">

            <Header />

            <div className="grid-wrapper">

                <div className="card-grid-container">

                    {loading ? <Loader /> :
                        <div className="card-grid">
                            {dexData.length > 0 && dexData.map((pokemon, index) => {
                                return <PokeCard
                                    sprite={pokemon.sprites.other["official-artwork"].front_default}
                                    name={pokemon.species.name}
                                    order={pokemon.order}
                                    type={pokemon.types}
                                    key={pokemon.order}
                                />
                            })}
                        </div>
                    }

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

export default React.memo(Home);