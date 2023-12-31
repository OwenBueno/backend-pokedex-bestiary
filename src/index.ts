import express from 'express';
import cors from 'cors';
import {
  getPokemons,
  addPokemon,
  updatePokemon,
  deletePokemon,
} from './controller/pokemonController';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Pokemon Crud Requests
app.get('/api/pokemons', getPokemons);
app.post('/api/pokemons', addPokemon);
app.put('/api/pokemons/:id', updatePokemon);
app.delete('/api/pokemons/:id', deletePokemon);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  process.exit();
});
