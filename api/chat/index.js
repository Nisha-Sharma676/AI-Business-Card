const { AzureOpenAI } = require("openai");

module.exports = async function (context, req) {
    const { message, systemPrompt } = req.body;

    const client = new AzureOpenAI({
        endpoint: process.env.AZURE_OPENAI_ENDPOINT,
        apiKey: process.env.AZURE_OPENAI_KEY,
        apiVersion: process.env.AZURE_OPENAI_API_VERSION,
        deployment: process.env.AZURE_OPENAI_DEPLOYMENT
    });

    const response = await client.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
        ],
        max_tokens: 300
    });

    context.res = {
        body: {
            reply: response.choices[0].message.content
        }
    };
};