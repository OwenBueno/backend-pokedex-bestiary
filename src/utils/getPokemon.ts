import pokemonClient from '../objects/pokemonClient';
import PokemonInfo from '../models/pokemonInfo';

interface Info {
  name: string;
  url: string;
}
interface PokemonTypes {
  slot: number,
  type: Info
}
interface PokemonAbilities {
  ability: Info,
  is_hidden: boolean,
  slot: number
}

async function getPokemonInfo(name: string, type: string): Promise<PokemonInfo | null> {
  let pokemon = name.toLowerCase().replace(/\s+/g, "-");

  try {

    const data = await pokemonClient.getPokemonByName(pokemon);
    pokemon = pokemon.replace(/-/g, ' ');
    const imageUrl = data.sprites.front_default || "";
    const arrayTypes = data.types.map((obj: PokemonTypes) => obj.type.name);
    const typeString = arrayTypes.join(" - ");
    if(type.includes("pokedex")){
      let abilities = data.abilities.map((obj: PokemonAbilities) => obj.ability.name);
      abilities =abilities.join(" - ")
      if( type === "pokedexToPdf"){
        return { 
          id: data.id,
          name: pokemon,
          type: typeString, 
          abilities, 
          species: data.species.name,
          height: data.height,
          weight: data.weight,
          imageUrl, 
        };
      }
      return { 
        id: data.id,
        name: pokemon,
        type: typeString, 
        abilities, 
        species: "",
        height: 0,
        weight: 0,
        imageUrl, 
      };
    }

    return { 
      id: 0,
      name: pokemon,
      type: typeString, 
      abilities: "", 
      species: "",
      height: 0,
      weight: 0,
      imageUrl, 
    };
  } catch (error) {
    //console.error(error);
    console.log("Pokemon not found")
    return null;
  }
}

export default getPokemonInfo;