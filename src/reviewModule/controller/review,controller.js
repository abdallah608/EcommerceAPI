import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";
import { reviewModel } from "../../../dataBase/models/review/review.model.js";

export const addReview = catchAsyncError(
    
    async(req,res,next)=>{
    req.body.user=req.user._id; 
    let alreadyReview = await reviewModel.findOne({user:req.user._id},{product:req.body.product})
    if(alreadyReview){return next(new appError("you are already review this product",409))}
    let added= new reviewModel(req.body)
    await added.save()
    res.status(201).json({message:"done",added})


})
export const getReview = catchAsyncError(
   async (req,res,next)=>{
   let apiFeatures= new apiFeature(reviewModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateReview = catchAsyncError(
   async (req,res,next)=>{
    let{id}=req.params
    let userId=req.user._id
    let updated= await reviewModel.findOneAndUpdate({_id:id,user:userId},req.body,{new:true})
    if(!updated ){return next(new appError("you can't edit review for another user",409))}
    res.status(200).json({message:"done",updated})
    
})
export const deleteReview = deleteOne(reviewModel)

export const getReviewById = getById(reviewModel)