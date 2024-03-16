import mongoose from "mongoose";

export const userScheme = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    type: {type: String, enum:['Customer', 'Seller']}
})