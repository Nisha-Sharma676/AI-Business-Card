# Nisha Sharma — AI Business Card

An interactive AI-powered personal business card and portfolio built with **Azure OpenAI, Azure Functions and Azure Static Web Apps**.

This isn't just a static portfolio. Visitors can interact with an AI assistant that can answer questions about Nisha's education, technical skills, projects, interests and professional background.

The AI is designed to stay focused on Nisha's professional profile and politely redirect unrelated questions back to her profile.

## Live Demo

👉 [View My Live AI Business Card](https://purple-dune-087f95000.7.azurestaticapps.net)

## What It Does

The application includes:

- A hero section introducing Nisha and her AI/ML background
- Technical skills and technology tags
- A showcase of AI, Machine Learning and Generative AI projects
- GitHub and LinkedIn profile links
- An interactive AI chat assistant
- Azure OpenAI-powered responses
- Rate limiting to help protect the public API from excessive requests

Visitors can ask the AI about:

- Nisha's education
- Technical skills
- AI/ML experience
- Generative AI experience
- Projects
- Interests
- Professional background

The AI is designed to answer questions related to Nisha's professional profile and politely redirect unrelated questions.

## Projects

### 1. AI Business Card

An interactive AI-powered personal business card built using Azure OpenAI, Azure Functions and Azure Static Web Apps. Visitors can chat with an AI assistant about Nisha's education, skills, projects and professional background.

### 2. Review Analyser

An AI-powered application that analyzes user reviews and generates meaningful insights using Artificial Intelligence and Machine Learning concepts.

[View Project →](https://proud-moss-010e59500.7.azurestaticapps.net)

### 3. Azure AI Vision App

A computer vision application built using Azure AI Vision capabilities to analyze and understand visual content.

[View Project →](https://vision-ai-app-eight.vercel.app/)

### 4. EchoAI

A voice-based AI application using Azure AI Speech technologies, including Speech-to-Text and Text-to-Speech capabilities.

[View Project →](https://echo-ai-app-2026-dyemfhbnhgdedyea.southeastasia-01.azurewebsites.net/)

### 5. FAQBot

An intelligent FAQ assistant powered by Azure OpenAI that answers user questions using a customizable AI system prompt.

[View Project →](https://faqbot-e4e9fgfygvfybuav.uaenorth-01.azurewebsites.net/)

### 6. SmartRAG / AskMyDocs

A Retrieval-Augmented Generation application that allows users to interact with uploaded documents and ask questions about their content using AI-powered document retrieval.

[View Project →](https://smart-rag-gdbgbghzechvgjf0.eastasia-01.azurewebsites.net/)

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Azure OpenAI
- Azure Functions
- Azure Static Web Apps
- GitHub Actions
- Azure AI
- RAG
- Generative AI
- AI Agents

## API Protection

The chat API includes basic rate limiting to help prevent excessive requests to the Azure OpenAI service.

The current implementation allows a maximum of **10 requests per minute per identified client**.

For production-scale applications, a distributed rate-limiting solution such as Azure API Management or a shared storage-based approach would be recommended.

## Run It Locally

You need **Node.js** and the **Azure Static Web Apps CLI**.

### 1. Install the Azure Static Web Apps CLI

```bash
npm install -g @azure/static-web-apps-cli
```

### 2. Install API Dependencies

```bash
cd api
npm install
cd ..
```

### 3. Configure Azure OpenAI Environment Variables

For local development, configure the following environment variables:

```env
AZURE_OPENAI_KEY=your_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
AZURE_OPENAI_API_VERSION=your_api_version
```

> Never commit your Azure OpenAI key or `.env` file to GitHub.

### 4. Start the Application

```bash
swa start --app-location . --api-location api
```

Open the application at:

```text
http://localhost:4280
```

## Deploy to Azure

1. Push the repository to GitHub.
2. Create an Azure Static Web App.
3. Connect the GitHub repository.
4. Configure the application and API locations.
5. Add Azure OpenAI environment variables in Azure Static Web Apps Configuration.
6. Push changes to the `main` branch.
7. GitHub Actions automatically builds and deploys the application.

## Azure OpenAI Configuration

The application requires the following environment variables:

- `AZURE_OPENAI_KEY`
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_DEPLOYMENT`
- `AZURE_OPENAI_API_VERSION`

These values should be configured securely in Azure and should **never be committed to GitHub**.

For local development, use environment variables or a local `.env` file and keep it out of version control.

## About Me

I am **Nisha Sharma**, a B.Tech Computer Science and Engineering student specializing in **Artificial Intelligence and Machine Learning**.

I am passionate about:

- Artificial Intelligence
- Machine Learning
- Generative AI
- Retrieval-Augmented Generation (RAG)
- AI Agents
- Azure AI
- Azure OpenAI
- Cloud Technologies

I enjoy building practical AI-powered applications and continuously exploring new technologies.
