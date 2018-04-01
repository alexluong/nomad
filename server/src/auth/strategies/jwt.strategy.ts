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
                passReqToCallback: true,
                secretOrKey: process.env.JWT_SECRET || environment.jwtAuthSecret
            },
            async (req, payload, next) => await this.verify(req, payload, next));
        use(this);
    }

    public async verify(req, payload: JwtPayloadInterface, done: VerifiedCallback) {
        const isValid = await this._authService.validateUser(payload);
        if (!isValid) {
            return done('Unauthorized from Strategy', false);
        }

        return done(null, payload.user);
    }
}