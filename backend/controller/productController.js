import serverHandler from "../middlewares/serverhandler.js";
import Category from "../models/category.js";
import Product from "../models/product.js";
import fs from "fs";
import { User } from "../models/user.js";
import cloudUploder from "../config/Cloudy.js";
import { uploadArrayImages } from "../routes/uploadRoute.js";

export const getProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({ createdAt: -1 })
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
        const products = await Product.find({ User: req.user._id }).populate('category').limit(20).sort({ createdAt: -1 })
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
    let { page, limit } = req.query
    // default
    page = page ? page : 1
    limit = limit ? limit : 5
    // const queryObj = { ...req.query }
    // const exclude = ['page', "sort", "limit", "fileds"]
    // exclude.forEach(el => delete queryObj[el]);
    // console.log(queryObj);

    try {

        // const category = await Category.findOne({ name: req.query.category })
        // search by name
        const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {}
        // intance
        let API = Product.find({ ...keyword }).populate('category')
        // start pagination
        const count = await Product.countDocuments({ ...keyword })
        // skip items based on limit
        const skip = (page - 1) * limit
        // end pagination

        if (req.query.sort) {
            const sortby = req.query.sort.replace(",", " ")
            API = API.sort(sortby)
        }
        // run instance
        const products = await API.skip(skip).limit(limit)
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }

        // if (!products.length) {
        //     return res.status(403).send({ message: "No more products found" })
        // }

        res.status(200).send({ products, page: Number(page), pages: Math.ceil(count / limit) });
    }
    catch (error) {
        // console.log(error);
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
        if (product.User.toString() !== req.user._id.toString()) {
            return res.status(400).send({ message: "you are unauthrize for this product" })
        }
        product.images.map(async (image) => {
            await cloudUploder.destroy(image.public_id)
        })
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).send({ message: `${product.name} product is deleted` });
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const createProduct = serverHandler(async (req, res) => {
    let tempPaths = [];
    uploadArrayImages(req, res, async (err) => {
        if (err) {
            res.status(400).send({ message: err.message })
        }
        else if (req.files.length) {
            const { name, description, price, category, brand, quantity } = req.body;

            // could opreation
            await Promise.all(req.files.map(async (file) => {
                const result = await cloudUploder.upload(file.path, {
                    folder: 'products'
                })
                // console.log(result);
                // Logic to remove the files from the server, e.g., using fs.unlink
                fs.unlink(file.path, (unlinkError) => {
                    if (unlinkError) console.error('File delete error:', unlinkError);
                });
                tempPaths.push({ url: result.url, public_id: result.public_id })
            }))

            try {
                if (!name) throw new Error('Name is requried')
                // if (!image) throw new Error('Image is requried')
                if (!description) throw new Error('Description is requried')
                if (!price) throw new Error('Price is requried')
                if (!category) throw new Error('Category is requried')
                if (!brand) throw new Error('Brand is requried')
                if (!quantity) throw new Error('Quantity is requried')

                // console.log(tempPaths);
                const product = new Product({ ...req.body, images: tempPaths })
                product.User = req.user._id
                await product.save()

                res.send(product)
            } catch (error) {
                // req.files.map(file => {
                //     fs.unlink(file.path, (unlinkError) => {
                //         if (unlinkError) console.error('File delete error:', unlinkError);
                //     });
                // });
                res.status(400).send({ message: error.message });
            }
        }
        else {
            res.status(404).send({ message: 'No image provided' })
        }
    })
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
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            alreadyReviewed.comment=comment
            alreadyReviewed.rating = Number(rating)
            // res.status(403)
            // throw new Error("you already reviewed on this product")
        } else {
            const review = { user: req.user._id, name: req.user.name, rating: Number(rating), comment }
            product.reviews.push(review)
        }
        product.numOfReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).send({ message: "review added successfully" })
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
            let user = await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.body.id } }, { new: true }).populate('wishlist')
            res.status(201).send({ message: "product remove from wishlist", wishlist: user.wishlist })
        }
        else {
            let user = await User.findByIdAndUpdate(req.user._id, { $push: { wishlist: req.body.id } }, { new: true }).populate('wishlist')
            res.status(201).send({ message: "product added to wishlist", wishlist: user.wishlist })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: error.message })
    }
})