import express from "express";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js"
import verifyuser from "../middlewares/verifyuser.js"
import formidable from "express-formidable";
import { addReview, createProduct, getAdminProducts, getNewProducts, getProduct, getProducts, getTopProducts, removeProduct, searchProducts, updateProduct } from "../controller/productController.js";
const router = express.Router();

router.get('/search', searchProducts);
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/new', getNewProducts);

router.route('/create').post([admin], formidable(), createProduct);
router.route('/me/products').get([admin], getAdminProducts);
router.route('/:id/review').post([verifyuser, validId], addReview);
router.route('/:id').put([admin, validId], updateProduct).delete([admin, validId], removeProduct).get(validId, getProduct);

export default router