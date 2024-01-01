import pokemonClient from '../objects/pokemonClient'

interface PokemonData {
  name: string; 
  imageUrl: string;
  type: string;
  abilities: string;
  id: number;
}
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

async function getPokemonInfo(name: string, type: string): Promise<PokemonData | null> {
  let pokemon = name.toLowerCase().replace(/\s+/g, "-");

  try {
    const data = await pokemonClient.getPokemonByName(pokemon);
    pokemon = pokemon.replace(/-/g, ' ');
    const imageUrl = data.sprites.front_default || "";
    const arrayTypes = data.types.map((obj: PokemonTypes) => obj.type.name);
    const typeString = arrayTypes.join(" - ");
    if(type === "pokedex"){
      let abilities = data.abilities.map((obj: PokemonAbilities) => obj.ability.name);
      abilities =abilities.join(" - ")
      return { name: pokemon, imageUrl, type: typeString, abilities, id: data.id };
    }

    return { name: pokemon, imageUrl, type: typeString, abilities: "", id: 0 };
  } catch (error) {
    //console.error(error);
    console.log("Pokemon not found")
    return null;
  }
}

export default getPokemonInfo;