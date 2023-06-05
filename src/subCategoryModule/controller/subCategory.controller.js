import { subCategoryModel } from "../../../dataBase/models/subCategory/subCategory.model.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import slugify from "slugify"
import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";

export const addSubCategory = catchAsyncError(
    async(req,res,next)=>{
    console.log(req.file);
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let added= new subCategoryModel(req.body)
    await added.save()
    res.status(201).json({message:"done",added})


})
export const getSubCategory = catchAsyncError(
   async (req,res,next)=>{
    let filters = {}
    if(req.params && req.params.id){filters = {category:req.params.id}}
    let apiFeatures= new apiFeature(subCategoryModel.find(filters),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateSubCategory = catchAsyncError(
   async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let{id}=req.params
    let founded = await subCategoryModel.findById(id)
    if(!founded){return next(new appError("id not found",400))}
    if(founded && founded.name == req.body.name){return next(new appError("it's the same old date no date change",400))}
    let updated= await subCategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"done",updated})
    
})
export const deleteSubCategory = deleteOne(subCategoryModel)


export const getSubCategoryById = getById(subCategoryModel)