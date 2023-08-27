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
    if(doc.image ){ doc.image= `${process.env.updateURL}/category/`+doc.image}

})

export const categoryModel =  mongoose.model('category', categorySchema)