import mongoose from "mongoose";

const  categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minlength:[2,'too short Category name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    image:String    
},{
    timestamps:true
})
categorySchema.post('init',(doc)=>{

    doc.image= "http://localhost:3000/category/"+doc.image
})

export const categoryModel =  mongoose.model('category', categorySchema)