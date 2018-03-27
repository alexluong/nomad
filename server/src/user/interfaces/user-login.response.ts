import { ApiModelProperty } from '@nestjs/swagger';
import { IUserModel } from './user.model';

export class UserLoginResponse {
    @ApiModelProperty()
    authToken: string;
    @ApiModelProperty()
    user: IUserModel;
}
