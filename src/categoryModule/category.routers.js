import express from "express"
import * as categoryController from "./controller/category.controller.js"
import { subCategoryRouter } from "../subCategoryModule/subCategory.router.js"
import { validator } from "../../middleWare/validator/validator.js"
import { addCategorySchema, deleteOneSchema, getByIdSchema, updateCategorySchema } from "./category.validation.js"
import { uploadFile } from "../../utilities/upload/fileUpload.js"
export const categoryRouter = express.Router()

categoryRouter.use("/:id/subCategory",subCategoryRouter)
categoryRouter.route("/")
.get(categoryController.getCategory)
.post(uploadFile("category","image"),validator(addCategorySchema),categoryController.addCategory)

categoryRouter.route('/:id').put(uploadFile("category","image"),validator(updateCategorySchema),categoryController.updateCategory)
.delete(validator(deleteOneSchema),categoryController.deleteCategory)
.get(validator(getByIdSchema),categoryController.getCategoryById)
