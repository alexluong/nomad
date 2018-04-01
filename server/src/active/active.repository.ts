import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SharedRepository } from '../shared/shared.repository';
import { IActiveModel } from './interfaces/active.model';
import { ActiveRepositoryInterface } from './interfaces/active.repository.interface';
import { ActiveSchema } from './schemas/active.schema';

@Component()
export class ActiveRepository extends SharedRepository<IActiveModel> implements ActiveRepositoryInterface {

    constructor(@InjectModel(ActiveSchema) private readonly _activeModel: Model<IActiveModel>) {
        super(_activeModel);
    }

    async getByUserId(userId: string): Promise<IActiveModel> {
        const query = {userId};
        return await this._activeModel.findOne(query).exec();
    }
}