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
    const order = await Order.findOne({ userId: req.params.id });
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

const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json({
      message: "Monthly income fetched successfully",
      income,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching monthly income",
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
  getMonthlyIncome,
};
