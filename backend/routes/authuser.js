import express from "express";
import { createUser,loginUser } from "../controller/userController.js";

const router = express.Router()

// 1. create user
router.post('/createuser', createUser)
// 2. login user
router.post('/login', loginUser)
// 3.  get all users (admin only)
// router.get("/", isAuthenticated ,(req,res)=>{
//     User.find({},"-__v")
//         .then((users)=> res.json(users))
// })
export default router;