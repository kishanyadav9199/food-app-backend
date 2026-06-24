import foodModel from "../models/foodModels.js";
import fs from 'fs'
// add food item
const addFood= async(req,res)=>{

    let image_filename = `${req.file.filename}`
     const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image:image_filename
     })
     try {
        await food.save();
        res.json({success:true,message:"food added successfully"})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:"food not added"})
     }
}
// all food list

const listFood= async(req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"food not found"})
    }
}
// remove all food list

const removeFood= async(req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,data:food})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"food not found"})
    }
}

export {addFood,listFood,removeFood}
