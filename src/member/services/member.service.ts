import { CreateMemberDto } from '../dtos/member.dto';
import prisma from '../../config/database';
import { Member, MemberSchema } from '../entities/member.entity';
import {MemberConverter} from "../entities/member.converter";

export class MemberService {
    async createMember(request: CreateMemberDto): Promise<Member> {
        const member = await prisma.member.create({
            data: {
                email: request.email,
                password: request.password,
                nickname: request.nickname,
                loginStatus: 'offline',
            },
        });

        return {
            memberId: member.memberId,
            email: member.email,
            password: member.password,
            nickname: member.nickname,
            loginStatus: member.loginStatus,
        };
    }

    async existMember(email: string): Promise<boolean> {
        const member = await prisma.member.findFirst({
            where: {
                email: email
            }
        });
        return member !== null;
    }

    async findMemberByEmail(email: string): Promise<Member | null> {
        const member = await prisma.member.findFirst({
            where: {
                email: email
            }
        });

        if (memberSchema === null){
            throw new Error("해당 사용자가 존재하지 않음");
        }

        const member: Member = MemberConverter.toEntity(memberSchema);
        return member;
    }
}
