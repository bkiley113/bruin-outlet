import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import { orderModel } from '../models/order.js';
const Order = orderModel; 
import { productModel } from '../models/product.js';
const Product = productModel;
import { authenticator } from '../../middleware/authenticate.js';

//create an order
router.post('/', authenticator, (req, res, next) => {
    /*request format:
    {
        uid: user ID
        quantity: quantity of items
        pid: product id
    }
    */
    //check that product id exists
    Product.findById(req.body.pid).exec().then(product=> {
        if (!product){
            throw ("Product not found!");
        }
        //if succeeds, create new order
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            uid: req.body.uid,
            quantity: req.body.quantity,
            pid: req.body.pid
        });
        return order.save();
    }).then(result => {
        res.status(201).json({
            message: 'Order created!',
            createdOrder: {
                _id: result._id,
                uid: req.body.uid,
                pid: result.pid,
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
    Order.find().select("product quantity _id").populate('pid').exec().then(ords => {
        res.status(200).json({
            count: ords.length,
            orders: ords.map(ord => {
                return{
                    uid: ord.uid,
                    product: ord.pid,
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