import { CreateMemberDto } from '../dtos/member.dto';
import { MemberService } from '../services/member.service';
import { Request, Response } from 'express';

const memberService = new MemberService();

export class MemberController{
    async createMember(req: Request, res: Response) {
        const createMemberDto: CreateMemberDto = req.body;
        try{
            const newMember = await memberService.createMember(createMemberDto);
            res.status(201).json({message: "SUCCESS"});
        } catch (err){
            console.error(err);
            res.status(500).json({error: "error"});
        }
    }
}