import {CreateMemberDto} from "../../member/dtos/member.dto";
import validator from "validator";
import {MemberService} from "../../member/services/member.service";
import bcrypt from 'bcrypt';
import {LoginRequestDto} from "../dtos/login.dto";
import {Member} from "../../member/entities/member.entity";

const memberService = new MemberService();

export class AuthService {
    async register(request: CreateMemberDto): Promise<void>{
        // email 형식 검증
        if (!this.isEmail(request.username)){
            throw new Error("이메일 형식이 올바르지 않음");
        }
        // password 형식 검증
        if (!this.isPassword(request.password)){
            console.log(request.password)
            throw new Error("비밀번호 형식이 올바르지 않음");
        }
        // 중복확인
        if (await memberService.existMember(request.username)){
            throw new Error("이메일 중복되었음");
        }
        // password 암호화
        const encryptMember: CreateMemberDto = {
            username: request.username,
            password: await this.hashPassword(request.password),
            nickname: request.nickname
        }
        // db에 저장
        await memberService.createMember(encryptMember);
    }

    async login(request: LoginRequestDto): Promise<Member>{
        // db에서 email 검색
        const member = await memberService.findMemberByUsername(request.username);
        if (member === null){
            throw new Error("해당 이메일이 존재하지 않음");
        }
        // password 복호화
        if (!await this.verifyPassword(request.password ,member.password)){
            throw new Error("이메일과 비밀번호가 일치하지 않음");
        }

        // 성공시 토큰을 반환

        return member;
    }

    private isEmail = (email: string) : boolean => {
        return validator.isEmail(email);
    }
    private isPassword = (password: string): boolean => {
        return validator.isStrongPassword(password,{
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 0
        });
    }
    // password 암호화
    private hashPassword = async (password: string): Promise <string> => {
        return bcrypt.hash(password, 10);
    }
    // password 복호화
    private verifyPassword = async (plainPassword: string, hashedPassword: string): Promise <boolean> => {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}