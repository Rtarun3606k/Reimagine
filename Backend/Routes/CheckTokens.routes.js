const { Router } = require("express");
const router = Router();

const {
  verifyToken,
  refreshAccessToken,
} = require("../Middleware/authMiddleware.js");

router.route("/checkToken").get(verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

module.exports = router;
