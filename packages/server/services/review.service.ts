import OpenAI from 'openai';
import type { Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';

export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },
    async summarizeReviews(productId: number): Promise<string> {
        const reviews = await reviewRepository.getReviews(productId, 5);
        const joinedReviews = reviews.map((r) => r.content).join('\n');
        // Implement your summarization logic here
        const prompt = `Summarize the following reviews into a short paragraph highlighting 
        key themes both negative and positive : ${joinedReviews}`;

        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: prompt,
            temperature: 0.2,
            max_output_tokens: 100,
        });
        return response.output_text;
    },
};
// Initialize OpenAI client with API key from environment variables
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
