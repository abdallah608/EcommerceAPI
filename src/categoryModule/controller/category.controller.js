import { categoryModel } from "../../../dataBase/models/category/category.model.js";
import appError from "../../../utilities/error/appErr.js";
import catchAsyncError from "../../../utilities/error/catchAsyncError.js";
import slugify from "slugify";
import {deleteOne,getById} from "../../../utilities/handlers/refactor.handler.js";
import apiFeature from "../../../utilities/ApiFeature/ApiFeature.js";

export const addCategory = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let added = new categoryModel(req.body);
  await added.save();
  res.status(201).json({ message: "done", added });
});
export const getCategory = catchAsyncError(async (req, res, next) => {
  let apiFeatures= new apiFeature(categoryModel.find(),req.query).pagination().sort().filter().search().fields()
  let found = await apiFeatures.mongooseQuery;
  if (!found.length < 0) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json({ message: "done", page: apiFeatures.page, found });
});
export const updateCategory = catchAsyncError(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  let founded = await categoryModel.findById(id);
  if (!founded) {
    return next(new appError("id not found", 400));
  }
  if (founded && founded.name == req.body.name) {
    return next(new appError("it's the same old date no date change", 400));
  }
  let updated = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json({ message: "done", updated });
});
export const deleteCategory = deleteOne(categoryModel);

export const getCategoryById = getById(categoryModel);
