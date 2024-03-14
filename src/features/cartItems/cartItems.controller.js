// import CartItemModel from "./cartItems.model.js";
// import CartItemsRepository from "./cartItems.repository.js";

// export default class CartItemControllel{

//     constructor(){
//         this.cartItemRepository = new CartItemsRepository();
//     }

//     async add(req, res){
//         try {
//             const {productID, quantity} = req.body;
//             const userID = req.body.userID
//             console.log("userID:", userID);
//             console.log("req.body : ", req.body);
//             await this.cartItemRepository.add(productID, userID, quantity);
//             res.status(201).send("Cart is updated");
//         } catch (error) {
//             console.log(error);
//             return res.status(200).send("Something went wrong with DB", 500);
//         }
//     }

//     async all(req, res){
//         try {
//             const userID = req.body.userID
//             const cartItems = await this.cartItemRepository.getBasedUserID(userID);
//             res.status(200).send(cartItems);
//         } catch (error) {
//             console.log(error);
//             return res.status(200).send("Something went wrong with DB", 500);
//         }
        
//     }

//     delete(req, res){
//         const userID = req.body.userID;
//         const cartItemID = req.params.id;
//         const error = CartItemModel.delete(cartItemID, userID);
//         if(error){
//             return res.status(404).send(error)
//         }
//         else{
//             return res.status(200).send("Cart Item is removed");
//         }
//     }
// }

import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemController {
    constructor() {
        this.cartItemRepository = new CartItemsRepository();
    }

    async add(req, res) {
        try {
            const { productID, quantity } = req.body;
            const userID = req.body.userID;
            console.log("userID:", userID);
            console.log("req.body : ", req.body);
            await this.cartItemRepository.add(productID, userID, quantity);
            res.status(201).send("Cart is updated");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Something went wrong with DB");
        }
    }

    async all(req, res) {
        try {
            const userID = req.body.userID;
            const cartItems = await this.cartItemRepository.getBasedUserID(userID);
            res.status(200).send(cartItems);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Something went wrong with DB");
        }
    }

    async delete(req, res) {
        try {
            const userID = req.body.userID;
            const cartItemID = req.body.id;
            const error = await this.cartItemRepository.delete(userID, cartItemID);
            if (!error) {
                return res.status(404).send("Item not found");
            } else {
                return res.status(200).send("Cart Item is removed");
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send("Something went wrong with DB");
        }
        
    }
}
