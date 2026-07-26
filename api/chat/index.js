const { AzureOpenAI } = require("openai");

module.exports = async function (context, req) {
    try {
        context.log("Chat function started");

        const { message, systemPrompt } = req.body || {};

        context.log("Message received:", message ? "Yes" : "No");
        context.log("Endpoint exists:", !!process.env.AZURE_OPENAI_ENDPOINT);
        context.log("Key exists:", !!process.env.AZURE_OPENAI_KEY);
        context.log("API version:", process.env.AZURE_OPENAI_API_VERSION);
        context.log("Deployment:", process.env.AZURE_OPENAI_DEPLOYMENT);

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
        context.log.error("FULL ERROR:", error);

        context.res = {
            status: 500,
            body: {
                error: error.message,
                name: error.name
            }
        };
    }
};