import mongoose from "mongoose";
 export const connectDB= async()=>{
    await mongoose
      .connect(
        "mongodb+srv://wwwkishan763_db_user:6eXEOPTB1IoyVyG5@cluster0.gko8xrp.mongodb.net/DeliveryApp"
      )
      .then(() => {
        console.log("Database connected");
      });
}







//mongodb+srv://yadavgdatabase:<db_password>@cluster0.sqemgi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://wwwkishan763_db_user:6eXEOPTB1IoyVyG5@cluster0.gko8xrp.mongodb.net/?appName=Cluster0

 // "mongodb+srv://wwwkishan763_db_user:6eXEOPTB1IoyVyG5@cluster0.gko8xrp.mongodb.net/food-delivery"



// NcR0jevP41YuRFFi paswoed
// wwwkishan763 username




