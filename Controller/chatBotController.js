import Chat from "../Model/chatHistory.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { config } from "dotenv";
config()



const chatbotResponse = async (req, res) => {
    // try {
    //     const { query } = req.body;

    //     const aiResponse = await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [{ role: "user", content: query }],
    //     });

    //     const responseText = aiResponse.choices[0].message.content;

    //     // Save chat history to MongoDB
    //     await Chat.create({ userQuery: query, botResponse: responseText });

    //     res.json({ answer: responseText });
    // } catch (error) {
    //     console.error("Chatbot Error:", error);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }

};



// Provide the proper api key 


import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const chatBot = asyncHandler(async (req, res) => {
    try {

        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
        });


        if (!aiResponse.choices || aiResponse.choices.length === 0) {
            return res.status(500).json({ error: "Invalid AI response" });
        }

        res.json({ answer: aiResponse.choices[0].message?.content || "No response from AI" });

    } catch (error) {
        console.error("Unexpected Error:", error);

        if (error.response) {
            console.error("⚠️ OpenAI API Error Response:", error.response.data);
            res.status(error.response.status).json({
                error: "Chatbot API Error",
                details: error.response.data,
            });
        } else {
            res.status(500).json({ error: "Chatbot Error", details: error.message });
        }
    }
});

export {
    chatbotResponse,
    chatBot
}
