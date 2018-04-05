import { UserLoginResponse } from './user-login.response';
import { UserRegisterParams } from './user-register.params';
import { IUserModel } from './user.model';

export interface UserServiceInterface {
    createNewUser(registerParams: UserRegisterParams): Promise<IUserModel>;

    loginUser(currentUser: IUserModel): Promise<UserLoginResponse>;

    comparePassword(input: string, password: string): Promise<boolean>;

    findByUsernameOrEmail(username?: string, email?: string): Promise<IUserModel>;

    flagBoardAvailability(user: IUserModel): Promise<IUserModel>;
}
