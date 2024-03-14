import express from "express";

import CartItemController from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartController = new CartItemController();

cartRouter.post("/", (req, res) => {cartController.add(req, res)});
cartRouter.get("/", (req, res) => {cartController.all(req, res)});
cartRouter.delete("/", (req, res) => {cartController.delete(req, res)});

export default cartRouter;