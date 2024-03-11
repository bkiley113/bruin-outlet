import express from 'express';
const router = express.Router();
import { productModel } from '../models/product.js';
const Product = productModel;
import mongoose from 'mongoose';
import { authentication } from '../../middleware/authenticate.js';

//get all products
router.get('/', (req, res, next) => {
    Product.find().exec().then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    productImage: product.productImage,
                    description: product.description,
                    category: product.category,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/products/' + product._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

//create new product
//make sure this is only callable by admins
router.post('/', (req,res,next) => {
    const id = new mongoose.Types.ObjectId();
    const product = new Product({
        _id: id,
        name: req.body.name,
        price: req.body.price,
        productImage: "uploads/" + id
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})
//grab specific product
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
    .then(prod => {
        console.log(prod);
        //if product dne, return 404
        if (!prod)
            res.status(404).json({message: "No product found!"});
        else
            res.status(200).json(prod);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//get product ID
router.post('/:productId', (req, res, next) => {
    //extract id from parameters
    const id = req.params.productId;
    Product.findById(id).exec()
    .then(doc => {
        console.log("From db", doc);
        res.status(200).json(doc);
    })
})

const routerProduct = router;
export { routerProduct };