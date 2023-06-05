import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import { userModel } from "../../../dataBase/models/user/user.model.js";


export const addWishList = catchAsyncError(
   async (req,res,next)=>{
    let{product }=req.body
    let userId = req.user._id
    let result= await userModel.findOneAndUpdate(userId,{$addToSet:{wishList:product}},{new:true})
    if(!result ){return next(new appError("product not found",409))}
    res.status(200).json({message:"done",result})
    
})
export const removeFromWishList = catchAsyncError(
   async (req,res,next)=>{
    let{product }=req.body
    let userId = req.user._id
    let result= await userModel.findOneAndUpdate(userId,{$pull:{wishList:product}},{new:true})
    if(!result ){return next(new appError("already remove",409))}
    res.status(200).json({message:"done",result})
    
})
export const getWishList = catchAsyncError(
   async (req,res,next)=>{
    let userId = req.user._id
    let result= await userModel.findOne({_id:userId}).populate({
        path: "wishList"
    }).select("-password -confirmedEmail -isLoggedIn -isOnline -isDeleted -role -code -createdAt -updatedAt -mobileNumber -age -code  -__v")
    if(!result ){return next(new appError("not found your wishList",409))}
    res.status(200).json({message:"done",result})
    
})
