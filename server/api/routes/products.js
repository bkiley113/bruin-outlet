import express from 'express';
const router = express.Router();
import { searchByName } from '../../src/usersCrud.js';
import { loadAllItems } from '../../src/usersCrud.js';
import { productModel } from '../models/product.js';
const Product = productModel;
import mongoose from 'mongoose';

router.get('/', async (req, res, next) => {
    const itemList = await loadAllItems("products");
    if (!itemList)
        res.status(404).json({
            message: 'No products found!'
    });
    else
        res.status(200).json(itemList);
});

//get all products
router.post('/', (req,res,next) => {
 

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => console.log(result))
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
})

//get product ID
router.post('/:productId', async (req, res, next) => {
    //extract id from parameters
    const id = req.params.productId;
    let item = await searchByName(id);
    console.log(Object.entries(item).length);
    if (Object.entries(item).length == 0)
        res.status(404).json({
            message: 'No product found with this name.'
        });
    else
        res.status(200).json(item);
})

const routerProduct = router;
export { routerProduct };