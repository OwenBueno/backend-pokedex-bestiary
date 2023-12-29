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
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:lMsH7pRIo5l5SPLE@cluster0.vtu4qa3.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server (optional starting in v4.7)
            yield client.connect();
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return client; // Return the connected client
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    });
}
function closeMongoDBClient() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Ensure that the client will close when you finish/error
            yield client.close();
            console.log('MongoDB client closed.');
        }
        catch (error) {
            console.error('Error closing MongoDB client:', error);
            throw error;
        }
    });
}
// Export the functions so they can be used in other parts of your application
module.exports = {
    connectToMongoDB,
    closeMongoDBClient,
};
