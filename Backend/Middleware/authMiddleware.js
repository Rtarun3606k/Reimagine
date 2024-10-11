// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied " });
  try {
    const decoded = jwt.verify(token, `${process.env.Secreat_KEY}`);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const generateToken = (userId) => {
  const AccessToken = jwt.sign({ userId }, `${process.env.Secreat_KEY}`, {
    expiresIn: "1h",
  });
  const RefreshToken = jwt.sign({ userId }, `${process.env.Secreat_KEY}`, {
    expiresIn: "24h",
  });
  return { accessToken: AccessToken, refreshToken: RefreshToken };
};

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(refreshToken, `${process.env.Secreat_KEY}`);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      `${process.env.Secreat_KEY}`,
      {
        expiresIn: "1h",
      }
    );
    res.json({
      accessToken: newAccessToken,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  verifyToken,
  generateToken,
  refreshAccessToken,
};
