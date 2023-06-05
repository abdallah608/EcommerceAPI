function catchAsyncError(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            // res.json({message:"error",err})
            next(err);
        })
    }
    }

    export default catchAsyncError