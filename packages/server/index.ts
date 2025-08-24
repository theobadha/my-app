// Import required modules
import express from 'express'; // Express framework for building the server
import type { Request, Response } from 'express'; // Types for request and response objects
import dotenv from 'dotenv'; // Loads environment variables from .env file
import OpenAI from 'openai'; // OpenAI SDK for API calls
import z from 'zod'; // Schema validation library
import { conversationRepository } from './repositories/conversation.repository';

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

const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required')
        .max(1024, 'Prompt is too long'),
    conversationId: z.string().uuid(),
});

// Chat API endpoint that sends a prompt to OpenAI and returns the response
app.post('/api/chat', async (req: Request, res: Response) => {
    const parseResult = chatSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }

    try {
        // Extract prompt from request body
        const { prompt, conversationId } = parseResult.data;

        // Call OpenAI API with the prompt and model settings
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
            previous_response_id:
                conversationRepository.getLastResponseId(conversationId),
        });

        conversationRepository.setLastResponseId(conversationId, response.id);
        res.json({ message: response.output_text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate response' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
