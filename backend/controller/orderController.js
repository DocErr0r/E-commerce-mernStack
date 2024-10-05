import serverHandler from "../middlewares/serverhandler.js";
import Order from "../models/Order.js";
import { User } from "../models/user.js";

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
        const orders = await Order.find().populate('orderedBy', "id name email").sort({ createdAt: -1 })
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

export const adminDasboard = serverHandler(async (req, res) => {
    try {
        const order = await Order.find()
        const totelOrders = order.length
        const totelSales = order.reduce((sum, item) => sum + item.totelPrice, 0)
        const totelUsers = await User.countDocuments()
        const selesByDate = await Order.aggregate([
            { $match: { paid: true } },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$paidTime' }
                    },
                    totelSales: { $sum: '$totelPrice' },
                },
            },
            { $sort: { _id: 1 } }
        ])
        // console.log(selesByDate);

        // Get sales by category
        const salesByCategory = await Order.aggregate([
            { $unwind: '$orderItems' }, // Unwind orderItems array
            {
                $lookup: {
                    from: 'products', // Collection name for products
                    localField: 'orderItems._id',
                    foreignField: '_id',
                    as: 'productDetails',
                },
            },
            { $unwind: '$productDetails' }, // Unwind productDetails
            {
                $lookup: {
                    from: 'categories', // Collection name for categories
                    localField: 'productDetails.category', // Assuming category is a field in productDetails
                    foreignField: '_id',
                    as: 'categoryDetails',
                },
            },
            { $unwind: '$categoryDetails' }, // Unwind categoryDetails
            {
                $group: {
                    _id: '$categoryDetails.name', // Group by category name
                    totalSales: { $sum: { $multiply: ['$orderItems.price', '$orderItems.qty'] } },
                },
            },
            { $sort: { totalSales: -1 } }, // Sort by total sales descending
        ]);

        const recentActivity = await Order.find()
            .sort({ createdAt: -1 }) // Assuming there's a createdAt field
            .limit(5)
            .populate('orderedBy', 'name email') // Populate user info if needed
            .select('totelPrice createdAt orderedBy'); // Select necessary fields

        res.send({ dashboardData: { totelOrders, totelSales, selesByDate, totelUsers, salesByCategory, recentActivity } })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})