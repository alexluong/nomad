import { ActivityActionType, IActiveModel, List } from './active.model';

export interface ActiveServiceInterface {
    createNewActiveLists(userId: string): Promise<IActiveModel>;

    canCreate(userId: string): Promise<boolean>;

    updateActivity(action: ActivityActionType, listId: string, activityId: string, userId: string): Promise<IActiveModel>;

    ignoreList(listName: string, userId: string): Promise<IActiveModel>;

    getListByListId(userId: string, listId: string): Promise<List>
}