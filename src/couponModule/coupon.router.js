import express from "express"
import * as couponController from "./controller/coupon.controller.js"
import { protectRoutes } from "../auth/controller/auth.controller.js"
export const couponRouter = express.Router()

couponRouter.route("/")
.get(protectRoutes,couponController.getAllCoupon)
.post(protectRoutes,couponController.createCoupon)

couponRouter.route('/:id').put(protectRoutes,couponController.updateCoupon)
.delete(protectRoutes,couponController.deleteCoupon)
.get(protectRoutes,couponController.getCouponById)


