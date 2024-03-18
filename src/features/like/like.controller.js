import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { LikeRepository } from "./like.repository.js";

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async likeItem(req, res, next){
        try {
            const {id, type} = req.body;
            const userId = req.body.userID;

            if( type != 'Product' && type != 'Category'){
                return res.status(400).send("Invalid Type");
            }
            if( type == 'Product'){
                this.likeRepository.likeProduct(userId, id);
            }else{
                this.likeRepository.likeCategory(userId, id)
            }

            return res.status(201).send("Liked the Product!!")

        } catch (error) {
            console.log(error);
            res.status(500).send("There is a issue in likeItem controller");
        }
    }

    async getLikes(req, res, next){
        try {
            const {id, type} = req.query;
            const likes = await this.likeRepository.getLikes(type, id)
            return res.status(200).send(likes);
        } catch (error) {
            console.log(error);
            res.status(500).send("There is a issue in getLikes controller");
        }
    }
}