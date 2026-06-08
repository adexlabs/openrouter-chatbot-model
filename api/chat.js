export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method Not Allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required"
      });
    }

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

    if (!response.ok) {
      console.error(data);

      return res.status(500).json({
        reply: data.error?.message || "OpenRouter Error"
      });
    }

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response from AI"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      reply: "Server Error"
    });
  }
}