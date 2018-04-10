import { Controller, Get, HttpException, HttpStatus, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Request } from 'express';
import { IUserModel } from '../user/interfaces/user.model';
import { ActiveService } from './active.service';
import { ActiveModel, ActiveProgress, Activity, IActiveModel, List, ProgressStatus } from './interfaces/active.model';

@Controller('lists')
@ApiUseTags('List')
@ApiBearerAuth()
export class ActiveController {
    constructor(private _activeService: ActiveService) {
    }

    @Get('create')
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

        return await this._activeService.createNewActiveLists(currentUser);
    }

    @Get('update')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async updateActivity(@Req() req: Request, @Query('activityId') activityId: string, @Query('listId') listId: string, @Query('action') action?: 'complete' | 'ignore'): Promise<IActiveModel> {
        const currentUser: IUserModel = req['user'] as IUserModel;
        const activity: Activity = await this._activeService.getActivityByActivityId(currentUser._id, listId, activityId);

        if (!activity || activity === undefined) {
            throw new HttpException(`Activity with ${activityId} cannot be found`, HttpStatus.NOT_FOUND);
        }

        if (activity.status !== ProgressStatus.Opened) {
            throw new HttpException('Activity status can only be updated once', HttpStatus.BAD_REQUEST);
        }
        return await this._activeService.updateActivity(action, listId, activityId, currentUser._id);
    }

    @Get('ignoreList')
    @ApiResponse({
        status: 200,
        type: ActiveModel
    })
    async ignoreList(@Req() req: Request, @Query('listId') listId: string): Promise<IActiveModel> {
        const currentUser: IUserModel = req['user'] as IUserModel;
        const list: List = await this._activeService.getListByListId(currentUser._id, listId);
        if (!list || list === undefined) {
            throw new HttpException(`List with ${listId} cannot be found`, HttpStatus.NOT_FOUND);
        }
        if (list.status !== ProgressStatus.Opened) {
            throw new HttpException('List status can only be updated once', HttpStatus.BAD_REQUEST);
        }
        if (this._activeService.cannotIgnore(list)) {
            throw new HttpException('List status can only be updated if the Activities have not been updated.', HttpStatus.BAD_REQUEST);
        }

        return await this._activeService.ignoreList(listId, currentUser._id);
    }

    // @Get('progress')
    // @ApiResponse({
    //     status: 200,
    //     type: ActiveProgress
    // })
    // async getCurrentProgress(@Req() req: Request): Promise<ActiveProgress> {
    //     const currentUser: IUserModel = req['user'] as IUserModel;
    //     return await this._activeService.getProgress(currentUser._id);
    // }

    // @Get('current')
    // @ApiResponse({
    //     status: 200,
    //     type: ActiveModel
    // })
    // async getCurrentActive(@Req() req: Request): Promise<IActiveModel> {
    //     const currentUser: IUserModel = req['user'] as IUserModel;
    //     return await this._activeService.getOneActive(currentUser._id);
    // }
}
