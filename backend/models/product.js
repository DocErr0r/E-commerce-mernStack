import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    images: [{ public_id: { type: String, required: true }, url: { type: String, required: true } }],
    brand: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numOfReviews: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
}, { timestamps: true });

//Export the model
const Product = mongoose.model('Product', productSchema);
export default Product; 
