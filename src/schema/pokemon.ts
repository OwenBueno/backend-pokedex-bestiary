import { mongoose } from '../connection';
import { Schema, Document, model } from 'mongoose';

interface Pokemon extends Document {
  name: string;
  type: string;
}

const pokemonSchema = new Schema<Pokemon>({
  name: String,
  type: String,
});
const PokemonModel = mongoose.model<Pokemon>('pokemon', pokemonSchema);

export { PokemonModel };
