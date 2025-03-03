const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/passport");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;

const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
