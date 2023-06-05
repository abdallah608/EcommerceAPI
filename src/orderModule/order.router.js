import express from "express"
import * as orderController from "./controller/order.controller.js"
import { protectRoutes } from "../auth/controller/auth.controller.js"
export const orderRouter = express.Router()

orderRouter.route("/")
.get(protectRoutes,orderController.getUSerOrder)

orderRouter.route('/:id')
.post(protectRoutes,orderController.createCashOrder)

orderRouter.route('/checkout/:id')
.post(protectRoutes,orderController.onlinePayment)

