import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";
import {CreateMemberDto} from "../../member/dtos/member.dto";

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response){
        const createMemberDto: CreateMemberDto = req.body;
        try {
            await authService.register(createMemberDto);
            res.status(201).json({message: "SUCCESS"});
        } catch (err){
            console.log(err);
            res.status(400).json({message: "ERROR"});
        }
    }


}