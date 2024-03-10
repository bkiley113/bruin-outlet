import express from 'express';
const app = express();
import { routerProduct } from '../api/routes/products.js';
const productRoutes = routerProduct;
import { routerOrder } from '../api/routes/orders.js';
const orderRoutes = routerOrder;
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';

//load .env
config();
//make image folder publically/statically available
app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    //access can be restricted here; I am only running on localhost, so no need to restrict for now
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

mongoose.connect(process.env.DB_URI);

//error handling for wrong routes
app.use((req, res, next) => {
    const error = new Error('not found!');
    error.status = 404;
    next(error);
})
//other errors redir here
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            //whatever the error is, print error (auto throwing)
            message: error.message
        }
    })
})

export { app };