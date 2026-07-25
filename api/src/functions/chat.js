const { app } = require('@azure/functions');
const { AzureOpenAI } = require('openai');

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const body = await request.json();
        const { message, systemPrompt } = body;

        const client = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_KEY,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION,
            deployment: process.env.AZURE_OPENAI_DEPLOYMENT
        });

        const response = await client.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            max_tokens: 300
        });

        return {
            jsonBody: {
                reply: response.choices[0].message.content
            }
        };
    }
});