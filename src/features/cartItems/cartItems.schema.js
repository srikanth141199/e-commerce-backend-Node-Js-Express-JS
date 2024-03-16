import mongoose from "mongoose";

export const cartItemsSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    quantity : Number
})