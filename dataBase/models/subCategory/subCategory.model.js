import mongoose from "mongoose";

const  subCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minlength:[2,'too short subCategory name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:"category"
    },
    image:String
},{
    timestamps:true
})

subCategorySchema.post('init',(doc)=>{
    console.log(doc);
    doc.image= "http://localhost:3000/subCategory/"+doc.image
})

export const subCategoryModel =  mongoose.model('subCategory', subCategorySchema)