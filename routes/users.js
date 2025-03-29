import express from 'express';
import { createNewUser, getUserById, getAllUsers, updateUserById, deleteUserById } from '../controllers/users.js'

const router = express.Router();

router.post('/', createNewUser);

router.get('/:id', getUserById);

router.get('/', getAllUsers);

router.put('/:id', updateUserById);

router.delete('/:id', deleteUserById);

export const users = router;
