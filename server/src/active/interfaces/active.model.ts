import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
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

export class Activity {
    @ApiModelProperty()
    name: string;
    @ApiModelPropertyOptional()
    description?: string;
    @ApiModelProperty({
        enum: ['Opened', 'Ignored', 'Completed']
    })
    status: ProgressStatus;
}

export class List {
    @ApiModelProperty()
    name: string;
    @ApiModelPropertyOptional()
    description?: string;
    @ApiModelProperty({
        enum: ['Opened', 'Ignored', 'Completed']
    })
    status: ProgressStatus;
    @ApiModelProperty({
        type: Activity,
        isArray: true
    })
    activities: Activity[];
}

export class ActiveProgress {
    @ApiModelPropertyOptional({
        isArray: true
    })
    completedLists?: string[];
    @ApiModelPropertyOptional({
        isArray: true
    })
    completedActivities?: string[];
    @ApiModelPropertyOptional({
        isArray: true
    })
    ignoredLists?: string[];
    @ApiModelPropertyOptional({
        isArray: true
    })
    ignoredActivities?: string[];
}

export class LastUpdated {
    @ApiModelProperty()
    activityName: string;
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
    @ApiModelProperty()
    userId: string;
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
    @ApiModelProperty()
    _id?: string;
}
