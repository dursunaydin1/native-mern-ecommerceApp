import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
} from "../controllers/userController.js";
import isAuth from "../middleware/authMiddleware.js";

// router object
const router = express.Router();
// routes
// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// profile
router.get("/profile", isAuth, getUserProfileController);

// logout
router.get("/logout", isAuth, logoutController);

// export
export default router;
