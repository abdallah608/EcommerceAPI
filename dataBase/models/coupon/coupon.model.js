import mongoose from "mongoose";

const  couponSchema = new mongoose.Schema({
    code:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    discount:{
        type:Number,
        min:0,
        required:true,
    },
    expireAt:{
        type:String,
        required:true,
    },
    users:[{
        type:mongoose.Types.ObjectId,
        ref:"user"

    }],
    qrCode:{type:String}},
    {
    timestamps:true
})


export const couponModel =  mongoose.model('coupon', couponSchema)