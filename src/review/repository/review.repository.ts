import {Cursor, Pagination} from "../../utils/pagination";
import prisma from "../../config/database";
import {PostPreview} from "../../post/entities/post.entity";
import {Review, ReviewSchema} from "../entities/review.entity";

export class ReviewRepository{
    async findReviewsByMusicalId(
        musicalId: number,
        cursor: string | null = null,
        pageSize: number = 20.
    ): Promise<Pagination<(Review & {averageRating: number})[]>> {
        let cursorDate: Date;
        if (cursor) {
            cursorDate = new Date(cursor);
            if (isNaN(cursorDate.getTime())) {
                console.error(`Invalid cursor date provided: ${cursor}`);
                cursorDate = new Date(); // 유효하지 않은 경우 현재 날짜로 설정
            }
        } else {
            cursorDate = new Date();
        }
        pageSize = 20;

        const reviewSchemas = await prisma.review.findMany({
            where: {
                musicalId: musicalId,
                ...(cursorDate && { createdAt: { lt: cursorDate } }),
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                reviewId: true,
                content: true,
                createdAt: true,
                rating: true,
                warningCount: true,
                memberId: true,
                musicalId: true,
                musical: {
                    select: {
                        averageRating: true,
                    }
                },
            },
            take: pageSize,
        });

        const reviews: (Review & {averageRating: number})[] = reviewSchemas.map(reviewSchema => ({
            reviewId: Number(reviewSchema.reviewId),
            content: reviewSchema.content,
            createdAt: reviewSchema.createdAt,
            rating: reviewSchema.rating,
            warningCount: reviewSchema.warningCount,
            memberId: Number(reviewSchema.memberId),
            musicalId: Number(reviewSchema.musicalId),
            averageRating: reviewSchema.musical.averageRating,
        }));

        const elementCount = reviews.length;
        const lastCreatedAt = reviewSchemas[elementCount - 1]?.createdAt;
        const hasNext = lastCreatedAt ?
            (await prisma.review.count({
                where: {
                    createdAt: {
                        lt: lastCreatedAt,
                    },
                },
                take: 1,
            })) > 0
            : false;
        const totalCount = await prisma.review.count();

        const cursorInfo: Cursor = {
            cursor: hasNext ? lastCreatedAt.toISOString() : null,
            pageSize: pageSize,
            elementCount: elementCount,
            hasNext: hasNext,
            totalCount: totalCount,
        };

        return {
            data: reviews,
            cursorInfo: cursorInfo,
        }
    }
}