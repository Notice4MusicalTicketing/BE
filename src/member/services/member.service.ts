import { CreateMemberDto } from '../dtos/member.dto';
import prisma from '../../config/database';
import { Member } from '../entities/member.entity';

export class MemberService {
    async createMember(request: CreateMemberDto): Promise<Member> {
        const member = await prisma.member.create({
            data: {
                username: request.username,
                password: request.password,
                nickname: request.nickname,
            },
        });

        return {
            member_id: member.member_id,
            username: member.username,
            password: member.password,
            nickname: member.nickname,
        };
    }

    async existMember(username: string): Promise<boolean> {
        const member = await prisma.member.findFirst({
            where: {
                username: username
            }
        });
        return member !== null;
    }

    async findMemberByUsername(username: string): Promise<Member | null> {
        const member = await prisma.member.findFirst({
            where: {
                username: username
            }
        });
        if (member) {
            return {
                member_id: member.member_id,
                username: member.username,
                password: member.password,
                nickname: member.nickname,
            };
        }
        return null;
    }
}
