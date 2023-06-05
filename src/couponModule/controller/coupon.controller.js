import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";
import { couponModel } from "../../../dataBase/models/coupon/coupon.model.js";
import QRCode from "qrcode"
export const createCoupon = catchAsyncError(
    
    async(req,res,next)=>{
    let added= new couponModel(req.body)
    await added.save()
    let qrURl = await QRCode.toDataURL(added.code)
    res.status(201).json({message:"done",added,qrURl})


})
export const getAllCoupon = catchAsyncError(
   async (req,res,next)=>{
   let apiFeatures= new apiFeature(couponModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})
export const updateCoupon = catchAsyncError(
   async (req,res,next)=>{
    let{id}=req.params
    let{discount,expireAt}=req.body
    let updated= await couponModel.findOneAndUpdate({_id:id},{discount,expireAt},{new:true})
    if(!updated ){return next(new appError("can't found this coupon",409))}
    res.status(200).json({message:"done",updated})
    
})
export const deleteCoupon = deleteOne(couponModel)

export const getCouponById = getById(couponModel)