import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Your Name"] },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "Please Enter Unique Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [6, "Password should be greater than 6 characters"],
    },
    address: { type: String, required: [true, "Please Enter Your Address"] },
    city: { type: String, required: [true, "Please Enter Your City"] },
    country: { type: String, required: [true, "Please Enter Your Country"] },
    phone: { type: String, required: [true, "Please Enter Your Phone"] },
    profilePic: { type: String },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("Users", userSchema);
export default userModel;
