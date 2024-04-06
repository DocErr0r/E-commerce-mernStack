import express from "express";
import { createUser, deleteUser, getAllUser, getCrUser, loginUser, logoutUser, updateCrUser } from "../controller/userController.js";
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
// 4.  get all users (admin only)
router.get("/users", admin, getAllUser);
// 6.delete user
router.delete("/users/:id",[validId,admin],deleteUser)

// 5. get current user
router.route("/user").get(verifyuser,getCrUser).put(verifyuser,updateCrUser);

export default router;