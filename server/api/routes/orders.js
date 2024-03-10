import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import { orderModel } from '../models/order.js';
const Order = orderModel; 
import { productModel } from '../models/product.js';
const Product = productModel;

//create an order
router.post('/', (req, res, next) => {
    //check that product id exists
    Product.findById(req.body.productId).then(product=> {
        if (!product){
            return res.status(404).json({message: "Product not found!"});
        }
        //if succeeds, create new order
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    }).then(result => {
        res.status(201).json({
            message: 'Order created!',
            createdOrder: {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'POST',
                url: 'http://localhost:3001/orders/' + result._id
            }
    })
}).catch(err => {
    res.status(500).json({error: err})
})

    });

//find all orders
router.get('/', (req, res, next) => {
    Order.find().select("product quantity _id").populate('product').exec().then(ords => {
        res.status(200).json({
            count: ords.length,
            orders: ords.map(ord => {
                return{
                    product: ord.product,
                    quantity: ord.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3001/orders/' + ord._id
                    }
                }
            })
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});
const routerOrder = router;
export { routerOrder };