import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DexApi from "../DexAPI.js";

import PokeCard from "../component/PokeCard.js";
import Loader from "../component/Loader.js";
import Header from "../component/Header.js";
import CaptureForm from "../component/CaptureForm.js";
import DetailCard from "../component/DetailCard";

import pokeball from "../img/pokeball.png";
import { PokemonContext } from "../PokeContext.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./Home.css";



function Home() {

    const navigate = useNavigate();

    const ctx = useContext(PokemonContext);
    const { setFetchedData } = ctx.details;
    const { homeDetails } = ctx.home;
    const { setDisplay} = ctx.captureForm;

    const [page, setPage] = React.useState(1);
    const [dexData, setDexData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const scrollRef = React.useRef(false);

    //get page from Api and set to dexData
    const fetchDexData = () => {
        DexApi.getPokemonList(setLoading, false, page).then(res => {
            setDexData([...dexData, ...res]);
        })
    }

    //on mount data is loaded and scrollref is set to true.
    const onLoad = () => {

        //closes pop up if open
        setDisplay("none")
        setFetchedData(null);

        DexApi.getPokemonList(setLoading, false, 0).then(res => {
            setDexData([...dexData, ...res]);
            setLoading(false)
            scrollRef.current = true;
        });
    }

    const endOfPage = () => {
        setPage(page + 20);
    }

    //listens for scrolling and updates dexData array (updates home screen with pokemon)

    //switches to the /captured route that show all captured pokemon
    const handleCapturedBtn = () => {
        navigate("/captured");
    }

    React.useEffect(() => {
        //the code commented below resets the local storage for all pokemon
        //DexApi.storage.reset();

        onLoad();

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

            {loading ? <Loader /> :
                <div className="grid-wrapper">

                    <div className="card-grid-container">


                        <ul className="card-grid">
                            <InfiniteScroll className="card-grid" 
                                style={{overflow : "hidden"}}
                                dataLength={dexData.length}
                                next={endOfPage}
                                hasMore={true}
                                loader={<Loader/>}
                            >
                                {dexData.length > 0 && dexData.map((pokemon, index) => {
                                    return <li key={pokemon.order}><PokeCard
                                        sprite={pokemon.sprites.other["official-artwork"].front_default}
                                        name={pokemon.species.name}
                                        order={pokemon.order}
                                        type={pokemon.types}
                                    /></li>
                                })}
                            </InfiniteScroll>

                        </ul>


                        {
                            homeDetails &&

                            <div className="captured" >
                                <DetailCard />
                            </div>
                        }

                    </div>


                </div>

            }

            {
                !loading && <button className="pokeball-btn" onClick={handleCapturedBtn}><img src={pokeball} alt="pokeball-btn" /></button>
            }


            <CaptureForm />


        </div>
    )
}

export default React.memo(Home);