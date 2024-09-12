import jwt from 'jsonwebtoken';
import { Token, TokenPayload } from "../dtos/token.dto";

const ACCESS_EXPIRES_IN = '10m';
const REFRESH_EXPIRES_IN = '24h';

class JwtProvider {
    static verifyToken(token: string): TokenPayload | null {
        try {
            return jwt.verify(token, process.env.SECRET_KEY as string,) as TokenPayload;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY as string,
            { expiresIn: ACCESS_EXPIRES_IN }
        );
    }

    static generateRefreshToken(payload: TokenPayload): string {
        return jwt.sign(
            payload,
            process.env.SECRET_KEY as string,
            { expiresIn: REFRESH_EXPIRES_IN }
        );
    }
}

export default JwtProvider;
