import React from "react";
import Loader from "../component/Loader";
import PokeDetails from "../component/PokeDetails";
import { useParams } from "react-router-dom";
import DexApi from "../DexAPI";
import { PokemonContext } from "../PokeContext";

function PokeStats() {

    const ctx = React.useContext(PokemonContext);

    const [fetchedData, setFetchedData] = React.useState(null);
    const [pokemonStats, setPokemonStats] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const params = useParams();

    console.log(params.name);

    const loadData = () => {
        DexApi.getPokemon(params.name, setLoading).then(res => {
            setFetchedData(res);
            console.log(res);
            setLoading(false);
        })
    }

    const generatePokemonStats = () => {
        const name = ctx.card.formatName(fetchedData.name);
        const order = ctx.card.formatOrder(fetchedData.order);
        const types = ctx.card.formatType(fetchedData.types);
        const color = ctx.card.setBackgroundColor(fetchedData.types)
        setPokemonStats({
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

        })
    }

    React.useEffect(() => {
        loadData();
    }, []);

    React.useEffect(() => {
        if (fetchedData !== null) {
            generatePokemonStats()
        }
    }, [fetchedData])

    return (
        <div>
            {
                loading ? <Loader />

                    :

                    <PokeDetails {...pokemonStats} />

            }

        </div>
    )
}

export default PokeStats;