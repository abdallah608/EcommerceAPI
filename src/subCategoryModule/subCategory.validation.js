import joi from "joi"

export const addSubCategorySchema= joi.object({
name:joi.string().min(2).max(30).required(),
category:joi.string().hex().length(24).required()
})

export const updateSubCategorySchema= joi.object({
name:joi.string().min(2).max(30).required(),
id: joi.string().hex().length(24).required(),
category:joi.string().hex().length(24).required()
})
export const getByIdSchema= joi.object({
id: joi.string().hex().length(24).required()
})
export const deleteOneSchema= joi.object({
id: joi.string().hex().length(24).required()
})