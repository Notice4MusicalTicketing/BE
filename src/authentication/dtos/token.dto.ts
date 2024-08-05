export interface TokenPayload {
    id: string;
    username: string;
    nickname: string;
    type: string;
}

export interface Token{
    accessToken: string;
    refreshToken: string;
}