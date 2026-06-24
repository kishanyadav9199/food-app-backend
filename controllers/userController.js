import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,msg:"User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,msg:"Incorrect password"})
        }
        const token = await createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Something went wrong"})
    }
}

const createToken= async(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user

const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        // cheaking user already registered
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,msg:"User already exists"})
        }
        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,msg:"Please enter a valid email"})

        }

        if(password.length<8){
            return res.json({success:false,msg:"Password must be atleast 8 characters"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        // creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        })
        const user = await newUser.save()
        const token = await createToken(user._id)
        res.json({success: true,token})
    } catch (error) {
        console.log(error);
        res.json({success: false,msg:"Error"})
    }
}

export { loginUser, registerUser}

