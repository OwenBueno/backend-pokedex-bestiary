"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonModel = void 0;
const connection_1 = require("../connection");
const mongoose_1 = require("mongoose");
const pokemonSchema = new mongoose_1.Schema({
    name: String,
    type: String,
});
const PokemonModel = connection_1.mongoose.model('pokemon', pokemonSchema);
exports.PokemonModel = PokemonModel;
