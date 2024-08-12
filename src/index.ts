// index.ts

import express from 'express';
import memberRouter from './member/routes/member.route';
import authRoute from "./autnentication/routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";

const app = express();
const prisma = new PrismaClient();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);

    // openAPI
    console.log('index open api start');
    async function main() {
        console.log('Fetching data...');
        await fetchData();
        console.log('Data fetch completed.');
    }

    main().catch(console.error);
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
