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
