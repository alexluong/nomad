import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';

export interface SharedModel extends Document {
    createdAt?: Date;
    updatedAt?: Date;
}

export class ApiException {
    @ApiModelPropertyOptional() statusCode?: number;
    @ApiModelPropertyOptional() message?: string;
}
