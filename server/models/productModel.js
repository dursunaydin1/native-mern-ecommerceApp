import mongoose from "mongoose";

// Review Modal
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Your Name"] },
    rating: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please Enter User"],
    },
  },
  { timestamps: true }
);

// Product Modal
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Enter Product Quantity"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    images: [{ public_id: String, url: String }],
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    coment: {
      type: String,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
