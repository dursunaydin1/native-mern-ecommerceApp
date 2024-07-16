import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";

// CREATE ORDER
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      tax,
      shippingCharges,
      totalAmount,
      orderStatus,
    } = req.body;
    const user = req.user._id;
    // create order
    await orderModel.create({
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      tax,
      shippingCharges,
      totalAmount,
      orderStatus,
      user,
    });
    //    stock update
    for (let i = 0; i < orderItems.length; i++) {
      //  find product
      const product = await productModel.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error While Placing Order",
      error: error.message,
    });
  }
};
