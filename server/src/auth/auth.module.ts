import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    components: [AuthService, UserRepository, JwtStrategy],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule {
}