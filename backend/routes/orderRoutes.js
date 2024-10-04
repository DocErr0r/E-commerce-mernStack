import express from "express";
import verifyuser from "../middlewares/verifyuser.js";
import admin from "../middlewares/admin.js";
import validId from "../middlewares/validId.js";
import { adminDasboard, createOrder, getAllOrders, getMyOrders, getOrderById, markAsDelivered, markAsPaid } from "../controller/orderController.js";
const router = express.Router();

router.route('/').post(verifyuser, createOrder).get(admin, getAllOrders)
router.route('/me/orders').get(verifyuser, getMyOrders)
router.route('/:id').get([verifyuser, validId], getOrderById)
router.route('/:id/paid').put([verifyuser, validId], markAsPaid)
router.route('/:id/deliver').put([admin, validId], markAsDelivered)

// dashborad
router.route('/admin/dashboard').get(adminDasboard)

// // user
// 1.create
// 2.my orders
// 3.get single order
// 4.rozar order
// 5.rozar key
// 6.payment verify

// // admin
// 1.get all
// 2.update orders
// 3.get by id
// 4.delete order


export default router;