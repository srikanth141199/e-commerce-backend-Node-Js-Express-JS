import CartItemModel from "./cartItems.model.js";

export default class CartItemControllel{
    add(req, res){
        const {productID, quantity} = req.query;
        const userID = req.body.userID
        console.log("userID:", userID);
        console.log("req.body : ", req.body);
        CartItemModel.add(productID, userID, quantity);
        res.status(201).send("Cart is updated");
    }

    all(req, res){
        const userID = req.body.userID
        const cartItems = CartItemModel.getBasedUserID(userID);
        res.status(200).send(cartItems);
    }

    delete(req, res){
        const userID = req.body.userID;
        const cartItemID = req.params.id;
        const error = CartItemModel.delete(cartItemID, userID);
        if(error){
            return res.status(404).send(error)
        }
        else{
            return res.status(200).send("Cart Item is removed");
        }
    }
}