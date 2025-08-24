import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// Implementation detail
const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required')
        .max(1024, 'Prompt is too long'),
    conversationId: z.string().uuid(),
});

// public interface
export const chatController = {
    async sendMessage(req: Request, res: Response) {
        const parseResult = chatSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.format() });
        }

        try {
            // Extract prompt from request body
            const { prompt, conversationId } = parseResult.data;
            const response = await chatService.sendMessage(
                prompt,
                conversationId
            );

            res.json({ message: response.message });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate response' });
        }
    },
};
