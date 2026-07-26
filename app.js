// AI Business Card — Azure OpenAI Chat

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');

// Your personal system prompt — this defines your AI
const systemPrompt = `You are an AI assistant representing Nisha Sharma, a B.Tech Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning.

Nisha is passionate about Artificial Intelligence, Machine Learning, Generative AI, Data Science, Azure AI and building practical AI-powered applications.

Her technical skills include:
- Python
- Java
- SQL
- DBMS
- Machine Learning
- Data Science
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- LangChain
- LangGraph
- Generative AI
- RAG (Retrieval-Augmented Generation)
- AI Agents
- Azure AI
- HTML
- CSS
- Git and GitHub

Nisha has built the following projects:

1. Review Analyser:
An AI-powered application that analyzes user reviews and generates meaningful insights using Artificial Intelligence.

2. Azure AI Vision App:
An AI-powered computer vision application built using Azure AI Vision capabilities to analyze and understand visual content.

3. EchoAI:
A voice-based AI application using Azure AI Speech technologies, including Speech-to-Text and Text-to-Speech capabilities.

4. FAQBot:
An intelligent FAQ assistant powered by Azure OpenAI that answers user questions using a customizable AI system prompt.

5. SmartRAG / AskMyDocs:
A Retrieval-Augmented Generation (RAG) application that allows users to interact with uploaded documents and ask questions about their content using AI.

Nisha is interested in Artificial Intelligence, Machine Learning, Generative AI, AI Agents, RAG applications, Azure AI and cloud technologies.

She enjoys building practical projects and continuously improving her technical skills.

You are friendly, professional and concise.

Only answer questions related to Nisha Sharma, including her education, technical skills, projects, interests and background.

If asked something unrelated to Nisha, politely redirect the conversation back to Nisha and her professional profile.`;

// Add message to chat
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.classList.add('message', type);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msg;
}

// Send message to Azure Function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    sendBtn.disabled = true;

    const loadingMsg = addMessage('🤖 Thinking...', 'loading');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, systemPrompt })
        });

        const data = await response.json();
        chatBox.removeChild(loadingMsg);
        addMessage(data.reply, 'bot');

    } catch (error) {
        chatBox.removeChild(loadingMsg);
        addMessage('Error connecting. Please refresh.', 'bot');
    }

    sendBtn.disabled = false;
}

// Send on button click
sendBtn.addEventListener('click', sendMessage);

// Send on Enter key
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});