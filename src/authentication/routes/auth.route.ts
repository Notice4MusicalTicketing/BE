import express from "express";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();
const authController = new AuthController();

/**
* @swagger
* /api/auth/register:
*   post:
    *     summary: 회원가입 기능
*     description: |
 *      회원가입 기능입니다.
 *      username: 이메일 형식입니다.
 *      password: 비밀번호 조건 (최소길이 8, 숫자, 소문자, 특수문자 조합 )
 *      nickname: 최대 8글자
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
    *             type: object
*             required:
*               - username
*               - password
*               - nickname
*             properties:
*               username:
    *                 type: string
*                 format: email
*               password:
*                 type: string
*                 format: password
*               nickname:
*                 type: string
*     responses:
*       201:
*         description: 회원가입 성공
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
*         description: 예외 발생
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
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인 기능
 *     description: |
 *      로그인 기능입니다.
 *      username: 이메일 형식입니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: 예외 발생
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
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/access_token:
 *   post:
 *     summary: 액세스 토큰 재발급
 *     description: 리프레시 토큰을 body로 전달해주시면 됩니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: 액세스 토큰 재발급 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: 재발급 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 message:
 *                   type: string
 *     security:
 *       - apiKeyAuth: []
 */
router.post('/access_token', authController.regenerateAccessToken);

export default router;
