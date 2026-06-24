import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const  newOrder= new OrderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {
          cartData: {},
        });
        const line_items= req.body.items.map((item)=>({
            price_data:{
                currency:"us",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"us",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })
       
        
       } catch (error) {
        console.log(error)
        res.json({success:false,message:"order not placed"})
    }
}


// User Orders
export const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      userId: req.body.userId,
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching orders",
    });
  }
};


const listOrders = async (req,res)=>{
  try{
    const orders = await OrderModel.find({})
     res.json({success:true,data:orders})

  } catch(error){
    res.json({success:false,message:"Error fetching orders"})
  }
}



const updateStatus = async  (req,res)=>{
  try {
    await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true , message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"ERROR"})
    
  }
}




export { placeOrder, listOrders, updateStatus }; 