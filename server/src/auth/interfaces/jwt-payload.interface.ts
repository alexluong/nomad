import { UserModel } from '../../user/interfaces/user.model';

export interface JwtPayloadInterface {
    user?: UserModel;
    iat?: Date;
}