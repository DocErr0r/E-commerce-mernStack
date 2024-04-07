import express from "express";
import { createUser, deleteUserById, getAllUser, getCrUser, getUserById, loginUser, logoutUser, updateCrUser, updateUserById } from "../controller/userController.js";
import admin from "../middlewares/admin.js";
import verifyuser from "../middlewares/verifyuser.js";
import validId from "../middlewares/validId.js";

const router = express.Router()

// 1. create user
router.post('/createuser', createUser)
// 2. login user
router.post('/login', loginUser)
// 3.logout user
router.post('/logout', logoutUser)
// 4. get current user
router.route("/v1/me").get(verifyuser, getCrUser).put(verifyuser, updateCrUser);

// 5.  get all users (admin only)
router.get("/users", admin, getAllUser);
// 6.delete user (admin only)
router.route("/users/:id").delete([validId, admin], deleteUserById).get([validId, admin], getUserById).put([validId, admin], updateUserById)

export default router;