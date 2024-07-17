import { CreateMemberDto } from '../dtos/member.dto';
import prisma from '../../config/database';
import { Member } from '../entities/member.entity';

export class MemberService{
    async createMember(request: CreateMemberDto) : Promise<Member> {
        const member = await prisma.member.create({
            data: request
        });
        console.log(`member 객체 저장 ${JSON.stringify(member)}`);
        return member;
    }
}