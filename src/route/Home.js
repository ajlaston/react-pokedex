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
    const { setFetchedData } = ctx.details;
    const { homeDetails } = ctx.home;
    const { setDisplay } = ctx.captureForm;

    const [page, setPage] = React.useState(1);
    const [dexData, setDexData] = React.useState([]);

    const scrollRef = React.useRef(false);

    const [loading, setLoading] = React.useState(true);

    const fetchDexData = () => {
        DexApi.getPokemonList(setLoading, false, page).then(res => {
            setDexData([...dexData, ...res]);
        })
    }

    const onLoad = () => {
        setDisplay("none")
        setFetchedData(null);

        DexApi.getPokemonList(setLoading, false, 0).then(res => {
            setDexData([...dexData, ...res]);
            setLoading(false)
            scrollRef.current = true;
        });
    }

    const handleScroll = (e) => {
        if (window.innerHeight + document.documentElement.scrollTop === document.body.scrollHeight && scrollRef.current) {
            setPage(page + 20);
        }
    }

    window.onscroll = () => handleScroll();

    const handleCapturedBtn = () => {
        navigate("/captured");
    }

    React.useEffect(() => {
        //the code commented below resets the local storage for all pokemon
        //DexApi.storage.reset();

        onLoad();

    }, [])


    React.useEffect(() => {
        if (page > 1 && scrollRef) {
            fetchDexData();
        }
    }, [page])

    return (
        <div className="home">

            <Header />

            <div className="grid-wrapper">

                <div className="card-grid-container">

                    {loading === true ? <Loader /> :
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