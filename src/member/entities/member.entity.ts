export interface Member{
    memberId: number;
    username: string;
    password: string;
    nickname: string;
    refreshToken?: string | null;
}

export interface MemberSchema{
    memberId: bigint;
    username: string;
    password: string;
    nickname: string;
    refreshToken?: string | null;
}