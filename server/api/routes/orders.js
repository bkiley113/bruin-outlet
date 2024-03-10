import express from 'express';
const router = express.Router();
import { searchByName } from '../../src/usersCrud.js';
import { loadAllItems } from '../../src/usersCrud.js';

//find all orders
router.get('/', async (req, res, next) => {
    const itemList = await loadAllItems("orders");
    if (!itemList)
        res.status(404).json({
            message: 'No products found!'
    });
    else
        res.status(200).json(itemList);
});

//create an order
router.post('/', (req,res,next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order created',
        order: order
    })
})

//get order by ID
router.post('/:orderId', async (req, res, next) => {
    //extract id from parameters
    const id = req.params.orderId;
    let item = await searchByName(id);
    console.log(Object.entries(item).length);
    if (Object.entries(item).length == 0)
        res.status(404).json({
            message: 'No product found with this name.'
        });
    else
        res.status(200).json(item);
})

const routerOrder = router;
export { routerOrder };