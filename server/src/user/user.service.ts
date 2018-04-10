import { Component } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { AuthService } from '../auth/auth.service';
import { UserLoginResponse } from './interfaces/user-login.response';
import { UserRegisterParams } from './interfaces/user-register.params';
import { IUserModel, UserModel } from './interfaces/user.model';
import { UserServiceInterface } from './interfaces/user.service.interface';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Component()
export class UserService implements UserServiceInterface {
    constructor(private _userRepository: UserRepository, private _authService: AuthService) {
    }

    async createNewUser(registerParams: UserRegisterParams): Promise<IUserModel> {
        const newUser: IUserModel = new User();
        newUser.email = registerParams.email;
        newUser.username = registerParams.username;
        const salt = await genSalt(10);
        newUser.password = await hash(registerParams.password, salt);
        return await this._userRepository.create(newUser);
    }

    async loginUser(currentUser: IUserModel): Promise<UserLoginResponse> {
        const payload = {user: currentUser};
        const token = await this._authService.signPayload(payload);

        return {
            authToken: token,
            user: currentUser as UserModel
        };
    }

    async comparePassword(input: string, password: string): Promise<boolean> {
        return await compare(input, password);
    }

    async findByUsernameOrEmail(username?: string, email?: string): Promise<IUserModel> {
        return await this._userRepository.getUserByUsernameOrEmail(username, email);
    }

    async flagBoardAvailability(user: IUserModel): Promise<IUserModel> {
        return await this._userRepository.update(user);
    }
}
