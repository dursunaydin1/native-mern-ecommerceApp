import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// User Authentication
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  //   validation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }
  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData._id);
  next();
};

// Admin Authentication
export const isAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "Admin Only Access",
    });
  }
  next();
};
