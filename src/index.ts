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

// JSON 파싱 미들웨어 설정
app.use(express.json());

// express-session 설정
app.use(session({
    secret: 'your-secret-key', // 세션 암호화에 사용될 키
    resave: false, // 세션이 수정되지 않았더라도 세션을 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
    cookie: { secure: false } // 쿠키 설정 (HTTPS를 사용할 경우 true로 설정)
}));

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);

// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
    console.log(req.session);
});

const PORT = process.env.PORT || 3000;

// Server setup
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


app.get('/api/performance/:mt20id', async (req, res) => {
    const { mt20id } = req.params;
    try {
        const detailData = await fetchDetailData(mt20id);
        res.send(detailData);
    } catch (error) {
        res.status(500).send('Error fetching detail data');
    }
});
