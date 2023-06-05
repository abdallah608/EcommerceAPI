import express from "express"
import * as wishListController from "./controller/wishList.controller.js"
import { protectRoutes } from "../auth/controller/auth.controller.js"

export const wishListRouter = express.Router()

wishListRouter.route("/").put(protectRoutes,wishListController.addWishList).delete(protectRoutes,wishListController.removeFromWishList).get(protectRoutes,wishListController.getWishList)



