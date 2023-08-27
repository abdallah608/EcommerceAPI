import mongoose from "mongoose";

const  brandSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minlength:[2,'too short brand name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    logo:String
},{
    timestamps:true
})
brandSchema.post('init',(doc)=>{
    if(doc.logo){doc.logo= "http://localhost:3000/brand/"+doc.logo}
  
})

export const brandModel =  mongoose.model('brand', brandSchema)