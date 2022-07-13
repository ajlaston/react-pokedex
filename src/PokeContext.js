import React from "react";
import { useNavigate } from "react-router-dom";
import DexApi from "./DexAPI";

const PokemonContext = React.createContext();

function PokeContextComponent(props) {

   

    //state and helper functions (loadData)

    //local storage

    //home component toggle detail component
    const [homeDetails, setHomeDetails] = React.useState(false)
    const [query, setQuery] = React.useState("");

    //pokemon detail state object for PokeDetails Component
    const [fetchedData, setFetchedData] = React.useState(null);
    const [detailData, setDetailData] = React.useState({
        name: "",
        order: "",
        type: "",
        level: "",
        BackgroundColor: "",
        sprite: "",
        nickname: "",
        date: ""
    })

    //states for CaptureForm Component
    const [display, setDisplay] = React.useState("none");
    const [captureFormData, setCaptureFormData] = React.useState({
        nickname: "",
        date: "",
        level: ""
    })

    const [myPokemon, setMyPokemon] = React.useState([]);

    const app = {

        home : {
            homeDetails : homeDetails,
            setHomeDetails,

            query : query,
            setQuery
        },

        //detail component states and methods
        details: {
            detailData: detailData,
            setDetailData,

            fetchedData: fetchedData,
            setFetchedData,
        },

        //CaptureForm state and Component
        captureForm: {

            display: display,
            setDisplay,

            formData: captureFormData,
            setFormData: setCaptureFormData,

            clearForm() {
                this.setFormData({
                    nickname: "",
                    level: "",
                    date: "",
                });
            },

            toggleForm(value = null) {
                if(value === "initial"){
                    setDisplay(value);
                } else if(value === "none"){
                    setDisplay(value);
                } else {
                    setDisplay(prev => prev === "initial" ? "none" : "initial");
                }
                
            },

            capturePokemon(e) {
                e.preventDefault();

                const pokemon = {
                    ...detailData,
                    ...app.captureForm.formData,
                    captured : true
                }

                setMyPokemon(prev =>{
                    const res = [...prev, pokemon]
                    return res;
                });
                setDetailData(pokemon);


                app.captureForm.toggleForm();
                app.captureForm.clearForm();
            }
        },

        //methods and properties for the Captured route
        captured: {
            myPokemon: myPokemon,
            setMyPokemon,
        }
    }

    React.useEffect(() => {
        setMyPokemon(DexApi.storage.load());
    }, [])

    React.useEffect(()=>{

        //only save if pokemon array has been loaded from storage and changes.
        if(myPokemon.length > 0){
            DexApi.storage.save(myPokemon);
        }
    }, [myPokemon]);


    return (
        <PokemonContext.Provider value={app}>
            {props.children}
        </PokemonContext.Provider>
    )
}

export { PokeContextComponent as PokemonContextProvider, PokemonContext }