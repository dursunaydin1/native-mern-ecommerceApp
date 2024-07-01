import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected successfully ${colors.bgRed("✓")}`);
  } catch (error) {
    console.log(error);
    console.log(`error ${colors.bgRed("X")}`);
  }
};

export default connectDB;
