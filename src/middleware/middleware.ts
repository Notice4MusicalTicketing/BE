import {NextFunction, Request, Response} from "express";
import JwtProvider from "../authentication/services/jwtProvider";
import {Member} from "../member/entities/member.entity";

const whiteList = [
    '/api-docs',
    '/api/auth'
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isWhiteList = whiteList.some((route) => {
        return req.path.startsWith(route);
    });

    if (isWhiteList){
        return next();
    }

    const token = req.headers['authorization'];

    if (!token){
        return res.status(401).json({result: false, message: "토큰이 존재하지 않음"});
    }

    try {
        const payload = JwtProvider.verifyToken(token);
        if (payload?.id && payload.username && payload.nickname){
            const member: Member = {
                member_id: Number(payload.id),
                username: payload.username as string,
                password: "0",
                nickname: payload.nickname as string
            };
            req.user = member;

            next();
        } else {
            throw new Error("토큰이 유효하지 않음");
        }
    } catch (err) {
        return res.status(400).json({result: false, message: "토큰이 유효하지 않음"});
    }
}
