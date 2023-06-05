import express from "express"
import * as userController from "./controller/auth.controller.js"
export const authRouter = express.Router()


authRouter.post("/signIn",userController.signIn)
authRouter.post("/signUp",userController.signUp)
