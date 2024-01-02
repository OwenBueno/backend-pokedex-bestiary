import { Request, Response } from "express";
import { PokemonModel } from "../models/pokemon";
import getPokemonInfo from "../utils/getPokemon";

const doesPokemonExist = async (name: string) => {
  const existingPokemon = await PokemonModel.findOne({ name });
  return !!existingPokemon;
};

export const getPokemons = async (_req: Request, res: Response) => {
  try {
    const pokemons = await PokemonModel.find();

    // Check if no Pokémon are found
    if (!pokemons || pokemons.length === 0) {
      return res.status(204).send();
    }

    res.json(pokemons);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addPokemon = async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    let { name, type } = req.body;
    name = (name as string).replace(/\s/g, "-");

    // Check if a Pokemon with the same name already exists
    const pokemonExists = await doesPokemonExist(name);

    if (pokemonExists) {
      // Pokemon with the same name already exists, return an error response
      return res.status(204).json({ error: "Pokemon with the same name already exists" });
    }

    // Continue with the code to fetch imageUrl and type
    const data = await getPokemonInfo(name, "pokemon");
    const imageUrl = data?.imageUrl ? data?.imageUrl : "";
    type = data?.type ? data?.type : type;

    const newPokemon = new PokemonModel({ name, type, imageUrl });

    // Save the document to the database
    await newPokemon.save();

    res.json(newPokemon);
  } catch (error) {
    console.error("Error handling POST request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let { name, type } = req.body;
    name = (name as string).replace(/\s/g, "-");
    // Check if a Pokemon with the same name already exists (excluding the current Pokemon being updated)
    const pokemonExists = await doesPokemonExist(name);

    if (pokemonExists) {
      // Pokemon with the same name already exists, return an error response
      return res.status(204).json({ error: "Pokemon with the same name already exists" });
    }

    // Continue with the code to fetch imageUrl and type
    const data = await getPokemonInfo(name, "pokemon");
    const imageUrl = data?.imageUrl ? data?.imageUrl : "";
    type = data?.type ? data?.type : type;

    const updatedPokemon = await PokemonModel.findByIdAndUpdate(id, { name, type, imageUrl }, { new: true });
    res.json(updatedPokemon);
  } catch (error) {
    console.error("Error updating pokemon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePokemon = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await PokemonModel.findByIdAndDelete(id);
    res.json({ message: "Pokemon deleted successfully" });
  } catch (error) {
    console.error("Error deleting pokemon:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
