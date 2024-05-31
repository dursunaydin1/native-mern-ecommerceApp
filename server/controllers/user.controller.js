const User = require("../models/user.model.js");

// Get All Users
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User update failed",
      error: err,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User delete failed",
      error: err,
    });
  }
};

// Get Admin
const getAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...info } = admin._doc;
    res.status(200).json({
      message: "User fetched successfully",
      data: info,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User fetch failed",
      error: err,
    });
  }
};
const getAllUsers = async (req, res) => {
  const query = req.query.latest;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();

    res.status(200).json({
      message: "Users have been fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "User fetch failed",
      error: err,
    });
  }
};

const getUserStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      message: "User stats have been fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "An error occured aquiring user stats",
      error: err.message,
    });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAdmin,
  getAllUsers,
  getUserStats,
};
