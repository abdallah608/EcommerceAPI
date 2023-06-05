import appError from "../../utilities/error/appErr.js"
import globalError from "../../utilities/error/globelError.js"
import { authRouter } from "../auth/auth.routers.js"
import { brandRouter } from "../brandModule/brand.router.js"
import { cartRouter } from "../cartModule/cart.router.js"
import { categoryRouter } from "../categoryModule/category.routers.js"
import { couponRouter } from "../couponModule/coupon.router.js"
import { orderRouter } from "../orderModule/order.router.js"
import { productRouter } from "../productModule/product.routers.js"
import { reviewRouter } from "../reviewModule/review.routers.js"
import { subCategoryRouter } from "../subCategoryModule/subCategory.router.js"
import { userRouter } from "../userModule/uer.routers.js"
import { wishListRouter } from "../wishList/wishList.routers.js"

export function init(app){
    
app.use('/category',categoryRouter)
app.use('/subCategory',subCategoryRouter)
app.use('/brand',brandRouter)
app.use('/product',productRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/review',reviewRouter)
app.use('/wishList',wishListRouter)
app.use('/coupon',couponRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)


app.all("*",(req,res,next)=>{
    next(new appError(`Invalid Url ${req.originalUrl}`,404))
   })

   app.use(globalError)
}

    process.on("unhandledRejection",(err,req,res,next)=>{
        next(err)
    })
