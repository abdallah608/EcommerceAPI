import express from "express"
import { validator } from "../../middleWare/validator/validator.js"
import * as brandController from "./controller/brand.controller.js"
import { addBrandSchema, deleteOneSchema, getByIdSchema, updateBrandSchema } from "./brand.validation.js"
import { uploadFile } from "../../utilities/upload/fileUpload.js"
export const brandRouter = express.Router()

brandRouter.route("/").get(brandController.getBrand).post(uploadFile("brand","logo"),validator(addBrandSchema),brandController.addBrand)

brandRouter.route('/:id').put(uploadFile("brand","logo"),validator(updateBrandSchema),brandController.updateBrand)
.delete(validator(deleteOneSchema),brandController.deleteBrand)
.get(validator(getByIdSchema),brandController.getBrandById)


