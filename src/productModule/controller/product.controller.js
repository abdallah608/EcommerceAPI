import { productModel } from "../../../dataBase/models/product/product.model.js";
import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import slugify from "slugify"
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";

export const addProduct = catchAsyncError(
    async(req,res,next)=>{
    req.body.slug =slugify(req.body.name)
    req.body.imgCover= req.files.imgCover[0].filename
    req.body.images= req.files.images.map(ele=>ele.filename)
    let added= new productModel(req.body)
        await added.save()
    res.status(201).json({message:"done",added})


})
export const getProduct = catchAsyncError(
   async (req,res,next)=>{
   let apiFeatures= new apiFeature(productModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateProduct = catchAsyncError(
   async (req,res,next)=>{
    let{id}=req.params
    req.body.imgCover= req.files.imgCover[0].filename
    req.body.images= req.files.images.map(ele=>ele.filename)
    if(req.body.name){
        req.body.slug= slugify(req.body.name) 
    }
    let founded = await productModel.findById(id)
    if(!founded){return next(new appError("id not found",400))}
    let updated= await productModel.findByIdAndUpdate(id,{...req.body},{new:true})
    res.status(200).json({message:"done",updated})
    
})
export const deleteProduct = deleteOne(productModel)

export const getProductById = getById(productModel)