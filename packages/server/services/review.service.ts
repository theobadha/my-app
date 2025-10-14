import type { Review } from '../generated/prisma';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
    async getReviews(productId: number): Promise<Review[]> {
        return reviewRepository.getReviews(productId);
    },
    async summarizeReviews(productId: number): Promise<string> {
        const reviews = await reviewRepository.getReviews(productId, 5);
        const joinedReviews = reviews.map((r) => r.content).join('\n');
        // Implement your summarization logic here
        const prompt = template.replace('{{reviews}}', joinedReviews);

        const response = await llmClient.generateText({
            model: 'gpt-4o-mini',
            prompt,
            temperature: 0.2,
            maxTokens: 100,
        });
        return response.text;
    },
};
