import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";
import {CreateMemberDto} from "../../member/dtos/member.dto";
import {LoginRequestDto} from "../dtos/login.dto";
import JwtProvider from "../services/jwtProvider";
import {Token, TokenPayload} from "../dtos/token.dto";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response){
        const createMemberDto: CreateMemberDto = req.body;
        try {
            await authService.register(createMemberDto);
            res.status(201).json({message: "SUCCESS"});
        } catch (err: any){
            console.error(err);
            res.status(400).json({message: err.message});
        }
    }

    async login(req: Request, res: Response){
        const loginRequestDto: LoginRequestDto = req.body;
        try {
            const member = await authService.login(loginRequestDto);
            const accessToken = JwtProvider.generateAccessToken({
                id: member.member_id.toString(),
                username: member.username,
                type: "access"
            });
            const refreshToken = JwtProvider.generateRefreshToken({
                id: member.member_id.toString(),
                username: member.username,
                type: "refresh"
            })

            await authService.updateRefreshToken(member, refreshToken);

            // 멤버 다시 저장
            const token:Token = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            res.status(200).json({result: true, token});
        } catch (err: any){
            console.error(err);
            res.status(400).json({message: err.message});
        }
    }

    async regenerateAccessToken(req: Request, res: Response){
        const {
            refreshToken
        } = req.body as {
            refreshToken: string
        };

        try {
            const accessToken = await authService.regenerateAccessToken(refreshToken);
            const token:Token = {
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            res.status(200).json({result: true, token});
        } catch (err: any){
            console.error(err);
            res.status(401).json({message: err.message});
        }
    }
}