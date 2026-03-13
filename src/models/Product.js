import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
