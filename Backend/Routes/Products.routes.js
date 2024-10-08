const { Router } = require("express");
const router = Router();

const Product_model = require("../Models/Products.model");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product_model.find();
    const data = {
      products: products,
      count: products.length,
      message: "All products fetched successfully",
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
});

// Get all products
router.post("/add_product", async (req, res) => {
  try {
    const add_product = new Product_model(req.body);
    const product = await add_product.save();
    res
      .status(200)
      .json({ message: "Product added successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
});

//update by id
router.put("/:id", async (req, res) => {
  try {
    const product = await Product_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
});

//delete by id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product_model.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Product deleted successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
});

// Get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product_model.findById(req.params.id);
    res
      .status(200)
      .json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
});

module.exports = router;
