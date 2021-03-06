const DexApi = {

    url : "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
    next : "",

    setURL(value){
        this.next = value;
    },

    //get pokemon list
    async getPokemonList(setIsLoading, load=true, page=1){
        if(load){
            setIsLoading(true);
        }

        const fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page}`);
        const data = await fetchData.json();
        const results = data.results;
        
        const mapped = results.map(async pokemon=>{
            const fetchPokemon = await fetch(pokemon.url);
            const data = await fetchPokemon.json();
            return data;
        })

        return Promise.all(mapped);
    },

    //get one pokemon
    async getPokemon(name, setIsLoading){
        setIsLoading(true)
        const fetchPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await fetchPokemon.json();
        const result =  data;
    
        return result;
    },

    //methods used to format data for different cards.
    card: {

        //colors for all pokemon types
        colors: { "rock": "#bbaa66", "ghost": "#6666ba", "steel": "#aaaabb", "water": "#3399fe", "grass": "#76cc55", "psychic": "#ff5599", "ice": "#65ccff", "dark": "#775444", "fairy": "#ee99ee", "normal": "#aaaa9b", "fighting": "#ba5544", "flying": "#8799ff", "poison": "#aa5599", "ground": "#ddbb54", "bug": "#a9bb22", "fire": "#eb5435", "electric": "#ffcc33", "dragon": "#6666ba" },

        //parses fetched data and returns corresponding color for type.
        setBackgroundColor(type) {
            const typeName = type[0].type.name;
            return this.colors[typeName];
        },

        //formats name from fetched data
        formatName(name) {
            const str = name.split("");

            let upper = true;

            const mappedString = str.map((char, index, array) => {
                if (upper) {
                    upper = false;
                    return char.toUpperCase();
                } else if (char === " ") {
                    upper = true;
                    return " ";
                } else {
                    return char
                }
            })

            const result = mappedString.join("").trim();
            return result;
        },

        //formats type(s) from fetched data
        formatType(arr) {
            const typeArr = [];

            arr.forEach((item, index, array) => {
                const typeName = this.formatName(item.type.name);
                typeArr.push(typeName);

                if (array[index + 1]) {
                    typeArr.push('??')
                }
            })

            const result = typeArr.join(" ").trim();

            return result;
        },

        //format order from fetched data
        formatOrder(num) {
            const numArr = num.toString().split("");

            switch (numArr.length) {
                case 1:
                    numArr.unshift('00');
                    break;
                case 2:
                    numArr.unshift('0');
                    break;
                default:
                    break;
            }

            const result = numArr.join("");
            return result;
        }
    },

    //handles storage data
    storage : {

        //saves pokemon to localStorage
        save(array){
            localStorage.setItem("pokedex", JSON.stringify(array))
        },

        //loads captured pokemon from localStorage
        load(){
            if(localStorage.getItem("pokedex")){
                return JSON.parse(localStorage.getItem("pokedex"));
            } else {
                throw new Error("pokedex does not exist");
            }
        },

        //resets captured pokemon localStorage
        reset(){
            localStorage.setItem("pokedex", "[]");
        }
    }
}

export default DexApi;