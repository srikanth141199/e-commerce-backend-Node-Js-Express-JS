import express from "express";

const server = express();

server.get("/", (req, res) => {
    res.send("Welcome to E-Commerce APIs")
})

server.listen(3200);

console.log('Server is listening in 3200');