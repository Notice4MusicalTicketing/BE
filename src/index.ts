import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import memberRouter from './member/routes/member.route';
import authRouter from './authentication/routes/auth.route';
import postRouter from './post/routes/post.route';
import { authMiddleware } from './middleware/middleware';
import { PrismaClient } from '@prisma/client';
import { fetchData } from './dataFetch/fetchData';
import { fetchDetailData } from './dataFetch/detailFetchData';

// PrismaClient 인스턴스 생성
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000', 'http://ec2-52-78-180-65.ap-northeast-2.compute.amazonaws.com:3000'],
    credentials: true,
}));

// JSON 파싱 미들웨어
app.use(express.json());

// Swagger 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 인증 미들웨어
app.use(authMiddleware);

// 라우트 설정
app.use('/api/member', memberRouter);
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);

// EJS 설정 (데이터 시각화를 위한 간단한 웹페이지)
app.set('view engine', 'ejs');
app.set('views', './src/views');

// 뮤지컬 목록 페이지 라우트
app.get('/musicals', async (req, res) => {
    try {
        const musicals = await prisma.musical.findMany();
        res.render('musicals', { musicals });
    } catch (error) {
        res.status(500).send('Error fetching musicals');
    }
});

// 뮤지컬 상세 페이지 라우트
app.get('/musicals/:id', async (req, res) => {
    const musicalId = Number(req.params.id);
    try {
        const musical = await prisma.musical.findUnique({
            where: { musical_id: musicalId } 
        });
        if (musical) {
            res.render('musical-detail', { musical });
        } else {
            res.status(404).send('Musical not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching musical details');
    }
});

// 서버 구동 및 초기 데이터 fetch
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    // 서버 구동 시 OpenAPI 데이터 가져오기 및 데이터베이스에 저장
    try {
        await fetchData(); // OpenAPI에서 데이터 가져오기
        console.log('Data fetch completed.');
    } catch (error) {
        console.error('Error fetching data during server startup:', error);
    }
});

/**
 * @swagger
 * /api/performance/{mt20id}:
 *   get:
 *     summary: Get detailed performance data
 *     parameters:
 *       - in: path
 *         name: mt20id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the musical
 *     responses:
 *       200:
 *         description: Detailed information about the musical
 *       500:
 *         description: Error fetching detail data
 */
app.get('/api/performance/:mt20id', async (req, res) => {
    const { mt20id } = req.params;
    try {
        const detailData = await fetchDetailData(mt20id);
        res.send(detailData);
    } catch (error) {
        res.status(500).send('Error fetching detail data');
    }
});
