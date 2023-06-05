import joi from "joi"

export const addCategorySchema= joi.object({
name:joi.string().min(2).max(30).required()
})

export const updateCategorySchema= joi.object({
name:joi.string().min(2).max(30).required(),
id: joi.string().hex().length(24).required()
})
export const getByIdSchema= joi.object({
id: joi.string().hex().length(24).required()
})
export const deleteOneSchema= joi.object({
id: joi.string().hex().length(24).required()
})