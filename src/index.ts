// index.ts

import express from 'express';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import memberRouter from './member/routes/member.route';
import authRoute from './autnentication/routes/auth.route';

import { PrismaClient } from '@prisma/client';

// openAPI part
import { fetchData } from './fetchData';
import { fetchDetailData } from './detailFetchData';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: A welcome message
 */
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
    console.log(req.session);
});

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
