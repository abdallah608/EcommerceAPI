import mongoose from "mongoose";

const  cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    },
    cartItems:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"product"
        },
        quantity:{
            type:Number,
            default:1
        },
        price:Number
    }],
    totalPrice:Number,
    Discount:Number,
    totalPriceAfterDiscount:Number,
    },{
    timestamps:true
})


export const cartModel =  mongoose.model('cart', cartSchema)