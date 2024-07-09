import express from "express";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js"
import verifyuser from "../middlewares/validId.js"
import formidable from "express-formidable";
import { createProduct, getProduct, getProducts, removeProduct, searchProducts, updateProduct } from "../controller/productController.js";
const router = express.Router();

router.route('/create').post([admin], formidable(), createProduct);
router.get('/', getProducts);
router.get('/search', searchProducts);
router.route('/:id').put([admin, validId], updateProduct).delete([admin, validId], removeProduct).get(getProduct);

// router.route('/:id/review').post([verifyuser], createProduct);

export default router