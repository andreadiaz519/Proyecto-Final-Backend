import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(200).json({
      mensaje: "Producto creado 👜",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear producto",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener productos",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener producto",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productUpdated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!productUpdated) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Producto actualizado ✨",
      data: productUpdated,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar producto",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.status(200).json({
      mensaje: "Producto eliminado 🗑️",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar producto",
      error: error.message,
    });
  }
};