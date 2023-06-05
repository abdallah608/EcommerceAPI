import express from "express"
import * as userController from "./controller/user.controller.js"
export const userRouter = express.Router()


userRouter.route("/").get(userController.getUser)
.post(userController.addUser)

userRouter.route('/:id').put(userController.updateUser)
.delete(userController.deleteUser)
.get(userController.getUserById)

userRouter.patch('/changePassword/:id',userController.changePassword)


