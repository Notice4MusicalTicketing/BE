export interface Member{
    member_id: number;
    username: string;
    password: string;
    nickname: string;
    refresh_token?: string | null;
}