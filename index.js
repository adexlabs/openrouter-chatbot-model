const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

console.log(process.env.OPENROUTER_API_KEY);

app.post("/chat", async (req, res) => {
  try {

    const { message } = req.body;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("OpenRouter Response:", data);

    if (!response.ok) {
      return res.status(500).json({
        error: data
      });
    }

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});