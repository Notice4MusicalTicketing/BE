import {Member, MemberSchema} from "./member.entity"

export const MemberConverter = {

    // MemberSchema를 Member 엔티티로 변환
    toEntity(memberSchema: MemberSchema): Member {
        return {
            member_id: Number(memberSchema.member_id),
            username: memberSchema.username,
            password: memberSchema.password,
            nickname: memberSchema.nickname,
            refresh_token: memberSchema.refresh_token,
        };
    },

    // Member 엔티티를 MemberSchema로 변환
    toSchema(member: Member): MemberSchema {
        return {
            member_id: BigInt(member.member_id),
            username: member.username,
            password: member.password,
            nickname: member.nickname,
            refresh_token: member.refresh_token,
        };
    }
};