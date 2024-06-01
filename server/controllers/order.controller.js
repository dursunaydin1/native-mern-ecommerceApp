const Order = require("../models/order.model.js");

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occured while creating order",
      error: err.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while updating order",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while deleting order",
      error: error.message,
    });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const order = await Order.findById({ userId: req.params.id });
    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching order",
      error: err.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching orders",
      error: err.message,
    });
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getOrders,
};
