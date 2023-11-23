import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String },
  options: [{
      name: { type: String },
      units: { type: Number },
      price: { type: Number },
      sku: { type: String },
      image: { type: String },
      description: { type: String },
      maxFlavors: { type: Number }
    }],
  image: { type: String },
  description: { type: String },
  type: { type: String },
  slug: { type: String }
});

export default mongoose.model("Product", productSchema, "Products");
