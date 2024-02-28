import ProductModel from "./product.model.js";

export default class ProductController{

    getAllProducts(req,res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req, res){
        const {name, price, sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imageUrl: req.file.filename,
        };
        const createdRecord=ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req,res){}

    getOneProduct(req,res){
        const id = req.params.id;
        const product= ProductModel.getOne(id);
        if(!product){
            res.status(404).send('Product not found')
        }
        else{
            res.status(200).send(product);
        }
    }

}