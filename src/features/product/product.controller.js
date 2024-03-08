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
      const { name, price, sizes, category } = req.body;
      const newProduct = new ProductModel(name, null,  parseFloat(price), req.file.filename, category, sizes.split(","), );
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
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const result = await this.productRepository.filter(minPrice, maxPrice, category);
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
      const productID = req.query.productID;
      const rating = req.query.rating;
  
      try{
        await this.productRepository.rateProduct(userID, productID, rating);}
      catch(err){return res.status(400).send(err.message);}
  
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
}