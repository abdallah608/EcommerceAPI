import mongoose from "mongoose";

const  reviewSchema = new mongoose.Schema({
    comment:{
        type:String,
        trim:true,
        required:true,
        minlength:[2,'too short review name']
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product',
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true,
    },
    rate:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
},{
    timestamps:true
})
reviewSchema.pre(/^find/,function(){
    this.populate('user','name')
})

export const reviewModel =  mongoose.model('review', reviewSchema)