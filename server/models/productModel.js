import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Products", productSchema);
export default productModel;
