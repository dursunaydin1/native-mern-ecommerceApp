import userModel from "../models/userModel.js";
import { getDataUri } from "../utils/Features.js";
import cloudinary from "cloudinary";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone, answer } =
      req.body;
    // check validation
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone ||
      !answer
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Enter All Fields",
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Exists",
      });
    }

    const user = await userModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Enter Email & Password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    // check pass
    const isMatch = await user.comparePassword(password);
    // validation pass
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }
    // token
    const token = user.generateJwtToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login",
      error,
    });
  }
};

// Get User Profile
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User Profile Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Profile API",
      error,
    });
  }
};

// Logout
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Logout",
      error,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, password, address, city, country, phone } = req.body;
    // validation + update
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;
    // save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User Profile Updated Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

// update password
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;
    // validation
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Old & New Password",
      });
    }
    // check old password
    const isMatch = await user.comparePassword(oldPassword);
    // validation
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Correct Old Password",
      });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Update Password",
      error,
    });
  }
};

// Update User Profile Picture
export const updateUserProfilePictureController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    // file get from client photo
    const file = getDataUri(req.file);
    // delete previous profile picture
    await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // update profile picture
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save function
    await user.save();
    res.status(200).send({
      success: true,
      message: "Profile Picture Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile picture",
      error,
    });
  }
};

// reset Password
export const passwordResetController = async (req, res) => {
  try {
    // user get email || new password || answer
    const { email, password, answer } = req.body;
    // validation
    if (!email || !password || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Email, Password & Answer",
      });
    }
    // find user
    const user = await userModel.findOne({ email, answer });
    // validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Answer",
      });
    }
    user.password = password;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while sending Email",
      error,
    });
  }
};
