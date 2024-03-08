import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


class ProductRepository {
  constructor() {
    this.collection = "products";
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

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = { $lte: parseFloat(maxPrice) };
      }
      if (category) {
        filterExpression.category = category;
      }
      return collection.find(filterExpression).toArray();
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Something went wrong while filtering the data", 500)
    }
  }
}

export default ProductRepository;