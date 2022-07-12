import React from "react";
import "./Details.css";
import CaptureForm from "../component/CaptureForm";
import Loader from "../component/Loader";
import { PokemonContext } from "../PokeContext";
import {useParams } from "react-router-dom";
import DexApi from "../DexAPI";


function Details() {

    //fetchedData && DetailData
    const ctx = React.useContext(PokemonContext);

    const { detailData, setDetailData, setFetchedData, fetchedData } = ctx.details;
    const { toggleForm, setDisplay } = ctx.captureForm;
    const { myPokemon } = ctx.captured;

    const [loading, setLoading] = React.useState(true);
    const {name} = useParams();
    const pokemon = myPokemon.find(pokemon => pokemon.name.toLowerCase() === name);

    const loadData = () => {
        if (!pokemon) {
            DexApi.getPokemon(name, setLoading).then(res => {

                setFetchedData(res);
                console.log(res);
            })
        }
    }

    const formatDetails = () => {
        if (fetchedData) {
            const name = DexApi.card.formatName(fetchedData.name);
            const order = DexApi.card.formatOrder(fetchedData.order);
            const types = DexApi.card.formatType(fetchedData.types);
            const color = DexApi.card.setBackgroundColor(fetchedData.types)
            setDetailData({
                name,
                order,
                types,
                color,
                sprite: fetchedData.sprites.other['official-artwork'].front_default,
                height: fetchedData.height,
                weight: fetchedData.weight,
                hp: fetchedData.stats[0].base_stat,
                attack: fetchedData.stats[1].base_stat,
                defense: fetchedData.stats[2].base_stat,
                specialAttack: fetchedData.stats[3].base_stat,
                specialDefense: fetchedData.stats[4].base_stat,
                speed: fetchedData.stats[5].base_stat,
                captured: fetchedData.captured ? true : false

            })
        }

    }

    const onLoad = () => {
        setDisplay("none");
        loadData();
    }

    const openForm = () => {
        toggleForm("initial")
    }

    React.useEffect(() => {
        onLoad();
    }, [])

    React.useEffect(() => {
        if(pokemon){
            setDetailData(pokemon);
            setLoading(false);
        }
        else if (fetchedData !== null) {
            formatDetails();
            setLoading(false);
        } 
    }, [fetchedData]);

    return (

        <div>
            {loading ?
                <Loader />

                :

                <div className="poke-details">
                    <div className="img-box" style={{ backgroundColor: detailData.color }}>
                        <div className="img-box-content">
                            <div className="pokemon-img-wrapper">
                                <div className="pokemon-img" style={{ backgroundImage: `url(${detailData.sprite})` }}></div>
                            </div>
                            <p className="pokemon-name">#{detailData.order} {detailData.name}</p>
                        </div>
                    </div>

                    <div className="stat-container">
                        <div className="stat-wrapper">
                            <div className="about">
                                <h3>About</h3>
                                <p>Type(s): {detailData.types}</p>
                                <p>Weight: {detailData.weight} kg</p>
                                <p>Height: {detailData.height} m</p>
                            </div>

                            <div className="base-stats">
                                <h3>Base Stats</h3>
                                <p>HP: {detailData.hp}</p>
                                <p>Attack: {detailData.attack} </p>
                                <p>Defence: {detailData.defense} </p>
                                <p>Special Attack: {detailData.specialAttack} </p>
                                <p>Special Defense: {detailData.specialDefense} </p>
                                <p>Speed: {detailData.speed} </p>
                            </div>


                        </div>


                    </div>

                    {/* button used to open form to capture pokemon */}

                    {

                        detailData.captured 
                        ?

                            <div className="capture-info-container">
                                <div className="capture-info"> 
                                        <h3>Capture Information</h3>
                                        <p>Nickname: {detailData.nickname}</p>
                                        <p>Captured on: {detailData.date}</p>
                                        <p>Level: {detailData.level}</p>    
                                </div>
                            </div>

                            :

                            <div>
                                <div className="open-form-container">
                                    <button className="open-form-btn" onClick={openForm}>Capture</button>
                                </div>
                                  
                                 <CaptureForm />
                                
                               
                            </div>
                    }



                </div>
            }
        </div>

    )
}

export default Details;