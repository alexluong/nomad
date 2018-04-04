import { ActivityActionType, IActiveModel, List, Activity, ActiveProgress } from './active.model';

export interface ActiveServiceInterface {
    createNewActiveLists(userId: string): Promise<IActiveModel>;

    canCreate(userId: string): Promise<boolean>;

    updateActivity(action: ActivityActionType, listId: string, activityId: string, userId: string): Promise<IActiveModel>;

    ignoreList(listName: string, userId: string): Promise<IActiveModel>;

    getListByListId(userId: string, listId: string): Promise<List>;

    cannotIgnore(list: List): Promise<boolean>;

    getActivityByActivityId(userId: string, listId: string, activityId: string): Promise<Activity>;

    getProgress(userId: string): Promise<ActiveProgress>;
}
