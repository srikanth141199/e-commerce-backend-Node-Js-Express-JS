import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import UserRepository from "../user/user.repository.js";


class ProductRepository {
  constructor() {
    this.collection = "products";
    this.userRepository = new UserRepository();
  }

  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while adding the Product to DB",
        500
      );
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while fetching the Products from DB",
        500
      );
    }
  }

  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while fetching the product details from DB",
        500
      );
    }
  }

  async filter(minPrice, categories) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      // if (maxPrice) {
      //   filterExpression.price = {
      //     ...filterExpression.price,
      //     $lte: parseFloat(maxPrice),
      //   };
      // }
      //console.log(categories);
      categories = JSON.parse(categories.replace(/'/g,'"'));
      if (categories) {
        //filterExpression = {$and:[{category:category}, filterExpression]};//both of the expression to br true to get result.
        filterExpression = {$or:[{category:{$in:categories}}, filterExpression]};//even if one of the expression is true we will get the data.
        //filterExpression.category = category;
      }
      return collection.find(filterExpression).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while filtering the data",
        500
      );
    }
  }

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productID),
  //     });
  //     const userRating = product?.ratings?.find(
  //       (rate) => rate.userID == userID
  //     );
  //     if (userRating) {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "ratings.userID": userID,
  //         },
  //         { $set: { "ratings.$.rating": rating } }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //         },
  //         {
  //           $push: { ratings: { userID, rating } },
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationError(
  //       "Something went wrong while Rating product",
  //       500
  //     );
  //   }
  // }
  
  //below is the simplified method on how we can handle rate Product
  async rateProduct(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      //Removing existing operation
      await collection.updateOne(
      {
        _id: new ObjectId(productID),
      },
      {
        $pull: { ratings: { userID: new ObjectId(userID) } },
      }
    );
      //updating new operation
      await collection.updateOne(
        {
          _id: new ObjectId(productID),
        },
        {
          $push: { ratings: { userID:new ObjectId(userID), rating } },
        }
      );
      
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something went wrong while Rating product",
        500
      );
    }
  }
}

export default ProductRepository;