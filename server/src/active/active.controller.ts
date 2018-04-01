import { Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IUserModel } from '../user/interfaces/user.model';
import { ActiveService } from './active.service';
import { ActiveModel, IActiveModel } from './interfaces/active.model';

@Controller('lists')
@ApiUseTags('List')
@ApiBearerAuth()
export class ActiveController {

    constructor(private _activeService: ActiveService) {

    }

    @Post('create')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async createList(@Req() req: Request): Promise<IActiveModel> {
        const currentUser: IUserModel = req['user'] as IUserModel;
        return await this._activeService.createNewActiveLists(currentUser._id);
    }
}