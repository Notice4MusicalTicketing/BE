import express from 'express';
import memberRouter from './member/routes/member.route';
import authRoute from "./authentication/routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";
import {authMiddleware} from "./middleware/middleware";
import JwtProvider from "./authentication/services/jwtProvider";
import {Member} from "./member/entities/member.entity";

const app = express();

declare module 'express-serve-static-core' {
    interface Request {
        user?: Member;
    }
}

// 인증 미들웨어
app.use(authMiddleware);
app.use(express.json());

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});