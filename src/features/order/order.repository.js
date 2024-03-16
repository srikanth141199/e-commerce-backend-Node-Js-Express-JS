import { ObjectId } from "mongodb";
import { getDB, getClient } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";

export default class OrderRepository{
    constructor(){
        this.collection = "orders";
    }

    async placeOrders(userId){
        const client = getClient();
        const session = client.startSession();
        try {    
            const db =  getDB();
            session.startTransaction();
            //1.Get cartItems and calculate total Amount.
            const items = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc+item.totalAmount, 0);
            //console.log(finalTotalAmount);

            //2.create new Order
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, {session});

            //3.Reduce the Stock.
            //stock field is not maintained so ran a query below to add 20 for all the products
            //db.products.updateMany({},{$set:{stock:20}})
            //above query will add 20 in stock for all the products.
            for(let item of items){
                await db.collection("products").updateOne(
                    {_id: item.productID},
                    {$inc:{stock: -item.quantity}},
                    {session}
                )
            }

            //throw new ApplicationError("manually stopping the placeOrder", 500);
            //here issue is even the one of the transaction fails it will affect the DB, so we need to create a replica DB and perform this actions using session
            //for the same document is available in NodeJs Documents.
            //point to remember while creating replica DB it takes time wait untill it is done then initiate mongosh in CMD


            //4.Clear the cart of that user.
            await db.collection("cartItems").deleteMany({userID:new ObjectId(userId)}, {session})
            await session.commitTransaction();
            session.endSession();
            return;

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log(error);
            throw new ApplicationError("Something wrong with Database", 500);
        }
    }
    // function to calculate the aggregated value of items present in cart
    async getTotalAmount(userId, session){
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
        ], {session}).toArray();
        return items
        
    }
}