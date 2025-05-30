const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Product_model = require("../Models/Products.model");
const UserModel = require("../Models/User.model"); // Ensure UserModel is imported
const { verifyToken } = require("../Middleware/authMiddleware"); // Corrected import
const upload = multer();

// Get all products

router.get("/allProducts", async (req, res) => {
  try {
    const allProducts = await Product_model.find();
    console.log(allProducts, "allproducts");
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});
// Add product
router.post("/add_product", upload.array("images", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map((file) => ({
      name: file.originalname,
      mimetype: file.mimetype,
      image: file.buffer.toString("base64"), // Convert to base64
    }));

    const add_product = new Product_model({ ...req.body, image: images });
    const product = await add_product.save();

    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// Update by id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const verifyUser = await UserModel.findById(req.userId);
    if (!verifyUser) {
      return res.status(404).json({ message: "User not found" });
    } else if (verifyUser.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const product = await Product_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// Delete by id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product_model.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deleted successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// Get product by id
router.get("/single/:id", async (req, res) => {
  try {
    const product = await Product_model.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product fetched successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

// Get specific product image by id and index
router.get("/product/:id/image/:index", async (req, res) => {
  try {
    const productId = req.params.id;
    const imageIndex = parseInt(req.params.index, 10);

    const product = await Product_model.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (imageIndex < 0 || imageIndex >= product.image.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    const image = product.image[imageIndex];
    const imageBuffer = Buffer.from(image.image, "base64");
    res.set("Content-Type", image.mimetype).send(imageBuffer);
  } catch (error) {
    res.status(500).json({ error: `Error: ${error.message}` });
  }
});

module.exports = router;

// blob:http://localhost:5173/289f8b89-40a2-41cc-85d9-875c8a5623bf
