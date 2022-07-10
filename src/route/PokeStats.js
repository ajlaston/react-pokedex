import React from "react";
import { useParams } from "react-router-dom";

function PokeStats(){

    const params = useParams();


    console.log(params.id)
    return (
        <div>
            stats {params.id}
        </div>
    )
}

export default PokeStats;