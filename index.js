import express from 'express';
import mongoose from 'mongoose';
import cowsay from 'cowsay';
import { UserSchema } from './models/User.js';

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_URL || 'mongodb://master:master123@127.0.0.1:27017/ineedhelp?authSource=admin';

const User = mongoose.model('User', UserSchema);

const app = express();

async function connectToMongoDB(params) {
    try {
        await mongoose.connect(DB_URL);
        console.log(cowsay.say({ text: 'MongoDB connection established' }));
    } catch (error) {
        console.error(cowsay.say({ text: 'Failed to connect to MongoDB!' }));
        console.error('Error details: ', error.message);
    }
}

connectToMongoDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
