import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import { orderModel } from '../models/order.js';
const Order = orderModel; 
import { productModel } from '../models/product.js';
const Product = productModel;
import { userModel } from '../models/user.js';
const User = userModel;
import { authenticator } from '../../middleware/authenticate.js';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

//load .env
config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.AUTH_EMAIL}`,
        pass: `${process.env.AUTH_PASS}`
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SMTP Success: orders");
        console.log(success);
    }
})

//create an order
router.post('/', authenticator, (req, res, next) => {
    /*request format:
    {
        uid: user ID
        quantity: quantity of items
        size: size of item (leave blank for N/A)
        pid: product id
    }
    */
    //check that product id exists
    Product.findById(req.body.pid).exec().then(product=> {
        if (!product){
            throw ("Product not found!");
        }
        // if size is provided, set it; if not make it N/A
        let prodSize = "N/A";
        if (req.body.size)
            prodSize = req.body.size;
        //if succeeds, create new order
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            uid: req.body.uid,
            quantity: req.body.quantity,
            size: prodSize,
            pid: req.body.pid
        });
        return order.save();
    }).then(result => {
        sendOrderReceipt({
            oid: result._id,
            uid: result.uid,
            quantity: result.quantity,
            size: result.size,
            pid: result.pid
        });
        console.log(result);
        res.status(201).json({
            message: 'Order created!',
            createdOrder: {
                _id: result._id,
                uid: result.uid,
                quantity: result.quantity,
                size: result.size,
                pid: result.pid
            },
            request: {
                type: 'POST',
                url: `http://localhost:${process.env.PORT}/orders/` + result._id
            }
    });
}).catch(err => {
    res.status(500).json({error: err});
    console.log(err);
})

    });

//find all orders
router.get('/', authenticator, (req, res, next) => {
    //query format:
    //{uid: user ID}
    Order.find({uid: req.query.uid}).select("pid quantity _id size uid").populate('pid').exec().then(ords => {        res.status(200).json({
            count: ords.length,
            orders: ords.map(ord => {
                return{
                    pid: ord.pid,
                    quantity: ord.quantity,
                    size: ord.size,
                    uid: ord.uid,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/orders/` + ord._id
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

const sendOrderReceipt = async ({oid, uid, quantity, pid, size}, res) => {
    try {
        //search for product and user with given id's, anticipating errors
        let email;
        let price;
        let prodName;
        try {
            await Product.findById(pid).exec().then(product => {
                prodName = product.name;
                price = product.price;
               
            });
            await User.findById(uid).exec().then(user => {
                email = user.email;
            });
        }
        catch(err) {
            console.log(err);
        }
        console.log("here");

        let total = quantity * price;
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: `Order ${oid}`,
            html: `<h1><strong><font color=#4287f5>Your order details</font></strong></h1>
            <p>
            <strong>Product:</strong> ${prodName}<br>
            <strong>Unit price:</strong> \$${price}<br>
            <strong>Quantity:</strong> ${quantity}<br>
            <strong>Size:</strong> ${size}<br><br>

            <strong><font size = 5><font color=#FFB81C>Total: \$${total}</font>
            </p>
            <p><font size = 3><font color=#4287f5>UCLA</font><font color=#FFB81C>Outlet</font>™</font></p>`
        };
        await transporter.sendMail(mailOptions);
       console.log("Order Email sent.");
    } catch (err) {
        console.log(err);
    }
}

const routerOrder = router;
export { routerOrder };