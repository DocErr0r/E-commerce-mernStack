import serverHandler from "../middlewares/serverhandler.js";
import Product from "../models/product.js";

export const getProducts = serverHandler(async (req, res) => {
    try {
        const products = await Product.find().select("-__v");
        res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
})

export const createProduct=serverHandler(async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
})
