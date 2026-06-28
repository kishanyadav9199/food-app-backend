import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const createOrder = async (req, res) => {
  try {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log(
      "KEY_SECRET:",
      process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing",
    );
    console.log("Amount:", req.body.amount);

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log(order);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
      items,
      amount,
      userId,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.json({
        success: false,
        message: "Invalid Signature",
      });
    }

    await OrderModel.create({
      userId,
      items,
      amount,
      address,
      payment: true,
    });

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Payment Verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};