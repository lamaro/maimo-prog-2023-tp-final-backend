import express from "express";
import Product from "../models/products.js";

const router = express.Router();

const findAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id name options image description type");
    return res.status(200).send({ message: "All products", products });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const findOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select("_id name options image description type");
    res.status(200).send({ message: "Product info", product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};
const addProduct = async (req, res) => {
  try {
    const { name, options, image, description, type } = req.body;
    const product = new Product({name, options, image, description, type});
    await product.save();
    return res
      .status(200)
      .send({ message: `Product Created ${name}`, product });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
  //Agregar magia para crear el producto en la base de datos!!
};
const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, options, image, description, type} = req.body;
    
    const productToUpdate = await Product.findOne({_id: id})

    if (!productToUpdate) {
      return res.status(501).send({ message: "Error Product Not Found", error });
    }

    productToUpdate.name = name;
    productToUpdate.options = options;
    productToUpdate.image = image;
    productToUpdate.description = description;
    productToUpdate.type = type;
    await productToUpdate.save();

    res.status(200).send({ message: "Product Updated", product: productToUpdate });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findOne({ _id: id });
    if (!productToDelete) {
      res.status(501).send({ message: "Error Product Not Found" });
    }
    await Product.deleteOne({ _id: id });
    return res.status(200).send({ message: "Product deleted", product: productToDelete });
  } catch (error) {
    return res.status(501).send({ message: "Error", error });
  }
};

//CRUD (Create, Read, Update, Delete)
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
