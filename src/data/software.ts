import type { Software } from "../types/software";

export const aiSoftware: Software[] = [
    {
        id: "1",
        name: "ChatGPT",
        description: "A chat AI using OpenAI's advanced language model. Capable of handling various tasks.",
        category: "Chatbot",
        url: "https://chat.openai.com",
        imageUrl: "https://example.com/chatgpt.png",
        tags: ["Natural Language Processing", "AI Conversation", "Text Generation"],
        isPaid: true,
        price: "$20/month"
    },
    {
        id: "2",
        name: "Midjourney",
        description: "An image generation tool using AI. Capable of creating high-quality art.",
        category: "Image Generation",
        url: "https://www.midjourney.com",
        imageUrl: "https://example.com/midjourney.png",
        tags: ["AI Image Generation", "Art", "Design"],
        isPaid: true,
        price: "$10/month"
    },
    {
        id: "3",
        name: "GitHub Copilot",
        description: "A code assistant using AI. Provides code completion and suggestions.",
        category: "Development Tool",
        url: "https://github.com/features/copilot",
        imageUrl: "https://example.com/copilot.png",
        tags: ["Code Completion", "Development Support", "Programming"],
        isPaid: true,
        price: "$10/month"
    }
];