import { ActiveRepository } from './active.repository';
import { ActiveListParams } from './interfaces/active-list.params';
import { IActiveModel } from './interfaces/active.model';
import { ActiveServiceInterface } from './interfaces/active.service.interface';

export class ActiveService implements ActiveServiceInterface {

    constructor(private _activeRepository: ActiveRepository) {

    }

    calculateProgress(active: IActiveModel) {
    }

    createNewActiveLists(newActiveListParams: ActiveListParams): Promise<IActiveModel> {
        return undefined;
    }

    updateActiveLists(updatedActiveListParams: ActiveListParams): Promise<IActiveModel> {
        return undefined;
    }
}