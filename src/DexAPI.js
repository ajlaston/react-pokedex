const DexApi = {

    url : "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    next : "",

    setURL(value){
        this.next = value;
    },

    async getPokemonList(setIsLoading){
        setIsLoading(true);
        const fetchData = await fetch(this.url);
        const data = await fetchData.json();
        const results = data.results;
        
        const mapped = results.map(async pokemon=>{
            const fetchPokemon = await fetch(pokemon.url);
            const data = await fetchPokemon.json();
            return data;
        })

        return Promise.all(mapped);
    },

    async getPokemon(name, setIsLoading){
        setIsLoading(true)
        const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await fetchPokemon.json();
        const result =  data;
    
        return result;
    }
}

export default DexApi;