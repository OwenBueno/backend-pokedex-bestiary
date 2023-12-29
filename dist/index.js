"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pokemon_1 = require("./schema/pokemon"); // Import the PokemonModel
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/pokemons', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pokemons = yield pokemon_1.PokemonModel.find();
        // Check if no Pokémon are found
        if (!pokemons || pokemons.length === 0) {
            return res.json([]); // Return an empty array if no Pokémon are found
        }
        res.json(pokemons);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.post('/api/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { name, type } = req.body;
        console.log(name, type);
        // Create a new document using the MongoDB model
        const newPokemon = new pokemon_1.PokemonModel({ name, type });
        // Save the document to the database
        yield newPokemon.save();
        console.log(newPokemon);
        res.json(newPokemon);
    }
    catch (error) {
        console.error('Error handling POST request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.put('/api/pokemons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, type } = req.body;
    const updatedPokemon = yield pokemon_1.PokemonModel.findByIdAndUpdate(id, { name, type }, { new: true });
    res.json(updatedPokemon);
}));
app.delete('/api/pokemons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield pokemon_1.PokemonModel.findByIdAndDelete(id);
    res.json({ message: 'Pokemon deleted successfully' });
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    //await connectToMongoDB(); // Connect to MongoDB when the server starts
    console.log(`Server is running on port ${PORT}`);
}));
// Close MongoDB connection when the server is stopped
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    //await closeMongoDBClient();
    process.exit();
}));
