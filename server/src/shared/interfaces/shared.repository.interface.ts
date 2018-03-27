import { Document } from 'mongoose';

export interface SharedRepositoryInterface<T extends Document> {
    get(): Promise<T[]>;

    getById(id: string): Promise<T>;

    getByIds(ids: string[]): Promise<T[]>;

    create(resource: T): Promise<T>;

    update(id: string, resource: T): Promise<T>;

    delete(id: string): Promise<T>;
}