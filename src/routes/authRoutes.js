const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["openid", "profile", "email"],
    prompt: "select_account", // 🟢 Force account selection
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to frontend with token
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/status", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ isAuthenticated: false, user: null });
  }

  try {
    console.log("Decoded:", req.user);
    res.json({
      isAuthenticated: true,
      user: {
        userId: req.user._id,
        username: req.user.username,
        email: req.user.email,
        profilePic: req.user.profilePic,
      },
    });
  } catch (error) {
    res.json({ isAuthenticated: false, user: null });
  }
});

module.exports = router;
