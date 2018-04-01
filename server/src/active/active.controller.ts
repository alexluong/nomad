import { Body, Controller, HttpException, HttpStatus, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IUserModel } from '../user/interfaces/user.model';
import { ActiveService } from './active.service';
import { ActiveModel, Activity, IActiveModel, List, ProgressStatus } from './interfaces/active.model';

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
        const canCreate: boolean = await this._activeService.canCreate(currentUser._id);

        if (!canCreate) {
            throw new HttpException('A User can only have one Active path at a time', HttpStatus.BAD_REQUEST);
        }

        return await this._activeService.createNewActiveLists(currentUser._id);
    }

    @Put('update')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async updateActivity(@Req() req: Request, @Body() activity: Activity, @Query('listName') listName: string, @Query('action') action?: 'complete' | 'ignore'): Promise<IActiveModel> {
        const currentUser: IUserModel = req['user'] as IUserModel;
        if (activity.status !== ProgressStatus.Opened) {
            throw new HttpException('Activity status can only be updated once', HttpStatus.BAD_REQUEST);
        }
        return await this._activeService.updateActivity(action, listName, activity, currentUser._id);
    }

    @Put('ignoreList')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async ignoreList(@Req() req: Request, @Query('listName') listName: string): Promise<IActiveModel> {
        const currentUser: IUserModel = req['user'] as IUserModel;
        const list: List = await this._activeService.getListByListName(currentUser._id, listName);
        if (list.status !== ProgressStatus.Opened) {
            throw new HttpException('List status can only be updated once', HttpStatus.BAD_REQUEST);
        }
        return await this._activeService.ignoreList(listName, currentUser._id);
    }
}