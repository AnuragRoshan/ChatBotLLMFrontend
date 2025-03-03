const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
      prompt: "select_account", // 🟢 Force account selection
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          console.log("User not found, creating a new one...");
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          });
        } else {
          console.log("User found:", user.email);
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        user.token = token;
        await user.save();

        return done(null, user);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
