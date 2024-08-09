import express from "express";
import {PostController} from "../controllers/post.controller";

const router = express.Router();
const postController = new PostController();

router.post('/create_post', postController.createPost);

router.delete('/delete_post/:postId', postController.deletePost);

router.get('/preview', postController.getPreviewPosts);
router.get('/:postId', postController.getPost);

router.post('/addLike/:postId', postController.addLikeCount);
router.post('/addWarning/:postId', postController.addWarningCount);

export default router;