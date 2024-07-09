import serverHandler from "../middlewares/serverhandler.js";
import Product from "../models/product.js";

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

export const searchProducts = serverHandler(async (req, res) => {
    const pageSize=5
    try {
        const keyword = req.query.keyword?{name: {$regex: req.query.keyword ,$options:"i"}}:{}

        const count=await Product.countDocuments({...keyword})
        const products = await Product.find({...keyword}).populate('category').limit(pageSize)
        if (!products) {
            return res.status(400).send({ message: "products not found" })
        }
        res.status(200).send({products,page:1,pages:Math.ceil(count/pageSize),hasMore:false});
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
        res.status(200).send({message:"product is deleted"});
    }
    catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const createProduct = serverHandler(async (req, res) => {
    const { name, image, description, price, category, brand, quantity } = req.body;
    if (!name) return res.send({ message: 'Name is requried' })
    if (!image) return res.send({ message: 'Image is requried' })
    if (!description) return res.send({ message: 'Description is requried' })
    if (!price) return res.send({ message: 'Price is requried' })
    if (!category) return res.send({ message: 'Category is requried' })
    if (!brand) return res.send({ message: 'Brand is requried' })
    if (!quantity) return res.send({ message: 'Quantity is requried' })
    try {
        const product = new Product({ ...req.body })
        await product.save()

        res.send(product)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

export const updateProduct = serverHandler(async (req, res) => {
    const { name, image, description, price, category, brand, quantity } = req.body;
    if (!name) {
        return res.send({ message: 'Name is requried' })
    }
    if (!image) {
        return res.send({ message: 'Image is requried' })
    }
    if (!description) {
        return res.send({ message: 'Description is requried' })
    }
    if (!price) {
        return res.send({ message: 'Price is requried' })
    }
    if (!category) {
        return res.send({ message: 'Category is requried' })
    }
    if (!brand) {
        return res.send({ message: 'Brand is requried' })
    }
    if (!quantity) {
        return res.send({ message: 'Quantity is requried' })
    }
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send({ message: "product not found" })
        }
        const newproduct = await Product.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true })
        res.send(newproduct)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})
