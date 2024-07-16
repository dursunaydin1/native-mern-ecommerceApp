import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: [true, "Please Enter Address"] },
      city: { type: String, required: [true, "Please Enter City"] },
      country: { type: String, required: [true, "Please Enter Country"] },
    },

    orderItems: [
      {
        name: { type: String, required: [true, "Please Enter Product Name"] },
        price: { type: Number, required: [true, "Please Enter Price"] },
        quantity: { type: Number, required: [true, "Please Enter Quantity"] },
        image: { type: String, required: [true, "Please Enter Image"] },

        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "CODE",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Please Enter User"],
    },
    paidAt: {
      type: Date,
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemPrice: {
      type: Number,
      required: [true, "Please Enter Item Price"],
    },
    tax: {
      type: Number,
      required: [true, "Please Enter Tax"],
    },
    shippingCharges: {
      type: Number,
      required: [true, "Please Enter Shipping Charges"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Please Enter Total Amount"],
    },
    orderStatus: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Orders", orderSchema);
export default orderSchema;
