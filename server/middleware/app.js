import express from 'express';
const app = express();
import { routerProduct } from '../api/routes/products.js';
const productRoutes = routerProduct;
import { routerOrder } from '../api/routes/orders.js';
const orderRoutes = routerOrder;
import morgan from 'morgan';

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

//error handling for wrong routes
app.use((req, res, next) => {
    const error = new Error('not found!');
    error.status(404);
    next(error);
})
//other errors redir here
app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            //whatever the error is, print error 
            message: error.message
        }
    })
})

export { app };