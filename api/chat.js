export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
<<<<<<< HEAD
            error: "Method Not Allowed"
=======
            error: "Method not allowed"
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44
        });
    }

    try {

        const { message } = req.body;

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
<<<<<<< HEAD
                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,
=======
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44
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

        console.log(data);

<<<<<<< HEAD
        return res.status(200).json({
            reply:
                data.choices?.[0]?.message?.content ||
                "No response from AI"
=======
        if (!response.ok) {
            return res.status(500).json(data);
        }

        return res.status(200).json({
            reply:
                data.choices?.[0]?.message?.content ||
                "No response received"
>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
<<<<<<< HEAD
            reply: "Server Error"
        });
    }
=======
            error: error.message
        });

    }

>>>>>>> 182a0de03453139f202269e5c03f4fff0f03bf44
}