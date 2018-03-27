import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserLoginParams {
    @ApiModelPropertyOptional()
    @IsString()
    @IsOptional()
    username?: string;

    @ApiModelPropertyOptional()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiModelProperty()
    @IsString()
    password: string;
}