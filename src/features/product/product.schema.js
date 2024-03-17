import mongoose from "mongoose";

export const productScheme = new mongoose.Schema({
    name: String,
    desc : String,
    price : Number,
    //imageUrl: File,
    category : String,
    inStock: Number,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Category'
        }
    ]
    //sizes : {typeof: String, enum:['S', 'M', 'L', 'XL', 'XXL']}
})