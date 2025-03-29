import express from 'express';
import { db } from '../db/connection.js';
import { ObjectId } from "mongodb";

const router = express.Router();

const usersCollection = db.collection('users');

//Create a new user
router.post('/', async (req, res) => {
    try {
        const user = req.body;
        await usersCollection.insertOne(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get a list of all users
router.get('/', async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const user = req.body;
        const result = await usersCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: user });
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const users = router;
