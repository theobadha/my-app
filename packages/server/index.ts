// Import required modules
import express from 'express'; // Express framework for building the server
import type { Request, Response } from 'express'; // Types for request and response objects
import dotenv from 'dotenv'; // Loads environment variables from .env file
import { chatController } from './controllers/chat.controller';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.get('/api/hello', (req: Request, res: Response) => {
    res.send({ message: 'Hello' });
});

// Chat API endpoint that sends a prompt to OpenAI and returns the response
app.post('/api/chat', chatController.sendMessage);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
