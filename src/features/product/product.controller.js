import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getOne(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);
    if (!result) {
      res.status(404).send("No products found");
    } else {
      res.status(200).send(result);
    }
  }

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;

    const error = ProductModel.rateProduct(userID, productID, rating);

    if(error){
        return res.status(400).send(error);
    }
    else{
        return res.status(201).send("Rating has been added");
    }
  }
}