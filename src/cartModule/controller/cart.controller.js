import { deleteOne, getById } from "../../../utilities/handlers/refactor.handler.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";
import { cartModel } from "../../../dataBase/models/cart/cart.model.js";
import { productModel } from "../../../dataBase/models/product/product.model.js";
import { couponModel } from "../../../dataBase/models/coupon/coupon.model.js";

function calcPrice(cart){
    let totalPrice = 0
    cart.cartItems.forEach((ele) => {
        totalPrice += ele.quantity * ele.price 
    });
    cart.totalPrice = totalPrice
}

export const addToCart = 
catchAsyncError(
    
    async(req,res,next)=>{

    let products =  await productModel.findById(req.body.product).select("price")
    if(!products) return next(new appError("Product not found",404));
        req.body.price = products.price
    let isExistingCart = await cartModel.findOne({user:req.user._id})
    if(!isExistingCart){
        //    console.log(req.body.product ) 
        let addCart= new cartModel({
            user:req.user._id,
            cartItems:[req.body]
        })
        calcPrice(addCart)
    await addCart.save()
   return res.status(201).json({message:"done", addCart})
    }

    let item = isExistingCart.cartItems.find((ele)=>ele.product == req.body.product)
//    console.log(item);    
    if(item) {
        item.quantity +=1 
    }else{
        isExistingCart.cartItems.push(req.body)
    }
    calcPrice(isExistingCart)
    await isExistingCart.save()
    res.json({message:"done",isExistingCart})


}
)
export const getCart = catchAsyncError(
   async (req,res,next)=>{
        let userCart = await cartModel.find({user:req.user._id})
        if(!userCart){ return next(new appError('Cart not found',404))}
        res.status(200).json({message:"done",userCart})
    }
)

export const getAllCart = catchAsyncError(
   async (req,res,next)=>{
   let apiFeatures= new apiFeature(cartModel.find(),req.query).pagination().sort().filter().search().fields()
    let found = await apiFeatures.mongooseQuery
    res.status(200).json({message:"done",page:apiFeatures.page,found})
        
})


export const removeFromCart = catchAsyncError(
    async(req,res,next)=>{
    let removeCart= await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartItems:{_id:req.params.id}}},{new:true})
    res.status(200).json({message:"done",removeCart})
    })



export const updateCart = 
catchAsyncError(
    
    async(req,res,next)=>{

    let isCart = await cartModel.findOne({user:req.user._id})
    if(!isCart) return next(new appError("cart not found",404));
    let item = isCart.cartItems.find((ele)=>ele.product == req.headers.product)
    if(! item){return next(new appError("item not found",400))}
    if(item) {
        item.quantity = req.body.quantity 
    }
    calcPrice(isCart)
    await isCart.save()
    res.json({message:"done",isCart})


}
)


export const applyCoupon = catchAsyncError(
    async(req, res, next) =>{
        let code = await couponModel.findOne({code:req.params.code})
        let cart = await cartModel.findOne({user:req.user._id})
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice *code.discount)/100;
        cart.Discount = code.discount

        await cart.save()
        res.status(200).json({message:"done", cart})
    })