import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { SharedModel } from '../../shared/interfaces/shared.model';

export interface IUserModel extends SharedModel {
    email: string;
    password: string;
    role: UserRole;
    profile?: UserProfile;
    username?: string;
    hasBoard?: boolean;
}

export class UserProfile {
    @ApiModelProperty() age: number;
    @ApiModelProperty() country: string;
    @ApiModelProperty({
        enum: ['Male', 'Female', 'Not Specified']
    })
    gender: UserGender;
    @ApiModelProperty() nameFirst: string;
    @ApiModelProperty() nameLast: string;
    @ApiModelProperty() name: string;
}

export class UserModel {
    @ApiModelProperty() email: string;
    @ApiModelProperty() password: string;
    @ApiModelProperty({
        enum: ['Admin', 'User']
    })
    role: UserRole;
    @ApiModelProperty({
        type: UserProfile
    })
    profile?: UserProfile;
    @ApiModelProperty() username?: string;
    @ApiModelProperty() _id?: string;
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time'
    })
    createdAt?: Date;
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time'
    })
    updatedAt?: Date;
    @ApiModelPropertyOptional()
    hasBoard?: boolean;
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
