import {CreateMemberDto} from '../dtos/member.dto';
import prisma from '../../config/database';
import { Member, MemberSchema } from '../entities/member.entity';
import {MemberConverter} from "../entities/member.converter";

export class MemberService{
    async createMember(request: CreateMemberDto) : Promise<Member> {
        const memberSchema = await prisma.member.create({
            data: request
        });

        const member: Member = MemberConverter.toEntity(memberSchema);

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
        const memberSchema = await prisma.member.findFirst({
            where: {
                username: username
            }
        });

        if (memberSchema === null){
            throw new Error("해당 사용자가 존재하지 않음");
        }

        const member: Member = MemberConverter.toEntity(memberSchema);
        return member;
    }
}