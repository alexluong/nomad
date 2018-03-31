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
    progress: {
        completedLists: [{
            type: String
        }],
        completedActivities: [{
            type: String
        }],
        ignoredLists: [{
            type: String
        }],
        ignoredActivities: [{
            type: String
        }]
    },
    userId: {
        type: String
    },
    lastUpdatedActivity: {
        activityName: {
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
