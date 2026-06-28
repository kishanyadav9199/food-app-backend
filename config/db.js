import mongoose from "mongoose";
import dns from "dns";



dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])
 export const connectDB= async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
      console.log("Database connected");
    });
}











