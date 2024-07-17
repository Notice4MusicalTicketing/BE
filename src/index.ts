import express from 'express';
import memberRouter from './member/routes/member.route';
import authRoute from "./autnentication/routes/auth.route";

const app = express();

app.use(express.json());

app.use('/api/member', memberRouter);
app.use('/api/auth', authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});