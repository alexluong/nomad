import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { MongoError } from 'mongodb';
import { ApiException } from '../shared/interfaces/shared.model';
import { UserLoginParams } from './interfaces/user-login.params';
import { UserLoginResponse } from './interfaces/user-login.response';
import { UserRegisterParams } from './interfaces/user-register.params';
import { UserModel, IUserModel } from './interfaces/user.model';
import { UserService } from './user.service';

@Controller('users')
@ApiUseTags('System')
export class UserController {

    constructor(private _userService: UserService) {

    }

    @Post('register')
    @ApiResponse({
        status: 201,
        description: 'Register successfully',
        type: UserModel
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request',
        type: ApiException
    })
    async register(@Body() registerParams: UserRegisterParams): Promise<IUserModel> {
        const email: string = registerParams.email;
        const username: string = registerParams.username;

        if (!email || !username)
            throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);

        const existed: IUserModel = await this._userService.findByUsernameOrEmail(username, email);

        if (existed instanceof MongoError)
            throw new HttpException('Server error occurred', HttpStatus.AMBIGUOUS);
        if (existed)
            throw new HttpException(`${email} is already existed`, HttpStatus.BAD_REQUEST);

        return await this._userService.createNewUser(registerParams);
    }

    @Post('login')
    @ApiResponse({
        status: 201,
        description: 'Login Successfully',
        type: UserLoginResponse
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ApiException
    })
    async login(@Body() loginParams: UserLoginParams): Promise<UserLoginResponse> {
        const email: string = loginParams.email;
        const username: string = loginParams.username;
        const password: string = loginParams.password;

        if (!email && !username) {
            throw new HttpException('Username/Email required', HttpStatus.BAD_REQUEST);
        }

        const fetchedUser: IUserModel = await this._userService.findByUsernameOrEmail(username, email);

        if (fetchedUser instanceof MongoError)
            throw new HttpException('Server error occurred', HttpStatus.AMBIGUOUS);

        if (!fetchedUser || fetchedUser === null)
            throw new HttpException('Username/Email does not exist', HttpStatus.NOT_FOUND);

        const isMatched: boolean = await this._userService.comparePassword(password, fetchedUser.password);

        if (!isMatched) {
            throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
        }

        return await this._userService.loginUser(fetchedUser);
    }

    @Get('checkUsername')
    @ApiResponse({
        status: 201,
        description: 'Username available'
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request',
        type: ApiException
    })
    async checkUsernameAvailability(@Query('username') username: string): Promise<boolean> {
        const existed: IUserModel = await this._userService.findByUsernameOrEmail(username);
        return !existed;
    }
}