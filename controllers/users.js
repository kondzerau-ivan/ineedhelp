import { ObjectId } from "mongodb";
import { usersCollection } from "../db/connection.js";

export const createNewUser = async (req, res) => {
    try {
        const user = req.body;
        await usersCollection.insertOne(user);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserById = async (req, res) => {
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
}

export const deleteUserById = async (req, res) => {
    try {
        const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
