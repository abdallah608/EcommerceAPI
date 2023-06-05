import { response } from "express";
import { cartModel } from "../../../dataBase/models/cart/cart.model.js";
import { orderModel } from "../../../dataBase/models/order/order.model.js";
import { productModel } from "../../../dataBase/models/product/product.model.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import { nanoid } from "nanoid";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51ND64yGIdA3ZWx1GT9D4uQEbymcYoHVRZMmdSgiRNSLiKrGnRqR9K4qgfKWuBIHDwbbnUnTyiQ6bUqPwo9mjjRGC00IZ8XBcUl');


export const createCashOrder = 
catchAsyncError(
async(req,res,next)=>{
let cart = await cartModel.findById(req.params.id)
if(cart){
    let totalOrderPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount:cart.totalPrice
let order = new orderModel({
    user:req.user._id,
    cartItems:cart.cartItems,
    totalOrderPrice,
    ShippingAddress:req.body.ShippingAddress
})
if(order){
    let options = cart.cartItems.map((ele)=>({
        updateOne:{
            filter:{_id:ele.product},
            update:{$inc:{quantity:-ele.quantity,sold:ele.quantity}},
        }
    }))
    await productModel.bulkWrite(options)
    order.orderNumber= nanoid(5)
    await order.save()
}else{
    return next(new appError("error occurred while updating",409))
}

await cartModel.findByIdAndDelete(req.params.id)
res.status(200).json({message:"done",orderNumber:order.orderNumber})
 
}else{
    res.json({message:"order already done"})
}
}
)


export const  getUSerOrder = 
catchAsyncError(
    async(req, res, next) =>{
        let order = await orderModel.find({user:req.user.id})
        res.status(200).json({message:"done",order})
    }
)


export const onlinePayment = catchAsyncError(
    async(req,res,next)=>{
        let cart = await cartModel.findById(req.params.id)
        let totalOrderPrice = cart.totalPriceAfterDiscount? cart.totalPriceAfterDiscount:cart.totalPrice
        
        let session = await  stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:"egp",
                    unit_amount:totalOrderPrice *100,
                    product_data:{
                        name:req.user.name,
                    },
                },
                quantity:1,
            }
        ],
        mode:"payment",
        success_url:"https://route-comm.netlify.app/#/",
        cancel_url:"https://route-comm.netlify.app/#/cart",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.ShippingAddress
    })
    res.status(200).json({message:"done",session})    
})