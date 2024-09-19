import {CreateReviewDto} from "../dtos/review.dto";
import {Member} from "../../member/entities/member.entity";
import {Review, ReviewSchema} from "../entities/review.entity";
import prisma from "../../config/database";
import {Pagination} from "../../utils/pagination";
import {ReviewRepository} from "../repository/review.repository";

const reviewRepository = new ReviewRepository();

export class ReviewService {
    async createReview(request: CreateReviewDto, member: Member) {
        const reviewSchema: ReviewSchema = await prisma.review.create({
            data: {
                memberId: member.memberId,
                content: request.content,
                rating: request.rating,
                musicalId: request.musicalId,
            }
            }
        )

        const ratingAverage = await prisma.review.aggregate({
            _avg: {
                rating: true,
            },
            where: {
                musicalId: request.musicalId,
            },
        });

        if (ratingAverage._avg.rating !== null) {
            await prisma.musical.update({
                where: {
                    musicalId: request.musicalId,
                },
                data: {
                    averageRating: ratingAverage._avg.rating,
                },
            });
        }
    }

    async getReviewsByMusicalId(
        musicalId: number,
        cursor: string | null = null,
        pageSize: number = 20,
    ): Promise<Pagination<(Review & {averageRating: number})[]>> {
        const Reviews = await reviewRepository.findReviewsByMusicalId(musicalId, cursor, pageSize);

        return Reviews;
    }

    // 리뷰 신고하기 기능
    async addWarningCount(reviewId: number){
        const reviewSchema = await prisma.review.findFirst({
            where: {
                reviewId: reviewId,
            }
        })

        if (reviewSchema === null){
            throw new Error("리뷰가 존재하지 않음");
        }

        await prisma.review.update({
            where: {
                reviewId: BigInt(reviewId),
            },
            data: {
                warningCount: {
                    increment: 1,
                }
            }
        });
    }

}