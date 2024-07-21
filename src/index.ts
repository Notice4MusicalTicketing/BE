import express from 'express';
import memberRouter from './member/routes/member.route';
import authRoute from "./autnentication/routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";
import session from "express-session";

const app = express();
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

// 로그인 테스트용 POST 요청
app.post("/test", (req, res) => {
    console.log("TEST CONSOLE");

    // 세션 데이터 저장
    req.session.email = req.body.email;
    req.session.nickName = req.body.nickName;
    req.session.isLogined = true;

    // 세션 저장 후 응답
    req.session.save((err) => {
        if (err) {
            console.error('Failed to save session:', err);
            return res.status(500).send({ result: false, message: 'Failed to save session' });
        }
        
        // 콘솔에 세션 데이터 출력
        console.log('Session data:', req.session);
        if(!req.session)console.log('wrong');

        // 응답 본문에 세션 정보 포함
        res.send({
            result: true,
            email: req.session.email,
            nickName: req.session.nickName
        });
    });
});



const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
});
