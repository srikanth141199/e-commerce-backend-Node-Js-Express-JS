import mongoose from "mongoose";

export const productScheme = new mongoose.Schema({
    name: String,
    desc : String,
    price : Number,
    //imageUrl: File,
    category : String,
    inStock: Number,
    //sizes : {typeof: String, enum:['S', 'M', 'L', 'XL', 'XXL']}
})