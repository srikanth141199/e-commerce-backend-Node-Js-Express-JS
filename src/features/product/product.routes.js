import express from 'express';
import ProductController from './product.controller';

const router = express.Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);
router.post("/",productController.addProduct);



export default router;