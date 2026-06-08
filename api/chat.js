import { TavilyClient } from "tavily";

const tavily = new TavilyClient(
  process.env.TAVILY_API_KEY
);

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

    // Search the web for real-time information
    const searchResult = await tavily.search(
      message,
      {
        max_results: 5,
        search_depth: "basic"
      }
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1",
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant.

Use the following real-time web search results when answering the user's question.

${JSON.stringify(searchResult.results, null, 2)}

If the search results contain relevant information, prioritize them over your internal knowledge.`
            },
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

      console.error(data);

      return res.status(response.status).json({
        reply:
          data.error?.message ||
          "OpenRouter Error"
      });
    }

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "No response from AI"
    });

  } catch (error) {

    console.error("Server Error:", error);

    return res.status(500).json({
      reply: error.message || "Server Error"
    });
  }
}