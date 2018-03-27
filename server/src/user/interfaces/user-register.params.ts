import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserRegisterParams {
    @ApiModelProperty({
        description: 'Email address',
        required: true
    })
    @IsEmail()
    email: string;

    @ApiModelProperty({
        description: 'Username',
        required: true
    })
    @IsString()
    username: string;

    @ApiModelProperty({
        description: 'Password',
        required: true
    })
    @IsString()
    password: string;
}
