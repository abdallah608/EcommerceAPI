import express from "express"
import * as productController from "./controller/product.controller.js"
import { validator } from "../../middleWare/validator/validator.js"
import { addProductSchema, deleteOneSchema, getByIdSchema, updateProductSchema } from "./product.validation.js"
import { uploadMixFiles } from "../../utilities/upload/fileUpload.js"
import { allowedTo, protectRoutes } from "../auth/controller/auth.controller.js"
export const productRouter = express.Router()


productRouter.route("/").get(productController.getProduct)
.post(protectRoutes,allowedTo("admin"),
    uploadMixFiles('product',[{name:"imgCover",maxCount:1},{name:"images",maxCount:8}]),validator(addProductSchema),productController.addProduct)

productRouter.route('/:id').put(validator(updateProductSchema),productController.updateProduct)
.delete(validator(deleteOneSchema),productController.deleteProduct)
.get(validator(getByIdSchema),productController.getProductById)


