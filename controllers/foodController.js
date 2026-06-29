import foodModel from "../models/foodModels.js";
import { v2 as cloudinary } from "cloudinary";

const addFood = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const food = new foodModel({
      name: req.body.name,

      description: req.body.description,

      price: req.body.price,

      category: req.body.category,

      image: result.secure_url,
    });

    await food.save();

    res.json({
      success: true,

      message: "Food Added",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();

    res.json({
      success: true,
      data:foods,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,

      message: "Food Removed",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,

      message: error.message,
    });
  }
};

export { addFood, listFood, removeFood };
