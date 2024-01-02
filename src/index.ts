import express from "express";
import cors from "cors";
import {
  getPokemons,
  addPokemon,
  updatePokemon,
  deletePokemon,
} from "./controller/pokemonController";
import { config } from "dotenv";

import { getPokedex } from "./controller/pokedexController";
import { getPdf } from "./controller/pokedexToPdfController";

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Pokemon Crud Requests
app.get("/api/pokemons", getPokemons);
app.post("/api/pokemons", addPokemon);
app.put("/api/pokemons/:id", updatePokemon);
app.delete("/api/pokemons/:id", deletePokemon);

// Pokedex Limit Request
app.get("/api/pokedex", getPokedex)

// Pokedex To PDF Request
app.get("/api/pokedex/pdf", getPdf)


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  process.exit();
});
