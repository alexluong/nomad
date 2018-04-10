import { model, Model, Schema } from 'mongoose';
import { IActiveModel } from '../interfaces/active.model';

export const ActiveSchema = new Schema({
    activeLists: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        status: {
            type: String,
            enum: ['Opened', 'Ignored', 'Completed'],
            default: 'Opened'
        },
        progress: {
            type: Number,
            default: 0
        },
        imgURL: {
            type: String
        },
        activities: [{
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            status: {
                type: String,
                enum: ['Opened', 'Ignored', 'Completed'],
                default: 'Opened'
            }
        }]
    }],
    userId: {
        type: String
    },
    lastUpdatedActivity: {
        activityId: {
            type: String
        },
        action: {
            type: String,
            enum: ['Opened', 'Ignored', 'Completed']
        },
        updatedAt: {
            type: Date
        }
    }
}, {timestamps: true});

export const Active: Model<IActiveModel> = model<IActiveModel>('Active', ActiveSchema) as Model<IActiveModel>;
