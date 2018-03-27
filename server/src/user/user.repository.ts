import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedRepository } from '../shared/shared.repository';
import { UserModel } from './interfaces/user.model';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { UserSchema } from './schemas/user.schema';

@Component()
export class UserRepository extends SharedRepository<UserModel> implements UserRepositoryInterface {

    constructor(@InjectModel(UserSchema) private readonly _userModel: Model<UserModel>) {
        super(_userModel);
    }

    async getUserByUsernameOrEmail(username?: string, email?: string): Promise<UserModel> {
        const query = {$or: [{username}, {email}]};
        return await this._userModel.findOne(query).exec();
    }
}