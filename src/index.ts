import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { authMiddleware } from './middleware/middleware';
import { fetchAndStoreData } from './dataFetch/fetchAndStoreData';

import authRoute from "./authentication/routes/auth.route";
import postRoute from "./post/routes/post.route";
import memberRouter from './member/routes/member.route';
import commentRoute from "./comment/routes/comment.route";
import swaggerDocument from "./config/openapi.docs";
import musicalRoutes from "./musical/routes/musical.routes";
import {Member} from "./member/entities/member.entity";
import loadEnv from "./config/env.config";
import dotenv from "dotenv";
import reviewRoute from "./review/routes/review.route";

loadEnv();

const app = express();

const PORT = Number(process.env.PORT) || 3000;
declare module 'express-serve-static-core' {
    interface Request {
        user?: Member;
    }
}


// CORS 설정
app.use(cors({
    origin: [
        'http://localhost:3000', // 로컬 개발 환경
        'http://<EC2_PUBLIC_IP>:3000', // EC2 퍼블릭 IP 추가
        'http://ec2-52-78-180-65.ap-northeast-2.compute.amazonaws.com:3000' // 추가된 도메인
    ],
    credentials: true,
}));

// JSON 파싱 미들웨어
app.use(express.json());

// 인증 미들웨어
app.use(authMiddleware);

// 라우트 설정
app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);
app.use('/api/review', reviewRoute);
app.use(musicalRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// EJS 설정 (데이터 시각화를 위한 간단한 웹페이지)
app.set('view engine', 'ejs');
app.set('views', './src/views');

const startDate = '20240101'; // 원하는 시작 날짜
const endDate = '20240131'; // 원하는 종료 날짜
const genre = '뮤지컬'; // 원하는 장르
const region = '서울'; // 원하는 지역
const status = '공연중'; // 원하는 공연 상태

// 서버 실행
app.listen(PORT, '0.0.0.0', async () => {  // 호스트를 '0.0.0.0'으로 변경
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on : http://localhost:${PORT}`);
        console.log(`Server is running on : http://localhost:${PORT}/api-docs`);
        console.log(`Swagger YAML is available at: http://localhost:${PORT}/api-docs/swagger.yaml`);
    }

    // 데이터 페치 및 저장 호출
    await fetchAndStoreData(startDate, endDate, genre, region, status);
});

