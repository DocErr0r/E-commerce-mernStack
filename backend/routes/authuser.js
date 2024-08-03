import express from "express";
import { createUser, deleteUserById, forgotPassword, getAllUser, getCrUser, getCrUserWishlist, getUserById, loginUser, logoutUser, resetPassword, updateCrUser, updatePassword, updateUserById } from "../controller/userController.js";
import admin from "../middlewares/admin.js";
import verifyuser from "../middlewares/verifyuser.js";
import validId from "../middlewares/validId.js";

const router = express.Router()

// ----login not required-------
// 1. create user
router.post('/createuser', createUser)
// 2. login user
router.post('/login', loginUser)
// user forgot password
router.post("/forgot-password", forgotPassword)
// reset password using token
router.put("/reset-password/:token", resetPassword)

// ----login required-------
// 3.logout user
router.post('/logout', logoutUser)
// 4. get/update current user
router.route("/v1/me").get(verifyuser, getCrUser).put(verifyuser, updateCrUser);
// change password
router.route("/v1/me/updatepassword").put(verifyuser, updatePassword)
// get wishlists
router.route("/v1/me/wishlist").get(verifyuser, getCrUserWishlist)

// ----login required as admin-------
// 5.  get all users (admin only)
router.get("/users", admin, getAllUser);
// 6.delete user (admin only)
router.route("/users/:id").delete([validId, admin], deleteUserById).get([validId, admin], getUserById).put([validId, admin], updateUserById)

export default router;