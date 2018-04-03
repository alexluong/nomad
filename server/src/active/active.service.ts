import { Component } from '@nestjs/common';
import { readFileSync } from 'fs';
import { find, forEach, includes, map } from 'lodash';
import { Types } from 'mongoose';
import { join } from 'path';
import { ActiveRepository } from './active.repository';
import { Activity, ActivityActionType, IActiveModel, List, ProgressStatus } from './interfaces/active.model';
import { ActiveServiceInterface } from './interfaces/active.service.interface';
import { Active } from './schemas/active.schema';

@Component()
export class ActiveService implements ActiveServiceInterface {

    private mockedImgURL: 'https://www.aluminati.net/wp-content/uploads/2016/03/img-placeholder.png';

    constructor(private readonly _activeRepository: ActiveRepository) {

    }

    private constructListDataFromJSON(): List[] {
        const data = JSON.parse(readFileSync(join(__dirname, '../../assets/standard.json'), {encoding: 'utf8'}));
        const lists: List[] = [];

        forEach(data, list => {
            const newList: List = Object.assign({}, list, {
                status: ProgressStatus.Opened,
                listImgURL: this.mockedImgURL
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

    async createNewActiveLists(userId: string): Promise<IActiveModel> {
        const lists = this.constructListDataFromJSON();
        const newActive: IActiveModel = new Active();
        newActive.activeLists = lists;
        newActive.progress = {
            completedActivities: [],
            completedLists: [],
            ignoredActivities: [],
            ignoredLists: []
        };
        newActive.userId = userId;

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

        active.progress.ignoredLists.push(listId);

        return await this._activeRepository.update(active);
    }

    async updateActivity(action: ActivityActionType = 'complete', listId: string, activityId: string, userId: string): Promise<IActiveModel> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        const lists: List[] = active.activeLists;
        const currentList: List = await this.getListByListId(userId, listId);

        forEach(currentList.activities, (a: Activity) => {
            if (Types.ObjectId(activityId).equals(a._id) && a.status === ProgressStatus.Opened) {
                switch (action) {
                    case 'complete':
                        a.status = ProgressStatus.Completed;
                        active.progress.completedActivities.push(a.name);
                        break;
                    case 'ignore':
                        a.status = ProgressStatus.Ignored;
                        active.progress.ignoredActivities.push(a.name);
                        break;
                    default:
                        break;
                }
            }
        });

        active.lastUpdatedActivity = {
            activityId: activityId,
            action: action === 'complete' ? ProgressStatus.Completed : ProgressStatus.Ignored,
            updatedAt: new Date(Date.now())
        };

        const activitiesStatuses: ProgressStatus[] = map(currentList.activities, a => a.status);

        if (!includes(activitiesStatuses, ProgressStatus.Opened)) {
            currentList.status = ProgressStatus.Completed;
            active.progress.completedLists.push(currentList.name);
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

    async getActivityByActivityId(userId: string, listId: string, activityId: string): Promise<Activity> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        return find(
            find(active.activeLists, l => Types.ObjectId(listId).equals(l._id)).activities,
            a => Types.ObjectId(activityId).equals(a._id));
    }
}