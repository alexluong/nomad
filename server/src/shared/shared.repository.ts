import { Document, Model } from 'mongoose';
import { SharedRepositoryInterface } from './interfaces/shared.repository.interface';

export class SharedRepository<T extends Document> implements SharedRepositoryInterface<T> {
    model: Model<T>;

    constructor(_model: Model<T>) {
        this.model = _model;
    }

    async create(resource: T): Promise<T> {
        return await this.model.create(resource);
    }

    async delete(id: string): Promise<T> {
        return await this.model.findByIdAndRemove(id).exec();
    }

    async get(): Promise<T[]> {
        return await this.model.find().exec();
    }

    async getById(id: string): Promise<T> {
        return await this.model.findById(id).exec();
    }

    async getByIds(ids: string[]): Promise<T[]> {
        return await this.model.find({_id: {$in: ids}}).exec();
    }

    async update(resource: T): Promise<T> {
        return await this.model.findByIdAndUpdate(resource._id, resource, {new: true}).exec();
    }
}
