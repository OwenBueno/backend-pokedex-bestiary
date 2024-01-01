import { Request, Response } from 'express';
import pokemonClient from '../objects/pokemonClient';
import getPokemonInfo from '../utils/getPokemon';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  imageUrl: string;
  type: string;
  abilities: string;
  id: number;
}

// Function to fetch details for a list of pokemons
const normalizeSearchTerm = (search: string): string => search.replace(/\s/g, '-');

const filterPokemonsByName = (allPokemons: Pokemon[], normalizedSearch: string): Pokemon[] =>
  allPokemons.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(normalizedSearch.toLowerCase()));

const paginateResults = (filteredPokemons: Pokemon[], startIndex: number, endIndex: number): Pokemon[] =>
  filteredPokemons.slice(startIndex, endIndex);

const handlePokemonDetails = async (pokemons: Pokemon[], type: string): Promise<PokemonDetails[]> =>
  Promise.all(pokemons.map(async (pokemon: Pokemon) => await getPokemonInfoDetails(pokemon, type)));

const getPokemonInfoDetails = async (pokemon: Pokemon, type: string): Promise<PokemonDetails> => {
  const data = await getPokemonInfo(pokemon.name, type);
  return {
    name: data?.name || '',
    imageUrl: data?.imageUrl || '',
    type: data?.type || '',
    abilities: data?.abilities || '',
    id: data?.id || 0,
  };
};

export const getPokedex = async (req: Request, res: Response) => {
  try {
    let { limit, page, search, pdf } = req.query;
    const ValueLimit = limit ? parseInt(limit as string, 10) : 18;
    const ValuePage = page ? parseInt(page as string, 10) : 1;

    let pokemons;

    if (search) {
      try {
        const normalizedSearch = normalizeSearchTerm(search as string);
        const allPokemons = await pokemonClient.listPokemons(1, 2000);
        const filteredPokemons = filterPokemonsByName(allPokemons.results, normalizedSearch);

        const startIndex = ValuePage;
        const endIndex = startIndex + ValueLimit;
        const paginatedPokemons = paginateResults(filteredPokemons, startIndex, endIndex);
      
        if (paginatedPokemons.length !== ValueLimit && !pdf) {
          console.log(!pdf)
          return res.status(204).send();
        }

        const pokemonDetails = await handlePokemonDetails(paginatedPokemons, 'pokedex');
        return res.json({ results: pokemonDetails, count: filteredPokemons.length });
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    } else if (page) {
      pokemons = await pokemonClient.listPokemons(page, limit);
      if (pokemons.results.length !== ValueLimit && !pdf) {
        return res.status(204).send();
      }
    }

    const pokemonDetails = await handlePokemonDetails(pokemons.results, 'pokedex');
    return res.json({ results: pokemonDetails, count: pokemons.count });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};