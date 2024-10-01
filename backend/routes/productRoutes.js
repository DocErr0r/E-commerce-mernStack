import express from "express";
// import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js"
import verifyuser from "../middlewares/verifyuser.js"
import isVendor from "../middlewares/isVendor.js"
import formidable from "express-formidable";
import { addReview, addWishList, createProduct, getAdminProducts, getNewProducts, getProduct, getProducts, getTopProducts, removeProduct, searchProducts, updateProduct } from "../controller/productController.js";
const router = express.Router();

router.get('/search', searchProducts);
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/new', getNewProducts);
router.put('/wishlist', [verifyuser], addWishList);

router.route('/create').post([isVendor], createProduct);
router.route('/me/products').get([isVendor], getAdminProducts);
router.route('/:id/review').post([verifyuser, validId], addReview);
router.route('/:id').put([isVendor, validId], updateProduct).delete([isVendor, validId], removeProduct).get(validId, getProduct);

export default router