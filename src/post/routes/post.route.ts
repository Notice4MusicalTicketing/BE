import express from "express";
import { PostController } from "../controllers/post.controller";

const router = express.Router();
const postController = new PostController();

router.post('/', postController.createPost);
router.delete('/:postId', postController.deletePost);
router.get('/preview', postController.getPreviewPosts);
router.get('/hot', postController.getHotPost);
router.get('/:postId', postController.getPost);
router.post('/:postId/like', postController.addLikeCount);
router.post('/:postId/warning', postController.addWarningCount);
router.patch('/:postId', postController.updatePost);
export default router;
