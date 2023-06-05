import { brandModel } from "../../../dataBase/models/brand/brand.model.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import slugify from "slugify"
import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";

export const addBrand= catchAsyncError(
    async(req,res,next)=>{
        req.body.slug = slugify(req.body.name)
        req.body.logo = req.file.filename
    let added= new brandModel(req.body)
        await added.save()
    res.status(201).json({message:"done",added})


})
export const getBrand = catchAsyncError(
   async (req,res,next)=>{
    let apiFeatures= new apiFeature(brandModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateBrand = catchAsyncError(
   async (req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let{id}=req.params
    let founded = await brandModel.findById(id)
    if(founded && founded.name == req.body.name){return next(new appError("it's the same old date no date change",400))}
    let updated= await brandModel.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"done",updated})
    
})
export const deleteBrand =deleteOne(brandModel)

export const getBrandById = getById(brandModel)