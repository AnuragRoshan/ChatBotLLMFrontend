const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateToken = async (req, res, next) => {
  // 🔄 Extract token from cookies
  const token = req.cookies.token;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
