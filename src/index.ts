import express from 'express';
import session from "express-session";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";

import memberRouter from './member/routes/member.route';
import authRoute from "./autnentication/routes/auth.route";



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
  const session = req.session;

  // request body 안에 내용이 있을 때
  if (req.body) {
    // 이미 로그인 중이 아니라면,
    if (!req.session.isLogined) {
      // session에 필요한 정보를 저장
      session.email = req.body.email;
      session.nickName = req.body.nickName;
      session.isLogined = true;
      if (req.body.isRemember) {
      
        console.log(req.body);

        // 기억하길 원할 때 14일 간 cookie를 살려둠
        const NANO_SEC_IN_A_DAY = 86400000;
        session.cookie.maxAge = 14 * NANO_SEC_IN_A_DAY;
        
      }
      session.save(() => {
        // session에 저장하고, 진행할 내용
        res.send({ result: true });
      });
    } else {
      res.send({ error: "Aleady Logined" });
    }
  }
});

const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
});
