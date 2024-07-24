import {CreateMemberDto} from '../dtos/member.dto';
import prisma from '../../config/database';
import { Member } from '../entities/member.entity';

export class MemberService{
    async createMember(request: CreateMemberDto) : Promise<Member> {
        const member = await prisma.member.create({
            data: request
        });
        console.log(`member 객체 저장`);
        return member;
    }

    async existMember(username: string): Promise<boolean>{
        const member = await prisma.member.findFirst({
            where: {
                username: username
            }
        });
        return member !== null;
    }

    async findMemberByUsername(username: string): Promise<Member | null>{
        const member = await prisma.member.findFirst({
            where: {
                username: username
            }
        });
        return member;
    }
}