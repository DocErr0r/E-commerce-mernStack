import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const OrderSchema = new mongoose.Schema({
    orderedBy: { type: ObjectId, required: true, ref: 'User' },
    orderItems: [{
        _id: { type: ObjectId, required: true, ref: 'Product' },
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    }],
    address: {
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pinCode: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 10
        },
        homeAddress: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 15
        },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: Date },
        email: { type: String }
    },
    itemsPrice: { type: Number, default: 0.0, required: true, },
    texPrice: { type: Number, default: 0.0, required: true, },
    shippingPrice: { type: Number, default: 0.0, required: true, },
    totelPrice: { type: Number, default: 0.0, required: true, },
    paid: { type: Boolean, required: true, default: false },
    paidTime: { type: Date },
    delivered: { type: Boolean, required: true, default: false },
    deliveredTime: { type: Date },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
export default Order