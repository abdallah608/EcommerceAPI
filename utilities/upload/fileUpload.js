import multer from "multer"
import appError from "../error/appErr.js"
import { nanoid } from "nanoid"

let options =(folderName)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      cb(null, nanoid(4)+ '-' + file.originalname )
    }
  })
  
function fileFilter (req, file, cb) {
if(file.mimetype.startsWith("image")){
cb(null, true)
}else{
cb(new appError("invalid image",400), false)
}}

  return multer({ storage,fileFilter })
}


export const uploadFile = (folderName,fieldName)=> options(folderName).single(fieldName)


export const uploadMixFiles = (folderName,arrayName)=> options(folderName).fields(arrayName)