import express from "express"
import * as reviewController from "./controller/review,controller.js"
import { protectRoutes } from "../auth/controller/auth.controller.js"
export const reviewRouter = express.Router()

reviewRouter.route("/").get(reviewController.getReview).post(protectRoutes,reviewController.addReview)

reviewRouter.route('/:id').put(protectRoutes,reviewController.updateReview)
.delete(reviewController.deleteReview)
.get(reviewController.getReviewById)


