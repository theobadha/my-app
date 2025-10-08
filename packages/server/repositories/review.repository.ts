import { PrismaClient, type Review } from "../generated/prisma";


export const reviewRepository = {
     async getReviews(productId: number, limit?: number): Promise<Review[]> {
            const prisma = new PrismaClient();
            const reviews = await prisma.review.findMany({
                where: { productId },
                orderBy: { createdAt: 'desc' },
                take: limit,
            });
            return reviews;
        },
}