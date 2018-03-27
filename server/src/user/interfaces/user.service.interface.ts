import { UserLoginResponse } from './user-login.response';
import { UserRegisterParams } from './user-register.params';
import { UserModel } from './user.model';

export interface UserServiceInterface {
    createNewUser(registerParams: UserRegisterParams): Promise<UserModel>;

    loginUser(currentUser: UserModel): Promise<UserLoginResponse>;

    comparePassword(input: string, password: string): Promise<boolean>;

    findByUsernameOrEmail(username?: string, email?: string): Promise<UserModel>;
}