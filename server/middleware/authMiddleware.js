const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  console.log("===== AUTH MIDDLEWARE =====");
  console.log("Headers:", req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.replace("Bearer", "").trim();

      console.log("Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      console.log("User:", req.user);

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      console.log("JWT Error:", error);

      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    console.log("Authorization header missing");
  }

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
};

module.exports = { protect };