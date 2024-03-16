import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrders(userId){
        try {

            const db =  getDB();
            //1.Get cartItems and calculate total Amount.
            const items = await this.getTotalAmount(userId);
            const finalTotalAmount = items.reduce((acc, item) => acc+item.totalAmount, 0);
            //console.log(finalTotalAmount);

            //2.create new Order
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder);

            //3.Reduce the Stock.

            //4.Clear the cart Items

        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something wrong with Database", 500);
        }
    }
    // function to calculate the aggregated value of items present in cart
    async getTotalAmount(userId){
        const db = getDB();
        //console.log(userId);
        const items = await db.collection("cartItems").aggregate([
            //Get cartItems based on userID
            //what is the difference between filter and match?
            {
                $match : {userID : new ObjectId(userId)}
            },
            //Get the Products from products collection.
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            //3.Unwind the productInfo
            {
                $unwind:"$productInfo"
            },
            //4 Calculate totalAmount for each cartItem
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            }
        ]).toArray();
        return items
        
    }
}