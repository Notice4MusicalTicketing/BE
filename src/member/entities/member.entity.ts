export interface Member{
    member_id: number;
    username: string;
    password: string;
    nickname: string;
    refresh_token?: string | null;
}

export interface MemberSchema{
    member_id: bigint;
    username: string;
    password: string;
    nickname: string;
    refresh_token?: string | null;
}