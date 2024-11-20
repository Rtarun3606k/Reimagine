const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Product_model = require("../Models/Products.model");
const UserModel = require("../Models/User.model"); // Ensure UserModel is imported
const { verifyToken } = require("../Middleware/authMiddleware"); // Corrected import
const upload = multer();

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

module.exports = router;
