import { Member, MemberSchema } from "./member.entity"

export const MemberConverter = {

    // MemberSchema를 Member 엔티티로 변환
    toEntity(memberSchema: MemberSchema): Member {
        return {
            memberId: Number(memberSchema.memberId),
            username: memberSchema.username,
            password: memberSchema.password,
            nickname: memberSchema.nickname,
            refreshToken: memberSchema.refreshToken,
        };
    },

    // Member 엔티티를 MemberSchema로 변환
    toSchema(member: Member): MemberSchema {
        return {
            memberId: BigInt(member.memberId),
            username: member.username,
            password: member.password,
            nickname: member.nickname,
            refreshToken: member.refreshToken,
        };
    }
};
