import winston from "winston";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getOne(id) {
    const product = products.find((product) => product.id == id);
    return product;
  }

  static getAll() {
    return products;
  }

  static filter(minPrice, maxPrice, category) {
    const result = products.filter(
      (product) =>
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
    );
    return result;
  }

  static rateProduct(userID, productID, rating) {
    const user = UserModel.getAll().find((user) => user.id == userID);
    if (!user) {
      //return "User not Found";
      throw new Error("User not Found");
    }

    const product = products.find((product) => product.id == productID);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.rating) {
      //no rating is there for the product
      product.rating = [];
      product.rating.push({ userId: userID, rating: rating });
    } else {
      const existingRating = product.rating.findIndex(
        (rate) => rate.userID == userID
      );
      if (existingRating >= 0) {
        //if the existing rating given by a user needs to be updated
        product.rating[existingRating] = { userID: userID, rating: rating };
      } else {
        //if no existing Rating by the user
        product.rating.push({ userID: userID, rating: rating });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Cateogory1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Cateogory2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Cateogory3",
    ["M", "XL", "S"]
  ),
];
