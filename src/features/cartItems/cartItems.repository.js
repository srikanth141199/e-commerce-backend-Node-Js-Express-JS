import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productID, userID, quantity){
    try{
    const db = getDB();
    const collection = db.collection(this.collection);
    // find the document 
    // either insert or update
    // Insertion.
    await collection.updateOne(
        {productID: new ObjectId(productID), userID: new ObjectId(userID)},
        {$inc:{
            quantity: quantity
        }},
        {upsert: true}) 
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong with database", 500);
    }
}

  async getBasedUserID(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userID: new ObjectId(userID) }).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something wrong with DataBase in cart", 500);
    }
  }

  async delete(userID, cartItemID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemID),
        userID: new ObjectId(userID),
      });
      console.log(result);
      return result.deletedCount > 0;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something wrong with DataBase in cart", 500);
    }
  }
}

export default CartItemsRepository;
