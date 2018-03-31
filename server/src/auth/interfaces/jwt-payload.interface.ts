import { IUserModel } from '../../user/interfaces/user.model';

export interface JwtPayloadInterface {
    user?: IUserModel;
    iat?: Date;
}