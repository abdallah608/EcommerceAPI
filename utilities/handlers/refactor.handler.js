import appError from "../error/appErr.js"
import catchAsyncError from "../error/catchAsyncError.js"


export const deleteOne =  (model)=>{
   return catchAsyncError(
        async (req,res,next)=>{
            let {id}= req.params
            let deleted = await model.findByIdAndDelete(id)
            if(deleted==null){return next(new appError("already deleted",404))}
            res.status(200).json({message:"done",deleted})
            
        })
}

export const getById = (model)=>{
    return    catchAsyncError(
        async  (req,res,next)=>{
          let {id}= req.params
          let founded = await model.findById(id)
          if(! founded){return next(new appError("id not founded",400))}
          res.status(200).json({message:"done",founded})
          
  })
}