const { app } = require('@azure/functions');
const { AzureOpenAI } = require('openai');

const requests = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

function isRateLimited(clientId) {
    const now = Date.now();
    const record = requests.get(clientId);

    if (!record || now - record.start > WINDOW_MS) {
        requests.set(clientId, {
            start: now,
            count: 1
        });
        return false;
    }

    if (record.count >= MAX_REQUESTS) {
        return true;
    }

    record.count += 1;
    return false;
}

app.http('chat', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const clientId = request.headers.get('x-forwarded-for') || 'anonymous';

            if (isRateLimited(clientId)) {
                return {
                    status: 429,
                    jsonBody: {
                        error: 'Too many requests. Please wait a minute and try again.'
                    }
                };
            }

            context.log('Chat function started');

            const body = await request.json();
            const { message, systemPrompt } = body || {};

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
                max_completion_tokens: 300
            });

            return {
                status: 200,
                jsonBody: {
                    reply: response.choices[0].message.content
                }
            };
        } catch (error) {
            context.log('FULL ERROR:', error);

            return {
                status: 500,
                jsonBody: {
                    error: error?.message || 'Unknown error',
                    name: error?.name || 'UnknownError',
                    code: error?.code || null,
                    status: error?.status || null,
                    details: error?.response?.data || null
                }
            };
        }
    }
});