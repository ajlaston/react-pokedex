import React from "react";
import "./CaptureForm.css";
import { PokemonContext } from "../PokeContext";
import DexApi from "../DexAPI";

function CaptureForm() {

    const ctx = React.useContext(PokemonContext);
    const { formData, setFormData, display, toggleForm, handleSubmit, capturePokemon } = ctx.captureForm;
    const { detailData } = ctx.details;
    const { myPokemon, setMyPokemon } = ctx.captured;

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    //if you click outside of form it will close the form
    const closeForm = (e) => {
        if (e.target.className === "pop-up-wrapper") {
            toggleForm();
        }
    }

    React.useEffect(() => {
        if(display !== "none"){
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "initial";
        }
        
    }, [display])

    return (
        <div className="pop-up-container" style={{ display: display }}>
            <div className="pop-up-wrapper" onClick={closeForm}>

                <div className="pop-up">
                    <h2>Capturing {detailData.name}</h2>

                    {/* form data below */}
                    <form className="pop-up-form" onSubmit={capturePokemon}>

                        <input
                            name="nickname"
                            onChange={handleChange}
                            value={formData.nickname}
                            placeholder="Nickname"
                            
                        />

                        <input
                            name="date"
                            type="date"
                            onChange={handleChange}
                            value={formData.date}
                            placeholder="Captured Date"
                            required
                        />

                        <input
                            name="level"
                            type="number"
                            onChange={handleChange}
                            value={formData.level}
                            placeholder="Captured Level"
                            required
                        />

                        <button className="pop-up-btn" >Capture</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default CaptureForm;