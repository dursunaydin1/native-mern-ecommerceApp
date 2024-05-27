const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
