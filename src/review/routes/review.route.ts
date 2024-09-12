import express from "express";
import {ReviewController} from "../controllers/review.controller";

const router = express.Router();
const reviewController = new ReviewController();

router.post('/', reviewController.createReview);
router.get('/:musicalId', reviewController.getReviewsByMusicalId);

export default router;