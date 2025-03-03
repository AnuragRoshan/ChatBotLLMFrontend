require("dotenv").config();

module.exports = {
  apiKey: process.env.DEEPSEEK_API_KEY,
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT || 8080,
};
