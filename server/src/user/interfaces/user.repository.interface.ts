import { SharedRepositoryInterface } from '../../shared/interfaces/shared.repository.interface';
import { UserModel } from './user.model';

export interface UserRepositoryInterface extends SharedRepositoryInterface<UserModel> {
    getUserByUsernameOrEmail(username?: string, email?: string): Promise<UserModel>;
}