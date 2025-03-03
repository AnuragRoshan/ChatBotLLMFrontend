const axios = require("axios");
const { apiKey } = require("../config");

const getChatResponse = async (userMessage) => {
  const response = await axios.post(
    "https://api.deepseek.com/v1/chat/completions",
    {
      model: "deepseek-chat",
      messages: [{ role: "user", content: userMessage }],
      stream: false,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};

module.exports = {
  getChatResponse,
};
