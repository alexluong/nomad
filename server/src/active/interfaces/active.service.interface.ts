import { Activity, ActivityActionType, IActiveModel, List } from './active.model';

export interface ActiveServiceInterface {
    createNewActiveLists(userId: string): Promise<IActiveModel>;

    canCreate(userId: string): Promise<boolean>;

    updateActivity(action: ActivityActionType, listName: string, activity: Activity, userId: string): Promise<IActiveModel>;

    ignoreList(listName: string, userId: string): Promise<IActiveModel>;

    getListByListName(userId: string, listName: string): Promise<List>
}