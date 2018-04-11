import { Component, HttpException, HttpStatus } from '@nestjs/common';
import { readFileSync } from 'fs';
import { find, forEach, includes, map, some } from 'lodash';
import { Types } from 'mongoose';
import { join } from 'path';
import { IUserModel } from '../user/interfaces/user.model';
import { UserService } from '../user/user.service';
import { ActiveRepository } from './active.repository';
import { Activity, ActivityActionType, IActiveModel, List, ProgressStatus } from './interfaces/active.model';
import { ActiveServiceInterface } from './interfaces/active.service.interface';
import { Active } from './schemas/active.schema';

@Component()
export class ActiveService implements ActiveServiceInterface {
    private mockedImgURL: 'https://www.aluminati.net/wp-content/uploads/2016/03/img-placeholder.png';

    constructor(private readonly _activeRepository: ActiveRepository,
                private readonly _userService: UserService) {

    }

    private constructListDataFromJSON(): List[] {
        const data = JSON.parse(readFileSync(join(__dirname, '../../assets/standard.json'), {encoding: 'utf8'}));
        const lists: List[] = [];

        forEach(data, list => {
            const newList: List = Object.assign({}, list, {
                status: ProgressStatus.Opened,
                imgURL: this.mockedImgURL
            });
            lists.push(newList);
        });

        forEach(lists, list => {
            forEach(list.activities, activity => {
                activity.status = ProgressStatus.Opened;
            });
        });

        return lists;
    }

    async createNewActiveLists(user: IUserModel): Promise<IActiveModel> {
        const lists = this.constructListDataFromJSON();
        const newActive: IActiveModel = new Active();
        newActive.activeLists = lists;
        newActive.userId = user._id;

        user.hasBoard = true;
        await this._userService.flagBoardAvailability(user);

        return await this._activeRepository.create(newActive);
    }

    async ignoreList(listId: string, userId: string): Promise<IActiveModel> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);

        const list: List = await this.getListByListId(userId, listId);
        list.status = ProgressStatus.Ignored;

        forEach(active.activeLists, (l, i) => {
            if (list._id.equals(l._id)) {
                forEach(list.activities, a => {
                    a.status = ProgressStatus.Ignored;
                });
                active.activeLists[i] = list;
            }
        });


        return await this._activeRepository.update(active);
    }

    async updateActivity(action: ActivityActionType = 'completed', listId: string, activityId: string, userId: string): Promise<IActiveModel> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        let reverting: boolean = false;

        const lists: List[] = active.activeLists;
        const currentList: List = await this.getListByListId(userId, listId);

        if (!currentList || currentList === null || currentList === undefined) {
            throw new HttpException('List not found', HttpStatus.BAD_REQUEST);
        }

        const currentActivity: Activity = await this.getActivityByActivityId(userId, listId, activityId);

        if (!currentActivity || currentActivity === null || currentActivity === undefined) {
            throw new HttpException('Activity not found', HttpStatus.BAD_REQUEST);
        }

        if (currentActivity.status.toString().toLowerCase() === action) {
            throw new HttpException(`Duplicate Activity status: ${action}`, HttpStatus.BAD_REQUEST);
        }

        forEach(currentList.activities, (a: Activity) => {
            if (Types.ObjectId(activityId).equals(a._id)) {
                switch (action) {
                    case 'completed':
                        a.status = ProgressStatus.Completed;
                        break;
                    case 'ignored':
                        a.status = ProgressStatus.Ignored;
                        break;
                    case 'opened':
                        a.status = ProgressStatus.Opened;
                        reverting = true;
                        break;
                    default:
                        throw new HttpException('Action not found', HttpStatus.BAD_REQUEST);
                }
            }
        });

        if (reverting) {
            currentList.progress -= ActiveService.round(1 / currentList.activities.length, 2);
        } else {
            currentList.progress += ActiveService.round(1 / currentList.activities.length, 2);
        }

        active.lastUpdatedActivity = {
            activityId,
            action,
            updatedAt: new Date(Date.now())
        };

        const activitiesStatuses: ProgressStatus[] = map(currentList.activities, a => a.status);

        if (!includes(activitiesStatuses, ProgressStatus.Opened)) {
            currentList.status = ProgressStatus.Completed;
        } else {
            currentList.status = ProgressStatus.Opened;
        }

        forEach(lists, (list, i) => {
            if (Types.ObjectId(listId).equals(list._id)) {
                lists[i] = currentList;
            }
        });

        active.activeLists = lists;

        return await this._activeRepository.update(active);
    }

    async canCreate(userId: string): Promise<boolean> {
        const result: IActiveModel = await this._activeRepository.getByUserId(userId);
        return !result;
    }

    async getListByListId(userId: string, listId: string): Promise<List> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        return find(active.activeLists, l => {
            return Types.ObjectId(listId).equals(l._id);
        });
    }

    async cannotIgnore(list: List): Promise<boolean> {
        const activities: Activity[] = list.activities;
        return some(activities, a => {
            return a.status !== ProgressStatus.Opened;
        });
    }

    async getActivityByActivityId(userId: string, listId: string, activityId: string): Promise<Activity> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        return find(find(active.activeLists, l => Types.ObjectId(listId).equals(l._id)).activities, a => Types.ObjectId(activityId).equals(a._id));
    }

    // async getProgress(userId: string): Promise<ActiveProgress> {
    //     const active: IActiveModel = await this._activeRepository.getByUserId(userId);
    //     return active.progress;
    // }

    async getOneActive(userId: string): Promise<IActiveModel> {
        return await this._activeRepository.getByUserId(userId);
    }

    private static round(number: number, precision: number): number {
        const shift = (number, precision, reverse) => {
            precision = reverse ? -precision : precision;
            const numArray = ('' + number).split('e');
            return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision));
        };

        return shift(Math.round(shift(number, precision, false)), precision, true);
    }
}
