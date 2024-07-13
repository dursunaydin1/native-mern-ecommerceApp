import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updatePasswordController,
  updateUserProfilePictureController,
} from "../controllers/userController.js";
import isAuth from "../middleware/authMiddleware.js";
import { singleUpload } from "../middleware/multer.js";

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

// export
export default router;
