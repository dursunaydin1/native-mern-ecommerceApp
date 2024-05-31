const router = require("express").Router();
const User = require("../models/user.model.js);
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    const { password, ...info } = newUser._doc;

    res.status(200).json({
      message: "User Created Successfully",
      data: info,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User Creation Failed",
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({
        message: "Email or Password Incorrect",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      data: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login Failed",
      error: error,
    });
  }
});

module.exports = router;
