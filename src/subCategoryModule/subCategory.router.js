import express from "express"
import { validator } from "../../middleWare/validator/validator.js"
import * as subCategoryController from "./controller/subCategory.controller.js"
import { addSubCategorySchema, deleteOneSchema, getByIdSchema, updateSubCategorySchema } from "./subCategory.validation.js"
import { uploadFile } from "../../utilities/upload/fileUpload.js"
export const subCategoryRouter = express.Router({mergeParams:true})

subCategoryRouter.route("/").get(subCategoryController.getSubCategory).post(uploadFile("subCategory","image"),validator(addSubCategorySchema),subCategoryController.addSubCategory)

subCategoryRouter.route('/:id').put(uploadFile("subCategory","image"),validator(updateSubCategorySchema),subCategoryController.updateSubCategory)
.delete(validator(deleteOneSchema),subCategoryController.deleteSubCategory)
.get(validator(getByIdSchema),subCategoryController.getSubCategoryById)


