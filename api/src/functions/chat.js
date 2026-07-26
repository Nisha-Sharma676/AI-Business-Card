const { app } = require('@azure/functions');
const { AzureOpenAI } = require('openai');

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            context.log('Chat function started');

            const body = await request.json();
            const { message, systemPrompt } = body || {};

            context.log(`Message received: ${message ? 'Yes' : 'No'}`);
            context.log(`Endpoint exists: ${!!process.env.AZURE_OPENAI_ENDPOINT}`);
            context.log(`Key exists: ${!!process.env.AZURE_OPENAI_KEY}`);
            context.log(`API version: ${process.env.AZURE_OPENAI_API_VERSION}`);
            context.log(`Deployment: ${process.env.AZURE_OPENAI_DEPLOYMENT}`);

            if (!message) {
                return {
                    status: 400,
                    jsonBody: {
                        error: 'Message is required'
                    }
                };
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
                        role: 'system',
                        content: systemPrompt || 'You are a helpful AI assistant.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 300
            });

            return {
                status: 200,
                jsonBody: {
                    reply: response.choices[0].message.content
                }
            };

        } catch (error) {
            console.error("FULL ERROR:", error);

            return {
                status: 500,
                jsonBody: {
                    error: error?.message || "Unknown error",
                    name: error?.name || "UnknownError",
                    code: error?.code || null,
                    status: error?.status || null,
                    details: error?.response?.data || null
                }
            };
        }
    }
});