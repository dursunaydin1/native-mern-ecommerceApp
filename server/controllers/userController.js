import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body; // phone'u buraya ekledik
    // check validation
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
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
    res.status(200).send({
      success: true,
      message: "Login Successfully",
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
