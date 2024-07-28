export interface Member{
    member_id: bigint;
    username: string;
    password: string;
    nickname: string;
    refresh_token?: string | null;
}