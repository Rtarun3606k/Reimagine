const { Router } = require("express");
const router = Router();
const User_model = require("../Models/User.model.js");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../Middleware/authMiddleware.js");

router.get("/userall", async (req, res) => {
  try {
    console.log(req.userId, "userId");
    const user_data = await User_model.find();
    if (!user_data) {
      return res.status(404).json({ message: "No user found" });
    }
    // if (user_data.role !== "admin") {
    //   console.log(user_data, "user_data");
    //   return res.status(404).json({ message: "Not admin" });
    // }
    res.status(200).json({ user_data: user_data, message: "Users found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not get users" });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    console.log("i am here");
    const user = await User_model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user_data: user, message: "User found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not get user" });
  }
});

router.put("/user/:id", verifyToken, async (req, res) => {
  try {
    const user = await User_model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updateUser = await User_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ user_data: updateUser, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not update user" });
  }
});

router.delete("/user/:id", verifyToken, async (req, res) => {
  try {
    const user = await User_model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const deleteUser = await User_model.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not delete user" });
  }
});

router.post("/order/:productId", verifyToken, async (req, res) => {
  try {
    console.log(req.userId, "userId and in order placing route");
    const user = await User_model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const order = {
      product: req.params.productId,
    };
    user.orders.push(order);
    await user.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not place order" });
  }
});

router.post("/cart/:productId", verifyToken, async (req, res) => {
  try {
    console.log(req.userId, "userId and in order placing route");
    const user = await User_model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const order = {
      product: req.params.productId,
    };
    user.cart.push(order);
    await user.save();
    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not place order" });
  }
});

module.exports = router;

// {
//     "name": "John Doe",
//     "Date_of_birth": "1990-01-01T00:00:00.000Z",
//     "email": "johndoe@example.com",
//     "phone": 1234567890,
//     "password": "securepassword123",
//     "profile_picture": "http://example.com/profile.jpg",
//     "created_at": "2023-10-01T00:00:00.000Z",
//     "updated_at": "2023-10-01T00:00:00.000Z",
//     "address": "123 Main St",
//     "city": "Anytown",
//     "country": "USA",
//     "zip_code": 12345,
//     "phone_country_code": 1
// }
