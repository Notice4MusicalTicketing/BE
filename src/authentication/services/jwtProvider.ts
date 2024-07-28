import jwt from 'jsonwebtoken';
import {Token, TokenPayload} from "../dtos/token.dto";

const SECRET_KEY = process.env.SECRET_KEY as string;
const ACCESS_EXPIRES_IN = '10m';
const REFRESH_EXPIRES_IN = '24h';

class JwtProvider{

    static verifyToken(token: string): TokenPayload | null{
        try{
            return jwt.verify(token, SECRET_KEY) as TokenPayload;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static generateAccessToken(payload: TokenPayload): string{
        return jwt.sign(
                payload,
                SECRET_KEY,
                {expiresIn: ACCESS_EXPIRES_IN})

    }

    static generateRefreshToken(payload: TokenPayload): string{
        return jwt.sign(
                payload,
                SECRET_KEY,
                {expiresIn: REFRESH_EXPIRES_IN})
    }
}

export default JwtProvider;