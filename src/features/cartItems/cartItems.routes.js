import express from "express";

import CartItemControllel from "./cartItems.controller.js";

const cartRouter = express.Router();
const cartController = new CartItemControllel();

cartRouter.post("/", cartController.add);
cartRouter.get("/", cartController.all);
cartRouter.delete("/:id", cartController.delete);

export default cartRouter;