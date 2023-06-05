import mongoose from "mongoose";

const  orderSchema = new mongoose.Schema({
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
    paymentMethod:{
        type:String,
        enums:["cash","credit"],
        default:"cash"
    },
    ShippingAddress:{
        city:String,
        street:String,
    },
    isPaid:Boolean,
    paidAt:Date,
    isDerived: Boolean,
    derivedTime: Boolean,
    orderNumber:{
        type:String,
        unique:true
    },

    },{
    timestamps:true
})


export const orderModel =  mongoose.model('order', orderSchema)