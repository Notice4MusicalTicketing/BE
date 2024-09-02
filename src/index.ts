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

const app = express();
const PORT = process.env.PORT || 3000;  // 포트 3000으로 설정

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000', 'http://ec2-52-78-180-65.ap-northeast-2.compute.amazonaws.com:3000'],
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

app.listen(PORT, async () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on : http://localhost:${PORT}`);
        console.log(`Server is running on : http://localhost:${PORT}/api-docs`);
        console.log(`Swagger YAML is available at: http://localhost:${PORT}/api-docs/swagger.yaml`);
    }

    // 데이터 페치 및 저장 호출
    await fetchAndStoreData(startDate, endDate, genre, region, status);
});


