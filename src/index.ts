import express, { Request, Response } from 'express';
import cors from 'cors';

import { PokemonModel } from './schema/pokemon'; // Import the PokemonModel
import getImageUrl from './utils/getPokemon';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/pokemons', async (_req, res) => {
    try {
      const pokemons = await PokemonModel.find();
      
      // Check if no Pokémon are found
      if (!pokemons || pokemons.length === 0) {
        return res.status(204).send();
      }
  
      res.json(pokemons);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/pokemons', async (req, res) => {
    try {
      // Extract data from the request body
      let { name, type } = req.body;
  
      // Check if a Pokemon with the same name already exists
      const pokemonExists = await doesPokemonExist(name);
  
      if (pokemonExists) {
        // Pokemon with the same name already exists, return an error response
        return res.status(204).json({ error: 'Pokemon with the same name already exists' });
      }
  
      // Continue with the code to fetch imageUrl and type
      const data = await getImageUrl(name);
      const imageUrl = data?.imageUrl ? data?.imageUrl : "";
      type = data?.type ? data?.type : type;
  
      const newPokemon = new PokemonModel({ name, type, imageUrl });
  
      // Save the document to the database
      await newPokemon.save();
  
      res.json(newPokemon);
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.put('/api/pokemons/:id', async (req, res) => {
    const { id } = req.params;
    let { name, type } = req.body;
  
    // Check if a Pokemon with the same name already exists (excluding the current Pokemon being updated)
    const pokemonExists = await doesPokemonExist(name);
  
    if (pokemonExists) {
      // Pokemon with the same name already exists, return an error response
      return res.status(204).json({ error: 'Pokemon with the same name already exists' });
    }
  
    // Continue with the code to fetch imageUrl and type
    const data = await getImageUrl(name);
    const imageUrl = data?.imageUrl ? data?.imageUrl : "";
    type = data?.type ? data?.type : type;
  
    const updatedPokemon = await PokemonModel.findByIdAndUpdate(id, { name, type, imageUrl }, { new: true });
    res.json(updatedPokemon);
  });

app.delete('/api/pokemons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await PokemonModel.findByIdAndDelete(id);
  res.json({ message: 'Pokemon deleted successfully' });
});

app.listen(PORT, async () => {
    //await connectToMongoDB(); // Connect to MongoDB when the server starts
    console.log(`Server is running on port ${PORT}`);
  });
  
  // Close MongoDB connection when the server is stopped
  process.on('SIGINT', async () => {
    //await closeMongoDBClient();
    process.exit();
  });

  const doesPokemonExist = async (name: string) => {
    const existingPokemon = await PokemonModel.findOne({ name });
    return !!existingPokemon;
  };