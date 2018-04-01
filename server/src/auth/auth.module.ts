import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    components: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy]
})
export class AuthModule {
}