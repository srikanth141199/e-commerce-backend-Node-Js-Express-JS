import express from 'express';
import ProductController from './product.controller.js';

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getAllProducts);
productRouter.post("/",productController.addProduct);



export default productRouter;