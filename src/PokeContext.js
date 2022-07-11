import React from "react";

const PokemonContext = React.createContext();

function PokeContextComponent(props) {

    const [pokeDetails, setPokeDetails] = React.useState({});

    const app = {
        colors: { "rock": "#bbaa66", "ghost": "#6666ba", "steel": "#aaaabb", "water": "#3399fe", "grass": "#76cc55", "psychic": "#ff5599", "ice": "#65ccff", "dark": "#775444", "fairy": "#ee99ee", "normal": "#aaaa9b", "fighting": "#ba5544", "flying": "#8799ff", "poison": "#aa5599", "ground": "#ddbb54", "bug": "#a9bb22", "fire": "#eb5435", "electric": "#ffcc33", "dragon": "#6666ba" },

        card : {
            setBackgroundColor(type) {
                const typeName = type[0].type.name;
                return app.colors[typeName];
            },
    
            formatName(name){
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

            formatType(arr){
                const typeArr = [];
        
                arr.forEach((item, index, array) => {
                    const typeName = this.formatName(item.type.name);
                    typeArr.push(typeName);
        
                    if (array[index + 1]) {
                        typeArr.push('·')
                    }
                })
        
                const result = typeArr.join(" ").trim();
        
                return result;
            },

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
        

        details : {
            pokeDetails : pokeDetails,
            setPokeDetails,
        }
    }


    return (
        <PokemonContext.Provider value={app}>
            {props.children}
        </PokemonContext.Provider>
    )
}

export { PokeContextComponent as PokemonContextProvider, PokemonContext }