import serverHandler from "../middlewares/serverhandler.js";
import Product from "../models/product.js";
import { User } from "../models/user.js";

export const getProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find().populate('category').limit(12).sort({ createdAt: -1 })
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const getAdminProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find({ User: req.user._id }).populate('category').limit(12).sort({ createdAt: -1 })
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const searchProducts = serverHandler(async (req, res) => {
    const { page, limit } = req.body
    const queryObj = { ...req.query }
    const exclude = ['page', "sort", "limit", "fileds"]
    exclude.forEach(el => delete queryObj[el]);
    // console.log(queryObj);

    try {
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {}

        const count = await Product.countDocuments({ ...keyword })
        const skip = (page - 1) * limit
        let products = await Product.find({ ...keyword }).populate('category').sort("name").limit(limit)
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        if (req.query.sort) {
            const sortby = req.query.sort.replace(",", " ")
            // products = products.sort("createdAt")
        }
        res.status(200).send({ products, page: 1, pages: Math.ceil(count / limit), hasMore: false });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
})

export const getProduct = serverHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: "product not found" })
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const removeProduct = serverHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: "product not found" })
        }
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: `${product.name} product is deleted` });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const createProduct = serverHandler(async (req, res) => {
    const { name, image, description, price, category, brand, quantity } = req.fields;
    if (!name) throw new Error('Name is requried')
    if (!image) throw new Error('Image is requried')
    if (!description) throw new Error('Description is requried')
    if (!price) throw new Error('Price is requried')
    if (!category) throw new Error('Category is requried')
    if (!brand) throw new Error('Brand is requried')
    if (!quantity) throw new Error('Quantity is requried')
    try {
        const product = new Product({ ...req.fields })
        product.User = req.user._id
        await product.save()

        res.send(product)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const updateProduct = serverHandler(async (req, res) => {
    const { name, image, description, price, category, brand, quantity } = req.body;
    if (!name) {
        throw new Error('Name is requried')
    }
    if (image) {
        throw new Error('Image not allow to be change')
    }
    if (!description) {
        throw new Error('Description is requried')
    }
    if (!price) {
        throw new Error('Price is requried')
    }
    if (!category) {
        throw new Error('Category is requried')
    }
    if (!brand) {
        throw new Error('Brand is requried')
    }
    if (!quantity) {
        throw new Error('Quantity is requried')
    }
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: "product not found" })
        }
        if (product.User.toString() !== req.user._id.toString()) {
            return res.status(400).send({ message: "you are unauthrize for this product" })
        }
        const newproduct = await Product.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true })
        res.send(newproduct)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const getTopProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find().limit(6).sort({ rating: -1 })
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const getNewProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find().limit(6).sort({ _id: -1 })
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})


export const addReview = serverHandler(async (req, res) => {
    try {
        const { rating, comment } = req.body
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(400)
            throw new Error("product not found")
        }
        // const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        // if (alreadyReviewed) {
        //     res.status(403)
        //     throw new Error("you already reviewed on this product")
        // }
        const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment }
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).send({ message: "review added successfully", review })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
})

export const addWishList = serverHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const product = await Product.findById(req.body.id)
        if (!product) {
            res.status(400)
            throw new Error("product not found")
        }
        const alreadyAdded = user.wishlist.find(id => id.toString() === product._id.toString())
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.body.id } }, { new: true })
            res.status(201).send({ message: "product remove from wishlist", user })
        }
        else {
            let user = await User.findByIdAndUpdate(req.user._id, { $push: { wishlist: req.body.id } }, { new: true })
            res.status(201).send({ message: "product added to wishlist", user })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
})