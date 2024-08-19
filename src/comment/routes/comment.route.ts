import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';

const router = Router();
const commentController = new CommentController();

router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.fetchCommentsByPostId);

export default router;