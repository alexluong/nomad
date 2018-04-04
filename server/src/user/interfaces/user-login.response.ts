import { ApiModelProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class UserLoginResponse {
    @ApiModelProperty() authToken: string;
    @ApiModelProperty() user: UserModel;
}
