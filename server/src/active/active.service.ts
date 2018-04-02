import { Component } from '@nestjs/common';
import { readFileSync } from 'fs';
import { includes } from 'lodash';
import { join } from 'path';
import { ActiveRepository } from './active.repository';
import { Activity, ActivityActionType, IActiveModel, List, ProgressStatus } from './interfaces/active.model';
import { ActiveServiceInterface } from './interfaces/active.service.interface';
import { Active } from './schemas/active.schema';

@Component()
export class ActiveService implements ActiveServiceInterface {

    constructor(private readonly _activeRepository: ActiveRepository) {

    }

    private constructListDataFromJSON(): List[] {
        const data = JSON.parse(readFileSync(join(__dirname, '../../assets/standard.json'), {encoding: 'utf8'}));
        const lists: List[] = [];
        data.forEach(list => {
            const newList: List = Object.assign({}, list, {
                status: ProgressStatus.Opened
            });
            lists.push(newList);
        });

        lists.forEach(list => {
            list.activities.forEach((activity: Activity) => {
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

        const list: List = active.activeLists.find(l => l._id === listId);
        list.status = ProgressStatus.Ignored;

        active.activeLists.forEach((l, i) => {
            if (l.name === list.name) {
                list.activities.forEach(a => {
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
        const currentList: List = lists.find(list => list._id === listId);

        currentList.activities.forEach((a: Activity) => {
            if (a._id === activityId && a.status === ProgressStatus.Opened) {
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
            activityId,
            action: action === 'complete' ? ProgressStatus.Completed : ProgressStatus.Ignored,
            updatedAt: new Date(Date.now())
        };

        const activitiesStatuses: ProgressStatus[] = currentList.activities.map(a => a.status);

        if (!includes(activitiesStatuses, ProgressStatus.Opened)) {
            currentList.status = ProgressStatus.Completed;
            active.progress.completedLists.push(currentList.name);
        }

        lists.forEach((list, i) => {
            if (list._id === listId) {
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
        return active.activeLists.find(l => l._id === listId);
    }

    async getActivityByActivityId(userId: string, listId: string, activityId: string): Promise<Activity> {
        const active: IActiveModel = await this._activeRepository.getByUserId(userId);
        return active.activeLists.find(l => l._id === listId).activities.find(a => a._id === activityId);
    }
}