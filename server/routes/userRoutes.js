import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updatePasswordController,
  updateUserProfilePictureController,
  passwordResetController,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// router object
const router = express.Router();
// routes
// register
router.post("/register", limiter, registerController);

// login
router.post("/login", limiter, loginController);

// profile
router.get("/profile", isAuth, getUserProfileController);

// logout
router.get("/logout", isAuth, logoutController);

// update user profile
router.put("/profile-update", isAuth, getUserProfileController);

// update user password
router.put("/password-update", isAuth, updatePasswordController);

// update profile picture
router.put(
  "/update-picture",
  isAuth,
  singleUpload,
  updateUserProfilePictureController
);

// Forget Password
router.post("/reset-password", passwordResetController);

// export
export default router;
