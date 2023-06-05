import { userModel } from "../../../dataBase/models/user/user.model.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";

export const addUser = catchAsyncError(
    async(req,res,next)=>{
    let founded = await userModel.findOne({email: req.body.email})
    if(founded) return next(new appError('email already exists',409));
    let added= new userModel(req.body)
    await added.save()
    res.status(201).json({message:"done",added})
})
export const getUser = catchAsyncError(
   async (req,res,next)=>{
   let apiFeatures= new apiFeature(userModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateUser = catchAsyncError(
   async (req,res,next)=>{
    let{id}=req.params
    let founded = await userModel.findById(id)
    if(!founded){return next(new appError("id not found",400))}
    let updated= await userModel.findByIdAndUpdate(id,{...req.body},{new:true})
    res.status(200).json({message:"done",updated})
})    
export const changePassword = catchAsyncError(
   async (req,res,next)=>{
    let{id}=req.params
    req.body.changePasswordAt=Date.now()
    let founded= await userModel.findOneAndUpdate({_id:id},req.body,{new:true})
    if(!founded){return next(new appError("id not found",400))}
    res.status(200).json({message:"done",founded})
})  

export const deleteUser = deleteOne(userModel)

export const getUserById = getById(userModel)