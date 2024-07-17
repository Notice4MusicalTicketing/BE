import express from 'express';
import { MemberController } from '../controllers/member.controller';

const router = express.Router();
const memberController = new MemberController();

router.post('/', memberController.createMember);

export default router;