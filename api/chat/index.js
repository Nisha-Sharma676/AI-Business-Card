const { AzureOpenAI } = require("openai");

module.exports = async function (context, req) {
    try {
        const { message, systemPrompt } = req.body || {};

        if (!message) {
            context.res = {
                status: 400,
                body: {
                    reply: "Please enter a message."
                }
            };
            return;
        }

        const client = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_KEY,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION,
            deployment: process.env.AZURE_OPENAI_DEPLOYMENT
        });

        const response = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are a helpful AI assistant."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 300
        });

        context.res = {
            status: 200,
            body: {
                reply: response.choices[0].message.content
            }
        };

    } catch (error) {
        context.log.error("Azure OpenAI Error:", error);

        context.res = {
            status: 500,
            body: {
                reply: "Sorry, I couldn't connect to the AI service.",
                error: error.message
            }
        };
    }
};