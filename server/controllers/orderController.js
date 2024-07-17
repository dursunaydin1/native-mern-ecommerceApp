import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";
import { stripe } from "../server.js";

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

// GET ALL ORDERS
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    //   validation
    if (!orders) {
      return res.status(404).send({
        success: false,
        message: "No Orders Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

// GET SINGLE ORDER
export const getSingleOrderController = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    //   validation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No Order Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Order Data",
      order,
    });
  } catch (error) {
    // cast error || OBJECT ID ERROR
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Order ID",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error while getting order",
      error,
    });
  }
};

// ACCEPT PAYMENTS
export const acceptPaymentController = async (req, res) => {
  try {
    // get ampunt
    const { totalAmount } = req.body;
    // validation
    if (!totalAmount) {
      return res.status(500).send({
        success: false,
        message: "Please Enter Total Amount",
      });
    }
    const { client_secret } = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
    });
    res.status(200).send({
      success: true,
      message: "Payment Accepted",
      client_secret,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while accepting payment",
      error,
    });
  }
};
