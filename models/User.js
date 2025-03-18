import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name should be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Wrong email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should be at least 8 characters'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [16, 'Age must not be less than 16 years old'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
