import express from 'express';
import cors from 'cors';
import memberRouter from './member/routes/member.route';
import authRoute from "./authentication/routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";
import {authMiddleware} from "./middleware/middleware";
import {Member} from "./member/entities/member.entity";
import postRoute from "./post/routes/post.route";

const app = express();

declare module 'express-serve-static-core' {
    interface Request {
        user?: Member;
    }
}

app.use(cors({
    origin: ['http://localhost:3000', 'http://ec2-52-78-180-65.ap-northeast-2.compute.amazonaws.com:3000'],
    credentials: true,
}));

// 인증 미들웨어
app.use(authMiddleware);
app.use(express.json());

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server is running on : http://localhost:${PORT}`);
        console.log(`Server is running on : http://localhost:${PORT}/api-docs`);
    }
});