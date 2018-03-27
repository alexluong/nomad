import { Component } from '@nestjs/common';
import { use } from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { environment } from '../../environment/environment';
import { AuthService } from '../auth.service';
import { JwtPayloadInterface } from '../interfaces/jwt-payload.interface';

@Component()
export class JwtStrategy extends Strategy {

    constructor(private readonly _authService: AuthService) {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET || environment.jwtAuthSecret
            },
            async (payload: JwtPayloadInterface, done: VerifiedCallback) => await this.verify(payload, done));
        use(this);
    }

    public async verify(payload: JwtPayloadInterface, done: VerifiedCallback) {
        const isValid = await this._authService.validateUser(payload);

        if (!isValid) {
            return done('Unauthorized', false);
        }

        return done(null, payload, {issuedAt: payload.iat});
    }
}