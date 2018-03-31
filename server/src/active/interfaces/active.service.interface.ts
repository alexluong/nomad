import { ActiveListParams } from './active-list.params';
import { IActiveModel } from './active.model';

export interface ActiveServiceInterface {
    createNewActiveLists(newActiveListParams: ActiveListParams): Promise<IActiveModel>;

    updateActiveLists(updatedActiveListParams: ActiveListParams): Promise<IActiveModel>;

    calculateProgress(active: IActiveModel);
}