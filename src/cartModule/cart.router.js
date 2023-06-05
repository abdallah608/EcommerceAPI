import express from "express"
import * as cartController from "./controller/cart.controller.js"
import { allowedTo, protectRoutes } from "../auth/controller/auth.controller.js"
export const cartRouter = express.Router()

cartRouter.route("/")
.get(protectRoutes,cartController.getCart)
.post(protectRoutes,cartController.addToCart)
.put(protectRoutes,cartController.updateCart)

cartRouter.get("/allcart/",protectRoutes,allowedTo("admin"),cartController.getAllCart)

cartRouter.route('/:id')
.delete(protectRoutes,cartController.removeFromCart)
cartRouter.route('/:code')
.put(protectRoutes,cartController.applyCoupon)

