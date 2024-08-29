// src/types/express/index.d.ts
import { Member } from '../../member/entities/member.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Member;
  }
}
