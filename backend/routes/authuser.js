import express from "express";
import { createUser, getAllUser, loginUser, logoutUser } from "../controller/userController.js";
import admin from "../middlewares/admin.js";

const router = express.Router()

// 1. create user
router.post('/createuser', createUser)
// 2. login user
router.post('/login', loginUser)
// 3.logout user
router.post('/logout', logoutUser)
// 4.  get all users (admin only)
router.get("/users", admin, getAllUser);
//  ,(req,res)=>{
//     User.find({},"-__v")
//         .then((users)=> res.json(users))
// })
export default router;