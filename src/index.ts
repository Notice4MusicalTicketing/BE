import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './config/swagger';
import memberRouter from './member/routes/member.route';

import { authMiddleware } from './middleware/middleware';
import { PrismaClient } from '@prisma/client';
import { fetchData } from './dataFetch/fetchData';
import { fetchDetailData } from './dataFetch/detailFetchData';
import { fetchAndStoreData } from './dataFetch/fetchAndStoreData';

import {Member} from "./member/entities/member.entity";
import postRoute from "./post/routes/post.route";
import commentRoute from "./comment/routes/comment.route";
import swaggerDocument from "./config/openapi.docs";


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

// 인증 미들웨어
app.use(authMiddleware);

// Swagger UI 설정
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// 라우트 설정
app.use('/api/member', memberRouter);

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
            where: { musicalId: musicalId } 
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

    try {
        const startDate = '20240101'; // 원하는 시작 날짜
        const endDate = '20240131'; // 원하는 종료 날짜
        const genre = '뮤지컬'; // 원하는 장르
        const region = '서울'; // 원하는 지역
        const status = '공연중'; // 원하는 공연 상태

        await fetchAndStoreData(startDate, endDate, genre, region, status); // 인수 제공
        console.log('Data fetch completed_index.ts');
    } catch (error) {
        console.error('Error fetching data during server startup:', error);
    }
});

app.post('/api/sync', async (req, res) => {
    try {
        const startDate = '20240101'; // 원하는 시작 날짜
        const endDate = '20240131'; // 원하는 종료 날짜
        const genre = '뮤지컬'; // 원하는 장르
        const region = '서울'; // 원하는 지역
        const status = '공연중'; // 원하는 공연 상태

        await fetchAndStoreData(startDate, endDate, genre, region, status); // 인수를 제공
        res.status(200).json({ message: 'Data synchronization completed.' });
    } catch (error) {
        res.status(500).json({ message: 'Error during data synchronization.', error });
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

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on : http://localhost:${PORT}`);
        console.log(`Server is running on : http://localhost:${PORT}/api-docs`);
        console.log(`Swagger YAML is available at: http://localhost:${PORT}/api-docs/swagger.yaml`);
    }
});

