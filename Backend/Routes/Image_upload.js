const express = require("express");
const router = express.Router();
const multer = require("multer");
const User_model = require("../Models/Image_model.js");

// Use multer memory storage so the file isn't stored locally
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload image and create a user
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Convert uploaded file buffer to base64
    const base64Image = req.file.buffer.toString("base64");

    // Create user with the base64 image data
    const newUser = new User_model({
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      image: base64Image,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User created and image uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image or saving user" });
  }
});

// Route to retrieve user and send profile picture as a file
router.get("/user/:id", async (req, res) => {
  try {
    // Find the user by ID
    const user = await User_model.findById(req.params.id);

    // Log the retrieved user
    // console.log("Retrieved User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the image field is defined
    if (!user.image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Convert the base64 image back to binary
    const imgBuffer = Buffer.from(user.image, "base64");

    // Set the correct Content-Type based on the stored mimetype
    res.set("Content-Type", user.mimetype); // Make sure mimetype is defined
    res.send(imgBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving image" });
  }
});

module.exports = router;
