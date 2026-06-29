import userModel from "../models/userModel.js";

// Add to Cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    if (!userData) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }

    if (!userData.cartData) {
      userData.cartData = {};
    }

    const itemId = req.body.itemId;

    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

    // Tell Mongoose that the object has changed
    userData.markModified("cartData");

    await userData.save();

    console.log("Saved Cart:", userData.cartData);

    res.json({
      success: true,
      msg: "Added to Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};
// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    let cartData = userData.cartData || {};

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId];
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({
      success: true,
      msg: "Removed from Cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {

    const userData = await userModel.findById(req.body.userId);

    console.log("User:", userData);
    console.log("CartData:", userData?.cartData);

    res.json({
      success: true,
      data: userData.cartData || {},
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

export { addToCart, removeFromCart, getCart };
