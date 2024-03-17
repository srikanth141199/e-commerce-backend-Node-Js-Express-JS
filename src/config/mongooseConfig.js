import mongoose from "mongoose";
import dotenv from "dotenv"; 
import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {

    try {
        await mongoose.connect(url, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        });
        console.log("Mongo DB connected using Mongoose");
        addCategories();
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        console.log(error);
    }
}

async function addCategories(){
    const CategoryModel = mongoose.model("Category", categorySchema);
    const categories = CategoryModel.find();
    if(!categories || (await categories).length==0){
        await CategoryModel.insertMany([{name:'Books'}, {name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories added");
}
