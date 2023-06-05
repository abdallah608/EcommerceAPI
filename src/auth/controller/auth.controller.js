import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import  jwt  from "jsonwebtoken";
import bcrypt from"bcrypt"
import { userModel } from "../../../dataBase/models/user/user.model.js";
export const signUp = catchAsyncError(
    async(req,res,next)=>{
    let founded = await userModel.findOne({email: req.body.email})
    if(founded) return next(new appError('email already exists',409));
    let added= new userModel(req.body)
    await added.save()
    res.status(201).json({message:"done",added})
})
export const signIn = catchAsyncError(
    async(req,res,next)=>{
    let{email,password} = req.body
    let founded = await userModel.findOne({email})
    // console.log(founded.email);
    if(!founded) return next(new appError('email not found please register first',409));
    let matched=  bcrypt.compareSync(password,founded.password)
    if(!matched) return next(new appError('password notMatched',409));
    let token= jwt.sign({name:founded.name,userId:founded._id,role:founded.role},"abdallah")
    res.status(201).json({message:"welcome",token})
})




export const protectRoutes= catchAsyncError(
   async (req,res,next)=>{
       let {token} = req.headers
    if(!token) return next(new appError('please provide a token',404))

    let decoded = await jwt.verify(token, "abdallah");
    // console.log(decoded.userId);
    let user= await userModel.findById(decoded.userId)
    if (!user) return next(new appError('user not found',400))
    // console.log(user);
    if(user.changePasswordAt){
        let changePasswordTime= parseInt(user.changePasswordAt.getTime()/1000)
        if(changePasswordTime>decoded.iat)return next(new appError('token invalid',401))
       

    }

    req.user = user;
    next()
    }
)   


export const allowedTo=(...roles)=>{
    
    return catchAsyncError(async (req, res, next)=>{
        if(!roles.includes(req.user.role))return next(new appError("you are not authorized",403));
        next()
    })
}