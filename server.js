import express from "express";
import * as ProductRouter from "./src/features/product/product.routes.js"

const server = express();


server.use("/api/products", ProductRouter);

server.get("/", (req, res) => {
    res.send("Welcome to E-Commerce APIs")
})

server.listen(3200, ()=>{
    console.log('Server is listening in 3200'); 
});