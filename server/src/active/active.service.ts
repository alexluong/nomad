import { Component } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ActiveRepository } from './active.repository';
import { ActiveListParams } from './interfaces/active-list.params';
import { Activity, IActiveModel, List, ProgressStatus } from './interfaces/active.model';
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

    async updateActiveLists(updatedActiveListParams: ActiveListParams): Promise<IActiveModel> {
        return undefined;
    }
}