import { SharedRepositoryInterface } from '../../shared/interfaces/shared.repository.interface';
import { IUserModel } from './user.model';

export interface UserRepositoryInterface extends SharedRepositoryInterface<IUserModel> {
    getUserByUsernameOrEmail(username?: string, email?: string): Promise<IUserModel>;
}