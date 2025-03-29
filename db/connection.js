import { MongoClient } from "mongodb";
import cowsay from 'cowsay';

const DB_URL = process.env.MONGO_URL || 'mongodb://master:master123@127.0.0.1:27017/';

export const mongoClient = new MongoClient(DB_URL);

try {
    // Connect the client to the server
    await mongoClient.connect();
    console.log(cowsay.say({ text: 'MongoDB connection established' }));
} catch (error) {
    console.error(cowsay.say({ text: 'Failed to connect to MongoDB!' }));
    console.error('Error details: ', error.message);
}

export const db = mongoClient.db('ineedhelp');
