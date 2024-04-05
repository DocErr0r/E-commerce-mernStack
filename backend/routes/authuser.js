import express from "express";
import { createUser } from "../controller/userController.js";

const router = express.Router()

// 1. create user
router.post('/createuser', createUser)

export default router;