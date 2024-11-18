const jwt = require("jsonwebtoken");
const User_model = require("../Models/User.model.js");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const {
  verifyToken,
  generateToken,
} = require("../Middleware/authMiddleware.js");

//configuratino for dotenv
dotenv.config({ path: "./.env" });

const Login_controller = async (req, res) => {
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
    const tokens = generateToken(user._id);
    const token = {
      accessToken: tokens,
    };
    console.log(token);
    const userRole = user.role;
    res.status(200).json({ token, message: "Login successful", userRole });
  } catch (error) {
    res.status(500).json({ error: `Login failed ${error} ` });
  }
};

const Register_controller = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, name, rePassword } = req.body;
    if (password !== rePassword) {
      return res.status(401).json({ error: "Passwords do not match" });
    }
    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: "Password must be at least 6 characters" });
    }
    if (email.length < 3 || name.length < 3) {
      return res
        .status(401)
        .json({ error: "Email and Name must be at least 3 characters" });
    }

    if (email === "" || name === "" || password === "" || rePassword === "") {
      return res.status(401).json({ error: "All fields are required" });
    }

    const check_exixting_user = await User_model.findOne({ email });
    if (check_exixting_user) {
      return res.status(401).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User_model.create({
      email,
      password: hashPassword,
      name,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: `Register failed: ${error.message}` });
  }
};

const Get_all_users = async (req, res) => {
  try {
    const users = await User_model.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: `Error: ${error}` });
  }
};

module.exports = {
  Login_controller,
  Register_controller,
  Get_all_users,
};
