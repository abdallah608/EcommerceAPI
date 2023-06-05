import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:[1,'too short Category name']
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:[true,'email is required'],
        minlength:[1,'too short Category name']
    },
    password:{
        type:String,
        trim:true,
     required:true,
        minlength:[6,'too short Category name']
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    wishList:[{
        type:mongoose.Types.ObjectId,
        ref:"product"
    }]
    ,
    profilePicPath:String,
    age:Number,
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    code:{
        type:String,
        default:""
    },
    confirmedEmail:{
        type:Boolean,
        default:false
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    logOutAt:Date,
    changePasswordAt:Date

},{
    timestamps: true
})

userSchema.pre('save', function(){
    this.password=bcrypt.hashSync(this.password,7)
})

userSchema.pre('findOneAndUpdate', function(){
  if(this._update.password){  
    this._update.password= bcrypt.hashSync(this._update.password,7)}
})

export const userModel = mongoose.model("user",userSchema);