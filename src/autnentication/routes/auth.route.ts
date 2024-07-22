import express from "express";
import {AuthController} from "../controllers/auth.controller";


const router = express.Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 회원가입 기능
 *     description: 회원가입 기능입니다. 설명은 나중에 ^^
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
 *       201:
 *         description: 성공
 *       400:
 *         description: 예외
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;