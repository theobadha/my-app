// Import required modules
import express from 'express'; // Express framework for building the server
import type { Request, Response } from 'express'; // Types for request and response objects
import dotenv from 'dotenv'; // Loads environment variables from .env file
import OpenAI from 'openai'; // OpenAI SDK for API calls

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.get('/api/hello', (req: Request, res: Response) => {
    res.send({ message: 'Hello' });
});

const conversations = new Map<string, string>();

// Chat API endpoint that sends a prompt to OpenAI and returns the response
app.post('/api/chat', async (req: Request, res: Response) => {
    // Extract prompt from request body
    const { prompt, conversationId } = req.body;

    // Call OpenAI API with the prompt and model settings
    const response = await client.responses.create({
        model: 'gpt-4o-mini',
        input: prompt,
        temperature: 0.2,
        max_output_tokens: 100,
        previous_response_id: conversations.get(conversationId),
    });

    conversations.set(conversationId, response.id);
    res.json({ message: response.output_text });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
