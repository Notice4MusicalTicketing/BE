import {ReviewService} from "../services/review.service";
import { Request, Response } from "express";
import {CreateReviewDto} from "../dtos/review.dto";
import {Pagination} from "../../utils/pagination";
import {PostPreview} from "../../post/entities/post.entity";
import {Review} from "../entities/review.entity";

const reviewService = new ReviewService();

export class ReviewController {
    async createReview(req: Request, res: Response): Promise<void> {
        const createReviewDto: CreateReviewDto = req.body;
        const member = req.user;

        if (!member) {
            res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
            return;
        }

        try {
            const newReview = await reviewService.createReview(createReviewDto, member);
            res.status(201).json({ result: true, message: "해당 뮤지컬에 대한 리뷰가 작성됨" });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({result: false, message: "리뷰 작성에 실패함"});
        }
    }

    async getReviewsByMusicalId(req: Request, res: Response): Promise<void> {
        const musicalId = req.params.musicalId;
        const member = req.user;
        let { cursor, pageSize } = req.query;

        if (!member) {
            res.status(400).json({ result: false, message: `로그인 중이 아닙니다.` });
            return;
        }

        try {
            const reviews: Pagination<Review[]> = await reviewService.getReviewsByMusicalId(Number(musicalId), String(cursor));
            res.status(200).json({ result: true, message: reviews });
        } catch (err: any) {
            console.error(err);
            res.status(501).json({result: false, message: err.message });
        }
    }
}