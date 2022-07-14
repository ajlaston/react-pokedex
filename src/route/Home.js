import React, { useContext } from "react";
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
    const { setFetchedData, detailDisplay, setDetailDisplay } = ctx.details;
    const { homeDetails } = ctx.home;
    const { setDisplay } = ctx.captureForm;

    const [page, setPage] = React.useState(1);
    const [dexData, setDexData] = React.useState([]);

    const scrollRef = React.useRef(false);

    const [loading, setLoading] = React.useState(true);

    //get page from Api and set to dexData
    const fetchDexData = () => {
        DexApi.getPokemonList(setLoading, false, page).then(res => {
            setDexData([...dexData, ...res]);
        })
    }

    //on mount data is loaded and scrollref is set to true.
    const onLoad = () => {
        setDisplay("none")
        setFetchedData(null);

        DexApi.getPokemonList(setLoading, false, 0).then(res => {
            setDexData([...dexData, ...res]);
            setLoading(false)
            scrollRef.current = true;
        });
    }

    //if at bottom of page, page updates with more pokemon
    const handleScroll = (e) => {
        if (window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight ) {
            setPage(page + 20);
            console.log("bottom")
        }
    }

    //listens for scrolling and updates dexData array (updates home screen with pokemon)
    window.onscroll = () => handleScroll();

    const handleCapturedBtn = () => {
        navigate("/captured");
    }

    React.useEffect(() => {
        //the code commented below resets the local storage for all pokemon
        //DexApi.storage.reset();

        onLoad();
        setDetailDisplay("none");
    }, [])


    //if at bottom of page data is fetched
    React.useEffect(() => {
        if (page > 1 && scrollRef.current) {
            fetchDexData();
        }
    }, [page])

    return (
        <div className="home">

            <Header />

            <div className="grid-wrapper">

                <div className="card-grid-container">

                    {loading === true ? <Loader /> :
                        <ul className="card-grid">
                            {dexData.length > 0 && dexData.map((pokemon, index) => {
                                return <li key={pokemon.order}><PokeCard
                                    sprite={pokemon.sprites.other["official-artwork"].front_default}
                                    name={pokemon.species.name}
                                    order={pokemon.order}
                                    type={pokemon.types}
                                /></li>
                            })}
                        </ul>
                    }

                    {
                        homeDetails &&

                        <div className="captured" style={{display : detailDisplay}}>
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