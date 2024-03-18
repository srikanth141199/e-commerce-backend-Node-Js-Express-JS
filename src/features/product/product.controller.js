import { ApplicationError } from "../../error-handler/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {

  constructor(){
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
      
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while fetching Products.", 500);
    }
    
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes, categories, description } = req.body;
      const newProduct = new ProductModel(name, description,  parseFloat(price), req?.file?.filename, categories, sizes?.split(","), );
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while adding product in controller", 500);
    }
    
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.getOne(id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while fetching the Product", 500);
    }
    
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      //const maxPrice = req.query.maxPrice;
      const categories = req.query.categories;

      const result = await this.productRepository.filter(minPrice, categories);
      if (!result) {
        res.status(404).send("No products found");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while filtering Products in controller", 500);
    }
    
  }

  async rateProduct(req, res, next) {
    try {
      const userID = req.body.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
  
      await this.productRepository.rateProduct(userID, productID, rating);
  
      return res.status(201).send("Rating has been added");
    } catch (error) {
      //console.log("This is inside try catch");
      next()
    }

    // if(error){
    //     return res.status(400).send(error);
    // }
    // else{
    //     return res.status(201).send("Rating has been added");
    // }
  }

  async averagePrice(req, res, next){
    try {
      const result = await this.productRepository.averageProductPricePerCategory()
      console.log("result"+result);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong while filtering Products in controller", 500);
    }
  }
}