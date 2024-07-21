import express from 'express';
import memberRouter from './member/routes/member.route';
import authRoute from "./autnentication/routes/auth.route";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./config/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);

// Handling GET / Request
app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})
// Server setup
app.listen(PORT,() => {
    console.log('The application is listening '
          + 'on port http://localhost:'+PORT);
})