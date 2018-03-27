import { model, Model, Schema } from 'mongoose';
import { UserModel } from '../interfaces/user.model';

export const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        age: Number,
        country: String,
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Not Specified'],
            default: 'Not Specified'
        },
        nameFirst: String,
        nameLast: String
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
}, {timestamps: true});

UserSchema.virtual('profile.name').get(function () {
    return `${this.profile.nameFirst} ${this.profile.nameLast}`;
});

export const User: Model<UserModel> = model<UserModel>('User', UserSchema) as Model<UserModel>;