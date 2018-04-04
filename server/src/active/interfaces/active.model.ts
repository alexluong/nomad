import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { SharedModel } from '../../shared/interfaces/shared.model';

export interface IActiveModel extends SharedModel {
    activeLists: List[];
    progress: ActiveProgress;
    userId: string;
    lastUpdatedActivity: LastUpdated;
}

export enum ProgressStatus {
    Opened = 'Opened' as any,
    Ignored = 'Ignored' as any,
    Completed = 'Completed' as any
}

export type ActivityActionType = 'complete' | 'ignore';

export class Activity {
    @ApiModelProperty() name: string;
    @ApiModelPropertyOptional() description?: string;
    @ApiModelProperty({
        enum: ['Opened', 'Ignored', 'Completed']
    })
    status: ProgressStatus;
    @ApiModelPropertyOptional({
        type: String
    })
    _id?: Types.ObjectId;
}

export class List {
    @ApiModelProperty() name: string;
    @ApiModelPropertyOptional() description?: string;
    @ApiModelProperty({
        enum: ['Opened', 'Ignored', 'Completed']
    })
    status: ProgressStatus;
    @ApiModelProperty({
        type: Activity,
        isArray: true
    })
    activities: Activity[];
    @ApiModelProperty() listImgURL: string;
    @ApiModelPropertyOptional({
        type: String
    })
    _id?: Types.ObjectId;
}

export class ActiveProgress {
    @ApiModelPropertyOptional({
        type: String,
        isArray: true
    })
    completedLists?: string[];
    @ApiModelPropertyOptional({
        type: String,
        isArray: true
    })
    completedActivities?: string[];
    @ApiModelPropertyOptional({
        type: String,
        isArray: true
    })
    ignoredLists?: string[];
    @ApiModelPropertyOptional({
        type: String,
        isArray: true
    })
    ignoredActivities?: string[];
}

export class LastUpdated {
    @ApiModelProperty() activityId: string;
    @ApiModelProperty({
        enum: ['Opened', 'Ignored', 'Completed']
    })
    action: ProgressStatus;
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time'
    })
    updatedAt?: Date;
}

export class ActiveModel {
    @ApiModelProperty({
        type: List,
        isArray: true
    })
    activeLists: List[];
    @ApiModelProperty({
        type: ActiveProgress
    })
    progress: ActiveProgress;
    @ApiModelProperty() userId: string;
    @ApiModelProperty({
        type: LastUpdated
    })
    lastUpdatedActivity: LastUpdated;
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time'
    })
    createdAt?: Date;
    @ApiModelPropertyOptional({
        type: String,
        format: 'date-time'
    })
    updatedAt?: Date;
    @ApiModelPropertyOptional({
        type: String
    })
    _id?: Types.ObjectId;
}
