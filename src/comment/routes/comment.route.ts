import { Router } from 'express';
import { CommentController } from '../controllers/comment.controller';

const router = Router();
const commentController = new CommentController();

router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.fetchCommentsByPostId);
router.delete('/:commentId/post/:postId', commentController.deleteComment);
router.post('/:commentId/post/:postId/like', commentController.addLikeCount);
router.post('/:commentId/post/:postId/warning', commentController.addWarningCount);

export default router;