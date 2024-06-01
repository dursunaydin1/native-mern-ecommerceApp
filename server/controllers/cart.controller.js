const Cart = require("../models/cart.model.js");

const createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.status(200).json({
      message: "Cart created successfully",
      data: newCart,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occured while creating cart",
      error: err.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while updating cart",
      error: error.message,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Cart deleted successfully",
      data: deletedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured while deleting cart",
      error: error.message,
    });
  }
};

const getUserCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    res.status(200).json({
      message: "Cart fetched successfully",
      cartItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching cart",
      error: err.message,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({
      message: "Carts fetched successfully",
      cartItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured while fetching carts",
      error: err.message,
    });
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCartItem,
  getCartItems,
};
