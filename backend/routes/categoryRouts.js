import express from "express";
import { creactCategory, getCategories, getCategory, removeCategory, updateCategory } from "../controller/categoryController.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";

const router = express.Router()

router.route("/create").post(admin, creactCategory)
router.route("/categories").get(getCategories)
router.route("/categories/:id").get(validId, getCategory).put([validId, admin], updateCategory).delete([validId, admin], removeCategory)

export default router;