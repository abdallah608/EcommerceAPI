export const  validator = (schema)=>{
    return (req,res,next)=>{
        let inputs = {...req.body,...req.params,...req.query}
        let {error}= schema.validate(inputs,{abortEarly:false})
        if(error){  
        let errors = error.details.map((detail)=>detail.message)
        res.status(400).json({message:"validation error",errors})
        }else{
            next()
        }     
    }
}