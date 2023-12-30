import { PokemonClient } from 'pokenode-ts';

interface PokemonData {
  imageUrl: string;
  type: string;
}

async function getImageUrl(name: string): Promise<PokemonData | null> {
  const api = new PokemonClient();
  const pokemon = name.toLowerCase();

  try {
    const data = await api.getPokemonByName(pokemon);

    const imageUrl = data.sprites.front_default || "";
    const arrayTypes = data.types.map((type: any) => type.type.name);

    const typeString = arrayTypes.join(" - ");

    const result: PokemonData = { imageUrl, type: typeString };

    return result;
  } catch (error) {
    console.error("Pokemon not Found");
    return null;
  }
}

export default getImageUrl;