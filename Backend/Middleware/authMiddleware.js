// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the "Bearer <token>" format
  console.log(token, "token");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    console.log(process.env.Secreat_KEY, "Sec");
    const decoded = jwt.verify(token, process.env.Secreat_KEY); // Ensure the secret key is correctly spelled
    console.log(decoded, "decoded");
    const userId = decoded.userId;
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
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
