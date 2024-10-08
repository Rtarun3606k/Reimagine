const { Router } = require("express");
const router = Router();
const User_model = require("../Models/User.model.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

//configuratino for dotenv
dotenv.config({ path: "./.env" });

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User_model.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, `${process.env.Secreat_KEY}`, {
      expiresIn: "8h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: `Login failed ${error} ` });
  }
});

module.exports = router;
