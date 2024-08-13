import serverHandler from "../middlewares/serverhandler.js";
import Order from "../models/Order.js";

const calculatePrice = (orderItems) => {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemsPrice > 500 ? 0 : 40
    const texPrice = (itemsPrice * 0.18).toFixed(2)
    const totelPrice = (itemsPrice + shippingPrice + parseFloat(texPrice)).toFixed(2);
    return { itemsPrice, shippingPrice, texPrice, totelPrice }
}

export const createOrder = serverHandler(async (req, res) => {
    const { orderItems, address, paymentMethod } = req.body;
    if (!orderItems && !address && !paymentMethod) {
        throw new Error('please fill all fields')
    }
    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error("no item for order")
        }
        const { itemsPrice, shippingPrice, texPrice, totelPrice } = calculatePrice(orderItems)
        const order = new Order({
            orderItems,
            orderedBy: req.user._id,
            address,
            paymentMethod,
            itemsPrice,
            texPrice,
            shippingPrice,
            totelPrice,
        })
        await order.save()
        res.status(201).send({ message: "order details submitted", order })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export const getAllOrders = serverHandler(async (req, res) => {
    try {
        const orders = await Order.find().populate('orderedBy', "id name email")
        res.status(200).send({ orders })
    } catch (error) {

    }
})

export const getMyOrders = serverHandler(async (req, res) => {
    try {
        const orders = await Order.find({ orderedBy: req.user._id }).populate('orderedBy', "id name email")
        if (!orders) {
            res.status(404)
            throw new Error("orders not found")
        }
        res.status(200).send({ orders })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export const getOrderById = serverHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderedBy', "id name email")
        if (!order) {
            res.status(404)
            throw new Error("orders not found")
        }
        res.status(200).send({ order })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export const markAsPaid = serverHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderedBy', "id name email")
        if (!order) {
            res.status(404)
            throw new Error("orders not found")
        }
        order.paid = true
        order.paidTime = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email: req.body.payer_email,
            updateTime: req.body.update_time
        }
        await order.save()
        res.status(200).send({ order })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export const markAsDelivered = serverHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('orderedBy', "id name email")
        if (!order) {
            res.status(404)
            throw new Error("orders not found")
        }
        order.delivered = true
        order.deliveredTime = Date.now()
        await order.save()
        res.status(200).send({ order })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})