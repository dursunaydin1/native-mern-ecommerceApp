import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
    profilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    answer: {
      type: String,
      required: [true, "Please Enter Your Answer"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// function for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// compare function
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// JWT TOKEN
userSchema.methods.generateJwtToken = function () {
  return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const userModel = mongoose.model("Users", userSchema);
export default userModel;
