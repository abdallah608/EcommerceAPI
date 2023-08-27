import mongoose from "mongoose";

const  productSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'product title is unique'],
        trim:true,
        required:[true,'product title is required'],
        minlength:[2,'too short brand name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true,
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    ratingAvg:{
        type:Number,
        min:[1,'rating average must be more than 1'],
        max:[5,'rating average must be less than 5'],
    },
    ratingCount:{
        type:Number,
        default:0,
        min:0
    },
    description:{
    type:String,
    minLength:[5,"too short description"],
    maxLength:[300,"too long description"],
    required:[true,'product description is required'],
    trim:true
    },
    quantity:{
    type:Number,
    default:0,
    min:0,
    required:[true,'product quantity is required']
    },
    sold:{
        type:Number,
        default:0,
        min:0,
    },
    imgCover:String,
    images:[String],
    category:{
    type:mongoose.Types.ObjectId,
    ref:"category",
    required:[true,'Category is required']
    },
    subCategory:{
    type:mongoose.Types.ObjectId,
    ref:"subCategory",
    required:[true,'subCategory is required']
    },
    brand:{
    type:mongoose.Types.ObjectId,
    ref:"brand",
    required:[true,'brand is required']
    },

},{
    timestamps:true,toJSON: { virtuals: true },toObject: { virtuals: true }
})

productSchema.post('init',(doc)=>{
if(doc.images ||doc.imgCover){
    
    doc.imgCover= `${process.env.updateURL}/product/`+doc.imgCover
    doc.images= doc.images.map(path=>`${process.env.updateURL}/product/`+path)
}
})

productSchema.virtual('reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  })

  productSchema.pre(/^find/,function(){
    this.populate('reviews')
  })

export const productModel =  mongoose.model('product', productSchema)   