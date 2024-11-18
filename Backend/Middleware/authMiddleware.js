// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.Secreat_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.Secreat_KEY, {
    expiresIn: "1h",
  });
  return { token };
};

module.exports = {
  verifyToken,
  generateToken,
};
