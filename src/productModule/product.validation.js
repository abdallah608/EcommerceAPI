import joi from "joi"

export const addProductSchema= joi.object({
name:joi.string().min(2).max(30).required(),
price:joi.number().required(),
priceAfterDiscount:joi.number().required(),
ratingAvg:joi.number().required(),
ratingCount:joi.number().required(),
description:joi.string().min(2).max(700).required(),
quantity:joi.number().required(),
sold:joi.number().required(),
category: joi.string().hex().length(24).required(),
subCategory: joi.string().hex().length(24).required(),
brand: joi.string().hex().length(24).required()

})

export const updateProductSchema= joi.object({
id: joi.string().hex().length(24).required(),
name:joi.string().min(2).max(30),
price:joi.number(),
priceAfterDiscount:joi.number(),
ratingAvg:joi.number(),
ratingCount:joi.number(),
description:joi.string().min(2).max(700),
quantity:joi.number(),
sold:joi.number(),
category: joi.string().hex().length(24),
subCategory: joi.string().hex().length(24),
brand: joi.string().hex().length(24)

})
export const getByIdSchema= joi.object({
id: joi.string().hex().length(24).required()
})
export const deleteOneSchema= joi.object({
id: joi.string().hex().length(24).required()
})