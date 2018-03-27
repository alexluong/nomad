import { ApiModelProperty } from '@nestjs/swagger';
import { SharedModel } from '../../shared/interfaces/shared.model';

export interface UserModel extends SharedModel {
    email: string;
    password: string;
    role: UserRole;
    profile?: UserProfile;
    username?: string;
}

export class IUserModel {
    @ApiModelProperty()
    email: string;
    @ApiModelProperty()
    password: string;
    @ApiModelProperty()
    role: UserRole;
    @ApiModelProperty()
    profile?: UserProfile;
    @ApiModelProperty()
    username?: string;
    @ApiModelProperty()
    _id?: string;
}

export enum UserRole {
    Admin = 'Admin' as any,
    User = 'User' as any
}

export enum UserGender {
    Male = 'Male' as any,
    Female = 'Female' as any,
    NotSpecified = 'Not Specified' as any
}

export interface UserProfile {
    age: number;
    country: string;
    gender: UserGender;
    nameFirst: string;
    nameLast: string;
    name: string;
}