import express from "express";
import { PostController } from "../controllers/post.controller";

const router = express.Router();
const postController = new PostController();

/**
 * @swagger
 * /api/post:
 *   post:
 *     summary: 게시물 작성
 *     description: |
 *       게시글을 새로 작성합니다.
 *       제목, 내용, 카테고리를 포함합니다.
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: 게시물 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: 요청의 성공 여부
 *                 message:
 *                   type: string
 *                   description: 성공 메시지
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: 요청의 성공 여부
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *       500:
 *         description: 서버 오류로 인한 게시물 작성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   description: 요청의 성공 여부
 *                 error:
 *                   type: string
 *                   description: 서버 오류 메시지
 */
router.post('/', postController.createPost);

/**
 * @swagger
 * /api/post/{postId}:
 *   delete:
 *     summary: 게시물 삭제
 *     description: 특정 게시물을 삭제합니다.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 게시물의 ID
 *     responses:
 *       200:
 *         description: 게시물 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.delete('/:postId', postController.deletePost);

/**
 * @swagger
 * /api/post/preview:
 *   get:
 *     summary: 모든 게시물 미리보기 조회
 *     description: 모든 게시물의 미리보기를 조회합니다.
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: 게시물 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       post_id:
 *                         type: integer
 *                       nickname:
 *                         type: string
 *                       title:
 *                         type: string
 *                       like_count:
 *                         type: integer
 *                       reply_count:
 *                         type: integer
 *                       category:
 *                         type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/preview', postController.getPreviewPosts);

router.get('/hot', postController.getHotPost);

/**
 * @swagger
 * /api/post/{postId}:
 *   get:
 *     summary: 특정 게시물 조회
 *     description: 특정 게시물의 상세 정보를 조회합니다.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게시물의 ID
 *     responses:
 *       200:
 *         description: 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 post:
 *                   type: object
 *                   properties:
 *                     post_id:
 *                       type: integer
 *                     member_id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                     like_count:
 *                       type: integer
 *                     warning_count:
 *                       type: integer
 *                     reply_count:
 *                       type: integer
 *                     views:
 *                       type: integer
 *                     category:
 *                       type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/:postId', postController.getPost);

/**
 * @swagger
 * /api/post/{postId}/like:
 *   post:
 *     summary: 게시물 추천
 *     description: 특정 게시물에 추천을 추가합니다.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 추천할 게시물의 ID
 *     responses:
 *       201:
 *         description: 게시물 추천 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/:postId/like', postController.addLikeCount);

/**
 * @swagger
 * /api/post/{postId}/warning:
 *   post:
 *     summary: 게시물 신고
 *     description: 특정 게시물을 신고합니다.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 신고할 게시물의 ID
 *     responses:
 *       201:
 *         description: 게시물 신고 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/:postId/warning', postController.addWarningCount);

/**
 * @swagger
 * /api/post/{postId}:
 *   patch:
 *     summary: 게시물 수정
 *     description: 특정 게시물의 내용을 수정합니다.
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 게시물의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시물 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: 유효하지 않은 요청 또는 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.patch('/:postId', postController.updatePost);


export default router;
