import express from 'express';
import cowsay from 'cowsay';
import { MongoClient } from 'mongodb';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL || 'mongodb://master:master123@127.0.0.1:27017/';
const app = express();
app.use(express.json());

const client = new MongoClient(DB_URL);

async function connectToDB() {
    try {
        await client.connect();
        console.log(cowsay.say({ text: 'MongoDB connection established' }));

        const db = client.db('ineedhelp');

        //
        // ToDo: Validation
        // const test = await db.listCollections({ name: 'some' }).toArray();
        // console.log(test.length);
        //
        
        const usersCollection = db.collection('users');

        app.get('/users', async (req, res) => {
            try {
                const users = await usersCollection.find().toArray();
                res.json(users);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });

        app.post('/users', async (req, res) => {
            try {
                const user = req.body;
                await usersCollection.insertOne(user);
                res.status(201).json(user);
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })

        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    } catch (error) {
        console.error(cowsay.say({ text: 'Failed to connect to MongoDB!' }));
        console.error('Error details: ', error.message);
    }
}
connectToDB();
