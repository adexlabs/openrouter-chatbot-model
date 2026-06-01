const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const path = require("path");

// serve frontend files
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

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
          model: "openrouter/auto",
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

    console.log(data);

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});

module.exports = app;
