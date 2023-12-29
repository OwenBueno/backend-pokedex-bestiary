// src/index.ts
import express, { Request, Response } from 'express';
import mongoose, { Document, Schema } from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

interface Pokemon extends Document {
  name: string;
  type: string;
}

const pokemonSchema = new Schema<Pokemon>({
  name: String,
  type: String,
});

const PokemonModel = mongoose.model<Pokemon>('Pokemon', pokemonSchema);

app.get('/api/pokemons', async (_req: Request, res: Response) => {
  const pokemons = await PokemonModel.find();
  res.json(pokemons);
});

app.post('/api/pokemons', async (req: Request, res: Response) => {
  const { name, type } = req.body;
  const newPokemon = new PokemonModel({ name, type });
  await newPokemon.save();
  res.json(newPokemon);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
