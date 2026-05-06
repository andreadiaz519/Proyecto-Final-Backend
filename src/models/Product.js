import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    categoria: {
      type: String, // labial, base, sombras, etc
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    imagen: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);