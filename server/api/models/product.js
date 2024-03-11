import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false}
});

const productModel = mongoose.model('Product', productSchema)
export { productModel }
