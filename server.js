import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';
import paymentRoutes  from './routes/paymentRoutes.js'
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;




// middleware middle
app.use(express.json())
app.use(cors())
// db connection \
connectDB();
connectCloudinary();
// api endpoint
app.use("/api/food",foodRouter)
app.use("/image",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment", paymentRoutes); 

app.get('/',(req,res)=>{
    res.send('hello world')
})


 //mongodb+srv://yadavgdatabase:9771728554@cluster0.sqemgi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})