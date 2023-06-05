import mongoose from "mongoose";

export const connection = async()=>{
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.dpURL).then(
        ()=>{console.log("DB connected")}
    ).catch((err)=>{console.log("err",err)})
}