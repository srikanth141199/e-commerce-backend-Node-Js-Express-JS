import { ApplicationError } from "../../error-handler/applicationError.js";
import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res, next){
        try {
            const userId = req.body.userId
            await this.orderRepository.placeOrders(userId);
            res.status(201).send("Order has been placed successfully");
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong while placing Order, Kindly try after some time", 500)
            //next(error)
        }
    }
}