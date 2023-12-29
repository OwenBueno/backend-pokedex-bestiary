import express, { Request, Response } from 'express';
import cors from 'cors';

import { PokemonModel } from './schema/pokemon'; // Import the PokemonModel

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/pokemons', async (_req, res) => {
    try {
      const pokemons = await PokemonModel.find();
      
      // Check if no Pokémon are found
      if (!pokemons || pokemons.length === 0) {
        return res.json([]); // Return an empty array if no Pokémon are found
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
      const { name, type } = req.body;
      console.log(name, type)
  
      // Create a new document using the MongoDB model
      const newPokemon = new PokemonModel({ name, type });
  
      // Save the document to the database
      await newPokemon.save();  
      console.log(newPokemon)
  
      res.json(newPokemon);
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.put('/api/pokemons/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const updatedPokemon = await PokemonModel.findByIdAndUpdate(id, { name, type }, { new: true });
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