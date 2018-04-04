import { Component } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { environment } from '../environment/environment';
import { UserRepository } from '../user/user.repository';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Component()
export class AuthService {
    jwtOptions: SignOptions;
    jwtSecret: string;

    constructor(private readonly _userRepository: UserRepository) {
        this.jwtOptions = {
            expiresIn: '12h'
        };
        this.jwtSecret = process.env.JWT_SECRET || environment.jwtAuthSecret;
    }

    async signPayload(payload): Promise<string> {
        return sign(payload, this.jwtSecret, this.jwtOptions);
    }

    async validateUser(payload: JwtPayloadInterface): Promise<boolean> {
        const result = await this._userRepository.getById(payload.user._id);
        return !!result;
    }
}
