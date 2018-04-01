import { ActiveListParams } from './active-list.params';
import { IActiveModel } from './active.model';

export interface ActiveServiceInterface {
    createNewActiveLists(userId: string): Promise<IActiveModel>;

    updateActiveLists(updatedActiveListParams: ActiveListParams): Promise<IActiveModel>;
}