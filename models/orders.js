import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    total: { type: Number },
    products: { type: Array },
    clientId: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema, "Orders");
