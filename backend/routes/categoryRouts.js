import express from "express";
import { creactCategory, getCategories, getCategory, removeCategory, updateCategory } from "../controller/categoryController.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";
import isVendor from "../middlewares/isVendor.js";

const router = express.Router()

router.route("/create").post(isVendor, creactCategory)
router.route("/categories").get(getCategories)
router.route("/categories/:id").get(validId, getCategory).put([validId, isVendor], updateCategory).delete([validId, isVendor], removeCategory)

export default router;